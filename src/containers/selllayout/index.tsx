import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import './index.less';

export default class SellLayout extends React.Component<{ route: { [key: string]: any } }> {
  public render() {
    const children = this.props.route.children;
    return (
      <div className="page-sell-layout-container">
        <div className="sell-layout-left">
          122313123
        </div>
        <div className="sell-layout-right">
          {renderRoutes(children)}
        </div>
      </div>
    )
  }
}