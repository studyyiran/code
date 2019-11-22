import Tag from "../../../../../components/tag";
import * as React from "react";
import { currencyTrans } from "../../../../../utils/util";
import "./index.less";

export function RenderReserveInfo(props: { reserveInfo: any }) {
  const { reserveInfo } = props;
  const { amount, paymentStatus } = reserveInfo;
  return (
    <div className="content-tag-container">
      <li>
        <span>Price Guarantee</span>
        <span>{currencyTrans(amount)}</span>
      </li>
      <Tag status={paymentStatus === "To Be Paid" ? "padding" : "success"}>
        {paymentStatus}
      </Tag>
    </div>
  );
}
