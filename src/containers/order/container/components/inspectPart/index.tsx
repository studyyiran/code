import * as React from "react";
import Tag from "@/components/tag";
import CheckInspectDiff from "@/containers/order/container/components/checkInspectDiff";
const priceUnit = "$";
export default function InspectPart(props: any) {
  console.log(props);
  const { isDifferent, price } = props;
  return (
    <div>
      <section className="line-with-title">
        <h3>Inspection Result</h3>
        <Tag {...props} />
      </section>
      <li className="price-view">
        <span>Price Guarantee</span>
        <span data-matched={isDifferent ? "false" : "true"}>
          {priceUnit}
          {price}
        </span>
      </li>
      {isDifferent ? (
        <li className="price-view">
          <span>Difference</span>
          <CheckInspectDiff />
        </li>
      ) : null}
    </div>
  );
}
