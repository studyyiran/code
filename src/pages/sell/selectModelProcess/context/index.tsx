import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect
} from "react";
import { IReducerAction } from "interface/index.interface";
import {
  getBrands,
  getExpressFee,
  getProducts,
  getinquirybyids,
  getinquirybykeys,
  createOrderStart,
  getQuality,
  getLastestOrder,
  emailSubscribed,
  createEmail,
  getSkuId,
  skuIdToPhoneInfo
} from "../server/index.api";
import { getQualitymock, mockgetinquirybykeys } from "../../mock";
import {
  getServerAnswerFormat,
  tranServerQuestionToLocalRender
} from "../condition/util";
import { setOrderCache } from "containers/order/util";
import { getFromSession, setSession } from "utils/util";
import { dataReport } from "../../../../common/dataReport";

let haveLoad = false;
const sessionKey = "modelContext";

export const SelectModelContext = createContext({});

function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case 'setPaymentTimeType': {
      newState = {
        ...newState,
        paymentTimeType: value
      };
      break;
    }
    case "setSkuId": {
      newState = {
        ...newState,
        skuId: value
      };
      break;
    }
    case "setLastestOrder": {
      newState = {
        ...newState,
        lastestOrder: value
      };
      break;
    }
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
        phoneConditionStaticAnswer: getServerAnswerFormat(
          state.qualityList,
          value
        )
      };
      break;
    }
    // reset
    case "setBrand": {
      // 如果变更了brand
      if (value !== newState.brand) {
        newState = {
          ...newState,
          brand: value,
          skuId: "",
          phoneConditionStaticAnswer: [],
          modelInfo: {
            modelId: "",
            othersAttr: {}
          }
        };
      }
      break;
    }
    case "brandHahaAdd": {
      if (window && (window as any).phonePlaceOrder) {
        (window as any).phonePlaceOrder = (window as any).phonePlaceOrder + 1;
      } else {
        (window as any).phonePlaceOrder = 2;
      }
      break;
    }
    // reset
    case "setModelInfo": {
      // 如果变更了sku
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
      if (
        value &&
        value.modelId &&
        value.modelId !== newState.modelInfo.modelId
      ) {
        next.othersAttr = {};
      }

      newState = {
        ...newState,
        skuId: "",
        phoneConditionStaticAnswer: [],
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
        phonePlaceOrder: newState.phonePlaceOrder,
        modelInfo: newState.modelInfo,
        inquiryKey: value,
        phoneConditionStaticAnswer: newState.phoneConditionStaticAnswer
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
    // reset
    case "resetAllUserInputData": {
      (newState as any) = {
        ...newState,
        // brandList: [],
        skuId: "",
        modelInfo: {
          modelId: "",
          othersAttr: {}
        },
        // qualityList: [],
        phoneConditionStaticAnswer: [],
        productsList: [],
        userProductList: [],
        priceInfo: {},
        // categoryId: "",
        inquiryKey: "",
        brand: "",
        expressOption: null,
        needInsurance: false
      };
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
          phonePlaceOrder: (window as any).phonePlaceOrder || 1,
          inquiryKey: "",
          phoneConditionStaticAnswer: []
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
  if (
    state.brand ||
    type === "changeModelCache" ||
    type === "resetAllUserInputData" ||
    (newState.userProductList && newState.userProductList.length)
  ) {
    saveToCache(sessionKey, newState, [
      "modelInfo",
      "brand",
      "phonePlaceOrder",
      "categoryId",
      "userProductList",
      "needInsurance",
      "expressOption",
      "paymentTimeType",
      "inquiryKey",
      "phoneConditionStaticAnswer"
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
  getDownloadLabel: (key: any) => any;
  getLastestOrder: () => any;
  emailSubscribed: (s: string) => any;
  createEmail: (s: any) => any;
  getSkuId: () => any;
  setSkuIdGetPhoneInfo: (s: string) => any;
}

function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const actions: IContextActions = {
    setSkuIdGetPhoneInfo: promisify(async function(s: string) {
      // 临时拦截
      try {
        const res: any = await skuIdToPhoneInfo(s);
        if (res) {
          const { productId, brandId, bpvIds } = res;
          // brand
          dispatch({ type: "setBrand", value: brandId });
          // model
          dispatch({
            type: "setModelInfo",
            value: {
              modelId: productId
            }
          });
          // attr
          bpvIds.forEach(({ bpId, bpvId }: any) => {
            dispatch({
              type: "setModelInfo",
              value: {
                othersAttr: {
                  attrType: bpId,
                  attrValue: bpvId
                }
              }
            });
          });
          // sku
          dispatch({ type: "setSkuId", value: s });
        }
        return res;
      } catch (e) {
        console.error(e);
      }
    }),
    getSkuId: promisify(async function(emailInfo: any) {
      // 临时拦截
      const param = {
        productId: state.modelInfo.modelId,
        bpvIds: Object.keys(state.modelInfo.othersAttr).map(
          (key: any) => state.modelInfo.othersAttr[key]
        )
      };
      if (!param.productId || !param.bpvIds || param.bpvIds.length < 2) {
        return;
      }
      try {
        const res: any = await getSkuId({ ...param });
        if (res) {
          dispatch({ type: "setSkuId", value: res });
        }
        return res;
      } catch (e) {
        console.error(e);
      }
    }),
    createEmail: promisify(async function(emailInfo: any) {
      const defaultParam = {
        toEmail: "",
        nickName: "",
        subject: "",
        content: ""
      };
      const res: any = await createEmail({ ...defaultParam, ...emailInfo });
      return res;
    }),
    emailSubscribed: promisify(async function(email: string) {
      const res: any = await emailSubscribed({
        userEmail: email
      });
      return res;
    }),
    getLastestOrder: promisify(async function(label: string) {
      const res: any = await getLastestOrder();
      dispatch({ type: "setLastestOrder", value: res });
    }),
    getDownloadLabel: promisify(async function(label: string) {
      if (label) {
        // const res: any = await getDownloadLabel(label);
        // return res;
      }
    }),
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
        const info: any = await getinquirybykeys({ keys, paymentTimeType: state.paymentTimeType });
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
        phoneConditionStaticAnswer
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
            qpvIds: phoneConditionStaticAnswer
          }
        };
        console.warn("**getinquirybyids**");
        console.warn(JSON.stringify(inquiryInfoInfo));
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
        return e;
      }
    }),
    createOrderStart: promisify(async function(postData: any) {
      dataReport({ step: 12 });
      try {
        const res: any = await createOrderStart(postData);
        if (res) {
          // 调用成功后，cache用户邮箱，便于跳转
          const {
            needBox,
            shipDeadLine,
            groupOrderNo,
            userInfo,
            subOrders
          } = res;
          // 数据上报.
          try {
            dataReport({
              event: "transaction",
              ecommerce: {
                purchase: {
                  actionField: {
                    id: groupOrderNo,
                    affiliation: "Up Trade",
                    revenue: (window as any).netPayout
                  },
                  products: subOrders.map((item: any) => {
                    return {
                      sku: String(item.inquiryInfo.submitted.productId),
                      name: item.inquiryInfo.submitted.productName,
                      price: Number(item.inquiryInfo.submitted.amount),
                      brand: item.inquiryInfo.submitted.brandName,
                      quantity: 1,
                      dimension1: false, //buyer
                      dimension2: true //seller
                    };
                  })
                }
              }
            });
          } catch (e) {
            console.error(e);
          }
          const lableCode = subOrders[0].shippingInfo.sendInfo[0].lableCode;
          const { userEmail } = userInfo;
          if (groupOrderNo && userEmail) {
            setOrderCache({
              email: userEmail,
              orderId: groupOrderNo
            });
            setSession("orderInfo", {
              needBox,
              shipDeadLine,
              groupOrderNo,
              lableCode
            });
          }
          dispatch({ type: "resetAllUserInputData" });
          return res;
        }
      } catch (e) {
        console.error(e);
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
        imgUrl: require("../../img/common-phone.png"),
        // imgUrl: "https://sr.aihuishou.com/image/5ba3685de38bb01c30000054.png",
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
  actions.getSkuId = useCallback(actions.getSkuId, [state.modelInfo]);
  actions.getDownloadLabel = useCallback(actions.getDownloadLabel, []);
  actions.getLastestOrder = useCallback(actions.getLastestOrder, []);
  actions.emailSubscribed = useCallback(actions.emailSubscribed, []);
  actions.createEmail = useCallback(actions.createEmail, []);
  actions.getQuality = useCallback(actions.getQuality, [state.categoryId]);
  actions.getProductsList = useCallback(actions.getProductsList, [
    state.brand,
    state.categoryId
  ]);
  actions.getPriceInfo = useCallback(actions.getPriceInfo, [
    state.userProductList, state.paymentTimeType
  ]);
  // 虽然是主动调用，但是最好还是更新。需要补充更多的依赖
  actions.getInquiryByIds = useCallback(actions.getInquiryByIds, [
    state.brand,
    state.phoneConditionStaticAnswer,
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
  phonePlaceOrder: number; // 机子添加顺序指纹
  phoneConditionStaticAnswer: any[]; // 用户数据
  inquiryKey: string; // 1用户数据
  userProductList: any[]; // 用户数据2
  qualityList: any[]; // 热刷新
  brandList: []; // 热刷新
  priceInfo: any; // 热刷新
  productsList: []; // 热刷新
  expressOption: any; // 用户数据
  needInsurance: boolean; // 用户数据
  paymentTimeType: "NORMAL" | "DELAY";
  lastestOrder: any[]; // 用户数据
  skuId: string; // 用户数据
}

export interface ISelectModelContext extends IContextActions {
  selectModelContextValue: IContextState;
  selectModelContextDispatch: (action: IReducerAction) => void;
}

export function ModelContextProvider(props: any) {
  let initState: IContextState = {
    paymentTimeType: "DELAY",
    brandList: [],
    modelInfo: {
      modelId: "",
      othersAttr: {}
    },
    qualityList: [],
    phoneConditionStaticAnswer: [],
    productsList: [],
    userProductList: [],
    priceInfo: {},
    categoryId: "",
    inquiryKey: "",
    brand: "",
    phonePlaceOrder: 1,
    expressOption: null,
    needInsurance: false,
    lastestOrder: [],
    skuId: ""
  };
  if (!haveLoad) {
    // haveLoad = true;
    // JUST DEBUG
    haveLoad = haveLoad;
    const cache = getFromSession(sessionKey);
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
  useEffect(() => {
    action.getLastestOrder();
  }, [getLastestOrder]);
  useEffect(() => {
    action.getSkuId();
  }, [action.getSkuId]);
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
  setSession(key, cache);
}
