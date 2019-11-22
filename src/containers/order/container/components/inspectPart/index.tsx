import * as React from "react";
import "./index.less";
import "../../common.less";
import Tag from "components/tag";
import CheckInspectDiff from "containers/order/container/components/checkInspectDiff";
import {RenderReserveInfo} from "../renderReserveInfo";
import {ShowFeePrice} from "../showFeePrice";
import {RenderHammerInfo} from "../renderHammerInfo";
const priceUnit = "$";

// 这个模块渲染质检.
export default function InspectPart(props: any) {
  const { inquiryInfo, phoneConditionQuestion, paymentInfo } = props;
  const { isDifferent, price, differentReason } = inquiryInfo;
  return (
    <div className="comp-inspect-part">
      {/*将质检差异入口修改*/}
      <section className="line-with-title line-with-title-with-inspection">
        <div className="content-tag-container">
          <h3>Inspection Result</h3>
          <Tag status={isDifferent ? "fail" : "success"}>
            {differentReason || "Matched"}
          </Tag>
        </div>
        <div>
          {isDifferent ? (
            <li className="price-view">
              <CheckInspectDiff
                phoneConditionQuestion={phoneConditionQuestion}
                inquiryInfo={inquiryInfo}
              />
            </li>
          ) : null}
        </div>
      </section>
      <ul className="information-list">
        <li className="price-view">
          {/*删除了suborder 11-22*/}
          <RenderReserveInfo {...paymentInfo} isDifferent={isDifferent} />
          <RenderHammerInfo  {...paymentInfo} />
        </li>
      </ul>
    </div>
  );
}
