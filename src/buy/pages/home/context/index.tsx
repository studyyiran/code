import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useRef
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { getBuyProductList, getSellProductList } from "../server";
import { promisify } from "buy/common/utils/util";
import { IContextValue } from "../../../common/type";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { useGetOriginData } from "../../../common/useHook/useGetOriginData";

export const OurHomeContext = createContext({});
// store name
export const OurHomeStoreName = "OurHome";
// store state
interface IContextState {
  buyProductList: any[];
  sellProductList: any[];
  sellListTitle: any[];
  buyListTitle: any[];
}

// interface(其实还缺少actions)
export interface IOurHomeContext extends IOurHomeActions, IContextValue {
  ourHomeContextValue: IContextState;
  ourHomeContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function OurHomeContextProvider(props: any) {
  const initState: IContextState = {
    buyProductList: [],
    sellProductList: [],
    sellListTitle: [],
    buyListTitle: []
  };
  const [state, dispatch, useClientRepair] = useGetOriginData(
    useReducerMiddleware(reducer),
    initState,
    OurHomeStoreName
  );
  const action: IOurHomeActions = useGetAction(state, dispatch);
  // 监听变化
  // useEffect(() => {
  //   action.getOurHome();
  // }, [action.getOurHome]);

  const propsValue: IOurHomeContext = {
    useClientRepair,
    ...action,
    ourHomeContextValue: state,
    ourHomeContextDispatch: dispatch
  };
  return <OurHomeContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IOurHomeActions {
  getBuyProductList: () => void;
  getSellProductList: () => void;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IOurHomeActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IOurHomeActions = {
    getBuyProductList: promisify(async function(data: any) {
      const res: any = await getBuyProductList(data);
      dispatch({
        type: ourHomeReducerTypes.setBuyProductList,
        value: res
      });
    }),
    getSellProductList: promisify(async function(data: any) {
      const res: any = await getSellProductList(data);
      dispatch({
        type: ourHomeReducerTypes.setSellProductList,
        value: res
      });
    })
  };
  actions.getBuyProductList = useCallback(actions.getBuyProductList, []);
  actions.getSellProductList = useCallback(actions.getSellProductList, []);
  return actions;
}

// action types
export const ourHomeReducerTypes = {
  setBuyProductList: "setBuyProductList",
  setSellProductList: "setSellProductList"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case ourHomeReducerTypes.setBuyProductList: {
      newState = {
        ...newState,
        buyProductList: value
      };
      break;
    }
    case ourHomeReducerTypes.setSellProductList: {
      newState = {
        ...newState,
        sellProductList: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
