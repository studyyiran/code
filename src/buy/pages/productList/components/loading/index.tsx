import React from "react";
import { Spin, Icon } from "antd";
import "./index.less";
export default function LoadingMask(props: any) {
  const { visible, needWhite } = props;
  const antIcon = <Icon type="loading" style={{ fontSize: 44, color: '#375A7D' }} spin />;
  if (visible) {
    return (
      <div className="loading-mask" style={needWhite ? {backgroundColor: "transparent"} : {}}>
        <Spin indicator={antIcon} />
      </div>
    );
  } else {
    return null;
  }
}
