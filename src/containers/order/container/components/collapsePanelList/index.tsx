import { Collapse } from "antd";
import Svg from "@/components/svg";
import React from "react";
const { Panel } = Collapse;

export default function CollapsePanelList(props: {
  onChange: (s: string) => void;
  defaultActiveKey?: string;
  list: any[];
}) {
  const { onChange, defaultActiveKey, list } = props;
  return (
    <div className="comp-collapse-panel-list">
      <Collapse
        expandIconPosition="right"
        expandIcon={panelProps => {
          return (
            <div className="circle-tag">
              {panelProps.isActive ? <Svg icon="jian" /> : <Svg icon="jia" />}
            </div>
          );
        }}
        accordion={true}
        onChange={onChange}
        defaultActiveKey={defaultActiveKey}
      >
        {list.map((item: any) => {
          const { header, children, key } = item;
          return (
            <Panel header={header} key={key}>
              {children}
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}
