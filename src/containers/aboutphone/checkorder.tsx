import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { DEFAULT } from 'config';
import Layout from '@/containers/aboutphone/layout';
import './checkorder.less';
import { Button } from 'antd';
import { ICheckOutProps, ICheckOutStates, EBrandType, EPayType } from './interface/index.interface';
import { checkOrderPageValidate } from '@/containers/aboutphone/pageValidate';
import * as moment from 'moment-timezone';

@inject('yourphone', 'user', 'common')
@observer
export default class FinalStep extends React.Component<ICheckOutProps, ICheckOutStates> {
  public static readonly displayName: string = '订单完成页面';

  public readonly state: Readonly<ICheckOutStates> = {
    brand: EBrandType.IPHONE,
    payment: EPayType.PAYPAL,
    brandText: [
      'Turn off “Find My iPhone”. <br /> Deactivate your service. <br /> Remove your Data&SIM Card.',
      'Delete your Google account. <br /> Deactivate your service. <br /> Remove your Data & SIM Card.'
    ],
    detailText: [
      'Pack your device in a box. <br /> Drop it off at your <br /> nearest delivery place.',
      'Pack your device in a box. <br /> Drop it off at your nearest delivery place.'
    ],
    payText: {
      PC: {
        [EPayType.PAYPAL]: 'After your device arrives, it <br /> typically takes a week for your <br /> PayPal funds to be deposited.',
        [EPayType.ECHECK]: 'After your device arrives, your <br /> eCheck is typically sent within a <br /> week.'
      },
      MOBILE: {
        [EPayType.PAYPAL]: 'After your device arrives, it <br /> typically takes a week for your PayPal funds to be deposited.',
        [EPayType.ECHECK]: 'After your device arrives, your eCheck is <br /> typically sent within a week.'
      }
    }
  }

  public componentDidMount() {
    // 隐藏左侧价格模块
    this.props.user.isShowLeftPrice = false;
    if (!checkOrderPageValidate()) {
      this.props.history.push('/sell/account');
      return;
    }
  }

  public render() {
    const { activeBrandsId, inquiryDetail, orderDetail, isTBD } = this.props.yourphone; // 选中的品牌， 苹果为52
    return (
      <div className="page-checkorder-container">
        <Layout hideBottom={true}>
          <div className="content-wrapper">
            <div className="final-step-wrapper">
              <div className="step">
                <p className="name">Prepare Your Phone</p>
                <p className="detail" dangerouslySetInnerHTML={{ __html: this.state.brandText[activeBrandsId === 52 ? EBrandType.IPHONE : EBrandType.ANDROID] }} />
                <Link to={activeBrandsId === 52 ? '/how-to-factory-reset-iphone' : '/how-to-factory-reset-android-phone'} className="tips">How to Prepare Your Phone</Link>
              </div>
              <div className="step">
                <p className="name">Pack and Send</p>
                <p className="detail" dangerouslySetInnerHTML={{ __html: this.state.detailText[this.props.common.isMobile ? 1 : 0] }} />
                <a href={DEFAULT.FedExUrl} target="__blank" className="tips">How to find the local FedEx location</a>
              </div>
              <div className="step">
                <p className="name">Get Paid</p>
                <p className="detail" dangerouslySetInnerHTML={{ __html: this.state.payText[this.props.common.isMobile ? 'MOBILE' : 'PC'][this.state.payment] }} />
              </div>
            </div>
            <div className="order-summary-wrapper">
              <p className="main-title">Order Summary</p>
              <div className="summary-wrapper">
                <p className="sub-title">Your Phone</p>
                <div className="content-wrapper">
                  <div className="info-wrapper">
                    <div className="info-item">
                      <span className="label">Model</span>
                      <p className="content">{isTBD ? 'Other Phone' : (inquiryDetail && inquiryDetail.product.name)}</p>
                    </div>
                    <div className="info-item">
                      <span className="label">Order Number</span>
                      <p className="content">{orderDetail && orderDetail.orderNo}</p>
                    </div>
                    <div className="info-item">
                      <span className="label">Order Date</span>
                      <p className="content">{orderDetail && moment.tz(orderDetail.createdDt, "America/Chicago").format('MMM. DD, YYYY')}</p>
                    </div>
                  </div>
                  <p className="guaranteed-price">
                    <span className="text">Guaranteed Price</span>
                    <span className="price">{isTBD ? 'TBD' : `\$${inquiryDetail && inquiryDetail.priceDollar}`}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="checkorder-btn-wrapper" style={{ textAlign: 'center' }}><Button className="checkorder-btn" onClick={this.hanleCheckOrder} type="primary" style={{ width: '400px', height: '48px', marginTop: '50px', fontWeight: 'bold' }}>CHECK ORDER</Button></div>
          </div>
        </Layout>
      </div>
    )
  }

  private hanleCheckOrder = () => {
    this.props.history.push('/check-order');
  }
}