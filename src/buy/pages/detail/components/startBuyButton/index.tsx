import Button from "../../../../components/button";
import React from "react";

export function StartBuyButton(props: any) {
  const { onClick, buyProductStatus } = props;
  return (
    <Button disabled={buyProductStatus === "INTRANSACTION"} onClick={onClick}>
      {buyProductStatus === "INTRANSACTION" ? "Sold" : "Start Your Purchase"}
    </Button>
  );
}