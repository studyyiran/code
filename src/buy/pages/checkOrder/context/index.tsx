import React, {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useEffect
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {
  getTranshipping,
  serverCheckOrderDetail,
  serverApplyReturn,
  serverCancelOrder
} from "../server";
import { promisify, safeEqual } from "buy/common/utils/util";
import { IContextValue } from "../../../common/type";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { Message } from "../../../components/message";
import { productListReducerActionTypes } from "../../productList/context";
import { callBackWhenPassAllFunc } from "../../detail/context/test";
import { getDeliverInfos, getOrderCache, setOrderCache } from "../util";

export const StoreCheckOrderContext = createContext({});
// store name
export const StoreCheckOrder = "StoreCheckOrder";

export interface IOrderParam {
  groupOrderNo: string;
  userEmail: string;
}
interface ICheckOrderDetail {
  autoConfirmDeadLine: string;
  groupOrderNo: string;
  orderCreateDate: string;
  userInfo: {
    userEmail?: string;
  };
  subOrders: any[];
}
// store state
interface IContextState {
  checkOrderDetail: ICheckOrderDetail;
  isLoading: any;
  currentSubOrderNo: string;
}

// interface(其实还缺少actions)
export interface IStoreCheckOrderContext
  extends IStoreCheckOrderActions,
    IContextValue {
  storeCheckOrderContextValue: IContextState;
  storeCheckOrderContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function StoreCheckOrderContextProvider(props: any) {
  const initState: IContextState = {
    checkOrderDetail: {} as any,
    currentSubOrderNo: "",
    isLoading: {} as any
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IStoreCheckOrderActions = useGetAction(state, dispatch);

  // 当order变化的时候,缓存当前的checkOrder登录信息
  useEffect(() => {
    callBackWhenPassAllFunc(
      [
        () =>
          state.checkOrderDetail &&
          state.checkOrderDetail.groupOrderNo &&
          state.checkOrderDetail.userInfo &&
          state.checkOrderDetail.userInfo.userEmail
      ],
      () => {
        setOrderCache({
          email: state.checkOrderDetail.userInfo.userEmail,
          orderId: state.checkOrderDetail.groupOrderNo
        });
      }
    );
  }, [state.checkOrderDetail]);

  useEffect(() => {
    action.getTranshipping();
  }, [action.getTranshipping]);

  const propsValue: IStoreCheckOrderContext = {
    ...action,
    storeCheckOrderContextValue: state,
    storeCheckOrderContextDispatch: dispatch
  };
  return <StoreCheckOrderContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IStoreCheckOrderActions {
  getCheckOrderDetail: (data: IOrderParam) => any;
  reloadOrderFromCache: () => any;
  getTranshipping: () => void;
  updateCheckForOrder: () => void;
  serverRequestReturn: () => void;
  serverCancelOrder: () => any;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IStoreCheckOrderActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IStoreCheckOrderActions = {
    serverCancelOrder: promisify(async function() {
      const info = getLoginInfo(state.checkOrderDetail);
      if (info) {
        try {
          dispatch({
            type: storeCheckOrderReducerTypes.setLoadingObjectStatus,
            value: {
              serverRequestReturn: true
            }
          });
          // 拉取
          await serverCancelOrder(info);
          // 刷新
          await actions.updateCheckForOrder();
        } catch (e) {
          if (e && e.resultMessage) {
            Message.error(e.resultMessage);
          }
        }
        dispatch({
          type: storeCheckOrderReducerTypes.setLoadingObjectStatus,
          value: {
            serverRequestReturn: false
          }
        });
      }
    }),
    serverRequestReturn: promisify(async function() {
      const info = getLoginInfo(state.checkOrderDetail);
      if (info) {
        try {
          dispatch({
            type: storeCheckOrderReducerTypes.setLoadingObjectStatus,
            value: {
              serverRequestReturn: true
            }
          });
          // 拉取
          await serverApplyReturn(info);
          // 刷新
          await actions.updateCheckForOrder();
        } catch (e) {
          if (e && e.resultMessage) {
            Message.error(e.resultMessage);
          }
        }
        dispatch({
          type: storeCheckOrderReducerTypes.setLoadingObjectStatus,
          value: {
            serverRequestReturn: false
          }
        });
      }
    }),
    getCheckOrderDetail: promisify(async function(data: IOrderParam) {
      const returnPromise = new Promise((resolve, reject) => {
        promiseStatus.current.resolve = resolve;
        promiseStatus.current.reject = reject;
      });
      try {
        dispatch({
          type: storeCheckOrderReducerTypes.setLoadingObjectStatus,
          value: { getCheckOrderDetail: true }
        });
        const res = await serverCheckOrderDetail(data);
        dispatch({
          type: storeCheckOrderReducerTypes.setCheckOrderDetail,
          value: res
        });
        promiseStatus.current.resolve(res);
      } catch (e) {
        console.error(e);
        if (safeEqual(e.code, 10013) && e.resultMessage) {
          Message.error(e.resultMessage);
        }
        promiseStatus.current.reject(e);
      }
      dispatch({
        type: storeCheckOrderReducerTypes.setLoadingObjectStatus,
        value: { getCheckOrderDetail: false }
      });
      // 返回终止
      return returnPromise;
    }),
    reloadOrderFromCache: promisify(async function() {
      const orderCache = getOrderCache();
      if (orderCache) {
        const { email, orderId } = orderCache;
        return actions.getCheckOrderDetail({
          userEmail: email,
          groupOrderNo: orderId
        });
      } else {
        return Promise.reject();
      }
    }),
    updateCheckForOrder: promisify(async function() {
      if (getLoginInfo(state.checkOrderDetail)) {
        // 从数据中获取
        actions.getCheckOrderDetail(getLoginInfo(
          state.checkOrderDetail
        ) as any);
      } else {
        // 从缓存中获取
        actions.reloadOrderFromCache();
      }
    }),
    getTranshipping: promisify(async function() {
      const { checkOrderDetail, currentSubOrderNo } = state;
      const current: any = getSubOrderByNo(checkOrderDetail, currentSubOrderNo);
      if (current) {
        if (current.transInfo) {
          const { deliverNoInfo, deliverInfos } = current.transInfo;
          if (!deliverInfos) {
            const { carrier, trackingNumber } = deliverNoInfo;
            const res = await getTranshipping(carrier, trackingNumber);
            // const res = getTranshippingmock
            const mapFunc = (item: any) => {
              // item.transInfo.deliverInfos = getDeliverInfos(res);
              // return { ...item };
              if (item.subOrderNo === currentSubOrderNo) {
                item.transInfo.deliverInfos = getDeliverInfos(res);
                return { ...item };
              }
              return item;
            };
            dispatch({
              type: storeCheckOrderReducerTypes.setSubOrderInfo,
              value: mapFunc
            });
          }
        } else {
          const mapFunc = (item: any) => {
            if (item.subOrderNo === currentSubOrderNo) {
              item.transInfo = addDeliver(item);
              return { ...item };
            }
            return item;
          };
          dispatch({
            type: storeCheckOrderReducerTypes.setSubOrderInfo,
            value: mapFunc
          });
        }
      }
    })
  };
  actions.getCheckOrderDetail = useCallback(actions.getCheckOrderDetail, []);
  actions.reloadOrderFromCache = useCallback(actions.reloadOrderFromCache, []);
  actions.getTranshipping = useCallback(actions.getTranshipping, [
    state.checkOrderDetail.subOrders,
    state.currentSubOrderNo
  ]);
  return actions;
}

// action types
export const storeCheckOrderReducerTypes = {
  setCheckOrderDetail: "setCheckOrderDetail",
  setCurrentSubOrderNo: "setCurrentSubOrderNo",
  setLoadingObjectStatus: "setLoadingObjectStatus",
  setSubOrderInfo: "setSubOrderInfo"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeCheckOrderReducerTypes.setSubOrderInfo: {
      if (
        state.checkOrderDetail &&
        state.checkOrderDetail &&
        state.checkOrderDetail.subOrders &&
        state.checkOrderDetail.subOrders.length
      ) {
        newState.checkOrderDetail.subOrders = state.checkOrderDetail.subOrders.map(
          value
        );
      }
      newState = {
        ...newState
      };
      break;
    }
    case storeCheckOrderReducerTypes.setCurrentSubOrderNo: {
      newState = {
        ...newState,
        currentSubOrderNo: value
      };
      break;
    }
    case storeCheckOrderReducerTypes.setLoadingObjectStatus: {
      newState = {
        ...newState,
        isLoading: {
          ...newState.isLoading,
          ...value
        }
      };
      break;
    }
    case storeCheckOrderReducerTypes.setCheckOrderDetail: {
      newState = {
        ...newState,
        checkOrderDetail: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}

// 快捷的获取当前的。
function getSubOrderByNo(checkOrderDetail: any, subOrderNo: string) {
  let target;
  if (
    checkOrderDetail &&
    checkOrderDetail &&
    checkOrderDetail.subOrders &&
    checkOrderDetail.subOrders.length
  ) {
    target = checkOrderDetail.subOrders.find((item: any) => {
      return item.subOrderNo === subOrderNo;
    });
  }
  return target;
}

// 添加物流信息
function addDeliver(res: any) {
  const { sendInfo, returnInfo } = res.shippingInfo;
  let currentInfo = [];
  if (returnInfo && returnInfo.length) {
    currentInfo = returnInfo;
  } else if (sendInfo && sendInfo.length) {
    currentInfo = sendInfo;
  }
  const transInfo = {
    current: currentInfo,
    deliverInfos: undefined,
    deliverNoInfo: getDeliverNoInfo(currentInfo)
  };
  return transInfo;
}

export function getDeliverNoInfo(info: any[]) {
  const deliverNoInfo: any = {};
  if (info && info.length) {
    deliverNoInfo.trackingNumber = info[0].trackingNumber;
    deliverNoInfo.carrier = info[0].carrier;
  }
  return deliverNoInfo;
}

function getLoginInfo(checkOrderDetail: ICheckOrderDetail): IOrderParam | null {
  if (
    checkOrderDetail &&
    checkOrderDetail.groupOrderNo &&
    checkOrderDetail.userInfo &&
    checkOrderDetail.userInfo.userEmail
  ) {
    return {
      groupOrderNo: checkOrderDetail.groupOrderNo,
      userEmail: checkOrderDetail.userInfo.userEmail
    };
  } else {
    return null;
  }
}
