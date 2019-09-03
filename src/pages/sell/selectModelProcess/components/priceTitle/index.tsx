import React from "react";
import "./index.less";

export default function PriceTitle(props: any) {
  const { children } = props;
  return (
    <div className="comp-price-title">
      <h2>
        Total Payout <span className="price">$610</span>
      </h2>
      <p>{children}</p>
    </div>
  );
}
