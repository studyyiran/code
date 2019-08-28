import * as React from "react";
import { IBrandLogo } from "./index.interface";
import "./index.less";
import Svg from "@/components/svg";

export function BrandLogo(props: any) {
  const { brand } = props;
  const { iconUrl, iconName, name } = brand;
  return (
    <div className="comp-brand-logo">
      <div className="border">
        {iconUrl ? <img src={require(`./res/${iconUrl}`)} /> : <span>Other</span>}
      </div> 
      <span className="name">{iconName}</span>
    </div>
  );
}
