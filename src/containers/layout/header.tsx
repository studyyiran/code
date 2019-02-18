import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './header.less';

export default class Header extends React.Component {
  public render() {
    return (
      <div className="comp-header-container">
        <div className="content-wrapper">
          <Link to={'/'}><span className="home_btn" /></Link>
          <span className="how_it_works_btn">How it Works</span>
          <span className="about_us_btn">About Us</span>
          <Link to={'/order'}><span className="check_your_order_btn">Check Your Order</span></Link>
          <Link to={'/sell/account'}><Button type="primary">Sell Your Phone Now</Button></Link>
        </div>
        <div className="header-bg" />
      </div>
    )
  }
}