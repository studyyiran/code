import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { renderRoutes } from 'react-router-config';
import { noteUserModal } from '@/containers/aboutphone/pageValidate';
import config from '@/config';
import './index.less';
import LeftSide from './components/leftside';
import GuaranteedPrice from './components/guaranteedprice';
import GuaranteedPriceMobile from './components/guaranteedprice--mobile';
import { ISellLayoutProps, ISellLayoutState } from './interface/index.interface';

@inject('yourphone', 'user', 'common')
@observer
export default class SellLayout extends React.Component<ISellLayoutProps, ISellLayoutState> {

  public readonly state: Readonly<ISellLayoutState> = {
    stepIndex: -1,
    isSetedPreOrder: false,
    isBeforeShipping: false
  }

  public componentDidMount() {
    const navigator = config.NAVIGATOR;
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

      if (this.props.user.preOrder.orderDetail) {
        this.props.yourphone.orderDetail = this.props.user.preOrder.orderDetail;
      }

      // 有关机型的 
      if (this.props.user.preOrder.productInfo) {
        if (this.props.user.preOrder.productInfo.brandId) {
          this.props.yourphone.activeBrandsId = this.props.user.preOrder.productInfo.brandId;
        }

        if (this.props.user.preOrder.productInfo.brandName) {
          this.props.yourphone.activeBrandsName = this.props.user.preOrder.productInfo.brandName;
        }

        if (this.props.user.preOrder.productInfo.modelId) {
          this.props.yourphone.activeModelId = this.props.user.preOrder.productInfo.modelId;
        }

        if (this.props.user.preOrder.productInfo.modelName) {
          this.props.yourphone.activeModelName = this.props.user.preOrder.productInfo.modelName;
        }

        if (this.props.user.preOrder.productInfo.carrier) {
          this.props.yourphone.activeCarrierName = this.props.user.preOrder.productInfo.carrier;
        }

        if (this.props.user.preOrder.productInfo.carrierDescription) {
          this.props.yourphone.activeCarrierDescription = this.props.user.preOrder.productInfo.carrierDescription;
        }

        if (this.props.user.preOrder.productInfo.productId) {
          this.props.yourphone.activeProductId = this.props.user.preOrder.productInfo.productId;
        }

        if (this.props.user.preOrder.productInfo.productName) {
          this.props.yourphone.activeProductName = this.props.user.preOrder.productInfo.productName;
        }

        if (this.props.user.preOrder.productInfo.inquiryDetail) {
          this.props.yourphone.inquiryDetail = this.props.user.preOrder.productInfo.inquiryDetail;
        }

        if (this.props.user.preOrder.tbdInfo) {
          this.props.yourphone.tbdInfo = this.props.user.preOrder.tbdInfo;
        }
      }
    }

    this.setState({ isSetedPreOrder: true });
  }

  public onMappingIndex = (navigatorKey: string[], navigator: object) => {
    const isMobile = this.props.common.isMobile;
    const arr = navigatorKey.filter(v => new RegExp(v).test(window['__history__'].location.pathname));
    if (!arr.length) {
      return;
    }
    this.setState({
      stepIndex: navigator[arr[arr.length - 1]]['step'],
      isBeforeShipping: isMobile ? navigator[arr[arr.length - 1]]['isBeforeShippingMobile'] : navigator[arr[arr.length - 1]]['isBeforeShipping']
    });
  }

  public componentWillUnmount() {
    if (this.props.user.preOrder.appendOrderDetail) {
      noteUserModal({
        title: 'Failed to submit the order!',
        content: (<>Your order process is interrupted, please try again. Sorry for the inconvenience. <br /> <br />This window will be closed after 15 seconds.</>),
        type: 'info',
        seconds: 10,
        update: (seconds) => (<>Your order process is interrupted, please try again. Sorry for the inconvenience.  <br /> <br />This window will be closed after {seconds} seconds.</>),
      });
      this.props.user.preOrder = {
        userEmail: '',
      }
      this.props.yourphone.destory();
      this.props.yourphone.desoryUnmount();
    }

  }

  public render() {
    if (!this.state.isSetedPreOrder) {
      return null;
    }
    const price = this.props.yourphone.inquiryDetail !== null ? this.props.yourphone.inquiryDetail.priceDollar : '';
    const children = this.props.route.children;
    return (
      <div className="page-sell-layout-container">
        <div className="sell-layout-left">
          <LeftSide
            stepIndex={this.state.stepIndex}
            isMobile={this.props.common.isMobile}
          />
          {
            this.props.common.isMobile
              ? (<GuaranteedPriceMobile price={price} isTBD={this.props.yourphone.isTBD} user={this.props.user} isBeforeShipping={this.props.user.isShowLeftPriceMobile} />)
              : (<GuaranteedPrice price={price} isTBD={this.props.yourphone.isTBD} user={this.props.user} isBeforeShipping={this.state.isBeforeShipping} />)
          }
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