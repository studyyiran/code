import React from "react";
import "./index.less";
interface IProps {
  tag?: string;
}
export const OnSaleTag: React.FC<IProps> = (props: IProps) => {
  if (props.tag) {
    switch (props.tag) {
      case "ON_SALE":
        return <img className="sale-tag" src={require("./res/sale.svg")} />;
        break;
      case "ON_SALE2":
        return <span className="pdp-lower-tag">Lower Price</span>;
      default:
        return null;
    }
  } else {
    return null;
  }
};
