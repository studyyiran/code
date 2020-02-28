import React from "react";
import { Spin, Icon } from "antd";
import "./index.less";
export default function LoadingMask(props: any) {
  const { visible, needWhite, style = {} } = props;
  const antIcon = (
    <Icon
      type="loading"
      style={Object.assign({ fontSize: 44, color: "#375A7D" }, style)}
      spin
    />
  );
  if (visible) {
    return (
      <div
        className="loading-mask"
        style={needWhite ? { backgroundColor: "transparent" } : {}}
      >
        <Spin indicator={antIcon} />
      </div>
    );
  } else {
    return null;
  }
}
