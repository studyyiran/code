import React, { useContext } from "react";
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
  return (
    <div className="breadcrumb">
      <ul className="brand-list">
        <li>im router ^ ^{nameObj.modelInfoName.modelName}im router ^ ^</li>
      </ul>
    </div>
  );
}
