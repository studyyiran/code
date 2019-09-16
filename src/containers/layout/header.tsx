import React, { useState } from "react";
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
import { RenderByCondition } from "@/containers/layout/components/footer/RenderByCondition";

export default function Header() {
  const [openColl, setOpenColl] = useState(false);
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
  const RenderBackHome = () => (
    <RouterLink to="/">
      <img className="logo" src={require("@/images/logo.svg")} />
    </RouterLink>
  );
  return (
    <header className="comp-header-container">
      <RenderByCondition
        ComponentMb={
          <Collapse activeKey={openColl ? "1" : ""}>
            <Panel
              showArrow={false}
              key={"1"}
              header={
                <div className="container">
                  <RenderBackHome />
                  <img
                    src={require("./res/menu.svg")}
                    onClick={() => {
                      setOpenColl((value: any) => !value);
                    }}
                  />
                </div>
              }
            >
              <MbFooter
                onClickHandler={() => {
                  setOpenColl(false);
                }}
              />
            </Panel>
          </Collapse>
        }
        ComponentPc={
          <div className="container">
            <RenderBackHome />
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
