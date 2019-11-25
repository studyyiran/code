import React from "react";
import { currencyTrans } from "../../../../common/utils/util";
import "./index.less";

export function FiveCalcPrice(props: any) {
  const { buyPrice, skuPrice } = props;
  function calcPrice() {
    return Math.round(
      parseInt(String((100 * Number(skuPrice - buyPrice)) / Number(skuPrice)))
    );
  }
  return (
    <div className="off-price">
      You save
      <span className="discount">
        {currencyTrans(skuPrice - buyPrice)}({calcPrice()}%)
      </span>
    </div>
  );
}
