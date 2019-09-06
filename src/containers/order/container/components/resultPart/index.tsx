import * as React from "react";
import "./index.less";
import Tag from "@/components/tag";

const priceUnit = "$";
export default function ResultPart(props: any) {
  const { reserveInfo, hammerInfo } = props;

  function renderReserveInfo() {
    const { amount, paymentStatus } = reserveInfo;
    return (
      <div className="content-tag-container">
        <li>
          <span>Price Guarantee</span>
          <span>
            {priceUnit}
            {amount}
          </span>
        </li>
        <Tag status={paymentStatus === "To Be Paid" ? "padding" : "success"}>
          {paymentStatus}
        </Tag>
      </div>
    );
  }

  function renderHammerInfo() {
    if (hammerInfo) {
      const { amount, paymentStatus } = hammerInfo;
      if (hammerInfo && paymentStatus) {
        return (
          <li>
            <span>Bonus</span>
            <span>{amount}</span>
          </li>
        );
      } else {
        return <div>no</div>;
      }
    } else {
      return (
        <li>
          <span>Final Sale Price</span>
          <span>Pending</span>
        </li>
      );
    }
  }
  return (
    <div className="comp-result-part">
      <section className="line-with-title">
        <h3>Action Result</h3>
      </section>
      <ul className="information-list">
        {renderHammerInfo()}
        {renderReserveInfo()}
      </ul>
    </div>
  );
}
