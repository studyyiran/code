import * as React from 'react';
import './header.less';

export default class Header extends React.Component {
  public render() {
    return (
      <div className="comp-header-container">
        <div className="content-wrapper">
          <span className="home_btn" />
          <span className="how_it_works_btn">How it Works</span>
          <span className="about_us_btn">About Us</span>
          <span className="check_your_order_btn">Check Your Order</span>
          <span className="sell_your_phone_btn">Sell Your Phone Now</span>
        </div>
        <div className="header-bg" />
      </div>
    )
  }
}