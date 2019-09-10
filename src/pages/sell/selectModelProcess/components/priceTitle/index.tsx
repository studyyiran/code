import React, { useContext } from "react";
import "./index.less";
import {
  ISelectModelContext,
  SelectModelContext
} from "@/pages/sell/selectModelProcess/context";

export default function PriceTitle(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const { selectModelContextValue } = selectModelContext as ISelectModelContext;
  const { priceInfo } = selectModelContextValue;
  const { children } = props;
  return (
    <div className="comp-price-title">
      {priceInfo ? (
        <h2>
          Total Payout{" "}
          <span className="price">${priceInfo.guaranteedPayout}</span>
        </h2>
      ) : null}
      <p>{children}</p>
    </div>
  );
}
