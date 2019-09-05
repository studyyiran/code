import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect
} from "react";
import { IReducerAction } from "@/interface/index.interface";
import { getOrderDetail } from "../../api/order.api";
import { checkforordermock } from "./mock";

export const TotalOrderInfoContext = createContext({});

// action types
const reducerActionTypes = {
  setTotalOrderInfo: "setTotalOrderInfo",
  setCurrentSubOrderNo: "setCurrentSubOrderNo"
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
    default:
      newState = { ...newState };
  }
  return newState;
}

// @actions
interface IContextActions {
  getAjax: () => void;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const actions: IContextActions = {
    getAjax: promisify(async function(a: any, b: any) {
      // const res = await getOrderDetail(a, b);
      const res = checkforordermock;
      dispatch({ type: reducerActionTypes.setTotalOrderInfo, value: res });
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
