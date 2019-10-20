import Svg from "buy/components/svg";
import "./index.less";
import React from "react";
import { Modal, Popconfirm, Tooltip } from "antd";

export default function TipsIcon(props: { children?: any; isInfo?: any }) {
  const { children, isInfo } = props;
  return (
    <Tooltip title={children}>
      <div className="comp-tips-icon-container canclick">
        <span>
          {isInfo ? (
            <img src={require("./img/info.svg")} />
          ) : (
            <Svg icon="wenhao" />
          )}
        </span>
      </div>
    </Tooltip>
  );
  // return (
  //   <Popconfirm
  //     overlayClassName="comp-tips-antd-container"
  //     title={children}
  //     icon={false}
  //   >
  //     <span className="comp-tips-icon-container">
  //       <Svg icon="wenhao" />
  //     </span>
  //   </Popconfirm>
  // );
}
