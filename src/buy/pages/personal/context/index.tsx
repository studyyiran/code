import React, {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useEffect,
  useContext
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { currentUserInfo } from "../server";
import { callBackWhenPassAllFunc, promisify } from "buy/common/utils/util";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { IContextValue } from "../../../common/type";
import { useIsCurrentPage } from "../../../common/useHook";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../context/authToken/context";

export const AccountInfoContext = createContext({});
// store name
export const AccountInfo = "AccountInfo";
// store state
interface IContextState {
  userInfo: {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    addressList: any[];
  };
}

// interface
export interface IAccountInfoContext
  extends IAccountInfoActions,
    IContextValue {
  accountInfoContextValue: IContextState;
  accountInfoContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function AccountInfoContextProvider(props: any) {
  const storeAuthContext = useContext(StoreAuthContext);
  const { storeAuthContextValue } = storeAuthContext as IStoreAuthContext;
  const { tokenInfo } = storeAuthContextValue;
  const initState: IContextState = {
    userInfo: {} as any
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IAccountInfoActions = useGetAction(state, dispatch);

  const isPage = useIsCurrentPage("/test");

  // @useEffect
  useEffect(() => {
    // 1 如果有token
    if (tokenInfo && tokenInfo.token) {
      callBackWhenPassAllFunc([], () => {
        window.setTimeout(() => {
          action.currentUserInfo()
        }, 1000)
      });
    }
  }, [tokenInfo]);

  const propsValue: IAccountInfoContext = {
    ...action,
    accountInfoContextValue: state,
    accountInfoContextDispatch: dispatch
  };
  return <AccountInfoContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IAccountInfoActions {
  currentUserInfo: () => any;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IAccountInfoActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IAccountInfoActions = {
    currentUserInfo: promisify(async function() {
      const res = await currentUserInfo();
      dispatch({
        type: accountInfoReducerTypes.setUserInfo,
        value: res
      });
    })
  };
  actions.currentUserInfo = useCallback(actions.currentUserInfo, []);
  return actions;
}

// action types
export const accountInfoReducerTypes = {
  setUserInfo: "setUserInfo"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case accountInfoReducerTypes.setUserInfo: {
      newState = {
        ...newState,
        userInfo: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
