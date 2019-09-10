import Svg from "@/components/svg";
import "./index.less";
import React from "react";
import { Modal } from "antd";

export default function TipsIcon(props: any) {
  const { tips, children } = props;
  return (
    <span
      className="comp-tips-icon"
      onClick={() => {
        Modal.confirm({ content: children });
      }}
    >
      <Svg icon="wenhao" />
    </span>
  );
}
