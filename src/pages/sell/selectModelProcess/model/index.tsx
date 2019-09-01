import React, { useEffect, useContext, useReducer } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../context";
import ModelCard from "@/pages/sell/selectModelProcess/model/components/modelCard";
import { PhoneInfoWrapper } from "@/pages/sell/selectModelProcess/condition/components/phoneInfoWrapper";
import { findArrByKey } from "./util";

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
  const { phoneInfoHandler, phoneInfoQuestion, phoneInfoAnswer, goNextPage } = props;
  const brandContext = useContext(SelectModelContext);

  const {
    selectModelContextValue,
    selectModelContextDispatch
  } = brandContext as ISelectModelContext;
  // 实际上，context也是modelInfo的二级消费者。这块有可能违背了single true原则
  const { modelInfo } = selectModelContextValue;

  function renderList() {
    const modelArr = findArrByKey(phoneInfoQuestion, "model");
    if (modelArr) {
      return modelArr.map((item: any) => {
        const { id } = item;
        const modelTarget = findArrByKey(phoneInfoAnswer, "model");
        const isSelect = Boolean(modelTarget && modelTarget[0] === id);
        return (
          <li className="brand-icon-container" key={id}>
            <ModelCard
              {...item}
              goNextPage={goNextPage}
              isSelect={isSelect}
              phoneInfoQuestion={phoneInfoQuestion}
              phoneInfoHandler={phoneInfoHandler}
              phoneInfoAnswer={phoneInfoAnswer}
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
