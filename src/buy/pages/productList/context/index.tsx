import React, { createContext, useEffect, useCallback, useRef } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {
  callBackWhenPassAllFunc,
  getProductListPath,
  safeEqual
} from "buy/common/utils/util";
import { IStaticFilterItem } from "./staticData";
import { useGetOriginData } from "../../../common/useHook/useGetOriginData";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { useIsCurrentPage } from "../../../common/useHook";
import { reducerLog } from "../../../common/hoc";
import { useStoreProductListAction } from "./useGetAction";
export const ATTROF = "attrOf";
export const ProductListContext = createContext({});
export const StoreProductList = "StoreProductList";
// state
export interface IStoreProductListState {
  productList: any[];
  pendingStatus: any;
  pageNumber: any;
  haveMore: boolean;
  modelList: any[];
  manufactureList: any[];
  currentFilterSelect: any[];
  staticFilterList: any[];
  searchInfo: {
    productId: "";
    productKey: [];
  };
}

// @provider
export function ProductListContextProvider(props: any) {
  const initState: IStoreProductListState = {
    productList: [],
    modelList: [],
    pageNumber: { pn: 1 },
    haveMore: false,
    pendingStatus: false,
    manufactureList: [],
    currentFilterSelect: [],
    staticFilterList: [],
    searchInfo: {} as any
  };
  const [state, dispatch, useHehe] = useGetOriginData(
    useReducerMiddleware(reducerLog, reducer),
    initState,
    StoreProductList
  );
  const action: IStoreProductListActions = useStoreProductListAction(
    state,
    dispatch
  );
  const isCurrentPage = useIsCurrentPage(getProductListPath());

  const { getProductList, replaceSEOUrl } = action;

  // 当属性变化的时候,进行调用
  useEffect(() => {
    callBackWhenPassAllFunc([() => isCurrentPage], getProductList);
  }, [isCurrentPage, getProductList]);

  // 当属性变化的时候,进行调用
  // useEffect(() => {
  //   callBackWhenPassAllFunc([() => isCurrentPage], replaceSEOUrl);
  // }, [isCurrentPage, replaceSEOUrl]);

  const propsValue: IProductListContext = {
    useHehe,
    ...action,
    productListContextValue: state,
    productListContextDispatch: dispatch
  };
  return <ProductListContext.Provider value={propsValue} {...props} />;
}

// interface
export interface IProductListContext extends IStoreProductListActions {
  useHehe: any;
  productListContextValue: IStoreProductListState;
  productListContextDispatch: (action: IReducerAction) => void;
}

// @actions
export interface IStoreProductListActions {
  getAnswers: () => any;
  getStaticFilterList: () => any;
  resetPageNumber: () => any;
  replaceSEOUrl: () => void;
  getProductList: () => void;
  getModelList: (pn: any) => void;
  getManufactureList: (pn: any) => any;
  getFilterList: () => IStaticFilterItem[];
  setUserSelectFilter: (info: { type: string; id: string }) => void;
  setSearchInfo: (info: any) => any;
  getDropDownInfo: (string: string) => any;
  findInfoById: (id: string) => any;
}

// action types
export const productListReducerActionTypes = {
  setStaticFilterList: "setStaticFilterList",
  setProductList: "setProductList",
  setModelList: "setModelList",
  setManufactureList: "setManufactureList",
  setCurrentFilterSelect: "setCurrentFilterSelect",
  setFilter: "setFilter",
  setSearchInfo: "setSearchInfo",
  setPageNumber: "setPageNumber",
  setHaveMore: "setHaveMore",
  setPendingStatus: "setPendingStatus",
  setAllFilter: "setAllFilter"
};

// reducer
function reducer(state: IStoreProductListState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case productListReducerActionTypes.setPendingStatus: {
      newState = {
        ...newState,
        pendingStatus: value
      };
      break;
    }
    case productListReducerActionTypes.setHaveMore: {
      newState = {
        ...newState,
        haveMore: value
      };
      break;
    }
    case productListReducerActionTypes.setPageNumber: {
      newState = {
        ...newState,
        pageNumber: { pn: value || newState.pageNumber.pn + 1 }
      };
      break;
    }
    case productListReducerActionTypes.setSearchInfo: {
      newState = {
        ...newState,
        searchInfo: {
          ...newState.searchInfo,
          productId: value.productId,
          productKey: value.productKey ? value.productKey.split(" ") : []
        }
      };
      break;
    }
    case productListReducerActionTypes.setStaticFilterList: {
      newState = {
        ...newState,
        staticFilterList: value
      };
      break;
    }
    case productListReducerActionTypes.setProductList: {
      newState = {
        ...newState,
        productList: value
      };
      break;
    }
    case productListReducerActionTypes.setModelList: {
      // 没有的数据才补充进来
      const nextValue = value.filter((itemNew: any) => {
        return !newState.modelList.find((itemOld: any) => {
          return safeEqual(itemNew.id, itemOld.id);
        });
      });
      newState = {
        ...newState,
        modelList: newState.modelList.concat(nextValue)
      };
      break;
    }
    case productListReducerActionTypes.setManufactureList: {
      newState = {
        ...newState,
        manufactureList: value
        // manufactureList: newState.manufactureList.concat(value) 因为没有pn直接替代掉
      };
      break;
    }
    case productListReducerActionTypes.setCurrentFilterSelect: {
      newState = {
        ...newState,
        currentFilterSelect: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
