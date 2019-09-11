import * as React from "react";
import "./index.less";

// 先简单处理吧
export function BrandLogo(props: any) {
  const { brand, onClick } = props;
  const { iconUrl, iconName, id } = brand;

  function clickHandler() {
    if (id !== "others") {
      onClick(id);
      props.history.push(`/newsell/${id}`);
    } else {
      props.history.push(`/sell-more-phone`);
    }
  }
  return (
    <div className="comp-brand-logo" onClick={clickHandler}>
      <div className="border">
        {iconUrl ? (
          <img src={require(`./res/${iconUrl}`)} />
        ) : (
          <span>Other</span>
        )}
      </div>
      <span className="name">{iconName}</span>
    </div>
  );
}
