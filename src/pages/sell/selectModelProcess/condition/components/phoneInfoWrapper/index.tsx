import React, { useContext } from "react";
import { staticPhoneInfoQuestion, staticPhoneInfo } from "../../questionConfig";
import { SelectModelContext, ISelectModelContext } from "../../../context";
// 这个hoc负责注入，从全局获取的，关于xxxx的数据。
// dispatch修改数据，问题数据。答案数据？
// 我先把这部分逻辑 和这个condition解耦。至于服用，再说了。
/*
这是一个renderProps（类似于HOC）抽象通用逻辑的方法
 */
export function PhoneInfoWrapper(props: any) {
  const { renderComponent } = props;
  const selectModelContext = useContext(SelectModelContext);
  const { selectModelContextValue } = selectModelContext as ISelectModelContext;
  const { brandList, brand, productsList, modelInfo } = selectModelContextValue;
  staticPhoneInfoQuestion[0].subQuestionArr = staticPhoneInfoQuestion[0].subQuestionArr.map(
    item => {
      const { id } = item;
      switch (id) {
        case "manufacture": {
          return { ...item, questionDesc: brandList };
          break;
        }
        case "model": {
          return { ...item, questionDesc: productsList };
          break;
        }
        default:
          break;
      }
      return { ...item, questionDesc: brandList };
    }
  );
  staticPhoneInfo[0].subAnswerArr = staticPhoneInfo[0].subAnswerArr.map(
    item => {
      const { id } = item;
      switch (id) {
        case "manufacture": {
          return { ...item, answer: [brand] };
          break;
        }
        case "model": {
          return { ...item, answer: [modelInfo.modelId] };
          break;
        }
        default:
          break;
      }
      return { ...item, answer: [brand] };
    }
  );
  const {
    dispatch: selectModelDispatch
  } = selectModelContext as ISelectModelContext;
  function phoneInfoHandler(value: any) {
    const { answerId, answer } = value;
    switch (answerId) {
      case "manufacture":
        // 这边数据结构需要转换
        selectModelDispatch({ type: "setBrand", value: answer[0] });
        break;
      case "model":
        // 这边数据结构需要转换
        selectModelDispatch({
          type: "setModelInfo",
          value: { ...modelInfo, modelId: answer[0] }
        });
        break;
    }
  }
  return renderComponent({
    ...props,
    phoneInfoHandler,
    phoneInfoQuestion: staticPhoneInfoQuestion[0],
    phoneInfoAnswer: staticPhoneInfo[0]
  });
}
