import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'antd';
import ContactForm from '@/containers/contact/component/form';
import { IContactProps, IContact } from '@/containers/contact/interface/contact.interface';
import './why.less';

@inject('contact')
@observer
export default class Why extends React.Component<IContactProps> {
  public render() {
    return (
      <div className="page-single-why-container">
        <div className="banner">
          <div className="left">
            <h1>We Reinvented<br /> The Way <br />You Sell Your Phone</h1>
            <p>Top reasons why we are not your ordinary trade in program.</p>
            <Button type="primary" style={{ width: 166 }} size="large" >SEZLL IT NOW</Button>
          </div>
          <img src={require('@/images/single/why_banner.png')} height="100%" alt="" className="right" />
        </div>
        <div className="section-box">
          <dt>
            <dd>
              <img src={require('@/images/single/why_1.png')} alt="" />
              <div className="box">
                <h2>More cash in your pocket</h2>
                <p>Our price guarantee you see is what you will get paid. It is higher than your typical trade in program because we list it on global marketplaces. No hidden fees. No small print. If we sell your phone higher than our price guarantee, we issue a second payout so you can rest easy knowing you get top dollar.</p>
              </div>
            </dd>

            <dd>
              <img src={require('@/images/single/why_2.png')} alt="" />
              <div className="box">
                <h2>Easy. Two steps and done</h2>
                <p>Ship it and get paid. It’s that simple. Multiple payout methods means you can get paid how you want it. Choose paypal for the fastest way to get paid. We payout our price guarantee the next business day after receiving and evaluating your phone.</p>
              </div>
            </dd>

            <dd>
              <img src={require('@/images/single/why_3.png')} alt="" />
              <div className="box">
                <h2>Hassle free so you can get back to more important things</h2>
                <p>Selling your device shouldn’t interrupt your life. Worry free instructions sent to help you erase and protect your data. Free shipping labels to prepare your phone for shipment. Drop it off and relax while we sell the phone for you.</p>
              </div>
            </dd>

            <dd>
              <img src={require('@/images/single/why_4.png')} alt="" />
              <div className="box">
                <h2>Your safe and trusted partner</h2>
                <p>Your phone will be in the hands of a world-class team with decades of professional work experience in technology, consumer electronics, and customer service. Never deal with another scammer or unverified buyer ever again!</p>
              </div>
            </dd>

            <dd>
              <img src={require('@/images/single/why_5.png')} alt="" />
              <div className="box">
                <h2>Think sustainably</h2>
                <p>We believe in making environmentally sustainable decisions that last for generations through recycling, reusing, or trading. You get paid for doing good while someone else gets an affordable phone. The life of the device is extended while reducing the carbon impact on earth.</p>
              </div>
            </dd>
          </dt>
          <div className="button-group">
            <Button size="large" type="primary" style={{ width: 232, height: 64 }}>SELL IT NOW</Button>
          </div>
        </div>

        <div className="contact-us-box">
          <h2>Still have questions?<br /> Our friendly staff is standing by</h2>
          <div className="form-box">
            <ContactForm onOk={this.handleOk} />
          </div>
        </div>
      </div>
    )
  }

  private handleOk = (item: IContact) => {
    this.props.contact.onSubmit(item);
  }
}