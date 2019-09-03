import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect
} from "react";
import { IReducerAction } from "@/interface/index.interface";
import {
  getBrandsByCid,
  getExpressFee,
  getProductsList
} from "../server/index.api";
import { mockgetinquirybykeys } from "../../mock";

let haveLoad = false;
const sessionKey = "modelContext";

export const SelectModelContext = createContext({});

function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case "setExpressOption": {
      newState = {
        ...newState,
        expressOption: value
      };
      break;
    }
    case "setNeedInsurance": {
      newState = {
        ...newState,
        needInsurance: value
      };
      break;
    }
    case "setProductsList": {
      newState = {
        ...newState,
        productsList: value
      };
      break;
    }
    case "setPriceInfo": {
      newState = {
        ...newState,
        priceInfo: value
      };
      break;
    }
    case "setCategoryId": {
      newState = {
        ...newState,
        categoryId: value
      };
      break;
    }
    case "setBrandList": {
      newState = {
        ...newState,
        brandList: value
      };
      break;
    }
    case "setBrand": {
      // 如果变更了brand
      if (value !== newState.brand) {
        newState = {
          ...newState,
          brand: value,
          modelInfo: {
            modelId: "",
            storageId: "",
            carrierId: ""
          }
        };
      }
      break;
    }
    case "setModelInfo": {
      // 如果变更了品牌
      if (
        value &&
        value.modelId &&
        value.modelId !== newState.modelInfo.modelId
      ) {
        value.storageId = "";
        value.carrierId = "";
      }
      newState = {
        ...newState,
        modelInfo: { ...newState.modelInfo, ...value }
      };
      break;
    }
    case "removeFromUserProductList": {
      const productTargetIndex = newState.userProductList.findIndex(
        userProduct => {
          // 首先判定，当前的状态
          return userProduct.inquiryKey === newState.inquiryKey;
        }
      );
      // 强行变更数组。深比较
      newState.userProductList = newState.userProductList.concat([]);
      if (productTargetIndex !== -1) {
        // 删除
        newState.userProductList.splice(productTargetIndex, 1);
      }
      break;
    }
    case "updateUserProductListSetInquiryKey": {
      const newProduct = {
        brand: newState.brand,
        modelInfo: newState.modelInfo,
        inquiryKey: value
      };
      const productTargetIndex = newState.userProductList.findIndex(
        userProduct => {
          // 首先判定，当前的状态
          return userProduct.inquiryKey === newState.inquiryKey;
        }
      );
      // 强行变更数组。深比较
      newState.userProductList = newState.userProductList.concat([]);
      if (productTargetIndex !== -1) {
        // 更新
        newState.userProductList[productTargetIndex] = newProduct;
      } else {
        newState.userProductList.push(newProduct);
      }
      // 更新当前选中的key
      newState.inquiryKey = value;
      newState = { ...newState };
      break;
    }
    case "changeModelCache": {
      if (value === "reset") {
        newState = Object.assign({}, newState, {
          modelInfo: {
            modelId: "",
            storageId: "",
            carrierId: ""
          },
          // categoryId: "",// 不需要
          brand: "",
          inquiryKey: ""
        });
      } else if (value) {
        newState = { ...newState, ...value };
      }
      break;
    }
    default:
      newState = { ...newState };
  }
  // justtest 避免覆盖
  if (state.brand || type === "changeModelCache") {
    saveToCache(sessionKey, newState, [
      "modelInfo",
      "brand",
      "categoryId",
      "userProductList",
      "needInsurance",
      "expressOption",
      "inquiryKey"
    ]);
  }

  return newState;
}
// const promisify = (func: (...param: any[]) => void) => (...args: any[]) => {
//   return Promise.resolve(func(...args));
// };

function promisify(func: any) {
  return function(...args: any[]) {
    return Promise.resolve(func(...args));
  };
}

interface IContextActions {
  getBrandList: () => void;
  getProductsList: () => void;
  getPriceInfo: () => void;
  getNameInfo: (
    idObj: any
  ) => {
    brandName: string;
    imgUrl: string;
    modelInfoName: {
      modelName: string;
      storageName: string;
      carrierName: string;
    };
  };
  getInquiryByIds: () => any;
  getExpressFee: () => any;
  getInquiryKeyList: () => any;
  removeFromList: (key: any) => any;
}

function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const actions: IContextActions = {
    getBrandList: promisify(async function() {
      if (state.categoryId) {
        const brandList = await getBrandsByCid(state.categoryId);
        dispatch({ type: "setBrandList", value: brandList });
      }
    }),
    getProductsList: promisify(async function() {
      if (state.categoryId && state.brand) {
        const productsList = await getProductsList(
          state.brand,
          state.categoryId
        );
        dispatch({ type: "setProductsList", value: productsList });
      }
    }),
    getPriceInfo: promisify(async function() {
      if (state.userProductList && state.userProductList.length) {
        const keys = actions.getInquiryKeyList();
        // const productsList = await getProductsList(
        //   state.brand,
        //   state.categoryId
        // );
        // mock根据keyarray获取 最新的报价列表
        window.setTimeout(() => {
          const rNumber = Math.random();
          dispatch({
            type: "setPriceInfo",
            value: {
              ...mockgetinquirybykeys,
              resultList: state.userProductList.map(
                (item: any, index: number) => {
                  const { brand: brandId, modelInfo } = item;
                  const { carrierId, modelId, storageId } = modelInfo;
                  return {
                    ...mockgetinquirybykeys.resultList[0],
                    inquiryKey: item.inquiryKey,
                    brandName: "手机品牌" + brandId,
                    productName: "手机型号" + modelId,
                    bpvIds: [
                      {
                        name: '手机内存' + storageId
                      },
                      {
                        name: '运营商' + carrierId
                      },
                    ]
                  };
                }
              )
            }
          });
        }, 400);
      }
    }),
    getInquiryByIds: promisify(async function() {
      const { brand, categoryId } = state;
      if (brand && categoryId) {
        // 用机型信息获取询价
        const productsList = await getProductsList(
          state.brand,
          state.categoryId
        );
        const InquiryKey = String(Math.random());
        dispatch({
          type: "updateUserProductListSetInquiryKey",
          value: InquiryKey
        });
        return InquiryKey;
      } else {
        return Promise.reject("no brand");
      }
    }),
    getExpressFee: promisify(async function() {
      const keys = actions.getInquiryKeyList();
      const productsList = await getExpressFee(keys);
      return productsList;
    }),
    getInquiryKeyList: function() {
      const keys = state.userProductList.map(item => item.inquiryKey);
      if (keys && keys.length) {
        return keys;
      } else {
        console.error("no key");
        return null;
      }
    },
    removeFromList: function(inquiryKey) {
      const target = state.userProductList.find(
        item => item.inquiryKey === inquiryKey
      );
      if (target) {
        dispatch({
          type: "removeFromUserProductList",
          value: inquiryKey
        });
        dispatch({
          type: "changeModelCache",
          value: "reset"
        });
      }
    },
    getNameInfo: function(config: any) {
      const { brandList, productsList } = state;
      const { brandId, modelId, storageId, carrierId } = config;
      const nameConfig = {
        brandName: "",
        imgUrl: "https://sr.aihuishou.com/image/5ba3685de38bb01c30000054.png",
        modelInfoName: {
          modelName: "",
          storageName: "",
          carrierName: ""
        }
      };
      nameConfig.brandName = (
        brandList.find((item: any) => item.id === brandId) || { name: "" }
      ).name;
      const product: any = productsList.find(
        (item: any) => item.id === modelId
      );
      if (product) {
        nameConfig.imgUrl = product.imageUrl;
        nameConfig.modelInfoName.modelName = product.name;
        const a =
          product &&
          product.skuPricePropertyNames &&
          product.skuPricePropertyNames[0];
        const b =
          product &&
          product.skuPricePropertyNames &&
          product.skuPricePropertyNames[0];
        if (a) {
          nameConfig.modelInfoName.storageName = (
            a.pricePropertyValues.find(
              (item: any) => item.id === storageId
            ) || { value: "" }
          ).value;
        }
        if (b) {
          nameConfig.modelInfoName.carrierName = (
            b.pricePropertyValues.find(
              (item: any) => item.id === carrierId
            ) || { value: "" }
          ).value;
        }
      }
      return nameConfig;
    }
  };
  actions.getBrandList = useCallback(actions.getBrandList, [state.categoryId]);
  actions.getProductsList = useCallback(actions.getProductsList, [
    state.brand,
    state.categoryId
  ]);
  actions.getPriceInfo = useCallback(actions.getPriceInfo, [
    state.userProductList
  ]);
  // 虽然是主动调用，但是最好还是更新。需要补充更多的依赖
  actions.getInquiryByIds = useCallback(actions.getInquiryByIds, [
    state.brand,
    state.categoryId
  ]);
  // actions.getNameInfo = useCallback(actions.getNameInfo, []);
  return actions;
}

interface IModelInfo {
  modelId: string;
  storageId: string;
  carrierId: string;
}

interface IContextState {
  modelInfo: IModelInfo; // 1用户数据
  categoryId: string; // 1用户数据（但是不需要清空）
  brand: string; // 1用户数据
  inquiryKey: string; // 1用户数据
  userProductList: any[]; // 用户数据2
  brandList: []; // 热刷新
  priceInfo: any; // 热刷新
  productsList: []; // 热刷新
  expressOption: any; // 用户数据
  needInsurance: boolean; // 用户数据
}

export interface ISelectModelContext extends IContextActions {
  selectModelContextValue: IContextState;
  selectModelContextDispatch: (action: IReducerAction) => void;
}

export function ModelContextProvider(props: any) {
  let initState: IContextState = {
    brandList: [],
    modelInfo: {
      modelId: "",
      storageId: "",
      carrierId: ""
    },
    productsList: [],
    userProductList: [],
    priceInfo: {},
    categoryId: "",
    inquiryKey: "",
    brand: "",
    expressOption: null,
    needInsurance: false
  };
  if (!haveLoad) {
    // haveLoad = true;
    // JUST DEBUG
    haveLoad = haveLoad;
    const cache = reloadFromCache(sessionKey);
    if (cache) {
      initState = { ...initState, ...cache };
    }
  }
  const [state, dispatch] = useReducer(reducer, initState);
  const action: IContextActions = useGetAction(state, dispatch);
  // id变化，重新拉brand
  useEffect(() => {
    action.getBrandList();
  }, [action.getBrandList]);
  // brand变化，重新拉机型
  useEffect(() => {
    action.getProductsList();
  }, [action.getProductsList]);
  useEffect(() => {
    action.getPriceInfo();
  }, [action.getPriceInfo]);
  const propsValue: ISelectModelContext = {
    ...action,
    selectModelContextValue: state,
    selectModelContextDispatch: dispatch
  };
  return <SelectModelContext.Provider value={propsValue} {...props} />;
}

function saveToCache(key: string, value: any, needKey: any[]) {
  const cache = {};
  needKey.forEach(item => {
    cache[item] = value[item];
  });
  sessionStorage.setItem(key, JSON.stringify(cache));
}

function reloadFromCache(key: string) {
  const data = sessionStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
}
