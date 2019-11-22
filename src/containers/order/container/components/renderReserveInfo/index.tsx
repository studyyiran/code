import Tag from "../../../../../components/tag";
import * as React from "react";
import { currencyTrans } from "../../../../../utils/util";
import "./index.less";

// 这是新增模块.描述了广义上的退款信息我觉得?但是他这边兼容了
// 正常价格和revise价格两种模式.并且通过isDiff表示

export function RenderReserveInfo(props: {
  reserveInfo: any;
  isDifferent?: boolean;
}) {
  // isDifferent随便拽出来的一个变量 来决定是否显示Revised
  const { reserveInfo, isDifferent } = props;
  if (reserveInfo) {
    const { amount, paymentStatus } = reserveInfo;
    return (
      <div className="content-tag-container">
        <li>
          <span>{isDifferent ? "Revised" : ""}Price Guarantee</span>
          <span>{currencyTrans(amount)}</span>
        </li>
        <Tag status={paymentStatus === "To Be Paid" ? "padding" : "success"}>
          {paymentStatus}
        </Tag>
      </div>
    );
  } else {
    return null;
  }
}
