import React, { createContext, useReducer, useCallback } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { payProtectionServer } from "../server";
import { IPostData } from "./interface";

export const PayProtectionContext = createContext({});

// store name
export const PayProtectionName = "PayProtection";
// store state
interface IPayProtectionState {
  testValue: number;
}

// interface
export interface IPayProtectionContext extends IPayProtectionActions {
  payProtectionContextValue: IPayProtectionState;
  payProtectionContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function PayProtectionContextProvider(props: any) {
  const initState: IPayProtectionState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IPayProtectionActions = useGetAction(state, dispatch);

  const propsValue: IPayProtectionContext = {
    ...action,
    payProtectionContextValue: state,
    payProtectionContextDispatch: dispatch
  };
  return <PayProtectionContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IPayProtectionActions {
  tokenToUrl: (data: IPostData) => any;
}

// useCreateActions
function useGetAction(
  state: IPayProtectionState,
  dispatch: (action: IReducerAction) => void
): IPayProtectionActions {
  // 获取类
  const tokenToUrl: IPayProtectionActions["tokenToUrl"] = useCallback(
    async function(data) {
      const res = await payProtectionServer.tokenToUrl(data);
      dispatch({
        type: payProtectionReducerTypes.setTestValue,
        value: res
      });
    },
    [dispatch]
  );
  return {
    tokenToUrl
  };
}

// action types
export const payProtectionReducerTypes = {
  setTestValue: "setTestValue"
};

// reducer
function reducer(state: IPayProtectionState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case payProtectionReducerTypes.setTestValue: {
      newState = {
        ...newState,
        testValue: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
