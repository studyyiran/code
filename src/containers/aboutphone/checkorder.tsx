import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { DEFAULT } from 'config';
import Layout from '@/containers/aboutphone/layout';
import './checkorder.less';
import { Button } from 'antd';
import { ICheckOutProps, ICheckOutStates, EBrandType, EPayType } from './interface/index.interface';

@inject('yourphone')
@observer
export default class FinalStep extends React.Component<ICheckOutProps, ICheckOutStates> {
  public readonly state: Readonly<ICheckOutStates> = {
    brand: EBrandType.IPHONE,
    payment: EPayType.PAYPAL,
    brandText: [
      'Turn off “Find My iPhone”. <br /> Deactivate your service. <br /> Remove your Data&SIM Card.',
      'Delete your Google account. <br /> Deactivate your service. <br /> Remove your Data & SIM Card.'
    ],
    payText: [
      'After your device arrives, it <br /> typically takes a week for your <br /> PayPal funds to be deposited.',
      'After your device arrives, your <br /> eCheck is typically sent within a <br /> week.'
    ]
  }

  public render() {
    return (
      <div className="page-checkorder-container">
        <Layout hideBottom={true}>
          <div className="content-wrapper">
            <div className="final-step-wrapper">
              <div className="step">
                <p className="name">Prepare Your Phone</p>
                <p className="detail" dangerouslySetInnerHTML={{ __html: this.state.brandText[this.state.brand] }} />
                <p className="tips">How to Prepare Your Phone</p>
                {/* TODO: 基于ios或安卓，链到两个新增页面，分别对应ios和安卓的数据清除说明  */}

              </div>
              <div className="step">
                <p className="name">Pack and Send</p>
                <p className="detail">
                  Pack your device in a box. <br />
                  Drop it off at your <br />
                  nearest delivery place.
                </p>
                <a href={DEFAULT.FedExUrl} target="__blank" className="tips">How to find the local FedEx location</a>
              </div>
              <div className="step">
                <p className="name">Get Paid</p>
                <p className="detail" dangerouslySetInnerHTML={{ __html: this.state.payText[this.state.payment] }} />
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
                      <p className="content">iPhone Xs Max 128G</p>
                    </div>
                    <div className="info-item">
                      <span className="label">Order Number</span>
                      <p className="content">063746374682374</p>
                    </div>
                    <div className="info-item">
                      <span className="label">Order Date</span>
                      <p className="content">2019-12-12 14: 24 PM</p>
                    </div>
                  </div>
                  <p className="guaranteed-price">
                    <span className="text">Guaranteed Price</span>
                    <span className="price">$710</span>
                  </p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}><Button onClick={this.hanleCheckOrder} type="primary" style={{ width: '400px', height: '48px', marginTop: '50px', fontWeight: 'bold' }}>CHECK ORDER</Button></div>
          </div>
        </Layout>
      </div>
    )
  }

  private hanleCheckOrder = () => {
    this.props.history.push('/order');
  }
}