import * as React from "react";
import "./index.less";

export function BrandLogo(props: any) {
  const { brand } = props;
  const { iconUrl, iconName, id } = brand;
  return (
    <div className="comp-brand-logo">
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
