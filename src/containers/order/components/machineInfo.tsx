import * as React from "react";
import "./machineInfo.less";
import { IMachineInfo } from "@/containers/order/interface/order.inerface";

class MachineInfo extends React.Component<
  IMachineInfo & { productName: string }
> {
  public render() {
    return (
      <div className="comp-order-machineInfo">
        <div className="properties">
          <ul className="information-list">
            <li>
              <span>Model</span>
              <span>{this.props.productName}</span>
            </li>
            {this.props.carrier !== "" && (
              <li>
                <span>Carrier</span>
                <span>{this.props.carrier}</span>
              </li>
            )}
          </ul>
          <div className="line" />
          <p className="total">
            <span>subTotal</span>
            <span>{this.props.guaranteedPrice}</span>
          </p>
          {/*{*/}
          {/*    this.props.condition !== "" && (*/}
          {/*        <div>*/}
          {/*            <div>Condition</div>*/}
          {/*            <div>{this.props.condition}</div>*/}
          {/*        </div>*/}
          {/*    )*/}
          {/*}*/}
        </div>
      </div>
    );
  }
}

export default MachineInfo;
