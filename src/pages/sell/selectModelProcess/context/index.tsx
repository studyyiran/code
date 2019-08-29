import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect
} from "react";
import { IReducerAction } from "@/interface/index.interface";
import { getBrandsByCid } from "../server/index.api";

export const SelectModelContext = createContext({});

function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  switch (type) {
    case "setCategoryId": {
      return {
        ...state,
        categoryId: value
      };
    }
    case "setBrandList": {
      return {
        ...state,
        brandList: value
      };
    }
    case "setBrand": {
      return {
        ...state,
        brand: value
      };
    }
    default:
      return { ...state };
  }
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
}

function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const actions: IContextActions = {
    getBrandList: promisify(async function() {
      if (state.categoryId) {
        const brandList = await getBrandsByCid(state.categoryId);
        console.log(brandList);
        dispatch({ type: "setBrandList", value: brandList });
      }
    })
  };
  actions.getBrandList = useCallback(actions.getBrandList, [state.categoryId]);
  return actions;
}

interface IContextState {
  brandList: [];
  categoryId: string;
  brand: string;
}

export interface ISelectModelContext extends IContextActions {
  selectModelContextValue: IContextState;
  dispatch: (action: IReducerAction) => void;
}

export function ModelContextProvider(props: any) {
  const initState: IContextState = {
    brandList: [],
    categoryId: "",
    brand: ""
  };
  const [state, dispatch] = useReducer(reducer, initState);
  const action: IContextActions = useGetAction(state, dispatch);
  useEffect(() => {
    action.getBrandList();
  }, [action.getBrandList]);
  const propsValue: ISelectModelContext = {
    ...action,
    selectModelContextValue: state,
    dispatch
  };
  return <SelectModelContext.Provider value={propsValue} {...props} />;
}
