import React, { useEffect, useContext, useReducer } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../context";
import { HeaderTitle } from "@/components/headerTitle";
import { IReducerAction } from "@/interface/index.interface";
import ModelCard from "@/pages/sell/selectModelProcess/model/modelCard";
import { PhoneInfoWrapper } from "@/pages/sell/selectModelProcess/condition/components/phoneInfoWrapper";
import { findArrByKey } from "./util";

// interface IBrand {}
const attrConfig = {
  PRODUCT_ID: "productId",
  STORAGE_ID: "storageID",
  CARRIER_ID: "carrierID"
};

function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  const { attrKey, attrValue } = value;
  switch (type) {
    case "setValueByAttr": {
      const newState = { ...state };
      newState[attrKey] = attrValue;
      return newState;
    }
    default:
      return { ...state };
  }
}

interface IContextState {
  productId: string;
}

export default function ModelContainer(props: any) {
  return (
    <PhoneInfoWrapper
      renderComponent={(wrapperProps: any) => {
        const {
          phoneInfoHandler,
          phoneInfoQuestion,
          phoneInfoAnswer
        } = wrapperProps;
        return <Model {...props} {...wrapperProps} />;
      }}
    />
  );
}

function Model(props: any) {
  const { phoneInfoHandler, phoneInfoQuestion, phoneInfoAnswer } = props;
  const initState: IContextState = {
    productId: ""
  };
  const [modelState, modelDispatch] = useReducer(reducer, initState);
  const brandContext = useContext(SelectModelContext);

  const {
    selectModelContextValue,
    selectModelContextDispatch
  } = brandContext as ISelectModelContext;
  // 实际上，context也是modelInfo的二级消费者。这块有可能违背了single true原则
  const { modelInfo } = selectModelContextValue;
  function selectProductHandler(id: string) {
    modelDispatch({
      type: "setValueByAttr",
      value: { attrKey: attrConfig.PRODUCT_ID, attrValue: id }
    });
  }
  // canPost?
  useEffect(() => {
    if (
      modelState &&
      modelState[attrConfig.PRODUCT_ID] &&
      modelState[attrConfig.STORAGE_ID] &&
      modelState[attrConfig.CARRIER_ID]
    ) {
      selectModelContextDispatch({ type: "setModelInfo", value: modelState });
    }
  }, [modelState]);

  // canNext?
  useEffect(() => {
    if (modelInfo && modelState) {
      // props.goNextPage();
    }
  }, [modelInfo, modelState]);

  function renderList() {
    const modelArr = findArrByKey(phoneInfoQuestion, "model");
    if (modelArr) {
      return modelArr.map((item: any) => {
        const { id } = item;
        const modelTarget = findArrByKey(phoneInfoAnswer, "model");
        const isSelect = Boolean(
          modelTarget && modelTarget[0] === id
        );
        return (
          <li className="brand-icon-container" key={id}>
            <ModelCard
              {...item}
              isSelect={isSelect}
              phoneInfoAnswer={phoneInfoAnswer}
              phoneInfoQuestion={phoneInfoQuestion}
              phoneInfoHandler={phoneInfoHandler}
              selectProductHandler={selectProductHandler}
            />
          </li>
        );
      });
    }
  }
  return (
    <div className="page-select-model">
      <ul className="model-list">{renderList()}</ul>
    </div>
  );
}
