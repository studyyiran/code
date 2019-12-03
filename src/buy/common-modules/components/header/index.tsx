import React from "react";
import { Menu } from "antd";
import RouterLink from "../routerLink";
export default function HeaderComponent(props: any) {
  const { arr, ...others } = props;
  function renderInner() {
    const dom: any[] = [];
    arr.forEach((item: any, index: any) => {
      const { href, subTitle, Component } = item;
      // 是否有值.
      if (Component && Component()) {
        dom.push(<Component />);
      } else if (subTitle) {
        dom.push(
          <RouterLink to={href} isBuy={item.isBuy}>
            {subTitle}
          </RouterLink>
        );
      }
    });
    return dom.map((item, index) => <Menu.Item key={index}>{item}</Menu.Item>);
  }
  return <Menu {...others}>{renderInner()}</Menu>;
}
