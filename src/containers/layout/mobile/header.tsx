import * as React from 'react';
import { Icon, Button } from 'antd';
import './header.less';
export default class Header extends React.Component {
  public render() {
    return (
      <div className="comp-mobile-header-container">
        <div className="header-box">
          <div className="logo">
            <img src={require('@/images/logo.png')} alt="" />
          </div>
          <div className="right">
            <Icon type="bars" style={{ fontSize: '.2rem' }} />
          </div>
        </div>
        <div className="toggle-box">
          <div className="list">About Us</div>
          <div className="list">How it Works</div>
          <div className="list">Check Your Order</div>
          <div className="button-group">
            <Button>SELL YOUR PHONE NOW</Button>
          </div>
        </div>
      </div>
    )
  }
}