import * as React from "react";
import { IBrandLogo } from "./index.interface";
import "./index.less";
import Svg from "@/components/svg";

export function BrandLogo(props: IBrandLogo) {
  const { brand } = props;
  const { iconUrl, name } = brand;
  return (
    <div className="comp-brand-logo">
      <div className="border">
        <Svg />
      </div>
      <span className="name">{name}</span>
    </div>
  );
}
