import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import BrandHeader from './components/brandheader';
import BottomNavigator from './components/navigatorwithbar';


import './index.less';
export default class AboutYou extends React.Component<{ route: { [key: string]: any } }> {
  public render() {
    const children = this.props.route.children;
    return (
      <div className="page-brand-container">
        <div className="top-wrapper">
          <BrandHeader />
        </div>
        <div className="middle-wrapper">
          {renderRoutes(children)}
        </div>
        <div className="bottom-wrapper">
          <BottomNavigator />
        </div>
      </div>
    )
  }
}