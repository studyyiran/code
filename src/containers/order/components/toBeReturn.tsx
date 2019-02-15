import * as React from 'react';
import { IOrderProps } from '@/containers/order/interface/order.inerface';
import './toBeReturn.less';
import Tag from '@/components/tag';

class ToBeReturn extends React.Component<IOrderProps> {
    public handleApprove = () => {
        this.props.order.approveRevisedPrice();
    }
    public handleReturnProduct = () => {
        this.props.order.returnProduct();
    }
    public render() {
        // const tag = {
        //     type: "success",
        //     text: "Matched"
        // }
        const tag = {
            type: "fail",
            text: "Wrong Condition"
        }
        return (
            <div className="comp-order-inspection">
                <p className="inspection-title">
                    <span>Inspection Result</span>
                    <Tag className="inspect-title-tag" {...tag} />
                </p>
                <div className="inspected-success-body" style={{ display: "none" }}>
                    <div className="col-1">
                        <div>Price Guarantee</div>
                        <div>$710</div>
                    </div>
                    <div className="col-2">
                        <p>
                            <span>Congratulations!</span>
                            <br />
                            The condition you selected matches our inspection result.
                        </p>
                    </div>
                </div>
                <div className="inspected-fail-body">
                    <div className="col-1">
                        <p>Difference</p>
                        <p>64G, Power Off, Cracks, Power Off, Cracks, Power Off, Cracks, Power Off…</p>
                    </div>
                    <div className="col-2">
                        <p>Revised Price Guarantee</p>
                        <p>$710 </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToBeReturn;