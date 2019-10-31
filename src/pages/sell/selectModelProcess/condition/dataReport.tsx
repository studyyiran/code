import React, { createContext, useReducer, useCallback, useRef } from "react";
import { getServerAnswerFormat } from "./util";
import { IReducerAction } from "../../../../interface/index.interface";
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
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IDataReportConditionActions = {
    dataReport: function(params: {
      step: string;
      phoneConditionQuestion: any;
      phoneConditionAnswer: any;
    }) {
      const { step, phoneConditionQuestion, phoneConditionAnswer } = params;
      console.log(params.step);
      console.log(params.phoneConditionQuestion);
      console.log(params.phoneConditionAnswer);
      const result = getServerAnswerFormat(
        phoneConditionQuestion,
        phoneConditionAnswer
      );
      console.log(result);
    }
  };
  actions.dataReport = useCallback(actions.dataReport, []);
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
