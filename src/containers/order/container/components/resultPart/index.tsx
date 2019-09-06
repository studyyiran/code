import * as React from "react";
const priceUnit = "$";
export default function ResultPart(props: any) {
  const { price } = props;
  return (
    <div>
      <section className="line-with-title">
        <h3>Action Result</h3>
      </section>
      <ul className="information-list">
        <li>
          <span>Final Sale Price</span>
          <span>Pending</span>
        </li>
        <li>
          <span>Price Guarantee</span>
          <span>
            {priceUnit}
            {price}
          </span>
        </li>
      </ul>
    </div>
  );
}
