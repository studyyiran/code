import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useRef
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { promisify } from "buy/common/utils/util";
import useReducerMiddleware from "../../common/useHook/useReducerMiddleware";

export const OriginDataContext = createContext({});
// store name
const storeName = "OriginData";
// @store state
interface IContextState {
  originData: any;
  needClientRun: boolean;
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
    originData: { ...props.originData },
    needClientRun: false // 是否开启回补逻辑
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
  setNeedClientRun: () => any;
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
    setNeedClientRun: function() {
      dispatch({
        type: originDataReducerTypes.setNeedClientRun,
        value: false
      });
    }
  };
  actions.setNeedClientRun = useCallback(actions.setNeedClientRun, []);
  actions.getOriginData = useCallback(actions.getOriginData, []);
  return actions;
}

// @Reducer types
export const originDataReducerTypes = {
  setOriginData: "setOriginData",
  setNeedClientRun: "setNeedClientRun"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case originDataReducerTypes.setNeedClientRun: {
      newState = {
        ...newState,
        needClientRun: value
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