import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { renderRoutes } from 'react-router-config';
import { NAVIGATOR } from 'config';
import './index.less';
import LeftSide from './components/leftside';
import GuaranteedPrice from './components/guaranteedprice';
import { IYourPhoneStore } from '../aboutphone/interface/index.interface';

@inject('yourphone')
@observer
export default class SellLayout extends React.Component<{ route: { [key: string]: any }, yourphone: IYourPhoneStore }, { stepIndex: number }> {

  public readonly state = {
    stepIndex: -1
  }

  public componentDidMount() {
    const navigator = NAVIGATOR;
    const navigatorKey = Object.keys(navigator);
    this.onMappingIndex(navigatorKey, navigator);
    window['__history__'].listen(() => {
      this.onMappingIndex(navigatorKey, navigator);
    });
  }

  public onMappingIndex = (navigatorKey: string[], navigator: object) => {
    const arr = navigatorKey.filter(v => new RegExp(v).test(window['__history__'].location.pathname));
    if (!arr.length) {
      return;
    }
    this.setState({
      stepIndex: navigator[arr[arr.length - 1]]['step']
    });
  }

  public render() {
    const price = this.props.yourphone.inquiryDetail !== null ? this.props.yourphone.inquiryDetail.price : '';
    const children = this.props.route.children;
    return (
      <div className="page-sell-layout-container">
        <div className="sell-layout-left">
          <LeftSide stepIndex={this.state.stepIndex} />
          <GuaranteedPrice price={price} />
        </div>
        <div className="sell-layout-right">
          {renderRoutes(children)}
        </div>
      </div>
    )
  }
}