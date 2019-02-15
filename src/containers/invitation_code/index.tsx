import * as React from 'react';
import { Input, Button } from 'antd';
import './index.less';
export default class InvationCode extends React.Component {
  public render() {
    return (
      <div className="page-invation-code-container">
        <div className="top">
          <h1>We Sell Your Phone for More</h1>
          <p>UPTRADE is available for limited guests</p>
        </div>
        <div className="content">
          <a className="link-out" href="https://mailchi.mp/dc6bcab117d9/uptrade-access-code">Request invite code to get early access ></a>
          <div className="input-group">
            <label>I already have an invite code</label>
            <Input placeholder="Please input" size="large" />
          </div>
          <Button size="large" style={{ width: 400 }} >Submit</Button>
        </div>
      </div>
    )
  }
}