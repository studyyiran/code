import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { getProductDetail, getSimiliar } from "../server";
import { backgroundCheckList } from "./staticData";
import { promisify } from "buy/common/utils/util";
import { useGetOriginData } from "../../../common/useHook/useGetOriginData";
import { IContextValue } from "../../../common/type";

export const ProductDetailContext = createContext({});
export const StoreDetail = "StoreDetail";
export interface IProductDetail {
  buyProductImgPc: any;
  buyProductImgM: any;
  buyProductVideo: string;
  buyProductHistoryPdf: string; // pdf文件
  productDescription: string; // 富文本
  buyProductBQV: any; // attr描述
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
  // 监听变化

  useEffect(() => {
    action.getProductDetail();
  }, [action.getProductDetail]);

  useEffect(() => {
    action.getSimiliarPhoneList();
  }, [action.getSimiliarPhoneList]);

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
  setProductId: (id: string) => any;
  getSimiliarPhoneList: () => any;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const actions: IContextActions = {
    getProductDetail: promisify(async function() {
      if (state.productId) {
        const res: IProductDetail = await getProductDetail(state.productId);
        if (res) {
          dispatch({
            type: reducerActionTypes.setProductDetail,
            value: res
          });
        }
      }
    }),
    getSimiliarPhoneList: promisify(async function() {
      if (state.productId) {
        const res: any = await getSimiliar({
          buyProductId: state.productId,
          pageNum: 1,
          pageSize: 4
        });
        dispatch({
          type: reducerActionTypes.setSimiliarPhoneList,
          value: res
        });
      }
    }),
    setProductId: promisify(async function(id: string) {
      dispatch({
        type: reducerActionTypes.setProductId,
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
const reducerActionTypes = {
  setProductDetail: "setProductDetail",
  setProductId: "setProductId",
  setSimiliarPhoneList: "setSimiliarPhoneList"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case reducerActionTypes.setSimiliarPhoneList: {
      newState = {
        ...newState,
        similiarPhoneList: value
      };
      break;
    }
    case reducerActionTypes.setProductDetail: {
      newState = {
        ...newState,
        productDetail: value
      };
      break;
    }
    case reducerActionTypes.setProductId: {
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
