import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useRef
} from "react";
import {
  IReducerAction,
  ISsrFileStore
} from "buy/common/interface/index.interface";
import { promisify } from "buy/common/utils/util";
import useReducerMiddleware from "../../common/useHook/useReducerMiddleware";

export const OriginDataContext = createContext({});
// store name
const storeName = "OriginData";

export interface IOriginData {
  storeName: string;
  storeData: any;
}
// @store state
interface IContextState {
  originData: ISsrFileStore;
  needClientRepair: boolean;
}

// @context value(其实还缺少actions)
export interface IOriginDataContext extends IOriginDataActions {
  originDataContextValue: IContextState;
  originDataContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function OriginDataContextProvider(props: any) {
  // 注入初始值到originData上
  const initState: IContextState = {
    originData: props.originData || { storeList: [], ssrConfig: {} },
    needClientRepair: false // 是否开启回补逻辑,改为true用于本地客户端开发
  };
  const [state, dispatch] = useReducer(
    useReducerMiddleware(reducer),
    initState
  );
  const action: IOriginDataActions = useGetAction(state, dispatch);
  // 监听变化
  useEffect(() => {
    action.getOriginData();
  }, [action.getOriginData]);

  const propsValue: IOriginDataContext = {
    ...action,
    originDataContextValue: state,
    originDataContextDispatch: dispatch
  };
  return <OriginDataContext.Provider value={propsValue} {...props} />;
}

// @store actions
export interface IOriginDataActions {
  getOriginData: () => void;
  setNeedClientRepair: (need: boolean) => any;
}

// store actions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IOriginDataActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IOriginDataActions = {
    getOriginData: promisify(async function() {}),
    setNeedClientRepair: function(need: boolean) {
      dispatch({
        type: originDataReducerTypes.setNeedClientRepair,
        value: need
      });
    }
  };
  actions.setNeedClientRepair = useCallback(actions.setNeedClientRepair, []);
  actions.getOriginData = useCallback(actions.getOriginData, []);
  return actions;
}

// @Reducer types
export const originDataReducerTypes = {
  setOriginData: "setOriginData",
  setNeedClientRepair: "setNeedClientRepair"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case originDataReducerTypes.setNeedClientRepair: {
      newState = {
        ...newState,
        needClientRepair: value
      };
      break;
    }
    case originDataReducerTypes.setOriginData: {
      newState = {
        ...newState,
        originData: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
