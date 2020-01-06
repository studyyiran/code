import React, {createContext, useReducer, useEffect, useCallback} from "react";
// 引入请求层
import {storeTestNameServer} from "../server";

export const StoreTestNameContext = createContext({});

export interface IReducerAction {
  type: string;
  value?: any;
}

// store name
export const StoreTestName = "StoreTestName";

// store state
export interface IStoreTestNameState {
  testValue: number;
}

// store context value
export interface IStoreTestNameContext extends IStoreTestNameActions {
  storeTestNameContextValue: IStoreTestNameState;
  storeTestNameContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function StoreTestNameContextProvider(props: any) {
  const initState: IStoreTestNameState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(reducer, initState);

  // 传入state dispatch -> actions请求中间体
  const action: IStoreTestNameActions = useStoreTestNameGetActions(
    state,
    dispatch
  );

  // global useEffect
  const { getTestAjaxValue } = action;
  useEffect(() => {
    getTestAjaxValue();
  }, [getTestAjaxValue]);

  const contextValue: IStoreTestNameContext = {
    // contextValue = 所有的请求中间体 + stateValue + dispatch
    ...action,
    storeTestNameContextValue: state,
    storeTestNameContextDispatch: dispatch
  };
  return <StoreTestNameContext.Provider value={contextValue} {...props} />;
}

// actions type
export interface IStoreTestNameActions {
  getTestAjaxValue: () => void;
}

// useGetActions
export function useStoreTestNameGetActions (
  state: IStoreTestNameState,
  dispatch: (action: IReducerAction) => void
): IStoreTestNameActions {
  // useCallBack包装得到了一个: 依赖于状态的函数.
  const getTestAjaxValue = useCallback(async function() {
    const res = await storeTestNameServer.getTestAjaxResult();
    dispatch({
      type: storeTestNameReducerTypes.setTestValue,
      value: res
    });
  }, [dispatch])
  return {
    getTestAjaxValue
  };
}

// reducer action types
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