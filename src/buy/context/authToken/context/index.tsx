import React, {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useEffect
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { userLogin } from "../server";
import {
  callBackWhenPassAllFunc,
  isServer,
  promisify
} from "buy/common/utils/util";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { IContextValue } from "../../../common/type";
import { useIsCurrentPage } from "../../../common/useHook";
import { globalStore } from "../../../common/store";
import {storeCheckOrderReducerTypes} from "../../../pages/checkOrder/context";
import { rsaPassWord } from "../../../common/utils/user-util";
export const StoreAuthContext = createContext({});

// store name
export const StoreAuth = "StoreAuth";
// store state
interface IContextState {
  tokenInfo: {
    token: string;
    cookieExpired: number;
  };
  isLoading: any
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
  useEffect(() => {
    callBackWhenPassAllFunc(
      [() => state.tokenInfo && state.tokenInfo.token],
      () => {
        // 1 设置cookie
        if (!isServer()) {
          const { token, cookieExpired } = state.tokenInfo;
          let exp = new Date();
          exp.setTime(exp.getTime() + Number(cookieExpired * 1000));
          if (token && cookieExpired) {
            const Name = "uptrade_us_frontend_super_fuck_token";
            document.cookie =
              Name + "=" + escape(token) + ";expires=" + exp.toUTCString();
          } else {
            // 清空cookie??
          }
        }
      }
    );
  }, [state.tokenInfo]);

  // 当ajax判定cookie过期的时候.清空.
  globalStore.subscribe(() => {
    if (!globalStore.getState().token) {
      // 登出
      userLogout();
      // 被动清空,需要重定向
    }
  });

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
    userLogin: promisify(async function(authInfo: IAuthInfo) {
      dispatch({
        type: storeCheckOrderReducerTypes.setLoadingObjectStatus,
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
        const res = await userLogin({ email: authInfo.email, password });
        if (res) {
          const { token, time } = res;
          dispatch({
            type: storeAuthReducerTypes.setToken,
            value: res
          });
          promiseStatus.current.resolve(res)
        }
      }
      dispatch({
        type: storeCheckOrderReducerTypes.setLoadingObjectStatus,
        value: {
          login: false
        }
      });
      return returnPromise
    }),
    userLogout: function() {
      // 清空缓存
      dispatch({
        type: storeAuthReducerTypes.setToken,
        value: {}
      });
    }
  };
  actions.userLogin = useCallback(actions.userLogin, []);
  actions.userLogout = useCallback(actions.userLogout, []);
  return actions;
}

// action types
export const storeAuthReducerTypes = {
  setToken: "setToken",
  setLoadingObjectStatus: "setLoadingObjectStatus",
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeAuthReducerTypes.setToken: {
      newState = {
        ...newState,
        tokenInfo: value
      };
      break;
    }
    case storeCheckOrderReducerTypes.setLoadingObjectStatus: {
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
