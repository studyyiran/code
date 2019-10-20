import { Spin, Icon } from "antd";
import React from "react";
import './index.less'

const antIcon = <Icon type="loading" style={{ fontSize: 20 }} spin />;
export default function Loading() {
  return <Spin indicator={antIcon} />;
}
