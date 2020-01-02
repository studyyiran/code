import Button from "../../../../components/button";
import React from "react";
import "./index.less";

export function StartBuyButton(props: any) {
  const { onClick, buyProductStatus } = props;
  return (
    <div className="start-pay-button">
      <Button disabled={buyProductStatus === "INTRANSACTION"} onClick={onClick}>
        {buyProductStatus === "INTRANSACTION" ? "Sold" : "Start Your Purchase"}
      </Button>
      <span className="or">OR</span>
      <a className="link">Find similar phones</a>
    </div>
  );
}
