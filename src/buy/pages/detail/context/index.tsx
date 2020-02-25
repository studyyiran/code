import React, {
  createContext,
  useEffect,
  useCallback,
  useContext
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {
  getProductDetail,
  getSimiliar,
  getPartsBySkuId,
  getReviewScore,
  getProductDetailByCode,
  getProductDetailByIdAndCondition,
  getSimiliarByCode,
  getProductHistory
} from "../server";
import {
  callBackWhenPassAllFunc,
  getBuyDetailPath,
  getFromCacheStore,
  getProductListPath,
  safeEqual,
  saveToCache
} from "buy/common/utils/util";
import { useGetOriginData } from "../../../common/useHook/useGetOriginData";
import { IContextValue } from "../../../common/type";
import { locationHref } from "../../../common/utils/routerHistory";
import {
  IProductDetail,
  IProductDetailGetWithCode,
  IReviews
} from "./interface";
import { Message } from "../../../components/message";
import { StoreShoppingCartContext } from "../../shoppingCartPage/context";

export const ProductDetailContext = createContext({} as IProductDetailContext);
export const StoreDetail = "StoreDetail";

// state
interface IContextState {
  productDetail: IProductDetail;
  productDetailByCode: IProductDetailGetWithCode;
  similiarPhoneList: any[];
  similiarPhoneListByCode: any[];
  reviewListInfo: IReviews;
  partsInfo: IProductDetail[];
  productHistoryList: string[];
}

// @provider
export function ProductDetailContextProvider(props: any) {
  const initState: IContextState = {
    productDetail: {} as any,
    similiarPhoneList: [],
    similiarPhoneListByCode: [],
    reviewListInfo: {} as any,
    partsInfo: [],
    productHistoryList: [],
    productDetailByCode: {} as any
  };
  const [state, dispatch, useClientRepair] = useGetOriginData(
    reducer,
    {
      ...initState,
      ...getFromCacheStore(StoreDetail, true)
    },
    StoreDetail
  );
  const action = useGetAction(state, dispatch);
  const { getPartsBySkuId } = action;
  const { skuId } = state.productDetail;

  // 在detail页面的时候需要拉取配件信息
  // 在后续order过程中.需要拉取配件信息
  // productDetail -> skuId -> getPartsBySkuId
  useEffect(() => {
    // 当他有值的时候
    callBackWhenPassAllFunc([() => skuId], () => {
      getPartsBySkuId(skuId);
    });
  }, [getPartsBySkuId, skuId]);

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
  getProductDetailByCode: (codeDetail: ICodeDetail) => void;
  getProductDetailByIdAndCondition: (codeDetail: ICodeAndId) => void;
  getSimiliarPhoneList: (id: string) => any;
  getSimiliarByCode: (code: string) => any;
  getPartsBySkuId: (id: string) => any;
  resetProductInfo: () => any;
  addIntoCartList: (id: string) => any;
  addProductHistoryList: (code: string) => any;
  getReviewScore: () => any;
  getProductHistory: () => any;
}

export interface ICodeDetail {
  modelDisplayName: string;
  buyProductCode: string;
}

export interface ICodeAndId {
  buyProductCode: string;
  skuBasicPropertyValueId?: string;
  condition?: string;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const { addShoppingCart, setShowCartModal } = storeShoppingCartContext;
  const actions: IContextActions = {
    getProductHistory: useCallback(async () => {
      const res = await getProductHistory(state.productHistoryList);
      console.log(res);
      // dispatch({
      //   type: 'addProductHistoryList',
      // })
    }, [state.productHistoryList]),
    addIntoCartList: useCallback(
      async value => {
        await addShoppingCart(value);
        setShowCartModal(true);
        // if (value && state.cartList.length < 10) {
        //   dispatch({
        //     type: storeDetailActionTypes.addCartList,
        //     value: [value]
        //   });
        // }
      },
      [addShoppingCart, setShowCartModal]
    ),
    getReviewScore: useCallback(async () => {
      const res: any = await getReviewScore();
      if (res) {
        dispatch({
          type: storeDetailActionTypes.setReviewListInfo,
          value: res
        });
      }
    }, [dispatch]),
    resetProductInfo: useCallback(() => {
      dispatch({
        type: storeDetailActionTypes.setProductDetail,
        value: {}
      });
      dispatch({
        type: storeDetailActionTypes.setProductDetailByCode,
        value: {}
      });
    }, [dispatch]),
    getProductDetail: useCallback(
      async function(productId) {
        function redirect() {
          if (window.location.href.indexOf("detail-preview") === -1) {
            locationHref(getProductListPath());
          }
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
    getProductDetailByCode: useCallback(
      async function(codeDetail) {
        try {
          const res: IProductDetailGetWithCode = await getProductDetailByCode(
            codeDetail
          );
          if (res) {
            dispatch({
              type: storeDetailActionTypes.setProductDetailByCode,
              value: res
            });
            if (res.detail) {
              dispatch({
                type: storeDetailActionTypes.setProductDetail,
                value: res.detail
              });
            }
          } else {
            locationHref(getProductListPath());
          }
        } catch (e) {
          console.error(e);
        }
      },
      [dispatch]
    ),
    getProductDetailByIdAndCondition: useCallback(
      async function(codeDetail) {
        try {
          const res: IProductDetailGetWithCode = await getProductDetailByIdAndCondition(
            codeDetail
          );
          if (res) {
            dispatch({
              type: storeDetailActionTypes.setProductDetailByCode,
              value: res
            });
            if (res.detail) {
              dispatch({
                type: storeDetailActionTypes.setProductDetail,
                value: res.detail
              });
              if (res.detail.buyProductCode) {
                let url = getBuyDetailPath(
                  res.detail.productDisplayName,
                  res.detail.buyProductCode
                );
                // 这边插入一个难看的命令式 做伪的url变化
                locationHref(url);
              }
            }
            if (res.sameProduct) {
              Message.error(
                "Product not found, please try other color, storage or condition"
              );
            }
          } else {
            locationHref(getProductListPath());
          }
        } catch (e) {
          console.error(e);
        }
      },
      [dispatch]
    ),
    getSimiliarByCode: useCallback(
      async function(productId) {
        const res: any = await getSimiliarByCode(productId);
        dispatch({
          type: storeDetailActionTypes.setSimiliarPhoneByCode,
          value: res
        });
      },
      [dispatch]
    ),
    getSimiliarPhoneList: useCallback(
      async function(productId) {
        const res: any = await getSimiliar(productId);
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
    addProductHistoryList: useCallback(
      async function(skuId) {
        if (skuId) {
          dispatch({
            type: "addProductHistoryList",
            value: skuId
          });
        }
      },
      [dispatch]
    )
  };
  return actions;
}

// action types
export const storeDetailActionTypes = {
  setProductDetail: "setProductDetail",
  setProductDetailByCode: "setProductDetailByCode",
  setSimiliarPhoneList: "setSimiliarPhoneList",
  setSimiliarPhoneByCode: "setSimiliarPhoneByCode",
  setPartsInfo: "setPartsInfo",
  addProductHistoryList: "addProductHistoryList",
  setReviewListInfo: "setReviewListInfo"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeDetailActionTypes.addProductHistoryList: {
      if (value) {
        newState = {
          ...newState,
          productHistoryList: newState.productHistoryList.concat([value])
        };
      }
      break;
    }
    case storeDetailActionTypes.setReviewListInfo: {
      newState = {
        ...newState,
        reviewListInfo: value
      };
      break;
    }
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
    case storeDetailActionTypes.setSimiliarPhoneByCode: {
      newState = {
        ...newState,
        similiarPhoneListByCode: value
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
    case storeDetailActionTypes.setProductDetailByCode: {
      newState = {
        ...newState,
        productDetailByCode: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  saveToCache(StoreDetail, newState, ["productHistoryList"], true);
  return newState;
}
