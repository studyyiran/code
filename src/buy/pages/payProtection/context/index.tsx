import React, { createContext, useReducer, useCallback } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { getTestAjaxResult } from "../server";

export const StoreTestNameContext = createContext({});

// store name
export const StoreTestName = "StoreTestName";
// store state
interface IStoreTestNameState {
  testValue: number;
}

// interface
export interface IStoreTestNameContext extends IStoreTestNameActions {
  storeTestNameContextValue: IStoreTestNameState;
  storeTestNameContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function StoreTestNameContextProvider(props: any) {
  const initState: IStoreTestNameState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IStoreTestNameActions = useGetAction(state, dispatch);

  const propsValue: IStoreTestNameContext = {
    ...action,
    storeTestNameContextValue: state,
    storeTestNameContextDispatch: dispatch
  };
  return <StoreTestNameContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IStoreTestNameActions {
  getTestAjaxValue: () => any;
}

// useCreateActions
function useGetAction(
  state: IStoreTestNameState,
  dispatch: (action: IReducerAction) => void
): IStoreTestNameActions {
  // 获取类
  const getTestAjaxValue: IStoreTestNameActions["getTestAjaxValue"] = useCallback(
    async function() {
      const res = await getTestAjaxResult();
      dispatch({
        type: storeTestNameReducerTypes.setTestValue,
        value: res
      });
    },
    [dispatch]
  );
  return {
    getTestAjaxValue
  };
}

// action types
export const storeTestNameReducerTypes = {
  setTestValue: "setTestValue"
};

// reducer
function reducer(state: IStoreTestNameState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeTestNameReducerTypes.setTestValue: {
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
