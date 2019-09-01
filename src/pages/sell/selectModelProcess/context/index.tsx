import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect
} from "react";
import { IReducerAction } from "@/interface/index.interface";
import { getBrandsByCid, getProductsList } from "../server/index.api";

let haveLoad = false;
const sessionKey = "modelContext";

export const SelectModelContext = createContext({});

function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case "setProductsList": {
      newState = {
        ...newState,
        productsList: value
      };
      break;
    }
    case "setPriceList": {
      newState = {
        ...newState,
        priceList: value
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
    case "updateUserProductList": {
      const newProduct = {
        brand: newState.brand,
        modelInfo: newState.modelInfo,
        stamp: newState.stamp
      };
      const productTargetIndex = newState.userProductList.findIndex(
        userProduct => {
          // 首先判定，当前的状态
          return userProduct.stamp === newState.stamp;
        }
      );
      // 强行变更数组。深比较
      newState.userProductList = newState.userProductList.concat([]);
      if (productTargetIndex !== -1) {
        // 更新
        newState.userProductList[productTargetIndex] = newProduct;
      } else {
        // 插入。并且更新当前的stamp
        const newStamp = String(Date.now());
        newProduct.stamp = newStamp;
        newState.stamp = newStamp;
        newState.userProductList.push(newProduct);
      }
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
          stamp: ""
        });
      } else if (value) {
        newState = { ...newState, ...value };
      }
      break;
    }
    default:
      newState = { ...newState };
  }
  console.log("reducer Get");
  console.log(action);
  console.log(newState);
  // justtest 避免覆盖
  if (state.brand || type === "changeModelCache") {
    saveToCache(sessionKey, newState, [
      "modelInfo",
      "brand",
      "categoryId",
      "userProductList",
      "stamp"
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
  getPriceList: () => void;
  getNameInfo: (
    idObj: any
  ) => {
    brandName: string;
    modelInfoName: {
      modelName: string;
      storageName: string;
      carrierName: string;
    };
  };
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
    getPriceList: promisify(async function() {
      if (state.userProductList && state.userProductList.length) {
        // const productsList = await getProductsList(
        //   state.brand,
        //   state.categoryId
        // );
        // console.log(productsList);
        dispatch({
          type: "setPriceList",
          value: state.userProductList.map((item, index) => ({
            price: index + 1
          }))
        });
      }
    }),
    getNameInfo: function(config: any) {
      const { brandList, productsList } = state;
      const { brandId, modelId, storageId, carrierId } = config;
      const nameConfig = {
        brandName: "",
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
  actions.getPriceList = useCallback(actions.getPriceList, [
    state.userProductList
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
  stamp: string; // 1用户数据
  userProductList: any[]; // 用户数据2
  brandList: []; // 热刷新
  priceList: any[]; // 热刷新
  productsList: []; // 热刷新
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
    priceList: [],
    categoryId: "",
    stamp: "",
    brand: ""
  };
  if (!haveLoad) {
    haveLoad = true;
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
    action.getPriceList();
  }, [action.getPriceList]);
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
