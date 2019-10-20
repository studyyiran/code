import React from "react";
import "./index.less";
export function InnerDivImage(props: {
  imgUrl: string;
  dataIndex?: any;
  children?: any;
}) {
  const { imgUrl, dataIndex } = props;
  const formatIndex = String(dataIndex);
  return (
    <div
      data-index={formatIndex ? formatIndex : false}
      className="innerdiv"
      style={{
        backgroundImage: `url("${imgUrl}")`
      }}
    >
      {props.children}
    </div>
  );
}
