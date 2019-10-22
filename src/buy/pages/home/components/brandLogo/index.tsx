import * as React from "react";
import "./index.less";
import getSellPath from "buy/common/utils/util";
import {sellPageGoTo} from "../../../../common/utils/util";

// 先简单处理吧
export function BrandLogo(props: any) {
  const {brand, onClick} = props;
  const {iconUrl, iconName, id} = brand;

  function clickHandler() {
    if (id !== "others") {
      onClick(id);
      sellPageGoTo(`${getSellPath()}/${id}`, false)
    } else {
      sellPageGoTo(`/sell-other-phone`, false)
    }
  }

  return (
    <div className="comp-brand-logo canclick" onClick={clickHandler}>
      <div className="border">
        {iconUrl ? (
          <img src={iconUrl}/>
        ) : (
          <span>Other</span>
        )}
      </div>
      <span className="name">{iconName}</span>
    </div>
  );
}
