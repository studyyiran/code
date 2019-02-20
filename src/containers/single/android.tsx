import * as React from 'react';
import "./blog.less"
export default class Broken extends React.Component {
  public render() {
    return (
      <div className="page-single-android-container">
        <h1>How to Factory Reset Android and Prepare for Sell</h1>
        <div className="small">
          <span>21 Feb 2019</span>
          <span>by UpTrade</span>
          <div className="right">
            <em />
            <em />
            <em />
          </div>
        </div>
        <img src={require('@/images/single/android_banner.png')} alt="" className="banner" />
        <p>To prepare your Android phone for shipment to UpTrade you will need to factory reset your phone. Steps to wipe data may vary depending on manufacture. Follow your phone manufacturer’s recommended steps to ensure that you properly backup your data to keep your personal information safe. Steps to factory reset Samsung are provided below. </p>
        <h2>Follow These Steps to Reset Your Android Phone (Samsung screenshots as example)</h2>
        <div className="img-box">
          <div className="list">
            <div className="top">
              <div className="number">1</div>
              <div className="title">
                <p>Pull down the</p>
                <span>Notification Tab</span>
              </div>
            </div>
            <img src={require('@/images/single/android_1.png')} alt="" />
          </div>

          <div className="list">
            <div className="top">
              <div className="number">2</div>
              <div className="title">
                <p>Select</p>
                <span>Settings<em> (Gear Icon) </em></span>
              </div>
            </div>
            <img src={require('@/images/single/android_2.png')} alt="" />
          </div>

          <div className="list">
            <div className="top">
              <div className="number">3</div>
              <div className="title">
                <p>Select</p>
                <span>General Management</span>
              </div>
            </div>
            <img src={require('@/images/single/android_3.png')} alt="" />
          </div>

          <div className="list">
            <div className="top">
              <div className="number">4</div>
              <div className="title">
                <p>Select</p>
                <span>Reset</span>
              </div>
            </div>
            <img src={require('@/images/single/android_4.png')} alt="" />
          </div>

          <div className="list">
            <div className="top">
              <div className="number">5</div>
              <div className="title">
                <p>Select</p>
                <span>Factory Data Reset</span>
              </div>
            </div>
            <img src={require('@/images/single/android_5.png')} alt="" />
          </div>

          <div className="list">
            <div className="top">
              <div className="number">6</div>
              <div className="title">
                <p>Select</p>
                <span>Reset</span>
              </div>
            </div>
            <img src={require('@/images/single/android_6.png')} alt="" />
          </div>
        </div>

        <h2>Pack Android Phone and Accessories</h2>
        <p>Pack your Android phone and relevant accessories like fragile items. To ensure that you receive your price guarantee, you will want to protect your Android phone in the condition that you specified. Don’t forget to also send us your original box, phone charger, and/or other accessories with the phone. Including these items along with your phone can increase your sale price.</p>
      </div>
    )
  }
}