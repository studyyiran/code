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
  getProductHistory,
  addProductWaitList
} from "../server";
import {
  actionsWithCatchAndLoading,
  callBackWhenPassAllFunc,
  getBuyDetailPath,
  getFromCacheStore,
  getProductListPath,
  getUrlAllParams,
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
import { GlobalSettingContext, IGlobalSettingContext } from "../../../context";

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
  productHistoryCodeList: string[];
  productHistoryList: any[];
  isLoading: any;
}

// @provider
export function ProductDetailContextProvider(props: any) {
  const initState: IContextState = {
    productDetail: {} as any,
    similiarPhoneList: [],
    similiarPhoneListByCode: [],
    reviewListInfo: {} as any,
    partsInfo: [],
    productHistoryCodeList: [],
    productHistoryList: [],
    isLoading: {},
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
  getProductDetailByCode: (modelName?: string) => void;
  getProductDetailByIdAndCondition: (codeDetail: ICodeAndId) => void;
  getSimiliarPhoneList: (id: string) => any;
  getSimiliarByCode: (code: string) => any;
  getPartsBySkuId: (id: string) => any;
  resetProductInfo: () => any;
  addProductHistoryCodeList: (code: string) => any;
  getReviewScore: () => any;
  getProductHistory: () => any;
  addProductWaitList: (info: {
    buyProductCode: string;
    email?: string;
    phone?: string;
  }) => any;
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

  const globalSettingContext = useContext(GlobalSettingContext);
  const {
    globalSettingContextValue
  } = globalSettingContext as IGlobalSettingContext;
  const { isMobile } = globalSettingContextValue;

  const { variant } = getUrlAllParams();
  const actions: IContextActions = {
    getProductHistory: useCallback(async () => {
      // 判断去重
      if (
        state.productHistoryCodeList &&
        (state.productHistoryCodeList.some((code: string) => {
          return Boolean(
            !state.productHistoryList.find(item => {
              return item.buyProductCode === code;
            })
          );
        }) ||
          state.productHistoryCodeList.length !==
            state.productHistoryList.length)
      ) {
        const res = await getProductHistory(state.productHistoryCodeList);
        // 1 赋值
        dispatch({
          type: "setProductHistoryList",
          value: res
        });
        // 2 去重重新赋值
        dispatch({
          type: "addProductHistoryCodeList",
          value: {
            subType: "reset",
            subValue: (res || []).map((item: any) => {
              return item.buyProductCode;
            })
          }
        });
      }
    }, [dispatch, state.productHistoryCodeList, state.productHistoryList]),
    
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
      async function(modelName) {
        try {
          const res: IProductDetailGetWithCode = await getProductDetailByCode({
            buyProductCode: variant || "",
            modelDisplayName: modelName || ""
          });
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
      [dispatch, variant]
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
    addProductHistoryCodeList: useCallback(
      async function(skuId) {
        if (skuId) {
          dispatch({
            type: "addProductHistoryCodeList",
            value: {
              subType: "concat",
              subValue: [skuId]
            }
          });
        }
      },
      [dispatch]
    ),
    addProductWaitList: useCallback(
      async function(info) {
        return actionsWithCatchAndLoading({
          dispatch,
          loadingDispatchName: storeDetailActionTypes.setLoadingObjectStatus,
          loadingObjectKey: "addProductWaitList",
          promiseFunc: () => {
            const res = addProductWaitList(info);
            res.then(() => {
              Message.success("Succeed to join waitlist.");
            });
            res.catch(() => {
              Message.success("Failed to join waitlist, please try again.");
            });
            return res;
          }
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
  setProductDetailByCode: "setProductDetailByCode",
  setSimiliarPhoneList: "setSimiliarPhoneList",
  setSimiliarPhoneByCode: "setSimiliarPhoneByCode",
  setPartsInfo: "setPartsInfo",
  addProductHistoryCodeList: "addProductHistoryCodeList",
  setProductHistoryList: "setProductHistoryList",
  setReviewListInfo: "setReviewListInfo",
  setLoadingObjectStatus: "setLoadingObjectStatus"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case storeDetailActionTypes.setLoadingObjectStatus: {
      newState = {
        ...newState,
        isLoading: {
          ...newState.isLoading,
          ...value
        }
      };
      break;
    }
    case storeDetailActionTypes.addProductHistoryCodeList: {
      if (value) {
        const { subType, subValue } = value;
        if (subType === "concat") {
          newState = {
            ...newState,
            productHistoryCodeList: subValue.concat(
              newState.productHistoryCodeList
            )
          };
        } else if (subType === "reset") {
          newState = {
            ...newState,
            productHistoryCodeList: subValue
          };
        }
      }
      break;
    }
    case storeDetailActionTypes.setProductHistoryList: {
      if (value) {
        newState = {
          ...newState,
          productHistoryList: value
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
  saveToCache(StoreDetail, newState, ["productHistoryCodeList"], true);
  return newState;
}
