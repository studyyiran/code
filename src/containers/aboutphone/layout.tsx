import * as React from 'react';
import HeaderWithSearch from '@/containers/aboutphone/components/headerwithsearch';
import NavigatorWithBar from '@/components/navigatorWithBar';
import './layout.less';
import { ILayOutProps } from './interface/index.interface';

export default class Layout extends React.Component<ILayOutProps> {
  public render() {
    return (
      <div className="page-layout-container">
        <div className="top-wrapper">
          <HeaderWithSearch userEmail={this.props.userEmail} />
        </div>
        <div className="middle-wrapper">
          {
            this.props.children
          }
        </div>
        {
          !this.props.hideBottom &&
          <div className="bottom-wrapper">
            <NavigatorWithBar nextPath={this.props.nextPath} nextCb={this.props.nextCb} progress={this.props.progress} disabled={this.props.disabled} />
          </div>
        }
      </div>
    )
  }
}