import * as React from "react";
// import { Button } from 'antd';
// import { Link } from 'react-router-dom';
import "./header.less";
import { Collapse, Dropdown, Menu } from "antd";
const { Panel } = Collapse;
import {
  footerInfo,
  MbFooter
} from "@/containers/layout/components/footer/footer";
import Svg from "@/components/svg";
import RouterLink from "@/components/routerLink";
import { Link } from "react-router-dom";
import { RenderByCondition } from "@/containers/layout/components/footer/RenderByCondition";
import { RenderByType } from "@/pages/sell/selectModelProcess/condition/components/renderByType";

export default function Header() {
  function renderArr(arr: any) {
    return (
      <Menu>
        {arr.map((item: any, index: any) => {
          return (
            <Menu.Item key={index}>
              <RouterLink to={item.href}>{item.subTitle}</RouterLink>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <header className="comp-header-container">
      <RenderByCondition
        ComponentMb={
          <Collapse>
            <Panel
              showArrow={false}
              key={"1"}
              header={
                <div className="container">
                  <img className="logo" src={require("@/images/logo.svg")} />
                  <img src={require("./res/menu.svg")} />
                </div>
              }
            >
              <MbFooter />
            </Panel>
          </Collapse>
        }
        ComponentPc={
          <div className="container">
            <RouterLink to="/">
              <img className="logo" src={require("@/images/logo.svg")} />
            </RouterLink>
            <div className="comp-dropdown-container">
              {footerInfo.map(({ title, arr }: any, index: any) => {
                return (
                  <Dropdown overlay={renderArr(arr)} key={index}>
                    <a className="ant-dropdown-link" href="#">
                      {title}
                      <Svg icon="arrow-right" />
                    </a>
                  </Dropdown>
                );
              })}
            </div>
          </div>
        }
      />
    </header>
  );
}
