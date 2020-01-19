import React from "react";
interface IProps {
  tag?: string;
}
export const OnSaleTag: React.FC<IProps> = (props: IProps) => {
  if (props.tag) {
    return <img className="sale-tag" src={require("./res/sale.svg")} />;
  } else {
    return null;
  }
};
