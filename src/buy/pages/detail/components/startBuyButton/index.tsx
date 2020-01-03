import Button from "../../../../components/button";
import React from "react";
import "./index.less";
import { viewAllClickHandler } from "../../util";
import { IProductDetail } from "../../context/interface";
import Svg from "../../../../components/svg";

export function StartBuyButton(props: {
  onClick?: any;
  buyProductStatus: string;
  productDetail: IProductDetail;
}) {
  const { onClick, buyProductStatus, productDetail } = props;
  return (
    <div className="start-pay-button">
      <Button disabled={buyProductStatus === "INTRANSACTION"} onClick={onClick}>
        {buyProductStatus === "INTRANSACTION" ? "Sold" : "Start Your Purchase"}
      </Button>
      <span className="or">OR</span>
      <a className="link" onClick={viewAllClickHandler.bind({}, productDetail)}>
        Find Similar Phones >
      </a>
    </div>
  );
}
