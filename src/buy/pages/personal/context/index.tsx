import React, {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useContext
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";

import {
  actionsWithCatchAndLoading,
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
import { userEditProfile, userEditPassword, userEditAddress } from "../server";
import { Message } from "../../../components/message";
import { rsaPassWord } from "../../../common/utils/user-util";

export const AccountInfoContext = createContext({});
// store name
export const AccountInfo = "AccountInfo";
// store state
interface IContextState {
  isLoading: any;
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
  const initState: IContextState = {
    isLoading: {}
  };
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
  userEditProfile: (data: any) => any;
  userEditPassword: (data: any) => any;
  userEditAddress: (data: any) => any;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IAccountInfoActions {
  const storeAuthContext = useContext(StoreAuthContext);
  const {
    storeAuthContextValue,
    getCurrentUserInfo
  } = storeAuthContext as IStoreAuthContext;
  const { tokenInfo } = storeAuthContextValue;
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IAccountInfoActions = {
    userEditPassword: promisify(async function(data: any) {
      if (data) {
        const { currentPassword, password } = data;
        const res = actionsWithCatchAndLoading({
          dispatch,
          loadingDispatchName: accountInfoReducerTypes.setLoadingObjectStatus,
          loadingObjectKey: "userEditPassword",
          needError: false,
          promiseFunc: () => {
            return userEditPassword({
              currentPassword: rsaPassWord(currentPassword),
              password: rsaPassWord(password)
            });
          }
        });
        res.then(() => {
          // 更新
          getCurrentUserInfo();
        });
        return res;
      }
    }),
    userEditProfile: promisify(async function(data: any) {
      const res = actionsWithCatchAndLoading({
        dispatch,
        loadingDispatchName: accountInfoReducerTypes.setLoadingObjectStatus,
        loadingObjectKey: "userEditProfile",
        promiseFunc: () => {
          return userEditProfile(data);
        }
      });
      res.then(() => {
        // 更新
        getCurrentUserInfo();
      });
      return res;
    }),
    userEditAddress: promisify(async function(data: any) {
      const res = actionsWithCatchAndLoading({
        dispatch,
        loadingDispatchName: accountInfoReducerTypes.setLoadingObjectStatus,
        loadingObjectKey: "userEditAddress",
        promiseFunc: () => {
          return userEditAddress(data);
        }
      });
      res.then(() => {
        // 更新
        getCurrentUserInfo();
      });
      return res;
    })
  };
  actions.userEditAddress = useCallback(actions.userEditAddress, []);
  actions.userEditProfile = useCallback(actions.userEditProfile, []);
  actions.userEditPassword = useCallback(actions.userEditPassword, []);
  return actions;
}

// action types
export const accountInfoReducerTypes = {
  setLoadingObjectStatus: "setLoadingObjectStatus"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case accountInfoReducerTypes.setLoadingObjectStatus: {
      newState = {
        ...newState,
        isLoading: {
          ...newState.isLoading,
          ...value
        }
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
