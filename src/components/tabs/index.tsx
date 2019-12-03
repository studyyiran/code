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
  const { activeKey, onChange = () => {}, ...otherProps } = props;
  const defaultActiveKey =
    props.defaultActiveKey || [].slice.call(props.children)[0].key;
  const [stateActiveKey, setStateActiveKey] = useState(defaultActiveKey);
  const currentKey = activeKey || stateActiveKey;
  return (
    <div className={`${props.className ? props.className : ""} ${prefixCls}`}>
      <RenderTabList
        currentKey={currentKey}
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
      {renderTabPaneList({ ...props, currentKey: currentKey })}
      {/*<RenderTabPaneList>{props.children}</RenderTabPaneList>*/}
    </div>
  );
}

// 添加内容渲染的功能
function renderTabPaneList(props: any) {
  const { children, currentKey } = props;
  return React.Children.map(children, child => {
    const { props, key } = child;
    const { children: innerChildren } = props;
    if (currentKey === key) {
      // return React.createElent React.cloneElement
      return innerChildren;
    } else {
      return null;
    }
  });
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
