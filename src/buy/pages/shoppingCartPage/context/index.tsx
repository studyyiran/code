import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import {
  IStoreShoppingCartActions,
  useStoreShoppingCartGetActions
} from "./useGetActions";
import { IContextValue } from "../../../common/type";
import { IProductDetail } from "../../detail/context/interface";
import {
  callBackWhenPassAllFunc,
  getFromCookie
} from "../../../common/utils/util";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../common-modules/context/authToken/context";
import { constValue } from "../../../common/constValue";

export const StoreShoppingCartContext = createContext(
  {} as IStoreShoppingCartContext
);

// store name
export const StoreShoppingCart = "StoreShoppingCart";

export interface IShoppingCartInfo {
  list: {
    product: IProductDetail;
    skuReleated: IProductDetail[];
    isCompare: Boolean;
  }[];
  cartTotalPrice: number;
  totalCount: number;
  
}
// store state
export interface IStoreShoppingCartState {
  shoppingCartList: IShoppingCartInfo;
  compareInfoList: {
    product: IProductDetail,
    skuReleated: IProductDetail[],
  }[];
  showCartModal: boolean;
  isLoading: any;
}

// interface
export interface IStoreShoppingCartContext
  extends IStoreShoppingCartActions,
    IContextValue {
  storeShoppingCartContextValue: IStoreShoppingCartState;
  storeShoppingCartContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function StoreShoppingCartContextProvider(props: any) {
  const storeAuthContext = useContext(StoreAuthContext);
  const { storeAuthContextValue } = storeAuthContext as IStoreAuthContext;
  const { tokenInfo } = storeAuthContextValue;
  const initState: IStoreShoppingCartState = {
    shoppingCartList: {} as any,
    compareInfoList: [],
    showCartModal: false,
    isLoading: {},
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IStoreShoppingCartActions = useStoreShoppingCartGetActions(
    state,
    dispatch
  );
  const { getShoppingCart, mergeShoppingCart, orderCompareGet } = action;

  const loginHandler = useCallback(async () => {
    // 登录成功 就删除cookie
    window.setTimeout(async () => {
      if (tokenInfo && tokenInfo.token) {
        //1 merge
        await mergeShoppingCart();
        //2 清空cookie
        document.cookie = `${constValue.SHOPPINGCART}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
        getShoppingCart();
        orderCompareGet();
      } else {
        getShoppingCart();
        orderCompareGet();
      }
    }, 10)
  }, [getShoppingCart, mergeShoppingCart, tokenInfo]);
  useEffect(() => {
    loginHandler();
  }, [loginHandler]);

  const propsValue: IStoreShoppingCartContext = {
    ...action,
    storeShoppingCartContextValue: state,
    storeShoppingCartContextDispatch: dispatch
  };
  return <StoreShoppingCartContext.Provider value={propsValue} {...props} />;
}

// action types
export const storeShoppingCartReducerTypes = {
  setShoppingCartList: "setShoppingCartList",
  setCompareInfoList: "setCompareInfoList",
  setShowCartModal: "setShowCartModal",
  setLoadingObjectStatus: "setLoadingObjectStatus"
};

// reducer
function reducer(state: IStoreShoppingCartState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeShoppingCartReducerTypes.setLoadingObjectStatus: {
      newState = {
        ...newState,
        isLoading: {
          ...newState.isLoading,
          ...value
        }
      };
      break;
    }
    case storeShoppingCartReducerTypes.setShoppingCartList: {
      newState = {
        ...newState,
        shoppingCartList: value
      };
      break;
    }
    case storeShoppingCartReducerTypes.setShowCartModal: {
      newState = {
        ...newState,
        showCartModal: value
      };
      break;
    }
    case storeShoppingCartReducerTypes.setCompareInfoList: {
      newState = {
        ...newState,
        compareInfoList: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
