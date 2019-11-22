import React from "react";
import Tag from "../../../../../components/tag";
import { currencyTrans } from "../../../../../utils/util";

export function RenderHammerInfo(props: { hammerInfo: any }) {
  const { hammerInfo } = props;
  if (hammerInfo) {
    const { amount, paymentStatus } = hammerInfo;
    if (hammerInfo && paymentStatus) {
      return (
        <div className="content-tag-container">
          <li>
            <span>Bonus</span>
            <span>{currencyTrans(amount)}</span>
          </li>
          <Tag status={"success"}>{paymentStatus}</Tag>
        </div>
      );
    } else {
      return <div>no</div>;
    }
  } else {
    return (
      <li>
        <span>Bonus</span>
        <span>Pending</span>
      </li>
    );
  }
}
