import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { getProductDetail, getSimiliar, getPartsBySkuId } from "../server";
import { backgroundCheckList } from "./staticData";
import { callBackWhenPassAllFunc, safeEqual } from "buy/common/utils/util";
import { useGetOriginData } from "../../../common/useHook/useGetOriginData";
import { IContextValue } from "../../../common/type";
import { locationHref } from "../../../common/utils/routerHistory";
import { useIsCurrentPage } from "../../../common/useHook";
import { IProductDetail } from "./interface";

export const ProductDetailContext = createContext({});
export const StoreDetail = "StoreDetail";

// state
interface IContextState {
  productDetail: IProductDetail;
  productId: string;
  similiarPhoneList: any[];
  partsInfo: IProductDetail[];
}

// @provider
export function ProductDetailContextProvider(props: any) {
  const initState: IContextState = {
    productDetail: {} as any,
    productId: "",
    similiarPhoneList: [],
    partsInfo: []
  };
  const [state, dispatch, useClientRepair] = useGetOriginData(
    reducer,
    initState,
    StoreDetail
  );
  const action = useGetAction(state, dispatch);
  const { getProductDetail, getSimiliarPhoneList } = action;

  const isPage = useIsCurrentPage("/detail");
  useEffect(() => {
    // 条件:
    // id有值
    // 并且在当前页面
    // 并且和xx不一样
    callBackWhenPassAllFunc(
      [
        () => state.productId,
        () => {
          if (
            state.productDetail &&
            safeEqual(state.productDetail.buyProductId, state.productId)
          ) {
            return false;
          } else {
            return true;
          }
        }
      ],
      () => {
        action.getProductDetail(state.productId);
      }
    );
  }, [getProductDetail, state.productDetail, state.productId]);

  useEffect(() => {
    // 条件:
    // id有值
    // 并且在当前页面.
    callBackWhenPassAllFunc([() => state.productId, () => isPage], () =>
      action.getSimiliarPhoneList(state.productId)
    );
  }, [getSimiliarPhoneList, isPage, state.productId]);

  useEffect(() => {
    // 当他有值的时候
    callBackWhenPassAllFunc(
      [() => state && state.productDetail && state.productDetail.skuId],
      () => {
        action.getPartsBySkuId(state.productDetail.skuId);
      }
    );
  }, [getPartsBySkuId, state.productDetail.skuId]);

  const propsValue: IProductDetailContext = {
    useClientRepair,
    ...action,
    productDetailContextValue: state,
    productDetailContextDispatch: dispatch
  };
  return <ProductDetailContext.Provider value={propsValue} {...props} />;
}
// interface
export interface IProductDetailContext extends IContextActions, IContextValue {
  productDetailContextValue: IContextState;
  productDetailContextDispatch: (action: IReducerAction) => void;
}

// @actions
interface IContextActions {
  getProductDetail: (id: string) => void;
  getSimiliarPhoneList: (id: string) => any;
  getPartsBySkuId: (id: string) => any;
  setProductId: (id: string | null) => any;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const actions: IContextActions = {
    getProductDetail: useCallback(
      async function(productId) {
        function redirect() {
          locationHref("/buy-phone");
        }
        try {
          const res: IProductDetail = await getProductDetail(productId);
          if (!res) {
            redirect();
          }
          if (res) {
            dispatch({
              type: storeDetailActionTypes.setProductDetail,
              value: res
            });
          }
        } catch (e) {
          console.error(e);
          redirect();
        }
      },
      [dispatch]
    ),
    getSimiliarPhoneList: useCallback(
      async function(productId) {
        const res: any = await getSimiliar({
          buyProductId: productId,
          pageNum: 1,
          pageSize: 4
        });
        dispatch({
          type: storeDetailActionTypes.setSimiliarPhoneList,
          value: res
        });
      },
      [dispatch]
    ),
    getPartsBySkuId: useCallback(
      async function(skuId) {
        const res: any = await getPartsBySkuId(skuId);
        dispatch({
          type: storeDetailActionTypes.setPartsInfo,
          value: res
        });
      },
      [dispatch]
    ),
    setProductId: useCallback(
      async function(id) {
        dispatch({
          type: storeDetailActionTypes.setProductId,
          value: id
        });
      },
      [dispatch]
    )
  };
  return actions;
}

// action types
export const storeDetailActionTypes = {
  setProductDetail: "setProductDetail",
  setProductId: "setProductId",
  setSimiliarPhoneList: "setSimiliarPhoneList",
  setPartsInfo: "setPartsInfo"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeDetailActionTypes.setPartsInfo: {
      newState = {
        ...newState,
        partsInfo: value
      };
      break;
    }
    case storeDetailActionTypes.setSimiliarPhoneList: {
      newState = {
        ...newState,
        similiarPhoneList: value
      };
      break;
    }
    case storeDetailActionTypes.setProductDetail: {
      newState = {
        ...newState,
        productDetail: value
      };
      break;
    }
    case storeDetailActionTypes.setProductId: {
      newState = {
        ...newState,
        productId: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
