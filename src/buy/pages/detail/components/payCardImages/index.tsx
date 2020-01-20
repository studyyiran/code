import React from "react";
import "./index.less";
export default function PayCardImages(props: any) {
  return (
    <div className="paycard-img-list">
      <img src={require("./res/visa.svg")} />
      <img src={require("./res/masterCard.svg")} />
      <img src={require("./res/americanExpress.svg")} />
      <img src={require("./res/paypal.svg")} />
      {props.children}
    </div>
  );
}
