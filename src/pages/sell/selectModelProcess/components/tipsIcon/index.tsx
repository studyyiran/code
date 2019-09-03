import Svg from "@/components/svg";
import "./index.less";
import React from "react";

export default function TipsIcon(props: any) {
  const { tips } = props;
  return (
    <span className="comp-tips-icon">
      <Svg icon="wenhao" />
    </span>
  );
}
