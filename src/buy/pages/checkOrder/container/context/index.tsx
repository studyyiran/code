import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect
} from "react";

import { getDeliverInfos, getDeliverNoInfo, getOrderCache } from "../../util";
import { IReducerAction } from "../../../../common/interface/index.interface";
import {
  serverApplyReturn,
  serverCancelOrder,
  serverCheckOrderDetail,
  getTranshipping
} from "../../server";

export const TotalOrderInfoContext = createContext({});

// action types
export const totalOrderInfoReducerActionTypes = {
  setTotalOrderInfo: "setTotalOrderInfo",
  setCurrentSubOrderNo: "setCurrentSubOrderNo",
  setSubOrderInfo: "setSubOrderInfo"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case totalOrderInfoReducerActionTypes.setTotalOrderInfo: {
      newState = {
        ...newState,
        totalOrderInfo: value
      };
      break;
    }
    case totalOrderInfoReducerActionTypes.setCurrentSubOrderNo: {
      newState = {
        ...newState,
        currentSubOrderNo: value
      };
      break;
    }
    case totalOrderInfoReducerActionTypes.setSubOrderInfo: {
      if (
        state.totalOrderInfo &&
        state.totalOrderInfo &&
        state.totalOrderInfo.subOrders &&
        state.totalOrderInfo.subOrders.length
      ) {
        newState.totalOrderInfo.subOrders = state.totalOrderInfo.subOrders.map(
          value
        );
      }
      newState = {
        ...newState
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}

// @actions
interface IContextActions {
  checkForOrder: (email: string, orderId: string) => void;
  reloadOrderFromCache: () => void;
  getTranshipping: () => void;
  serverApplyReturn: () => void;
  serverCancelOrder: () => void;
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

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const actions: IContextActions = {
    // 拉取订单信息
    checkForOrder: promisify(async function(userEmail: any, groupOrderNo: any) {
      try {
        const res: any = await serverCheckOrderDetail({
          userEmail,
          groupOrderNo
        });
        // const res = checkforordermock;
        // 然后还需要获取订单物流信息
        if (res && res.subOrders && res.subOrders.length) {
          res.subOrders = res.subOrders.map((obj: any) => {
            obj.transInfo = addDeliver(obj);
            return obj;
          });
        }
        if (res.groupOrderNo) {
          dispatch({
            type: totalOrderInfoReducerActionTypes.setTotalOrderInfo,
            value: res
          });
        }
        return res;
      } catch (e) {
        return Promise.reject(e);
      }
    }),
    // 请求获取当前的物流信息 当current变化的时候,获取对应的.
    getTranshipping: promisify(async function() {
      const { totalOrderInfo, currentSubOrderNo } = state;
      const current: any = getSubOrderByNo(totalOrderInfo, currentSubOrderNo);
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
              type: totalOrderInfoReducerActionTypes.setSubOrderInfo,
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
            type: totalOrderInfoReducerActionTypes.setSubOrderInfo,
            value: mapFunc
          });
        }
      }
    }),
    serverApplyReturn: promisify(async function(data: any) {
      const { userInfo } = state.totalOrderInfo;
      const { userEmail } = userInfo;
      const postData = {
        userEmail,
        ...data
      };
      const res = await serverApplyReturn(postData);
      actions.reloadOrderFromCache();
    }),
    serverCancelOrder: promisify(async function(data: any) {
      const { userInfo } = state.totalOrderInfo;
      const { userEmail } = userInfo;
      const postData = {
        userEmail,
        ...data
      };
      const res = await serverCancelOrder(postData);
      actions.reloadOrderFromCache();
    }),
    reloadOrderFromCache: promisify(async function() {
      const orderCache = getOrderCache();
      if (orderCache) {
        const { email, orderId } = orderCache;
        actions.checkForOrder(email, orderId);
      }
    })
  };
  // actions.checkForOrder = useCallback(actions.checkForOrder, []);
  actions.getTranshipping = useCallback(actions.getTranshipping, [
    state.totalOrderInfo.subOrders,
    state.currentSubOrderNo
  ]);
  return actions;
}

// state
interface IContextState {
  totalOrderInfo: ITotalOrderInfo;
  currentSubOrderNo: string;
}

// @provider
export function TotalOrderInfoProvider(props: any) {
  const initState: IContextState = {
    // totalOrderInfo: {} as ITotalOrderInfo,
    totalOrderInfo: {} as ITotalOrderInfo,
    currentSubOrderNo: ""
  };
  const [state, dispatch] = useReducer(reducer, initState);
  const action: IContextActions = useGetAction(state, dispatch);
  // 监听变化
  useEffect(() => {
    if (state.totalOrderInfo) {
      const { subOrders } = state.totalOrderInfo;
      if (subOrders && subOrders.length) {
        let no = "";
        if (subOrders.length === 1) {
          no = subOrders[0].subOrderNo;
        }
        // 这种响应式结合dispatch可以兼顾可追寻和容易书写数据流。
        // 但是也无法避免多处可能有交叉依赖的问题
        dispatch({
          type: totalOrderInfoReducerActionTypes.setCurrentSubOrderNo,
          value: no
        });
      }
    }
  }, [state.totalOrderInfo]);

  useEffect(() => {
    action.getTranshipping();
  }, [action.getTranshipping]);
  const propsValue: ITotalOrderInfoContext = {
    ...action,
    totalOrderInfoContextValue: state,
    totalOrderInfoContextDispatch: dispatch
  };
  return <TotalOrderInfoContext.Provider value={propsValue} {...props} />;
}

// interface
export interface ITotalOrderInfoContext extends IContextActions {
  totalOrderInfoContextValue: IContextState;
  totalOrderInfoContextDispatch: (action: IReducerAction) => void;
}

// order
interface ITotalOrderInfo {
  groupOrderNo: string;
  orderCreateDate: string;
  userInfo: any;
  subOrders: any[];
}

// 抽出去
function promisify(func: any) {
  return function(...args: any[]) {
    return Promise.resolve(func(...args));
  };
}

// 快捷的获取当前的。
function getSubOrderByNo(totalOrderInfo: any, subOrderNo: string) {
  let target;
  if (
    totalOrderInfo &&
    totalOrderInfo &&
    totalOrderInfo.subOrders &&
    totalOrderInfo.subOrders.length
  ) {
    target = totalOrderInfo.subOrders.find((item: any) => {
      return item.subOrderNo === subOrderNo;
    });
  }
  return target;
}
