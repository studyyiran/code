import * as React from "react";
import "./index.less";
import getSellPath from "utils/util";

// 先简单处理吧
export function BrandLogo(props: any) {
  const { brand, onClick } = props;
  const { iconUrl, iconName, id } = brand;

  function clickHandler() {
    if (id !== "others") {
      onClick(id);
      props.history.push(`${getSellPath()}/${id}`);
    } else {
      props.history.push(`/sell-other-phone`);
    }
  }
  if (iconName) {
    return (
      <div className="comp-brand-logo canclick" onClick={clickHandler}>
        <div className="border">
          {iconUrl ? <img src={iconUrl} /> : <span>Other</span>}
        </div>
        <span className="name">{iconName}</span>
      </div>
    );
  } else {
    return (
      <div className="comp-brand-logo canclick">
        <div className="border" style={{ border: "none", background: 'none', cursor: 'initial' }}></div>
      </div>
    );
  }
}
