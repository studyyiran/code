import React, { useEffect, useContext, useReducer } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../context";

export default function Brand(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextValue,
    selectModelContextDispatch,
    getNameInfo
  } = selectModelContext as ISelectModelContext;
  const { priceList, userProductList, stamp } = selectModelContextValue;
  console.log(userProductList);
  function selectHandler(select: any) {
    console.log(select)
    // 当前有选择
    if (stamp) {
      selectModelContextDispatch({ type: "changeModelCache", value: "reset" });
    } else {
      selectModelContextDispatch({ type: "changeModelCache", value: select });
    }
  }
  function renderList() {
    return userProductList
      .sort((a: any, b: any) => {
        return 1;
        // return a.order - b.order;
      })
      .map((item: any, index: number) => {
        const { brand, stamp: productStamp, modelInfo } = item;
        const nameObj = getNameInfo({
          brandId: brand,
          ...modelInfo
        });
        return (
          <li
            className="brand-icon-container"
            key={productStamp}
            onClick={() => selectHandler(item)}
          >
            <span>
              {nameObj.modelInfoName.modelName +
                nameObj.modelInfoName.storageName}
            </span>
            <span>{nameObj.modelInfoName.carrierName}</span>
            <span>{priceList[index] && priceList[index].price}</span>
          </li>
        );
      });
  }
  function addNewHandler() {
    selectModelContextDispatch({ type: "changeModelCache", value: "reset" });
    props.history.push(props.match.url);
  }
  return (
    <div className="page-offer">
      <ul className="brand-list">{renderList()}</ul>
      <div onClick={addNewHandler}>add another</div>
    </div>
  );
}
