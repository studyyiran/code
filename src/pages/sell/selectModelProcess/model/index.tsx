import React, { useEffect, useContext, useReducer } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../context";
import { HeaderTitle } from "@/components/headerTitle";
import { IReducerAction } from "@/interface/index.interface";

// interface IBrand {}
const attrConfig = {
  'PRODUCT_ID': 'productId',
  'ID': 'Id',
}

function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  const { attrName, attrValue } = value;
  switch (type) {
    case "setValueByAttr": {
      const newState = { ...state };
      newState[attrName] = attrValue;
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
  const { brandList, brand, productsList } = selectModelContextValue;
  function selectProductHandler(id: string) {
    modelDispatch({
      type: "setValueByAttr",
      value: { attrType: attrConfig.PRODUCT_ID, attrValue: id }
    });
  }
  // canPost?
  useEffect(() => {
    if (modelState && modelState[attrConfig.PRODUCT_ID] && modelState[attrConfig.ID]) {
      dispatch({ type: "setAllOfOneTime", value: modelState });
    }
  }, [modelState]);

  // canNext?
  useEffect(() => {
    // if (productId && productId === brand) {
    //   props.goNextPage();
    // }
  }, [brand, state.all]);

  function renderList() {
    return productsList
      .sort((a: any, b: any) => {
        return 1;
        // return a.order - b.order;
      })
      .map((item: any) => {
        const { name, id, imageUrl } = item;
        return (
          <li
            className="brand-icon-container"
            key={id}
            onClick={() => {
              selectProductHandler(id);
            }}
          >
            <img src={imageUrl} />
            <span>{name}</span>
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
