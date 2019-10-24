import React, { useState } from "react";
import "./index.less";
import { Collapse, Dropdown, Menu } from "antd";
import { MbFooter } from "buy/components/footer";
import Svg from "buy/components/svg";
import RouterLink from "buy/components/routerLink";
import { RenderByCondition } from "../RenderByCondition";
import footerInfo from "../../common/config/footerLinks.config";

const { Panel } = Collapse;

export default function Header() {
  const [openColl, setOpenColl] = useState(false);
  function renderArr(arr: any) {
    return (
      <Menu>
        {arr.map((item: any, index: any) => {
          return (
            <Menu.Item key={index}>
              <RouterLink to={item.href} isBuy={item.isBuy}>
                {item.subTitle}
              </RouterLink>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
  const RenderBackHome = () => (
    <RouterLink to="/">
      <img className="logo" src={require("buy/common/static/logo.svg")} />
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
                  <div
                    className="mobile-button-container"
                    onClick={() => {
                      setOpenColl((value: any) => !value);
                    }}
                  >
                    {openColl ? (
                      <Svg icon="wrong" />
                    ) : (
                      <img src={require("buy/common/static/menu.svg")} />
                    )}
                  </div>
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
          <div className="container flex-grid">
            <RenderBackHome />
            <div className="comp-dropdown-container">
              {footerInfo.map(({ title, arr }: any, index: any) => {
                return (
                  <Dropdown overlay={renderArr(arr)} key={index}>
                    <a className="ant-dropdown-link">
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
      <div
        className="modal"
        style={openColl ? { display: "block" } : { display: "none" }}
      />
    </header>
  );
}
