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
import { dataReport } from "../../../../common/dataReport";
import { safeEqual } from "../../../../utils/util";
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
    brand,
    modelInfo,
    productsList,
    brandList
  } = selectModelContextValue;
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IDataReportConditionActions = {
    dataReport: function(params: { step: string; phoneConditionAnswer: any }) {
      try {
        const { step, phoneConditionAnswer } = params;
        if (step === "aboutYourPhone") {
          // 问题1
          let dataReportJson = {
            step: "1",
            manufacturer: "",
            model: ""
          };
          // 获取brand名称
          const targetBrand: any = brandList.find((item: any) =>
            safeEqual(brand, item.id)
          );
          if (targetBrand) {
            dataReportJson.manufacturer = targetBrand.displayName;
          }
          // 获取
          let { modelId, othersAttr } = modelInfo;
          othersAttr = Object.keys(othersAttr).map(item => othersAttr[item]);
          // 获取机型名称
          const productInfo: any = productsList.find((item: any) =>
            safeEqual(item.id, modelId)
          );
          if (productInfo) {
            const { displayName, list } = productInfo;
            list.forEach((item: any) => {
              const { displayName, propertyValue } = item;
              const targetEleValue = propertyValue.find(({ id }: any) => {
                return othersAttr.find((eleValue: any) =>
                  safeEqual(id, eleValue)
                );
              });
              if (targetEleValue && displayName) {
                dataReportJson[displayName] = targetEleValue.displayName;
              }
            });
            dataReportJson.model = displayName;
          }
          dataReport(dataReportJson);
        } else {
          const uselessResult = getServerAnswerFormat(
            phoneConditionQuestion,
            phoneConditionAnswer
          );
          let resultWithOutUseless = phoneConditionAnswer.map((item1: any) => {
            return {
              ...item1,
              subAnswerArr: item1.subAnswerArr.filter((item2: any) => {
                return (
                  item2.answer &&
                  item2.answer[0] &&
                  uselessResult.find((item3: any) =>
                    safeEqual(item2.answer[0].optionId, item3.id)
                  )
                );
              })
            };
          });

          const finalResultArr = resultWithOutUseless.map(
            (item1: any, index1: number) => {
              return {
                ...item1,
                subAnswerArr: item1.subAnswerArr.map(
                  (item2: any, index2: number) => {
                    return {
                      ...item2,
                      title:
                        phoneConditionQuestion[index1].subQuestionArr[index2]
                          .title,
                      answer: item2.answer.map((item3: any, index3: number) => {
                        return {
                          ...item3,
                          titleKey: (phoneConditionQuestion[
                            index1
                          ].subQuestionArr[index2].questionDesc.find(
                            (item4: any) =>
                              safeEqual(item4.optionId, item3.optionId)
                          ) as any).optionContent
                        };
                      })
                    };
                  }
                )
              };
            }
          );

          // 先用target对应上关系.
          if (finalResultArr && step) {
            const tagAndId = step.split("parent");
            const targetId = tagAndId[1];
            let dataReportJson = {
              step: Number(targetId) + 1
            };
            const finalResultAnswer = finalResultArr.find((item: any) =>
              safeEqual(item.id, step)
            );
            const finalResultQuestion = phoneConditionQuestion.find(
              (item1: any) => safeEqual(item1.id, step)
            );
            // 结果是题目映射后的对应.
            if (finalResultQuestion && finalResultQuestion.subQuestionArr) {
              finalResultQuestion.subQuestionArr.forEach(
                (item2: any, index2: number) => {
                  const title = item2.title.split(" ").join("");
                  if (finalResultAnswer.subAnswerArr[index2]) {
                    dataReportJson[title] = finalResultAnswer.subAnswerArr[
                      index2
                    ].answer
                      .map(
                        (item4: any) => item4.optionContent || item4.titleKey
                      )
                      .join(",");
                  } else {
                    dataReportJson[title] = "";
                  }
                }
              );
            }
            dataReport(dataReportJson);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  actions.dataReport = useCallback(actions.dataReport, [
    phoneConditionQuestion,
    productsList,
    brandList
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
