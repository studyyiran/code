import { constValue } from "../../../../common/constValue";
import React from "react";
import { currencyTrans } from "../../../../common/utils/util";
import "./index.less";

export function FivePrice(props: { price: any }) {
  const { price } = props;
  if (price) {
    const hehe = [Math.round(constValue.fiveActValue * Number(price)), Number(price)];
    return (
      <div className="five-inner-wrapper">
        <span className="act-origin-price">{currencyTrans(hehe[0])}</span>
        <span className="act-buy-price">{currencyTrans(hehe[1])}</span>
      </div>
    );
  } else {
    return null;
  }
}
