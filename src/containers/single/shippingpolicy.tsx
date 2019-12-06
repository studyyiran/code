import * as React from "react";
import "./blog.less";
import "./terms.less";
import { inject, observer } from "mobx-react";
import { ICommonProps } from "store/interface/common.interface";
@inject("common")
@observer
export default class Broken extends React.Component<ICommonProps> {
  public render() {
    const staticOffice = this.props.common.staticOffice;
    return (
      <div className="page-privacy-policy-container">
        <h1>Shipping Policy</h1>
        <p>
          UP Trade Technologies Incorporated ("we" and "us") is the operator of
          (https://uptradeit.com) ("Website"). By placing an order through this
          Website you will be agreeing to the terms below. These are provided to
          ensure both parties are aware of and agree upon this arrangement to
          mutually protect and set expectations on our service.
        </p>
        <h2>General</h2>
        <p>
          Subject to stock availability. We try to maintain accurate stock
          counts on our website but from time-to-time there may be a stock
          discrepancy and we will not be able to fulfill all your items at time
          of purchase. In this instance, we will fulfill the available products
          to you, and contact you about whether you would prefer to await
          restocking of the backordered item or if you would prefer for us to
          process a refund.
        </p>
        <h2>Shipping Costs</h2>
        <p>
          Shipping costs are calculated during checkout based on weight,
          dimensions and destination of the items in the order. Payment for
          shipping will be collected with the purchase. This price will be the
          final price for shipping cost to the customer.
        </p>
        <h2 className='h2-sub-title'>Returns</h2>
        <h2>Return Due To Change Of Mind</h2>
        <p>
          UP Trade Technologies Incorporated will happily accept returns due to
          change of mind as long as a request to return is received by us within
          30 days of receipt of item and are returned to us in original
          packaging, unused and in resellable condition.
        </p>
        <h2>Warranty Returns</h2>
        <p>
          UP Trade Technologies Incorporated will happily honor any valid
          warranty claims, provided a claim is submitted within 90 days of
          receipt of items. Customers will be required to pre-pay the return
          shipping, however we will reimburse you upon successful warranty
          claim. Upon return receipt of items for warranty claim, you can expect
          UP Trade Technologies Incorporated to process your warranty claim
          within 7 days. Once warranty claim is confirmed, you will receive the
          choice of:
        </p>
        <ul>
          <li>refund to your payment method</li>
          <li>a refund in store credit</li>
          <li>a replacement item sent to you (if stock is available)</li>
        </ul>
        <h2 className='h2-sub-title'>Delivery Terms</h2>
        <h2>Transit Time </h2>
        <p>
          We provide shipping within the Contiguous United States (48). Domestic
          shipments are typically in transit for 2 - 8 days.
        </p>
        <h2>Dispatch Time</h2>
        <p>
          Orders are usually dispatched within 2 business days of payment of
          order Our warehouse operates on Monday - Thursday during standard
          business hours, except on national holidays at which time the
          warehouse will be closed. In these instances, we take steps to ensure
          shipment delays will be kept to a minimum.
        </p>
        <h2>Change Of Delivery Address</h2>
        <p>
          For change of delivery address requests, we are able to change the
          address at any time before the order has been dispatched.
        </p>
        <h2>P.O. Box Shipping</h2>
        <p>
          UP Trade Technologies Incorporated will ship to P.O. box addresses
          using postal services only. We are unable to offer couriers services
          to these locations.
        </p>
        <h2>Military Address Shipping</h2>
        <p>
          We are able to ship to military addresses using USPS. We are unable to
          offer this service using courier services.
        </p>
        <h2>Items Out Of Stock</h2>
        <p>
          If an item is out of stock, we will cancel and refund the out-of-stock
          items and dispatch the rest of the order.
        </p>
        <h2>Delivery Time Exceeded</h2>
        <p>
          If delivery time has exceeded the forecasted time, please contact us
          so that we can conduct an investigation
        </p>
        <h2>Tracking Notifications</h2>
        <p>
          Upon dispatch, customers will receive a tracking link from which they
          will be able to follow the progress of their shipment based on the
          latest updates made available by the shipping provider.
        </p>
        <h2>Parcels Damaged In Transit</h2>
        <p>
          If you find a parcel is damaged in-transit, if possible, please reject
          the parcel from the courier and get in touch with our customer
          service. If the parcel has been delivered without you being present,
          please contact customer service with next steps.
        </p>
        <h2 className='h2-sub-title'>Duties & Taxes</h2>
        <h2>Sales Tax</h2>
        <p>
          Sales tax has already been applied to the price of the goods as
          displayed on the website
        </p>
        <h2>Cancellations</h2>
        <p>
          If you change your mind before you have received your order, we are
          able to accept cancellations at any time before the order has been
          dispatched. If an order has already been dispatched, please refer to
          our refund policy.
        </p>
        <h2>Insurance</h2>
        <p>
          Parcels are insured for loss and damage up to the value as stated by
          the courier.
        </p>
        <h2>Process for parcel damaged in-transit</h2>
        <p>
          We will process a refund or replacement as soon as the courier has
          completed their investigation into the claim.
        </p>
        <h2>Process for parcel lost in-transit</h2>
        <p>
          We will process a refund or replacement as soon as the courier has
          conducted an investigation and deemed the parcel lost.
        </p>
        <h2>Customer service</h2>
        <p>
          UP Trade welcomes your questions or comments regarding this Statement
          of Privacy. If you believe that UP Trade has not adhered to this
          Statement, please contact UP Trade at:
        </p>
        {staticOffice && (
          <p>
            UP Trade Technologies, Incorporated
            <br />
            {staticOffice.street}
            <br />
            {staticOffice.city}, {staticOffice.state} {staticOffice.zipCode}
            <br />
          </p>
        )}
        <p>
          For all customer service enquiries, please email us at:
          <br />
          <a href={"http://uptradeit.com/contact"}>
            http://uptradeit.com/contact
          </a>
          <br />
          support@uptradeit.com
        </p>
        <hr />
        <p>Effective as of February 20, 2019</p>
      </div>
    );
  }
}
