import {getDescArr} from "../../util";
import React from "react";

export function ProductInfo(props: any) {
  const { productDisplayName, buyLevel, buyProductBQV } = props;
  const [lineOne, lineTwo] = getDescArr(buyProductBQV, productDisplayName);
  const titleList = [
    {
      title: "NEW",
      content: "Phone has no scratches",
      color: "#43c0e3"
    },
    {
      title: "BEST",
      content: "Phone has no scratches",
      color: "rgba(109, 210, 48, 1)"
    },
    {
      title: "BETTER",
      content: "Phone has light scratches",
      color: "#e72349"
    },
    {
      title: "GOOD",
      content: "Phone has scratches",
      color: "#efc31b"
    },
    {
      title: "FAIR",
      content: "Phone has deep scratches",
      color: "#888888"
    }
  ];
  function type2BgColor(type: string) {
    const target = titleList.find(item => {
      return item.title === type;
    });
    if (target) {
      return target.color;
    } else {
      return "";
    }
  }
  return (
    <section className="product-info">
      <div className="info-part">
        <h2 className="sub-title-size-main">{lineOne ? ` ${lineOne}` : ""}</h2>
      </div>
    </section>
  );
}