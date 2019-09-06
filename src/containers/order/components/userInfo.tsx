import * as React from "react";
import "./userInfo.less";
import { IUserInformation } from "@/containers/order/interface/order.inerface";

class UserInfo extends React.Component<IUserInformation> {
  public render() {
    return (
      <div className="comp-order-userInfo">
        <div className="properties">
          <div>
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
                {this.props.paymentMethod.map((t, i) => (
                  <span key={i}>
                    {t}
                  </span>
                ))}
              </li>
              <li>
                <span>Order Date</span>
                <span>{this.props.orderDate}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
