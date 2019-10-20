import React, { useEffect, useState } from "react";
import "./index.less";
import { Collapse } from "antd";
const { Panel } = Collapse;
/*
有时候我们需要强自定义展开按钮 这时候我们可以关闭掉
 */
export default function CommonCollapse(props: {
  header: string;
  isActiveKey?: boolean;
  renderHeader?: any;
  children: any;
  className?: string;
  hideArrow?: boolean;
}) {
  const {
    header,
    children,
    className,
    hideArrow,
    renderHeader,
    isActiveKey
  } = props;
  // 这块处理的不够好.state和props不协调
  useEffect(() => {
    setOpen(isActiveKey);
  }, [isActiveKey]);
  const [open, setOpen] = useState(isActiveKey);
  return (
    <Collapse
      activeKey={open ? header : ""}
      expandIconPosition="right"
      className={`common-collapse ${className ? className : ""}`}
      onChange={(arr: any) => {
        if (arr && arr.length) {
          setOpen(true);
        } else {
          setOpen(false);
        }
      }}
    >
      <Panel
        key={header}
        header={renderHeader ? renderHeader(header) : <h3>{header}</h3>}
        showArrow={!hideArrow}
      >
        {children}
      </Panel>
    </Collapse>
  );
}
