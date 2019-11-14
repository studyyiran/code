import React, {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useEffect
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {
  callBackWhenPassAllFunc,
  getFromSession,
  isServer,
  promisify,
  setSession
} from "buy/common/utils/util";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { IContextValue } from "../../../common/type";
import { useIsCurrentPage } from "../../../common/useHook";
import { globalStore } from "../../../common/store";
import { rsaPassWord } from "../../../common/utils/user-util";
import { constValue } from "../../../common/constValue";
import {
  userLogin,
  userRegister,
  userActive,
  userActiveEmailResend
} from "../server";

export const StoreAuthContext = createContext({});

// store name
export const StoreAuth = "StoreAuth";
// store state
interface IContextState {
  tokenInfo: {
    token: string;
    cookieExpired: number;
  };
  registerInfo: any;
  isLoading: any;
}

export interface IAuthInfo {
  email: string;
  password: string;
}

// interface
export interface IStoreAuthContext extends IStoreAuthActions, IContextValue {
  storeAuthContextValue: IContextState;
  storeAuthContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function StoreAuthContextProvider(props: any) {
  const initState: IContextState = {
    tokenInfo: {} as any,
    registerInfo: {} as any,
    isLoading: {}
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IStoreAuthActions = useGetAction(state, dispatch);

  const isPage = useIsCurrentPage("/test");

  const { userLogout } = action;
  // @useEffect
  // 当token有值的时候,同步增加在session和globalStore中
  useEffect(() => {
    callBackWhenPassAllFunc([], () => {
      // 有效值的时候填充
      if (state.tokenInfo && state.tokenInfo.token) {
        const { token, cookieExpired } = state.tokenInfo;
        if (token) {
          setSession(constValue.AUTHKEY, token);
          if (globalStore && globalStore.dispatch) {
            globalStore.dispatch({
              type: "reduxSetToken",
              value: token
            });
          }
        }
      } else if (state.tokenInfo === null) {
        // 清空store(null变为{})
        dispatch({
          type: storeAuthReducerTypes.setToken,
          value: { token: "" }
        });
        // 清空redux
        if (globalStore && globalStore.dispatch) {
          globalStore.dispatch({
            type: "reduxSetToken",
            value: ""
          });
        }
        // 清空sesstion
        setSession(constValue.AUTHKEY, "");
      }
    });
  }, [state.tokenInfo]);

  // 从storage中回补
  useEffect(() => {
    callBackWhenPassAllFunc([], () => {
      const cookieInfo = getFromSession(constValue.AUTHKEY);
      if (cookieInfo) {
        dispatch({
          type: storeAuthReducerTypes.setToken,
          value: { token: cookieInfo }
        });
      }
    });

    callBackWhenPassAllFunc([], () => {
      // 当ajax判定403过期的时候.清空store
      globalStore.subscribe(() => {
        if (globalStore.getState().token === null) {
          // 登出
          userLogout();
        }
      });
    });
  }, []);

  const propsValue: IStoreAuthContext = {
    ...action,
    storeAuthContextValue: state,
    storeAuthContextDispatch: dispatch
  };
  return <StoreAuthContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IStoreAuthActions {
  userLogin: (authInfo: IAuthInfo) => any;
  userRegister: (authInfo: IAuthInfo) => any;
  userActive: (token: string) => any;
  userActiveEmailResend: (token: string) => any;
  userLogout: () => void;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IStoreAuthActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IStoreAuthActions = {
    userActiveEmailResend: promisify(async function(token: string) {
      dispatch({
        type: storeAuthReducerTypes.setLoadingObjectStatus,
        value: {
          userActiveEmailResend: true
        }
      });
      const returnPromise = new Promise((resolve, reject) => {
        promiseStatus.current.resolve = resolve;
        promiseStatus.current.reject = reject;
      });
      if (token) {
        const res = await userActiveEmailResend(token);
        if (res) {
          promiseStatus.current.resolve(res);
        }
      }
      dispatch({
        type: storeAuthReducerTypes.setLoadingObjectStatus,
        value: {
          userActiveEmailResend: false
        }
      });
      return returnPromise;
    }),
    userActive: promisify(async function(token: string) {
      dispatch({
        type: storeAuthReducerTypes.setLoadingObjectStatus,
        value: {
          userActive: true
        }
      });
      const returnPromise = new Promise((resolve, reject) => {
        promiseStatus.current.resolve = resolve;
        promiseStatus.current.reject = reject;
      });
      if (token) {
        const res = await userActive(token);
        if (res) {
          promiseStatus.current.resolve(res);
        }
      }
      dispatch({
        type: storeAuthReducerTypes.setLoadingObjectStatus,
        value: {
          userActive: false
        }
      });
      return returnPromise;
    }),
    userLogin: promisify(async function(authInfo: IAuthInfo) {
      dispatch({
        type: storeAuthReducerTypes.setLoadingObjectStatus,
        value: {
          login: true
        }
      });
      const returnPromise = new Promise((resolve, reject) => {
        promiseStatus.current.resolve = resolve;
        promiseStatus.current.reject = reject;
      });
      let password = authInfo.password;
      if (password) {
        password = rsaPassWord(password);
      }
      if (password) {
        try {
          const res = await userLogin({ email: authInfo.email, password });
          if (res) {
            const { token, time } = res;
            dispatch({
              type: storeAuthReducerTypes.setToken,
              value: res
            });
            promiseStatus.current.resolve(res);
          }
        } catch (e) {
          promiseStatus.current.reject(e);
        }
      }
      dispatch({
        type: storeAuthReducerTypes.setLoadingObjectStatus,
        value: {
          login: false
        }
      });
      return returnPromise;
    }),
    userRegister: promisify(async function(authInfo: IAuthInfo) {
      dispatch({
        type: storeAuthReducerTypes.setLoadingObjectStatus,
        value: {
          userRegister: true
        }
      });
      const returnPromise = new Promise((resolve, reject) => {
        promiseStatus.current.resolve = resolve;
        promiseStatus.current.reject = reject;
      });
      let password = authInfo.password;
      if (password) {
        password = rsaPassWord(password);
      }
      if (password) {
        try {
          const res = await userRegister({ email: authInfo.email, password });
          // dispatch({
          //   type: storeAuthReducerTypes.setRegisterInfo,
          //   value: {
          //     email: authInfo.email,
          //     password: password
          //   }
          // });
          promiseStatus.current.resolve(res);
        } catch (e) {
          console.error(e);
        }
      }
      dispatch({
        type: storeAuthReducerTypes.setLoadingObjectStatus,
        value: {
          userRegister: false
        }
      });
      return returnPromise;
    }),
    userLogout: function() {
      // 清空store
      dispatch({
        type: storeAuthReducerTypes.setToken,
        value: null
      });
    }
  };
  actions.userLogin = useCallback(actions.userLogin, []);
  actions.userLogout = useCallback(actions.userLogout, []);
  actions.userRegister = useCallback(actions.userRegister, []);
  actions.userActive = useCallback(actions.userActive, []);
  return actions;
}

// action types
export const storeAuthReducerTypes = {
  setToken: "setToken",
  setRegisterInfo: "setRegisterInfo",
  setLoadingObjectStatus: "setLoadingObjectStatus"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeAuthReducerTypes.setRegisterInfo: {
      newState = {
        ...newState,
        registerInfo: value
      };
      break;
    }
    case storeAuthReducerTypes.setToken: {
      newState = {
        ...newState,
        tokenInfo: value
      };
      break;
    }
    case storeAuthReducerTypes.setLoadingObjectStatus: {
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
