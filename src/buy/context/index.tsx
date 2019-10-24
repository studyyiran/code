import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { promisify } from "buy/common/utils/util";
import ajax from "buy/common/utils/ajax";
import { useGetOriginData } from "../common/useHook/useGetOriginData";

export const GlobalSettingContext = createContext({});
export const StoreNameGlobalSetting = "GlobalSetting";

// action types
const reducerActionTypes = {
  setIsMobile: "setIsMobile",
  setCategoryId: "setCategoryId"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case reducerActionTypes.setIsMobile: {
      newState = {
        ...newState,
        isMobile: value
      };
      break;
    }
    case reducerActionTypes.setCategoryId: {
      newState = {
        ...newState,
        categoryId: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}

// state
interface IContextState {
  isMobile: boolean;
  categoryId: string;
}

// @provider
export function GlobalSettingContextProvider(props: any) {
  const initState: IContextState = {
    isMobile: false,
    categoryId: ""
  };
  const [state, dispatch, useClientRepair] = useGetOriginData(
    reducer,
    initState,
    StoreNameGlobalSetting
  );
  const action: IContextActions = useGetAction(state, dispatch);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        action.setIsMobile();
      },
      false
    );
    action.setIsMobile();
  }, []);
  useEffect(() => {
    const CategoryId = "1";
    dispatch({ type: "setCategoryId", value: CategoryId });
  }, []);
  const propsValue: IGlobalSettingContext = {
    ...useClientRepair,
    ...action,
    globalSettingContextValue: state,
    globalSettingContextDispatch: dispatch
  };
  return <GlobalSettingContext.Provider value={propsValue} {...props} />;
}

// @actions
interface IContextActions {
  setIsMobile: () => void;
  emailSubscribed: (email: string) => any;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const actions: IContextActions = {
    setIsMobile: promisify(async function(a: any, b: any) {
      const clientWidth = document.body.clientWidth;
      if (clientWidth <= 700) {
        dispatch({ type: reducerActionTypes.setIsMobile, value: true });
        document.body.classList.add("ismobile");
        (document.querySelector("body") as any).setAttribute("id", "ismobile");
      } else {
        dispatch({ type: reducerActionTypes.setIsMobile, value: false });
        document.body.classList.remove("ismobile");
        (document.querySelector("body") as any).setAttribute("id", "");
      }
    }),
    emailSubscribed: promisify(async function(a: any, b: any) {
      return ajax.post("/message_books/subscribed", { userEmail: a });
    })
  };
  actions.setIsMobile = useCallback(actions.setIsMobile, []);
  return actions;
}

// interface
export interface IGlobalSettingContext extends IContextActions {
  globalSettingContextValue: IContextState;
  globalSettingContextDispatch: (action: IReducerAction) => void;
}
