import React, {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useEffect,
  useContext
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { userEditProfile } from "../server";
import {
  callBackWhenPassAllFunc,
  isServer,
  promisify
} from "buy/common/utils/util";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { IContextValue } from "../../../common/type";
import { useIsCurrentPage } from "../../../common/useHook";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../common-modules/context/authToken/context";

export const AccountInfoContext = createContext({});
// store name
export const AccountInfo = "AccountInfo";
// store state
interface IContextState {}

// interface
export interface IAccountInfoContext
  extends IAccountInfoActions,
    IContextValue {
  accountInfoContextValue: IContextState;
  accountInfoContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function AccountInfoContextProvider(props: any) {
  const initState: IContextState = {};
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IAccountInfoActions = useGetAction(state, dispatch);

  const propsValue: IAccountInfoContext = {
    ...action,
    accountInfoContextValue: state,
    accountInfoContextDispatch: dispatch
  };
  return <AccountInfoContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IAccountInfoActions {
  userEditProfile: () => any;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IAccountInfoActions {
  const storeAuthContext = useContext(StoreAuthContext);
  const { storeAuthContextValue, getCurrentUserInfo } = storeAuthContext as IStoreAuthContext;
  const { tokenInfo } = storeAuthContextValue;
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IAccountInfoActions = {
    userEditProfile: promisify(async function(data: any) {
      const res = await userEditProfile(data);
      getCurrentUserInfo();
    })
  };
  actions.userEditProfile = useCallback(actions.userEditProfile, []);
  return actions;
}

// action types
export const accountInfoReducerTypes = {
  // setUserInfo: "setUserInfo"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    // case accountInfoReducerTypes.setUserInfo: {
    //   newState = {
    //     ...newState,
    //     userInfo: value
    //   };
    //   break;
    // }
    default:
      newState = { ...newState };
  }
  return newState;
}
