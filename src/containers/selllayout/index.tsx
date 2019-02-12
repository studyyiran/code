import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import './index.less';
import LeftSide from './components/leftside';
import GuaranteedPrice from './components/guaranteedprice';
export default class SellLayout extends React.Component<{ route: { [key: string]: any } }> {
  public render() {
    const children = this.props.route.children;
    return (
      <div className="page-sell-layout-container">
        <div className="sell-layout-left">
          <LeftSide />
          <GuaranteedPrice />
        </div>
        <div className="sell-layout-right">
          {renderRoutes(children)}
        </div>
      </div>
    )
  }
}