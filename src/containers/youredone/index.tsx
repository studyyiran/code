import * as React from 'react';
import BrandHeader from '@/containers/brand/components/brandheader';
import './index.less';

export default class YoureDone extends React.Component {
  public render() {
    return (
      <div className="comp-youredone-container">
        <BrandHeader />
        <div className="content-wrapper">
          <div className="top-part-wrapper">
            <div className="show-module">
              <div className="show-header">
                <span className="name">Your Payment</span>
                <span className="edit-bg" />
              </div>
              <div className="show-content">
                <img src={require('@/images/paypal.png')} />
                <p className="email-info">
                  <span className="label">E-mail</span>
                  <span className="address">Thomas.Paine@gmail.com</span>
                </p>
                <p className="tips">Cash will be deposited directly to your PayPal account as soon as we recieve your phone. Please make sure it is correct!</p>
              </div>
            </div>
            <div className="show-module">
              <div className="show-header">
                <span className="name">Your Information</span>
                <span className="edit-bg" />
              </div>
              <div className="show-content">
                <p className="info-item">
                  <span className="label">Name</span>
                  <span className="content">Thomas Paine</span>
                </p>
                <p className="info-item">
                  <span className="label">Address</span>
                  <span className="content">123 Main Street South San Francisco California, 94105</span>
                </p>
                <p className="info-item">
                  <span className="label">Phone No. </span>
                  <span className="content">+1 415 222-9191</span>
                </p>
                <p className="info-item">
                  <span className="label">E-mail</span>
                  <span className="content">Thomas.Paine@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bottom-part-wrapper">
            <p className="phone-name">Your Phone</p>
            <div className="phone-info-wrapper">
              <img className="img" src={require('@/images/noprice.png')} />
              <div className="info-wrapper">
                <p className="info-item">
                  <span className="label">Your Phone</span>
                  <span className="content">iPhone 8 Plus</span>
                </p>
                <p className="info-item">
                  <span className="label">Carrier</span>
                  <span className="content">AT&T</span>
                </p>
                <p className="info-item">
                  <span className="label">Condition</span>
                  <span className="content">No Cracks, No Scratchs, Screen is Bright, Turns On, Buttons Brokend No Cracks, No Scratchs, Screen is Bright, Turns On, Buttons Brokend <span className="edit-bg" /></span>
                </p>
              </div>
            </div>
          </div>
          <div className="terms-of-service">
            <span>By checking this box, you agree to our </span>
            <span className="highlight">Terms of Service </span>
          </div>
          <p className="ship-btn">ALL GOOD. Let’s Ship It!</p>
        </div>
      </div>
    );
  }
}