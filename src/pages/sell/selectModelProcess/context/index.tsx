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
  let newState;
  switch (type) {
    case "setProductsList": {
      newState = {
        ...state,
        productsList: value
      };
      break;
    }
    case "setCategoryId": {
      newState = {
        ...state,
        categoryId: value
      };
      break;
    }
    case "setBrandList": {
      newState = {
        ...state,
        brandList: value
      };
      break;
    }
    case "setBrand": {
      newState = {
        ...state,
        brand: value,
        modelInfo: {
          modelId: "",
          storageId: "",
          carrierId: ""
        }
      };
      break;
    }
    case "setModelInfo": {
      if (value.modelId !== state.modelInfo.modelId) {
        value.storageId = "";
        value.carrierId = "";
      }
      newState = {
        ...state,
        modelInfo: value
      };
      break;
    }
    default:
      newState = { ...state };
  }
  saveToCache(sessionKey, newState, ["modelInfo", "brand", "categoryId"]);
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
        console.log(productsList);
        dispatch({ type: "setProductsList", value: productsList });
      }
    })
  };
  actions.getBrandList = useCallback(actions.getBrandList, [state.categoryId]);
  actions.getProductsList = useCallback(actions.getProductsList, [
    state.brand,
    state.categoryId
  ]);
  return actions;
}

interface IModelInfo {
  modelId: string;
  storageId: string;
  carrierId: string;
}

interface IContextState {
  brandList: [];
  modelInfo: IModelInfo;
  productsList: [];
  categoryId: string;
  brand: string;
}

export interface ISelectModelContext extends IContextActions {
  selectModelContextValue: IContextState;
  dispatch: (action: IReducerAction) => void;
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
    categoryId: "",
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
  const propsValue: ISelectModelContext = {
    ...action,
    selectModelContextValue: state,
    dispatch
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
