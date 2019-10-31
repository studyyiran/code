import React, {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useContext
} from "react";
import { getServerAnswerFormat } from "./util";
import { IReducerAction } from "../../../../interface/index.interface";
import { ISelectModelContext, SelectModelContext } from "../context";
export const DataReportConditionContext = createContext({});
// store name
export const DataReportCondition = "DataReportCondition";

interface ICheckOrderDetail {}
// store state
interface IContextState {}

// interface(其实还缺少actions)
export interface IDataReportConditionContext
  extends IDataReportConditionActions {
  dataReportConditionContextValue: IContextState;
  dataReportConditionContextDispatch: (action: IReducerAction) => void;
}

// store provider
export function DataReportConditionContextProvider(props: any) {
  const initState: IContextState = {};
  const [state, dispatch] = useReducer(reducer, initState);
  const action: IDataReportConditionActions = useGetAction(state, dispatch);

  const propsValue: IDataReportConditionContext = {
    ...action,
    dataReportConditionContextValue: state,
    dataReportConditionContextDispatch: dispatch
  };
  return <DataReportConditionContext.Provider value={propsValue} {...props} />;
}

// @actions
export interface IDataReportConditionActions {
  dataReport: (data: any) => void;
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IDataReportConditionActions {
  const selectModelContext = useContext(SelectModelContext);
  const { selectModelContextValue } = selectModelContext as ISelectModelContext;

  const {
    qualityList: phoneConditionQuestion,
    phoneConditionStaticAnswer,
    brand,
    modelInfo
  } = selectModelContextValue;
  console.log("!!!!!!");
  console.log(phoneConditionQuestion);
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IDataReportConditionActions = {
    dataReport: function(params: { step: string; phoneConditionAnswer: any }) {
      const { step, phoneConditionAnswer } = params;
      console.log(step);
      if (step === "aboutYourPhone") {
        // 问题1
        console.log(brand);
        console.log(modelInfo);
      } else {
        const hehe = step.split("parent");
        if (hehe && hehe[1]) {
          const target = hehe[1];
          console.log(target);
          console.log(phoneConditionAnswer);
          console.log(phoneConditionQuestion);
          const result = getServerAnswerFormat(
            phoneConditionQuestion,
            phoneConditionAnswer
          );
          console.log(result);
        }
      }
    }
  };
  actions.dataReport = useCallback(actions.dataReport, [
    phoneConditionQuestion
  ]);
  return actions;
}

// action types
export const dataReportConditionReducerTypes = {
  dataReport: "dataReport"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case dataReportConditionReducerTypes.dataReport: {
      newState = {
        ...newState,
        checkOrderDetail: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
