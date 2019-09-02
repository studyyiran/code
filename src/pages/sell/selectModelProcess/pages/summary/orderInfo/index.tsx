import {
  SelectModelContext,
  ISelectModelContext
} from "../../../../selectModelProcess/context";
import React, { useContext } from "react";

const priceUnit = "$";

export default function OrderInfo() {
  const selectModelContext = useContext(SelectModelContext);
  const { selectModelContextValue } = selectModelContext as ISelectModelContext;
  const { priceInfo, needInsurance, expressOption } = selectModelContextValue;
  const { resultList, guaranteedPayout, shippingInsurance } = priceInfo;
  if (resultList && resultList.length) {
    return (
      <div className="com-order-info">
        {resultList.map((product: any) => {
          const { productName, bpvIds, inquiryKey, subTotal } = product;
          return (
            <ul key={inquiryKey} className="block">
              <li>
                <h3>Model</h3>
                <span>{productName + bpvIds[0].name}</span>
              </li>
              <li>
                <h3>Carrier</h3>
                <span>{bpvIds[1].name}</span>
              </li>
              <li>
                <h3>Subtotal</h3>
                <span>
                  {priceUnit}
                  {subTotal}
                </span>
              </li>
            </ul>
          );
        })}
        <ul>
          <li>
            <h3>guaranteedPayout</h3>
            <span>
              {priceUnit}
              {guaranteedPayout}
            </span>
          </li>
          {expressOption ? (
            <li>
              <h3>expressOption</h3>
              <span>
                {priceUnit}
                {expressOption.fee}
              </span>
            </li>
          ) : null}
          {needInsurance ? (
            <li>
              <h3>shippingInsurance</h3>
              <span>
                {priceUnit}
                {shippingInsurance}
              </span>
            </li>
          ) : null}
        </ul>
        <div>
          <h3>New Payout</h3>
          <span>{}</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
