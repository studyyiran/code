import * as React from "react";
import "./machineInfo.less";
import { currencyTrans, staticContentConfig } from "../../../common/utils/util";
import RouterLink from "../../../common-modules/components/routerLink";

export default function MachineInfo(props: any) {
  const { productInfo, tax, protection } = props;
  const {
    productDisplayName,
    buyLevel,
    buyPrice,
    buyProductCode,
    buyProductId,
    productPns
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
          <span>{productDisplayName}</span>
        </li>
        {productPns.map(({ ppnName, name }: any) => {
          return (
            <li key={ppnName}>
              <span>{ppnName}</span>
              <span>{name}</span>
            </li>
          );
        })}
        <li>
          <span>Condition</span>
          <span>{buyLevel}</span>
        </li>
        <li>
          <span>Product ID</span>
          <RouterLink to={`/detail/${buyProductId}`} className={"color-blue"}>
            #{buyProductCode}
          </RouterLink>
        </li>
      </ul>
      <p className="total">
        <span>Price</span>
        <span>{calcTotal()}</span>
      </p>
    </div>
  );
}
