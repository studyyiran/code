import * as React from 'react';
import "./machineInfo.less";
import { IMachineInfo } from '@/containers/order/interface/order.inerface';

class MachineInfo extends React.Component<IMachineInfo>{
    public render() {
        return (
            <div className="comp-order-machineInfo">
                <p className="title">Your Phone</p>
                <div className="properties">
                    <div>
                        <div>Model</div>
                        <div>{this.props.model}</div>
                    </div>
                    <div>
                        <div>Carrier</div>
                        <div>{this.props.carrier}</div>
                    </div>
                    <div>
                        <div>Condition</div>
                        <div>{this.props.condition}</div>
                    </div>
                </div>
                <div className="line" />
                <p className="total">
                    <span>Guaranteed Price</span>
                    <span>${this.props.guaranteedPrice}</span>
                </p>
            </div>
        );
    }
}

export default MachineInfo;