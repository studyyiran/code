import * as React from 'react';
import './navigatorwithbar.less';
import { Button, Icon } from 'antd';
export default class NavigatorWithBar extends React.Component {
  public render() {
    return (
      <div className="comp-brand-navigatorwithbar-container">
        <div className="left-wrapper">
          <Button icon='arrow-left' style={{width: '130px', height: '50px'}}>BACK</Button>
        </div>
        <div className="middle-wrapper">
          <div className="bar-wrapper">
            <span className="bar-item" />
            <span className="bar-item" />
            <span className="bar-item" />
            <span className="bar-item" />
          </div>
        </div>
        <div className="right-wrapper">
          <Button style={{width: '130px', height: '50px'}}>NEXT <Icon type="arrow-right" /></Button>
        </div>
      </div>
    )
  }
}