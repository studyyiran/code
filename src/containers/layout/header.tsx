import * as React from "react";
// import { Button } from 'antd';
// import { Link } from 'react-router-dom';
import "./header.less";

export default class Header extends React.Component {
  public render() {
    return (
      <header className="comp-header-container">
        <img className="logo" src={require("@/images/logo.svg")} />
        <div className="user-info" />
      </header>
    );
  }
}
