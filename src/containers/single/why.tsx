import * as React from 'react';
import { Button } from 'antd';
import './why.less';
export default class Why extends React.Component {
  public render() {
    return (
      <div className="page-single-why-container">
        <div className="banner">
          <div className="left">
            <h1>We Reinvented<br /> The Way <br />You Sell Your Phone</h1>
            <p>Top reasons why we are not your ordinary trade in program.</p>
            <Button type="primary" style={{ width: 166 }} size="large" >SEZLL IT NOW</Button>
          </div>
          <img src={require('@/images/single/why_banner.png')} height="100%" alt="" className="right" />
        </div>
      </div>
    )
  }
}