import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useRef
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {
  getBuyProductList,
  getSellBrand,
  getSellProductList,
  getBuyBrand
} from "../server";
import { callBackWhenPassAllFunc, promisify } from "buy/common/utils/util";
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
  useEffect(() => {
    callBackWhenPassAllFunc(
      [() => !state.sellListTitle || !state.sellListTitle.length],
      () => {
        action.getSellTitleList().then((res: any) => {
          if (res && res[0] && res[0].seqNo && res[0].brandId) {
            action.getSellProductList({
              seq: res[0].seqNo,
              brandId: res[0].brandId
            });
          }
        });
      }
    );
  }, []);

  useEffect(() => {
    callBackWhenPassAllFunc(
      [() => !state.buyListTitle || !state.buyListTitle.length],
      () => {
        action.getBuyTitleList().then((res: any) => {
          if (res && res[0] && res[0].seqNo && res[0].brandId) {
            action.getBuyProductList({
              seq: res[0].seqNo,
              brandId: res[0].brandId
            });
          }
        });
      }
    );
  }, []);

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
  getBuyProductList: (data: any) => void;
  getSellProductList: (data: any) => void;
  getSellTitleList: () => any;
  getBuyTitleList: () => any;
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
    getBuyTitleList: promisify(async function(data: any) {
      const res: any = await getBuyBrand();
      dispatch({
        type: ourHomeReducerTypes.setBuyListTitle,
        value: res
      });
      return res;
    }),
    getSellTitleList: promisify(async function(data: any) {
      const res: any = await getSellBrand();
      dispatch({
        type: ourHomeReducerTypes.setSellListTitle,
        value: res
      });
      return res;
    }),
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
  setSellProductList: "setSellProductList",
  setSellListTitle: "setSellListTitle",
  setBuyListTitle: "setBuyListTitle"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case ourHomeReducerTypes.setBuyListTitle: {
      newState = {
        ...newState,
        buyListTitle: (value || []).map(
          ({ brandId, brandDisplayName, seqNo }: any) => {
            return {
              seqNo,
              id: brandId,
              displayName: brandDisplayName
            };
          }
        )
      };
      break;
    }
    case ourHomeReducerTypes.setSellListTitle: {
      newState = {
        ...newState,
        sellListTitle: (value || []).map(
          ({ brandId, brandDisplayName, seqNo }: any) => {
            return {
              seqNo,
              id: brandId,
              displayName: brandDisplayName
            };
          }
        )
      };
      break;
    }
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
