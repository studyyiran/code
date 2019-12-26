import React, {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useEffect
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { callBackWhenPassAllFunc, promisify } from "buy/common/utils/util";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { IContextValue } from "../../type";
import { useIsCurrentPage } from "../../useHook";
import { getTestAjaxResult } from "../server";

export const StoreTestNameContext = createContext({});

// store name
export const StoreTestName = "StoreTestName";
// store state
interface IStoreTestNameState {
  testValue: number;
}

// interface
export interface IStoreTestNameContext
  extends IStoreTestNameActions,
    IContextValue {
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

  const isPage = useIsCurrentPage("/test");

  // @useEffect
  useEffect(() => {
    // 1 当前页面
    callBackWhenPassAllFunc([() => isPage], action.getTestAjaxValue);
  }, [action.getTestAjaxValue]);

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
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IStoreTestNameActions = {
    getTestAjaxValue: promisify(async function() {
      const res = await getTestAjaxResult();
      dispatch({
        type: storeTestNameReducerTypes.setTestValue,
        value: res
      });
    })
  };
  actions.getTestAjaxValue = useCallback(actions.getTestAjaxValue, []);
  return actions;
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
