import React, { useEffect, useContext, useReducer } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../context";
import ModalCard from "pages/sell/selectModelProcess/model/components/modalCard";
import { PhoneInfoWrapper } from "pages/sell/selectModelProcess/condition/components/phoneInfoWrapper";
import { findArrByKey } from "./util";
import { removeAllSpace } from "pages/sell/util";

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

  useEffect(() => {
    // 重定向为名称
    if (props.match && props.match.params && props.match.params.brandName) {
      const findTarget: any = brandList.find((item: any) => {
        return String(item.id) === String(props.match.params.brandName);
      });

      if (findTarget) {
        const next = props.route.path + "/" + findTarget.displayName;
        // const next = props.match.url + "/condition";
        document.title = `Sell My ${findTarget.displayName} | UpTradeit.com`;
        selectModelContextDispatch({
          type: "setBrand",
          value: findTarget.id
        });
        props.history.replace(removeAllSpace(next));
      } else {
        // TODO 新增需求 反向查找
        const findTarget2: any = brandList.find((item: any) => {
          if (
            item.displayName &&
            props.match.params.brandName &&
            String(props.match.params.brandName).toUpperCase() ===
              String(item.displayName).toUpperCase()
          ) {
            return true;
          } else {
            return false;
          }
        });
        if (findTarget2) {
          selectModelContextDispatch({
            type: "setBrand",
            value: findTarget2.id
          });
        }
      }
    }
  }, [brandList]);

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
