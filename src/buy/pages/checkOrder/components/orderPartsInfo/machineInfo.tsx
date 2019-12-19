import * as React from "react";
import "./machineInfo.less";
import {
  currencyTrans,
  staticContentConfig
} from "../../../../common/utils/util";
import RouterLink from "../../../../common-modules/components/routerLink";

export default function OrderPartsInfo(props: any) {
  const { productInfo, tax, protection } = props;
  const {
    productDisplayName,
    buyPrice,
    bpvDispalyName
  } = productInfo;
  function calcTotal() {
    let totalPrice = 0;
    if (buyPrice) {
      totalPrice += Number(buyPrice);
    }
    if (tax) {
      totalPrice += Number(tax);
    }
    if (protection) {
      totalPrice += Number(protection);
    }
    return currencyTrans(totalPrice);
  }
  return (
    <div className="comp-order-machineInfo">
      <ul className="information-list">
        <li>
          <span>Model</span>
          <span>
            {productDisplayName}
            {/*- {bpvDispalyName.split(',').join(' ')}*/}
          </span>
        </li>
      </ul>
      <p className="total">
        <span>Price</span>
        <span>{calcTotal()}</span>
      </p>
    </div>
  );
}
