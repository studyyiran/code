import * as React from "react";
import Tag from "@/components/tag";
const priceUnit = '$'
export default function InspectPart(props: any) {
  const { tag, isDifferent, price } = props;
  return (
    <div>
      <section className="line-with-title">
        <h3>Inspection Result</h3>
        <Tag {...tag} />
      </section>
      <li className="price-view">
        <span>Price Guarantee</span>
        <span data-matched={isDifferent ? "false" : "true"}>
          {priceUnit}
          {price}
        </span>
      </li>
    </div>
  );
}
