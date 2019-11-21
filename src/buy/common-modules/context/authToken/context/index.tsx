import React, {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useEffect,
  useMemo
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {
  actionsWithCatchAndLoading,
  callBackWhenPassAllFunc,
  isServer,
  promisify
} from "buy/common/utils/util";
import useReducerMiddleware from "../../../../common/useHook/useReducerMiddleware";
import { IContextValue } from "../../../../common/type";
import { globalStore } from "../../../../common/store";
import { rsaPassWord } from "../../../../common/utils/user-util";
import { constValue, tipsContent } from "../../../../common/constValue";
import { Message } from "../../../../components/message";
import {
  userLogin,
  userRegister,
  userActive,
  userActiveEmailResend,
  currentUserInfo,
  changePasswordByToken,
  userTokenValid,
  userEmailChange,
  forgetPasswordEmail,
  userEmailExist
} from "../server";

export const StoreAuthContext = createContext({
  storeAuthContextValue: {},
  storeAuthContextDispatch: {}
});

// store name
export const StoreAuth = "StoreAuth";
// store state
interface IContextState {
  tokenInfo: {
    token: string;
    cookieExpired: number;
  };
  userInfo: {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    addressList: any[];
  };
  userInfoForm: any;
  registerInfo: any;
  isLoading: any;
  currentStatus: any;
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
    userInfo: {} as any,
    userInfoForm: {} as any,
    isLoading: {},
    currentStatus: ""
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IStoreAuthActions = useGetAction(state, dispatch);
  // 直接修改state值看起来有点危险.其实用dispatch才正确.
  state.userInfoForm = useMemo(() => {
    let userInfoForm = {};
    if (state.userInfo) {
      const { firstName, lastName, addressList, email } = state.userInfo;
      userInfoForm = {
        ...userInfoForm,
        firstName,
        lastName,
        userEmail: email
      };
      if (addressList && addressList[0]) {
        userInfoForm = {
          ...userInfoForm,
          ...addressList[0]
        };
      }
    }
    return userInfoForm;
  }, [state.userInfo]);
  const { userLogout } = action;
  // @useEffect
  // 当token有值的时候,同步增加在session和globalStore中
  useEffect(() => {
    callBackWhenPassAllFunc([], () => {
      // 有效值的时候填充
      if (state.tokenInfo && state.tokenInfo.token) {
        const { token, cookieExpired } = state.tokenInfo;
        if (token) {
          setCookie(state.tokenInfo);
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
        setCookie({});
      }
    });
  }, [state.tokenInfo]);

  function setCookie(info: any) {
    // 1 设置cookie
    if (!isServer()) {
      const { token, cookieExpired = 0 } = info;
      let exp = new Date();
      exp.setTime(exp.getTime() + Number(cookieExpired * 1000));
      if (token && cookieExpired) {
        document.cookie =
          constValue.AUTHKEY +
          "=" +
          escape(token) +
          ";expires=" +
          exp.toUTCString();
      } else if (!token) {
        // 清空cookie
        document.cookie = `${constValue.AUTHKEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    }
  }

  function getFromCookie(sKey: string) {
    if (!isServer()) {
      return (
        decodeURIComponent(
          document.cookie.replace(
            new RegExp(
              "(?:(?:^|.*;)\\s*" +
                encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
                "\\s*\\=\\s*([^;]*).*$)|^.*$"
            ),
            "$1"
          )
        ) || null
      );
    } else {
      return null;
    }
  }
  // @useEffect
  useEffect(() => {
    callBackWhenPassAllFunc(
      [() => state.tokenInfo && state.tokenInfo.token],
      () => {}
    );
  }, [state.tokenInfo]);

  // 从storage中回补
  useEffect(() => {
    callBackWhenPassAllFunc([], () => {
      const cookieInfo = getFromCookie(constValue.AUTHKEY);
      if (cookieInfo) {
        dispatch({
          type: storeAuthReducerTypes.setToken,
          value: { token: cookieInfo }
        });
      } else {
        // 如果第一次没有cookie.那么就需要认为是未登录状态了.
        dispatch({
          type: storeAuthReducerTypes.setToken,
          value: { token: "" }
        });
      }
    });

    callBackWhenPassAllFunc([], () => {
      // 当ajax判定403过期的时候.清空store
      globalStore.subscribe(() => {
        if (globalStore.getState().token === null) {
          // 登出
          userLogout({
            hideToast: true
          });
        }
      });
    });
  }, []);

  // 如果有token变化就用token换取用户信息
  useEffect(() => {
    callBackWhenPassAllFunc(
      [() => state.tokenInfo && state.tokenInfo.token],
      () => {
        if (!isServer()) {
          // 这块可能更新不的时候 redux还没有更新 做延迟处理.
          window.setTimeout(() => {
            action.getCurrentUserInfo();
          }, 10);
        }
      }
    );
  }, [state.tokenInfo]);

  // 只要token发生变化 直接粗暴清空
  useEffect(() => {
    callBackWhenPassAllFunc([], () => {
      action.resetUserInfo();
    });
  }, [state.tokenInfo]);

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
  userLogout: (data?: any) => void;
  getCurrentUserInfo: () => any;
  resetUserInfo: () => any;
  forgetPasswordEmail: (data: any) => any;
  changePasswordByToken: (data: any) => any;
  userTokenValid: (data: any) => any;
  setCurrentStatus: (data: any) => any;
  userEmailChange: (data: any) => any;
  userEmailExist: (data: any) => any;
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
    setCurrentStatus: function(value: any) {
      dispatch({
        type: storeAuthReducerTypes.setCurrentStatus,
        value: value
      });
    },
    userEmailExist: promisify(async function(email: string) {
      return userEmailExist({
        email
      });
    }),
    userTokenValid: promisify(async function(token: string) {
      return userTokenValid({
        token
      });
    }),
    userEmailChange: promisify(async function(token: string) {
      return userEmailChange({
        token
      });
    }),
    userActiveEmailResend: promisify(async function(token: string) {
      const res = actionsWithCatchAndLoading({
        dispatch,
        loadingDispatchName: storeAuthReducerTypes.setLoadingObjectStatus,
        loadingObjectKey: "userActiveEmailResend",
        promiseFunc: () => {
          return userActiveEmailResend(token);
        }
      });
      return res;
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
      const res = actionsWithCatchAndLoading({
        needError: false,
        dispatch,
        loadingDispatchName: storeAuthReducerTypes.setLoadingObjectStatus,
        loadingObjectKey: "userRegister",
        promiseFunc: () => {
          return userRegister({
            email: authInfo.email,
            password: rsaPassWord(authInfo ? authInfo.password : "")
          });
        }
      });
      return res;
    }),
    forgetPasswordEmail: promisify(async function(data: any) {
      const res = actionsWithCatchAndLoading({
        dispatch,
        loadingDispatchName: storeAuthReducerTypes.setLoadingObjectStatus,
        loadingObjectKey: "forgetPasswordEmail",
        promiseFunc: () => {
          return forgetPasswordEmail(data);
        }
      });
      return res;
    }),
    changePasswordByToken: promisify(async function(data: any) {
      const res = actionsWithCatchAndLoading({
        dispatch,
        loadingDispatchName: storeAuthReducerTypes.setLoadingObjectStatus,
        loadingObjectKey: "changePasswordByToken",
        promiseFunc: () => {
          const { password, token } = data;
          return changePasswordByToken({
            password: rsaPassWord(password),
            token
          });
        }
      });
      return res;
    }),
    userLogout: function(config: any) {
      if (config && config.hideToast) {
      } else {
        window.setTimeout(() => {
          Message.success(tipsContent.logOutTips);
        }, 100);
      }
      // 清空store
      dispatch({
        type: storeAuthReducerTypes.setToken,
        value: null
      });
    },
    resetUserInfo: function() {
      dispatch({
        type: storeAuthReducerTypes.setUserInfo,
        value: {}
      });
    },
    getCurrentUserInfo: promisify(async function() {
      const res = await currentUserInfo();
      dispatch({
        type: storeAuthReducerTypes.setUserInfo,
        value: res
      });
    })
  };
  actions.userLogin = useCallback(actions.userLogin, []);
  actions.userLogout = useCallback(actions.userLogout, []);
  actions.userRegister = useCallback(actions.userRegister, []);
  actions.userActive = useCallback(actions.userActive, []);
  actions.getCurrentUserInfo = useCallback(actions.getCurrentUserInfo, []);
  actions.resetUserInfo = useCallback(actions.resetUserInfo, []);
  return actions;
}

// action types
export const storeAuthReducerTypes = {
  setToken: "setToken",
  setRegisterInfo: "setRegisterInfo",
  setLoadingObjectStatus: "setLoadingObjectStatus",
  setUserInfo: "setUserInfo",
  setCurrentStatus: "setCurrentStatus"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeAuthReducerTypes.setCurrentStatus: {
      newState = {
        ...newState,
        currentStatus: value
      };
      break;
    }
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
    case storeAuthReducerTypes.setUserInfo: {
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
