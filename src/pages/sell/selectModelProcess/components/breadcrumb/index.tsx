import React, { useContext } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../../context";

export default function Breadcrumb(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextValue,
    getNameInfo
  } = selectModelContext as ISelectModelContext;
  const { brand, userProductList, modelInfo } = selectModelContextValue;
  const nameObj = getNameInfo({
    brandId: brand,
    ...modelInfo
  });
  function renderName() {
    let name = "";
    function append(origin: string, value: string) {
      if (value) {
        return origin + value;
      } else {
        return origin;
      }
    }
    name = append(name, nameObj.modelInfoName.modelName);
    name = append(name, nameObj.modelInfoName.storageName);
    name = append(name, nameObj.modelInfoName.carrierName);
    return name;
  }
  function clickHandler(e: any) {
    const selectTag = e.target.getAttribute("data-step");
    if (nameObj.brandName) {
      props.goNextPage(selectTag)
    }
  }
  return (
    <div className="breadcrumb">
      <ul className="breadcrumb-list" onClick={clickHandler}>
        <li data-step={"firstStep"}>{nameObj.brandName || "Manufacture"} > </li>
        <li data-step={"brand"}>
          {nameObj.modelInfoName.modelName ? renderName() : "Model"} >
        </li>
        <li data-step={"model"}>Phone Conditions > </li>
        <li data-step={"condition"}>Offer Details > </li>
        {/*<li data-step={"offer"}>Offer Details > </li>*/}
      </ul>
    </div>
  );
}
