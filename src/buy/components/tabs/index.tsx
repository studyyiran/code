import React, { useState } from "react";
import "./index.less";
const prefixCls = "yr-tabs";

interface ITabs {
  activeKey?: string;
  children: any;
  defaultActiveKey?: string;
  className?: string;
  onChange?: (s: string) => void;
}

export function Tabs(props: ITabs): any {
  const { activeKey, onChange, ...otherProps } = props;
  const defaultActiveKey =
    props.defaultActiveKey || ([].slice.call(props.children)[0] as any).key;
  const [stateActiveKey, setStateActiveKey] = useState(defaultActiveKey);
  return (
    <div className={`${props.className ? props.className : ""} ${prefixCls}`}>
      <RenderTabList
        currentKey={activeKey || stateActiveKey}
        onChange={
          activeKey
            ? onChange
            : (key: string) => {
                setStateActiveKey(key);
                // @ts-ignore
                onChange(key);
              }
        }
        {...otherProps}
      />
    </div>
  );
}
// 看起来是先执行RenderTabList。注入属性后，再执行TabPane。也就是说，只有父组件的有效。
// 这种连activeKey都省略，真的好吗？
function RenderTabList({ children, currentKey, onChange }: any) {
  return (
    <div className={`${prefixCls}-bar`}>
      {React.Children.map(children, child => {
        const { props, key } = child;
        const { tab } = props;
        return React.cloneElement(child, {
          onChange: () => onChange(key),
          children: tab,
          isSelect: currentKey === key
        });
      })}
    </div>
  );
}
// @ts-ignore
Tabs.TabPane = props => {
  const { isSelect, children, onChange } = props;
  return (
    <div
      className={`${prefixCls}-tab`}
      aria-selected={isSelect ? "true" : "false"}
      onClick={onChange}
    >
      {children}
    </div>
  );
};
