import * as React from "react";
import "./machineInfo.less";
import { currencyTrans, staticContentConfig } from "../../../common/utils/util";

export default function MachineInfo(props: any) {
  const { productInfo } = props;
  const { productDisplayName, buyLevel, buyPrice, buyProductCode } = productInfo;
  return (
    <div className="comp-order-machineInfo">
      <ul className="information-list">
        <li>
          <span>Model</span>
          <span>{productDisplayName}</span>
        </li>
        {/*{props.submitted.productPns.map(({ ppnName, name }: any) => {*/}
        {/*  return (*/}
        {/*    <li key={ppnName}>*/}
        {/*      <span>{ppnName}</span>*/}
        {/*      <span>{name}</span>*/}
        {/*    </li>*/}
        {/*  );*/}
        {/*})}*/}
        <li>
          <span>Condition</span>
          <span>{buyLevel}</span>
        </li>
        <li>
          <span>Product Id</span>
          <span>{buyProductCode}</span>
        </li>
      </ul>
      <p className="total">
        <span>Subtotal</span>
        <span>{currencyTrans(buyPrice)}</span>
      </p>
    </div>
  );
}
