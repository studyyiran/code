import * as React from "react";
import "./machineInfo.less";
import { staticContentConfig } from "utils/util";

export default function MachineInfo(props: any) {
  return (
    <div className="comp-order-machineInfo">
      <ul className="information-list">
        <li>
          <span>Model</span>
          <span>{props.submitted.productName}</span>
        </li>
        {props.submitted.productPns.map(({ ppnName, name }: any) => {
          return (
            <li key={ppnName}>
              <span>{ppnName}</span>
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
      <p className="total">
        <span>Subtotal</span>
        <span>
          {staticContentConfig.priceUnit}
          {props.guaranteedPrice}
        </span>
      </p>
    </div>
  );
}
