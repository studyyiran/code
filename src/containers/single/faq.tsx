import * as React from 'react';
import { Icon } from 'antd';
import './faq.less';

export default class Faq extends React.Component {
  public render() {
    return (
      <div className="page-faq-container">
        <h1 className="title">Frequently Asked Questions</h1>
        <dl>
          <dt>General</dt>
          <dd>
            <input type="checkbox" id="1" />
            <label htmlFor="1"><h2 className="default-h2">How does UpTrade work?<Icon type="plus" /></h2></label>
            <h2 className="noevent-h2">How does UpTrade work?<label htmlFor="1"><Icon type="plus" /></label></h2>
            <p>UpTrade is a new hassle-free way of selling your unwanted cell phone online. We will make you an instant competitive offer to purchase your phone based on the current market price. Our experienced sales team then sells your phone through various channels to get the most value out of it. If we sell your device for more than we anticipated, we will provide you a secondary payment based on the final sales price. This allows our customers to feel confident that they are receiving the best offer for their device without taking the risks that come with traditional online selling.</p>
          </dd>

          <dd>
            <input type="checkbox" id="2" />
            <label htmlFor="2"><h2 className="default-h2">Can I cancel my order after I ship my phone?<Icon type="plus" /></h2></label>
            <h2 className="noevent-h2">Can I cancel my order after I ship my phone?<label htmlFor="2"><Icon type="plus" /></label></h2>
            <p>Once you accept the offer from UpTrade, it will be considered a final transaction unless we determine that the physical condition of the device is different than the original description that was submitted. If this happens, we will provide you an updated  offer based on the value of the device. If you decline the new offer, we will return your device to you at no cost and the transaction will be cancelled.</p>
          </dd>

          <dd>
            <input type="checkbox" id="3" />
            <label htmlFor="3"><h2 className="default-h2">Is my personal information safe with UpTrade?<Icon type="plus" /></h2></label>
            <h2 className="noevent-h2">Is my personal information safe with UpTrade?<label htmlFor="3"><Icon type="plus" /></label></h2>
            <p>When you accept an offer from UpTrade, we will send you instructions on how to wipe your device of all personal information before sending it to us. We always wipe your device again during our quality inspection as a secondary measure to keep your personal data safe.</p>
          </dd>

          <dd>
            <input type="checkbox" id="4" />
            <label htmlFor="4"><h2 className="default-h2">How is the UpTrade estimate calculated?<Icon type="plus" /></h2></label>
            <h2 className="noevent-h2">How is the UpTrade estimate calculated?<label htmlFor="4"><Icon type="plus" /></label></h2>
            <p>Our team works with up to the minute data on the current market value of hundreds of smartphones on a daily basis. We use this data to provide you with the highest payout for your device with a quick payment. With the value of these devices changing almost daily, sometimes we are off on our estimates. If we lose money, then we take the loss. If your device goes for more than we anticipated, we will make sure to provide you, our customer, with a secondary payment based on final sales price. We want our customers to know that we are truly the best offer around.</p>
          </dd>
        </dl>

        <dl>
          <dt>Placing an order</dt>
          <dd>
            <input type="checkbox" id="5" />
            <label htmlFor="5"><h2 className="default-h2">Does UpTrade accept phones that are lost or stolen?<Icon type="plus" /></h2></label>
            <h2 className="noevent-h2">Does UpTrade accept phones that are lost or stolen?<label htmlFor="5"><Icon type="plus" /></label></h2>
            <p>UpTrade will not make an offer on any device that is reported lost or stolen. If we receive a device that is flagged as lost or stolen, the device will be turned over to the authorities. </p>
          </dd>

          <dd>
            <input type="checkbox" id="6" />
            <label htmlFor="6"><h2 className="default-h2">What types of electronics does UpTrade accept?<Icon type="plus" /></h2></label>
            <h2 className="noevent-h2">What types of electronics does UpTrade accept?<label htmlFor="6"><Icon type="plus" /></label></h2>
            <p>UpTrade accepts all types of smartphone devices. If you do not see your device listed, send us an email at support@UpTradeit.com for a quote. We do not currently make offers on any other type of electronics.</p>
          </dd>

          <dd>
            <input type="checkbox" id="7" />
            <label htmlFor="7"><h2 className="default-h2">Does UpTrade accept water damaged phones?<Icon type="plus" /></h2></label>
            <h2 className="noevent-h2">Does UpTrade accept water damaged phones?<label htmlFor="7"><Icon type="plus" /></label></h2>
            <p>At this time, UpTrade does not accept liquid damage. </p>
          </dd>
        </dl>

        <dl>
          <dt>Shipping</dt>
          <dd>
            <input type="checkbox" id="8" />
            <label htmlFor="8"><h2 className="default-h2">Are contents insured against loss or damage?<Icon type="plus" /></h2></label>
            <h2 className="noevent-h2">Are contents insured against loss or damage?<label htmlFor="8"><Icon type="plus" /></label></h2>
            <p>The free FedEx shipping label we provide you is insured up to $100 in case of accidental damage or theft. If you would like to increase the insured amount, you would be required to purchase a new shipping label directly through a shipping carrier such as FedEx or UPS. Please keep in mind that UpTrade will not be held responsible if the device is damaged during shipping.</p>
          </dd>

          <dd>
            <input type="checkbox" id="9" />
            <label htmlFor="9"><h2 className="default-h2">How do I prepare my device for shipment?<Icon type="plus" /></h2></label>
            <h2 className="noevent-h2">How do I prepare my device for shipment?<label htmlFor="9"><Icon type="plus" /></label></h2>
            <p>Once we make you an offer on your mobile device, we will send you an email with full instructions on mailing your device in a safe and secure fashion. If you are still unsure of anything, feel free to contact us at support@UpTradeit.com with any other questions you may have. Our support team will get back to you the same day.</p>
          </dd>
        </dl>

        <dl>
          <dt>Payment</dt>
          <dd>
            <input type="checkbox" id="10" />
            <label htmlFor="10"><h2 className="default-h2">How and when do I get paid?<Icon type="plus" /></h2></label>
            <h2 className="noevent-h2">How and when do I get paid?<label htmlFor="10"><Icon type="plus" /></label></h2>
            <p>Once we receive your device, we will perform a quality inspection of your device. This is normally completed the same day that it is received. If everything matches up to the original description, we will process your payment the next business day through the payment option of your choice. Keep in mind that choosing the traditional check option will delay your payment as it will need to be mailed to your home address.</p>
          </dd>

          <dd>
            <input type="checkbox" id="11" />
            <label htmlFor="11"><h2 className="default-h2">What methods of payment do you support?<Icon type="plus" /></h2></label>
            <h2 className="noevent-h2">What methods of payment do you support?<label htmlFor="11"><Icon type="plus" /></label></h2>
            <p>At this time, we offer two easy and convenient methods of payment: PayPal and eChecks. An eCheck is a standard check that we can email you which you can then print out and deposit into your bank account. It can be deposited through a bank teller, an atm, or even using your banking app if your bank supports it. </p>
          </dd>
        </dl>
      </div>
    )
  }
}