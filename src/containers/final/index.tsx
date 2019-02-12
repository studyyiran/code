import * as React from 'react';
import BrandHeader from '@/containers/brand/components/brandheader';
import './index.less';
import { Button } from 'antd';
export default class FinalStep extends React.Component {
  public render() {
    return (
      <div className="comp-final-container">
        <BrandHeader />
        <div className="content-wrapper">
          <div className="final-step-wrapper">
            <div className="step">
              <p className="name">Prepare Your Phone</p>
              <p className="detail">
                Delete your Google account <br />
                Deactivate your service <br />
                Remove your Data&SIM Card</p>
              <p className="tips">How to Prepare Your Phone ></p>
            </div>
            <div className="step">
              <p className="name">Pack and Send</p>
              <p className="detail">
                Pack your device in a Box <br />
                Drop it off at your nearest delivery <br />
                place
              </p>
            </div>
            <div className="step">
              <p className="name">Get Paid</p>
              <p className="detail">
                After your device arrives your <br />
                PayPal is typically sent within a <br />
                week
              </p>
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

          <div style={{textAlign: 'center'}}><Button type="primary" style={{ width: '400px', height: '48px', marginTop: '50px', fontWeight: 'bold'  }}>CHECK ORDER</Button></div>
        </div>
      </div>
    )
  }
}