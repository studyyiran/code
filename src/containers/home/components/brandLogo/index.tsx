import * as React from "react";
import "./index.less";

// 先简单处理吧
export function BrandLogo(props: any) {
  const { brand, onClick } = props;
  const { iconUrl, iconName, id } = brand;

  function clickHandler() {
    if (id !== "others") {
      onClick(brand);
      props.history.push(`/newsell/${id}`);
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
