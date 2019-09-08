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
  function justGetAttrArr() {
    if (modelInfo && modelInfo.modelId) {
      // 1 搜索到
      const findProduct: {
        skuPricePropertyNames: any[];
      } = productsList.find(
        (product: any) => product.id === modelInfo.modelId
      ) || { skuPricePropertyNames: [] };
      if (
        findProduct &&
        findProduct.skuPricePropertyNames &&
        findProduct.skuPricePropertyNames.length
      ) {
        const attrObj = findProduct.skuPricePropertyNames[0];
        return attrObj.pricePropertyValues.map((attrValue: any) => {
          return { id: attrValue.id, name: attrValue.value };
        });
      }
    }
  }
  // 不可变类型 不然无法监听变化
  const answer1 = JSON.parse(JSON.stringify(staticPhoneInfoQuestion[0]));
  const answer2 = JSON.parse(JSON.stringify(staticPhoneInfo[0]));
  answer1.subQuestionArr = staticPhoneInfoQuestion[0].subQuestionArr.map(
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
        // case "storage": {
        //   // 根据xx计算得出
        //   return { ...item, questionDesc: justGetAttrArr() };
        //   break;
        // }
        // case "carrier": {
        //   // 缺少运营商的数据
        //   return { ...item, questionDesc: justGetAttrArr() };
        //   break;
        // }
        default:
          break;
      }
      return { ...item, questionDesc: [] };
    }
  );
  answer2.subAnswerArr = [
    {
      id: "manufacture",
      answer: [brand]
    },
    {
      id: "model",
      answer: [modelInfo.modelId]
    }
  ].concat(
    Object.keys(modelInfo.othersAttr).map((item: any) => {
      return {
        id: item,
        answer: [modelInfo.othersAttr[item]]
      };
    })
  );
  const {
    selectModelContextDispatch: selectModelDispatch
  } = selectModelContext as ISelectModelContext;
  function phoneInfoHandler(value: any) {
    const { answerId, answer } = value;
    switch (answerId) {
      case "manufacture":
        // 这边数据结构需要转换
        selectModelDispatch({ type: "setBrand", value: answer[0] });
        break;
      case "model":
        selectModelDispatch({
          type: "setModelInfo",
          value: { modelId: answer[0] }
        });
        break;
      default:
        selectModelDispatch({
          type: "setModelInfo",
          value: {
            othersAttr: {
              attrValue: answer[0],
              attrType: answerId
            }
          }
        });
    }
  }
  return renderComponent({
    ...props,
    phoneInfoHandler,
    phoneInfoQuestion: answer1,
    phoneInfoAnswer: answer2
  });
}
