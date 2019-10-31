import { Collapse } from "antd";
import React from "react";
import "./index.less";
import Svg from "../../../../../components/svg";
const { Panel } = Collapse;


export default function CollapsePanelList(props: {
  onChange: (s: string) => void;
  defaultActiveKey?: string;
  activeKey?: string;
  list: any[];
}) {
  const { onChange, defaultActiveKey, list, activeKey } = props;
  return (
    <div className="comp-collapse-panel-list">
      <Collapse
        expandIconPosition="right"
        expandIcon={panelProps => {
          return (
            <div>
              {panelProps.isActive ? <Svg icon="jian" /> : <Svg icon="jia" />}
            </div>
          );
        }}
        accordion={true}
//      @ts-ignore
        onChange={onChange}
        defaultActiveKey={defaultActiveKey}
        activeKey={activeKey}
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
