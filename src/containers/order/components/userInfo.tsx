import * as React from "react";
import "./userInfo.less";
import { IUserInformation } from "@/containers/order/interface/order.inerface";

class UserInfo extends React.Component<IUserInformation> {
  public render() {
    return (
      <div className="comp-order-userInfo">
        <p className="title">Your Information</p>
        <div className="properties">
          <div>
            <div>Shipping Address</div>
            <div>
              {this.props.shippingAddress.map((t, i) => (
                <div className="address-item" key={i}>
                  {t}
                </div>
              ))}
            </div>
            <div className="telAndEmail">
              {this.props.telAndEmail.map((t, i) => (
                <div className="address-item" key={i}>
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>Payment Method</div>
            <div>
              {this.props.paymentMethod.map((t, i) => (
                <div className="address-item" key={i}>
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="specials">
            {/*<div>*/}
            {/*  <div>Order Number</div>*/}
            {/*  <div>{this.props.orderNumber}</div>*/}
            {/*</div>*/}
            <div>
              <div>Order Date</div>
              <div>{this.props.orderDate}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
