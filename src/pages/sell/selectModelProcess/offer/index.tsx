import React, { useEffect, useContext, useReducer } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../context";
import { HeaderTitle } from "@/components/headerTitle";
import { IReducerAction } from "@/interface/index.interface";
import ModelCard from "@/pages/sell/selectModelProcess/components/modelCard";

export default function Brand(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextValue,
    selectModelContextDispatch,
    getNameInfo
  } = selectModelContext as ISelectModelContext;
  const { priceList, userProductList } = selectModelContextValue;
  console.log(userProductList);
  function selectHandler(id: string) {
    console.log(id);
  }
  function renderList() {
    return userProductList
      .sort((a: any, b: any) => {
        return 1;
        // return a.order - b.order;
      })
      .map((item: any, index: number) => {
        const { brand, stamp, modelInfo } = item;
        const nameObj = getNameInfo({
          brandId: brand,
          ...modelInfo
        });
        return (
          <li className="brand-icon-container" key={stamp} onClick={() => selectHandler(stamp)}>
            <span>{nameObj.modelInfoName.modelName + nameObj.modelInfoName.storageName}</span>
            <span>{nameObj.modelInfoName.carrierName}</span>
            <span>{priceList[index] && priceList[index].price}</span>
          </li>
        );
      });
  }
  return (
    <div className="page-offer">
      <ul className="brand-list">{renderList()}</ul>
    </div>
  );
}
