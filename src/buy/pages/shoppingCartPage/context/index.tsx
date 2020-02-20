import React, {
  createContext,
  useReducer,
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import {IStoreShoppingCartActions, useStoreShoppingCartGetActions} from "./useGetActions";
import {IContextValue} from "../../../common/type";
import {IProductDetail} from "../../detail/context/interface";

export const StoreShoppingCartContext = createContext({});

// store name
export const StoreShoppingCart = "StoreShoppingCart";

interface ShoppingCartInfo {
  list: {
    product: IProductDetail,
    skuReleated: IProductDetail[],
  }[],
  cartTotalPrice: number,
  totalCount: number
}
// store state
export interface IStoreShoppingCartState {
  shoppingCartList: ShoppingCartInfo;
  compareList: string[];
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
  const initState: IStoreShoppingCartState = {
    shoppingCartList: {} as any,
    compareList: []
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IStoreShoppingCartActions = useStoreShoppingCartGetActions(state, dispatch);
  
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
  addCompareList: "addCompareList"
};

// reducer
function reducer(state: IStoreShoppingCartState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeShoppingCartReducerTypes.setShoppingCartList: {
      newState = {
        ...newState,
        shoppingCartList: value
      };
      break;
    }
    case storeShoppingCartReducerTypes.addCompareList: {
      newState = {
        ...newState,
        compareList: newState.compareList.concat([value])
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
