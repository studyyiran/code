import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect
} from "react";
import { IReducerAction } from "@/interface/index.interface";
import { getOrderDetail, getTranshipping } from "../../api/order.api";
import { checkforordermock, getTranshippingmock } from "./mock";
import {getDeliverInfos, getDeliverNoInfo} from "../../util";

// 然后还需要获取订单物流信息
// just mock
if (
  checkforordermock &&
  checkforordermock.subOrders &&
  checkforordermock.subOrders.length
) {
  checkforordermock.subOrders = checkforordermock.subOrders.map((obj: any) => {
    obj.transInfo = addDeliver(obj);
    return obj;
  });
}

export const TotalOrderInfoContext = createContext({});

// action types
const reducerActionTypes = {
  setTotalOrderInfo: "setTotalOrderInfo",
  setCurrentSubOrderNo: "setCurrentSubOrderNo",
  setSubOrderInfo: "setSubOrderInfo"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case reducerActionTypes.setTotalOrderInfo: {
      newState = {
        ...newState,
        totalOrderInfo: value
      };
      break;
    }
    case reducerActionTypes.setCurrentSubOrderNo: {
      newState = {
        ...newState,
        currentSubOrderNo: value
      };
      break;
    }
    case reducerActionTypes.setSubOrderInfo: {
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
  getAjax: () => void;
  getTranshipping: () => void;
  getSubOrderByNo: (s: string) => void;
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
    getAjax: promisify(async function(a: any, b: any) {
      try {
        // const res = await getOrderDetail(a, b);
        const res = checkforordermock;
        // 然后还需要获取订单物流信息
        if (res && res.subOrders && res.subOrders.length) {
          res.subOrders = res.subOrders.map((obj: any) => {
            obj.transInfo = addDeliver(obj);
            return obj;
          });
        }
        dispatch({ type: reducerActionTypes.setTotalOrderInfo, value: res });
        return res;
      } catch (e) {
        return e;
      }
    }),
    // 快捷的获取当前的。
    getSubOrderByNo: function(subOrderNo: string) {
      let target;
      if (
        state.totalOrderInfo &&
        state.totalOrderInfo &&
        state.totalOrderInfo.subOrders &&
        state.totalOrderInfo.subOrders.length
      ) {
        target = state.totalOrderInfo.subOrders.find((item: any) => {
          return item.subOrderNo === subOrderNo;
        });
      }
      return target;
    },
    // 请求获取当前的物流信息
    getTranshipping: promisify(async function(subOrderNo: any) {
      const current: any = actions.getSubOrderByNo(subOrderNo);
      debugger;
      if (current && current.transInfo && current.transInfo.deliverNoInfo) {
        const { carrier, trackingNumber } = current.transInfo.deliverNoInfo;
        console.log(carrier);
        console.log(trackingNumber);
        // const res = await getTranshipping(carrier, trackingNumber);
        const res = getTranshippingmock;
        const mapFunc = (item: any) => {
          if (item.subOrderNo === subOrderNo) {
            item.transInfo.deliverInfos = getDeliverInfos(res);
            return { ...item };
          }
          return item;
        };
        dispatch({
          type: reducerActionTypes.setSubOrderInfo,
          value: mapFunc
        });
        console.log(res);
      }
    })
  };
  // actions.getAjax = useCallback(actions.getAjax, []);
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
    totalOrderInfo: checkforordermock as ITotalOrderInfo,
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
        dispatch({ type: reducerActionTypes.setCurrentSubOrderNo, value: no });
      }
    }
  }, [state.totalOrderInfo]);
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
