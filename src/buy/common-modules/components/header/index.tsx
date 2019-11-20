import React from "react";
import { Menu } from "antd";
import RouterLink from "../routerLink";
export default function HeaderComponent(props: any) {
  const { arr, ...others } = props;
  return (
    <Menu {...others}>
      {arr.map((item: any, index: any) => {
        const { href, subTitle, Component } = item;
        return (
          <Menu.Item key={index}>
            {Component ? (
              <Component />
            ) : (
              <RouterLink to={href} isBuy={item.isBuy}>
                {subTitle}
              </RouterLink>
            )}
          </Menu.Item>
        );
      })}
    </Menu>
  );
}
