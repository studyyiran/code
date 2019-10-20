import React from "react";
import { Spin, Icon } from "antd";
import "./index.less";
export default function LoadingMask(props: any) {
  const { visible } = props;
  const antIcon = <Icon type="loading" style={{ fontSize: 44 }} spin />;
  if (visible) {
    return (
      <div className="loading-mask">
        <Spin indicator={antIcon} />
      </div>
    );
  } else {
    return null;
  }
}
