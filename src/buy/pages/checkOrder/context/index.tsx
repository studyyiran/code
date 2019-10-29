import React, { createContext, useReducer, useCallback, useRef } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { serverCheckOrderDetail } from "../server";
import { promisify } from "buy/common/utils/util";
import { IContextValue } from "../../../common/type";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";

export const StoreCheckOrderContext = createContext({});
// store name
export const StoreCheckOrder = "StoreCheckOrder";

interface ICheckOrderDetail {}
// store state
interface IContextState {
  checkOrderDetail: ICheckOrderDetail;
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
  console.log(props.value);
  const initState: IContextState = {
    checkOrderDetail: {} as any
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IStoreCheckOrderActions = useGetAction(state, dispatch);

  const propsValue: IStoreCheckOrderContext = {
    ...action,
    storeCheckOrderContextValue: state,
    storeCheckOrderContextDispatch: dispatch
  };
  return <StoreCheckOrderContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IStoreCheckOrderActions {
  getCheckOrderDetail: (data: any) => void;
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
    getCheckOrderDetail: promisify(async function(data: any) {
      const res = await serverCheckOrderDetail(data);
      dispatch({
        type: storeCheckOrderReducerTypes.setCheckOrderDetail,
        value: res
      });
    })
  };
  actions.getCheckOrderDetail = useCallback(actions.getCheckOrderDetail, []);
  return actions;
}

// action types
export const storeCheckOrderReducerTypes = {
  setCheckOrderDetail: "setCheckOrderDetail"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
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
