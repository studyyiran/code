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

const actionTypes = {
  setTotalOrderInfo: "setTotalOrderInfo"
};

function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case actionTypes.setTotalOrderInfo: {
      newState = {
        ...newState,
        totalOrderInfo: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}

interface IContextActions {
  getAjax: () => void;
}

function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const actions: IContextActions = {
    getAjax: promisify(async function(a: any, b: any) {
      // const res = await getOrderDetail(a, b);
      const res = checkforordermock;
      dispatch({ type: actionTypes.setTotalOrderInfo, value: res });
    })
  };
  // actions.getAjax = useCallback(actions.getAjax, []);
  return actions;
}

interface ITotalOrderInfo {
  groupOrderNo: string;
  orderCreateDate: string;
  userInfo: any;
}

interface IContextState {
  totalOrderInfo: ITotalOrderInfo;
}

export interface ITotalOrderInfoContext extends IContextActions {
  totalOrderInfoContextValue: IContextState;
  totalOrderInfoContextDispatch: (action: IReducerAction) => void;
}

export function TotalOrderInfoProvider(props: any) {
  const initState: any = {
    totalOrderInfo: {}
  };
  const [state, dispatch] = useReducer(reducer, initState);
  const action: IContextActions = useGetAction(state, dispatch);

  const propsValue: ITotalOrderInfoContext = {
    ...action,
    totalOrderInfoContextValue: state,
    totalOrderInfoContextDispatch: dispatch
  };
  return <TotalOrderInfoContext.Provider value={propsValue} {...props} />;
}

// 抽出去
function promisify(func: any) {
  return function(...args: any[]) {
    return Promise.resolve(func(...args));
  };
}
