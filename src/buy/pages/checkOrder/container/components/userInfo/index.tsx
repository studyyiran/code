import * as React from "react";
import "./index.less";
import { IUserInformation } from "../../../interface/order.inerface";

class UserInfo extends React.Component<IUserInformation> {
  public render() {
    return (
      <div className="comp-order-userInfo">
        <ul className="information-list">
          <li>
            <span>Shipping Address</span>
            <div className="block">
              {this.props.shippingAddress.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
            <div className="block">
              {this.props.telAndEmail.map((t, i) => (
                <span className="address-item" key={i}>
                  {t}
                </span>
              ))}
            </div>
          </li>
          <li>
            <span>Payment Method</span>
            <span>Credit card ending in</span>
            {this.props.paymentMethod.map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </li>
          <li>
            <span>Order Date</span>
            <span>{this.props.orderDate}</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default UserInfo;
