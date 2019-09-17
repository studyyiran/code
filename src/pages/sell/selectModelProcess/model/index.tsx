import React, { useEffect, useContext, useReducer } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../context";
import ModalCard from "@/pages/sell/selectModelProcess/model/components/modalCard";
import { PhoneInfoWrapper } from "@/pages/sell/selectModelProcess/condition/components/phoneInfoWrapper";
import { findArrByKey } from "./util";
import { removeAllSpace } from "@/pages/sell/util";

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
  const {
    phoneInfoHandler,
    phoneInfoQuestion,
    phoneInfoAnswer,
    goNextPage
  } = props;
  const selectModelContext = useContext(SelectModelContext);

  const {
    selectModelContextValue,
    selectModelContextDispatch
  } = selectModelContext as ISelectModelContext;
  // 实际上，context也是modelInfo的二级消费者。这块有可能违背了single true原则
  const { modelInfo, brandList, skuId } = selectModelContextValue;
  // 重定向为名称
  if (props.match && props.match.params && props.match.params.brandName) {
    const findTarget: any = brandList.find((item: any) => {
      return String(item.id) === String(props.match.params.brandName);
    });
    if (findTarget) {
      const next = props.route.path + "/" + findTarget.displayName;
      // const next = props.match.url + "/condition";
      props.history.replace(removeAllSpace(next));
    }
  }

  function renderList() {
    const modelArr = findArrByKey(phoneInfoQuestion, "model");
    if (modelArr) {
      return modelArr.map((item: any) => {
        const { id } = item;
        const modelTarget = findArrByKey(phoneInfoAnswer, "model");
        const isSelect = Boolean(modelTarget && modelTarget[0] === id);
        return (
          <li className="brand-icon-container" key={id}>
            <ModalCard
              {...item}
              modelInfo={modelInfo}
              goNextPage={goNextPage}
              isSelect={isSelect}
              phoneInfoQuestion={phoneInfoQuestion}
              phoneInfoHandler={phoneInfoHandler}
              phoneInfoAnswer={phoneInfoAnswer}
              skuId={skuId}
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
