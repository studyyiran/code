import React, { useEffect, useContext, useReducer } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../context";
import { HeaderTitle } from "@/components/headerTitle";
import { IReducerAction } from "@/interface/index.interface";
import ModelCard from "@/pages/sell/selectModelProcess/components/modelCard";

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

export default function Brand(props: any) {
  const initState: IContextState = {
    productId: ""
  };
  const [modelState, modelDispatch] = useReducer(reducer, initState);
  const brandContext = useContext(SelectModelContext);

  const {
    selectModelContextValue,
    dispatch
  } = brandContext as ISelectModelContext;
  const { modelInfo, productsList } = selectModelContextValue;
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
      dispatch({ type: "setModelInfo", value: modelState });
    }
  }, [modelState]);

  // canNext?
  useEffect(() => {
    if (modelInfo && modelState) {
      // props.goNextPage();
    }
  }, [modelInfo, modelState]);

  function renderList() {
    return productsList
      .sort((a: any, b: any) => {
        return 1;
        // return a.order - b.order;
      })
      .map((item: any) => {
        const { id } = item;
        return (
          <li className="brand-icon-container" key={id}>
            <ModelCard
              {...item}
              isSelect={modelState.productId === id}
              selectProductHandler={selectProductHandler}
            />
          </li>
        );
      });
  }
  return (
    <div className="page-select-brand">
      <HeaderTitle title={"Model"} />
      <ul className="brand-list">{renderList()}</ul>
    </div>
  );
}
