import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { getProductDetail, getSimiliar } from "../server";
import { backgroundCheckList } from "./staticData";
import {callBackWhenPassAllFunc, promisify, safeEqual} from "buy/common/utils/util";
import { useGetOriginData } from "../../../common/useHook/useGetOriginData";
import { IContextValue } from "../../../common/type";
import { locationHref } from "../../../common/utils/routerHistory";
import {useIsCurrentPage} from "../../../common/useHook";

export const ProductDetailContext = createContext({});
export const StoreDetail = "StoreDetail";
export interface IProductDetail {
  brandDisplayName: any; // 品牌名
  buyProductStatus: string; // 状态明
  buyProductImgPc: any;
  buyProductImgM: any;
  buyProductVideo: string;
  buyProductHistoryPdf: string; // pdf文件
  productDescription: string; // 富文本
  buyProductBQV: any; // attr描述
  skuId: any; 
  productDisplayName: string;
  buyProductDate: string;
  buyProductId: string;
  productId: string;
  buyProductBatteryLife: string;
  bpvDisplayName: string;
  buyProductCode: string; // productId
  buyLevel: string; // 商品等级
  buyPrice: string; // 销售价格签
  skuPrice: string; // 商品价格
  buyProductRemark: string; // 注释
  backGroundCheck: {
    content: string;
    title: string;
  }[]; // 新增用于描述checkList
}
// state
interface IContextState {
  productDetail: IProductDetail;
  productId: string;
  similiarPhoneList: any[];
}

// @provider
export function ProductDetailContextProvider(props: any) {
  const initState: IContextState = {
    productDetail: {} as any,
    productId: "",
    similiarPhoneList: []
  };
  const [state, dispatch, useClientRepair] = useGetOriginData(
    reducer,
    initState,
    StoreDetail
  );
  const action: IContextActions = useGetAction(state, dispatch);
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
        () => isPage,
        () => {
          if (
            !state.productDetail ||
            !safeEqual(state.productDetail.buyProductId, state.productId)
          ) {
            return true;
          } else {
            return false;
          }
        }
      ],
      getProductDetail
    );
  }, [getProductDetail, state.productDetail, state.productId]);

  useEffect(() => {
    // 条件:
    // id有值
    // 并且在当前页面.
    callBackWhenPassAllFunc(
      [() => state.productId, () => isPage],
      getSimiliarPhoneList
    );
  }, [getSimiliarPhoneList, isPage, state.productId]);

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
  getProductDetail: () => void;
  setProductId: (id: string | null) => any;
  getSimiliarPhoneList: () => any;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const actions: IContextActions = {
    getProductDetail: promisify(async function() {
      function redirect() {
        locationHref("/buy-phone");
      }
      try {
        const res: IProductDetail = await getProductDetail(state.productId);
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
    }),
    getSimiliarPhoneList: promisify(async function() {
      const res: any = await getSimiliar({
        buyProductId: state.productId,
        pageNum: 1,
        pageSize: 4
      });
      dispatch({
        type: storeDetailActionTypes.setSimiliarPhoneList,
        value: res
      });
    }),
    setProductId: promisify(async function(id: string) {
      dispatch({
        type: storeDetailActionTypes.setProductId,
        value: id
      });
    })
  };
  actions.getSimiliarPhoneList = useCallback(actions.getSimiliarPhoneList, [
    state.productId
  ]);
  actions.getProductDetail = useCallback(actions.getProductDetail, [
    state.productId
  ]);
  actions.setProductId = useCallback(actions.setProductId, []);
  return actions;
}

// action types
export const storeDetailActionTypes = {
  setProductDetail: "setProductDetail",
  setProductId: "setProductId",
  setSimiliarPhoneList: "setSimiliarPhoneList"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
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
