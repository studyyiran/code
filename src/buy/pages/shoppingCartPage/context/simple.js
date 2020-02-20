import React, {
  createContext,
  useReducer,
  useCallback
} from "react";
// 引入请求层
import { storeTestNameServer } from "../server";

export const StoreTestNameContext = createContext({});

// store name
export const StoreTestName = "StoreTestName";


// store provider
export function StoreTestNameContextProvider(props) {
  const initState = {
    testValue: 101
  };
  const [state, dispatch] = useReducer(reducer, initState);

  // 传入state dispatch -> actions请求中间体
  const action = useStoreTestNameGetActions(
    state,
    dispatch
  );

  const contextValue = {
    // contextValue = 所有的请求中间体 + stateValue + dispatch
    ...action,
    storeTestNameContextValue: state,
    storeTestNameContextDispatch: dispatch
  };
  return <StoreTestNameContext.Provider value={contextValue} {...props} />;
}

// useGetActions
export function useStoreTestNameGetActions(
  state,
  dispatch
) {
  // useCallBack包装得到了一个: 依赖于状态的函数.
  const getTestAjaxValue = useCallback(
    async function(n) {
      const res = await storeTestNameServer.getTestAjaxResult(n);
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

// reducer action types
export const storeTestNameReducerTypes = {
  setTestValue: "setTestValue"
};

// reducer
function reducer(state, action) {
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
