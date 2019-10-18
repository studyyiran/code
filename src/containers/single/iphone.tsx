import * as React from 'react';
import { Link } from 'react-router-dom';
import "./blog.less"
export default class Broken extends React.Component {
  public render() {
    return (
      <div className="page-single-iphone-container">
        <h1>How to Factory Reset iPhone and Prepare for Sell</h1>
        <div className="small">
          <span>21 Feb 2019</span>
          <span>by UpTrade</span>
          <div className="right">
            <em />
            <em />
            <em />
          </div>
        </div>
        <Link to={'/'} />
        <img src={require('images/single/iphone_banner.png')} alt="" className="banner" />
        <p>To prepare your iPhone for shipment to UpTrade you will need to complete the following steps to ensure you keep your personal data safe and the iPhone is fully prepped for us to sell with no issues. You will want to follow Apple’s recommended steps to do so. Links to Apple’s Support page provided below for your convenience. </p>

        <div className="list-box">
          <div className="list">
            <div className="header">
              <span className="number">1</span>
              <span className="text">Unpair Apple Watch</span>
            </div>
            <img src={require('images/single/iphone_1.png')} alt="" />

            <p>
              <a href="https://support.apple.com/en-us/HT204568">Unpair Apple Watch</a>
              <span>- If you have an Apple Watch paired with your iPhone, you must first unpair it.</span>
            </p>
          </div>

          <div className="list">
            <div className="header">
              <span className="number">2</span>
              <span className="text">Backup iPhone Data</span>
            </div>
            <p>
              <a href="https://support.apple.com/en-us/HT203977">Backup iPhone Data</a>
              <span>to ensure you have a copy of all of your personal data.</span>
            </p>
          </div>

          <div className="list">
            <div className="header">
              <span className="number">3</span>
              <span className="text">Factory Reset iPhone</span>
            </div>
            <dl>
              <dt>Sign out of iCloud</dt>
              <dd>If you are using the latest version of iOS (typically iPhone 5 and newer) go to Settings > [Your Name] > *Scroll Down* > and tap Sign Out. Enter your Apple ID password and tap Turn Off.</dd>

              <dt>Erase All Content and Settings</dt>
              <dd>Go to Settings > General > Reset > Erase All Content and Settings. If you turned on Find My iPhone, you might need to enter your Apple ID and password. For more in depth instructions follow Apple’s <a href="https://support.apple.com/en-us/HT201351">factory reset iPhone</a> instructions.</dd>
            </dl>
            <img className="img-270" src={require('images/single/iphone_2.png')} alt="" />
          </div>

          <div className="list">
            <div className="header">
              <span className="number">4</span>
              <span className="text">Pack iPhone and Accessories.</span>
            </div>
            <p>Pack your iPhone and relevant accessories like fragile items. To ensure that you receive your price guarantee, you will want to protect your iPhone in the condition that you specified. Don’t forget to also send us your original box, phone charger, and/or other accessories with the iPhone. Including these items along with your shipment can increase your iPhone’s sale price.</p>
          </div>
        </div>
      </div>
    )
  }
}