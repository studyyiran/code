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
    <div className="start-pay-button long-button">
      <Button disabled={buyProductStatus === "INTRANSACTION"} onClick={buyProductStatus === "INTRANSACTION" ? () => {} : onClick}>
        {buyProductStatus === "INTRANSACTION" ? "Sold" : "Check out"}
      </Button>
      {/*<span className="or">OR</span>*/}
      {/*<a className="link" onClick={viewAllClickHandler.bind({}, productDetail)}>*/}
      {/*  Find Similar Phones >*/}
      {/*</a>*/}
    </div>
  );
}
