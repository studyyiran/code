import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect
} from "react";
import { IReducerAction } from "@/interface/index.interface";
import {
  getBrands,
  getExpressFee,
  getProducts,
  getinquirybyids,
  getinquirybykeys,
  createOrderStart,
  getQuality
} from "../server/index.api";
import { getQualitymock, mockgetinquirybykeys } from "../../mock";
import {
  getServerAnswerFormat,
  tranServerQuestionToLocalRender
} from "../condition/util";

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
    case "setQualityList": {
      newState = {
        ...newState,
        qualityList: value
      };
      break;
    }
    case "postConditionAnswerRenderVersion": {
      newState = {
        ...newState,
        phoneConditionServerAnswer: getServerAnswerFormat(
          state.qualityList,
          value
        )
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
            othersAttr: {}
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
        value.othersAttr = {};
      }
      const next: any = {};
      if (value) {
        if (value.othersAttr && Object.keys(value.othersAttr).length) {
          const { attrValue, attrType } = value.othersAttr;
          next.othersAttr = { ...newState.modelInfo.othersAttr } || {};
          next.othersAttr[attrType] = attrValue;
        } else if (value.modelId) {
          next.modelId = value.modelId;
        }
      }

      newState = {
        ...newState,
        modelInfo: { ...newState.modelInfo, ...next }
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
        inquiryKey: value,
        phoneConditionServerAnswer: newState.phoneConditionServerAnswer
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
            othersAttr: {}
          },
          // categoryId: "",// 不需要
          brand: "",
          inquiryKey: "",
          phoneConditionServerAnswer: []
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
      "inquiryKey",
      "phoneConditionServerAnswer"
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
  getQuality: () => void;
  getProductsList: () => void;
  getPriceInfo: () => void;
  getNameInfo: (
    idObj: any
  ) => {
    brandName: string;
    imgUrl: string;
    modelInfoName: {
      modelName: string;
      othersAttrName: any;
    };
  };
  getInquiryByIds: () => any;
  getExpressFee: () => any;
  createOrderStart: () => any;
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
        const res: any = await getBrands(state.categoryId);
        dispatch({ type: "setBrandList", value: res && res.list });
      }
    }),
    getQuality: promisify(async function() {
      if (state.categoryId) {
        const res: any = await getQuality(state.categoryId);
        dispatch({
          type: "setQualityList",
          value: tranServerQuestionToLocalRender(res && res.list)
        });
      }
    }),
    getProductsList: promisify(async function() {
      if (state.categoryId && state.brand) {
        const res: any = await getProducts(state.brand, state.categoryId);
        dispatch({ type: "setProductsList", value: res && res.list });
      }
    }),
    getPriceInfo: promisify(async function() {
      if (state.userProductList && state.userProductList.length) {
        const keys = actions.getInquiryKeyList();
        // mock根据keyarray获取 最新的报价列表
        const info: any = await getinquirybykeys({ keys });
        window.setTimeout(() => {
          const rNumber = Math.random();
          dispatch({
            type: "setPriceInfo",
            value: info
          });
        }, 400);
      }
    }),
    getInquiryByIds: promisify(async function() {
      const {
        brand,
        categoryId,
        modelInfo,
        phoneConditionServerAnswer
      } = state;
      if (brand && categoryId && modelInfo) {
        const { modelId, othersAttr } = modelInfo;
        // const linshimock = [
        //   {
        //     id: 1
        //   },
        //   {
        //     id: 3
        //   },
        //   {
        //     id: 5
        //   }
        // ];
        const inquiryInfoInfo = {
          inquirySearch: {
            categoryId,
            brandId: brand,
            productId: modelId,
            bpvIds: Object.keys(othersAttr).map((key: any) => ({
              id: othersAttr[key]
            })),
            qpvIds: phoneConditionServerAnswer
          }
        };
        console.log("**getinquirybyids**");
        console.log(JSON.stringify(inquiryInfoInfo));
        // 用机型信息获取询价
        const info: any = await getinquirybyids(inquiryInfoInfo);
        const { inquiryKey } = info;
        dispatch({
          type: "updateUserProductListSetInquiryKey",
          value: inquiryKey
        });
        return inquiryKey;
      } else {
        return Promise.reject("no brand");
      }
    }),
    getExpressFee: promisify(async function() {
      const keys = actions.getInquiryKeyList();
      try {
        const productsList = await getExpressFee({ inquieyKeys: keys });
        return productsList;
      } catch (e) {
        console.error(e);
        alert("wrong!");
        return e;
      }
    }),
    createOrderStart: promisify(async function(postData: any) {
      const keys = actions.getInquiryKeyList();
      try {
        const res = await createOrderStart(postData);
        return res;
      } catch (e) {
        console.error(e);
        alert("wrong!");
        return e;
      }
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
      const { brandId, modelId, othersAttr } = config;
      const nameConfig = {
        brandName: "",
        imgUrl: "https://sr.aihuishou.com/image/5ba3685de38bb01c30000054.png",
        modelInfoName: {
          modelName: "",
          othersAttrName: {}
        }
      };
      nameConfig.brandName = (
        brandList.find((item: any) => item.id === brandId) || {
          displayName: ""
        }
      ).displayName;
      const product: any = productsList.find(
        (item: any) => item.id === modelId
      );
      if (product) {
        nameConfig.imgUrl = product.photo;
        nameConfig.modelInfoName.modelName = product.displayName;
        product.list.forEach((item: any) => {
          const { id, propertyValue } = item;
          nameConfig.modelInfoName.othersAttrName[id] = (
            propertyValue.find(
              (attr: any) => String(attr.id) === String(othersAttr[id])
            ) || { displayName: "" }
          ).displayName;
        });
      }
      return nameConfig;
    }
  };
  actions.getBrandList = useCallback(actions.getBrandList, [state.categoryId]);
  actions.getQuality = useCallback(actions.getQuality, [state.categoryId]);
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
    state.phoneConditionServerAnswer,
    state.categoryId
  ]);
  // actions.getNameInfo = useCallback(actions.getNameInfo, []);
  return actions;
}

interface IModelInfo {
  modelId: string;
  othersAttr: any;
}

interface IContextState {
  modelInfo: IModelInfo; // 1用户数据
  categoryId: string; // 1用户数据（但是不需要清空）
  brand: string; // 1用户数据
  phoneConditionServerAnswer: any[]; // 用户数据
  inquiryKey: string; // 1用户数据
  userProductList: any[]; // 用户数据2
  qualityList: any[]; // 热刷新
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
      othersAttr: {}
    },
    qualityList: [],
    phoneConditionServerAnswer: [],
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
    action.getQuality();
  }, [state.categoryId]);
  // brand变化，重新拉机型
  useEffect(() => {
    action.getProductsList();
  }, [action.getProductsList]);
  // 询价条件变化，拉去新的价格
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
