import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { renderRoutes } from 'react-router-config';
import { NAVIGATOR } from 'config';
import './index.less';
import LeftSide from './components/leftside';
import GuaranteedPrice from './components/guaranteedprice';
import { IYourPhoneStore } from '../aboutphone/interface/index.interface';
import { IUserStoreNew } from '@/store/interface/user.interface';

@inject('yourphone', 'user')
@observer
export default class SellLayout extends React.Component<{ route: { [key: string]: any }, yourphone: IYourPhoneStore, user: IUserStoreNew }, { stepIndex: number, isSetedPreOrder: boolean }> {

  public readonly state = {
    stepIndex: -1,
    isSetedPreOrder: false
  }

  public componentDidMount() {
    const navigator = NAVIGATOR;
    const navigatorKey = Object.keys(navigator);
    this.onMappingIndex(navigatorKey, navigator);
    window['__history__'].listen(() => {
      this.onMappingIndex(navigatorKey, navigator);
    });

    // 对 session 寸的数据做处理
    const preOrder = sessionStorage.getItem('preOrder');
    if (preOrder) {
      this.props.user.preOrder = JSON.parse(preOrder);

      if (this.props.user.preOrder.addressInfo) {
        this.props.yourphone.addressInfo = this.props.user.preOrder.addressInfo;
      }

      if (this.props.user.preOrder.inquiryKey) {
        this.props.yourphone.inquiryKey = this.props.user.preOrder.inquiryKey;
      }

      if (this.props.user.preOrder.payment) {
        this.props.yourphone.payment = this.props.user.preOrder.payment;
      }

      if (this.props.user.preOrder.checkInfo) {
        this.props.yourphone.echeck = this.props.user.preOrder.checkInfo;
      }

      if (this.props.user.preOrder.paypalInfo) {
        this.props.yourphone.paypal = this.props.user.preOrder.paypalInfo;
      }

      // 有关机型的 
      if (this.props.user.preOrder.productInfo) {
        if (this.props.user.preOrder.productInfo.brandId) {
          this.props.yourphone.activeBrandsId = this.props.user.preOrder.productInfo.brandId;
        }

        if (this.props.user.preOrder.productInfo.modelId) {
          this.props.yourphone.activeModelId = this.props.user.preOrder.productInfo.modelId;
        }

        if (this.props.user.preOrder.productInfo.carrier) {
          this.props.yourphone.activeCarrierName = this.props.user.preOrder.productInfo.carrier;
        }

        if (this.props.user.preOrder.productInfo.productId) {
          this.props.yourphone.activeProductId = this.props.user.preOrder.productInfo.productId;
        }

        if (this.props.user.preOrder.productInfo.inquiryDetail) {
          this.props.yourphone.inquiryDetail = this.props.user.preOrder.productInfo.inquiryDetail;
        }
      }
    }

    this.setState({ isSetedPreOrder: true });
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
    if (!this.state.isSetedPreOrder) {
      return null;
    }
    const price = this.props.yourphone.inquiryDetail !== null ? this.props.yourphone.inquiryDetail.price : '';
    const children = this.props.route.children;
    return (
      <div className="page-sell-layout-container">
        <div className="sell-layout-left">
          <LeftSide stepIndex={this.state.stepIndex} />
          <GuaranteedPrice price={price} isTBD={this.props.yourphone.isTBD} user={this.props.user} />
        </div>
        <div className="sell-layout-right">
          {
            this.state.isSetedPreOrder
              ? renderRoutes(children)
              : null
          }
        </div>
      </div>
    )
  }
}