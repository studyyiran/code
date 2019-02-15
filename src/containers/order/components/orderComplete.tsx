import * as React from 'react';
import { Icon } from 'antd';
import { IOrderProps } from '@/containers/order/interface/order.inerface';
import Tag from '@/components/tag';
import './orderComplete.less';

class ListedForSale extends React.Component<IOrderProps> {
    public render() {
        const tag = {
            type: "fail",
            text: "Wrong Condition"
        }
        // const tag = {
        //     type: "success",
        //     text: "Matched"
        // }
        return (
            <div className="comp-order-orderComplete">
                <div className="auction-result table">
                    <p>Auction Result</p>
                    <div>
                        <div>Final Sale Price</div>
                        <div>$660</div>
                        <div className="flex">
                            <div className="col">
                                <div>
                                    <span>Price Guarantee</span>
                                    <span className="paid">
                                        Paid
                                        <Icon className="paid-check" type="check" />
                                    </span>
                                </div>
                                <div>$610</div>
                            </div>
                            <div className="col">
                                <div>
                                    <span>Bonus</span>
                                    <span className="paid">
                                        Paid
                                        <Icon className="paid-check" type="check" />
                                    </span>
                                </div>
                                <div>$50</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inspection-success-result table">
                    <p>
                        <span>Inspection Result</span>
                        <Tag className="inspect-title-tag" {...tag} />
                    </p>
                    {/* match */}
                    {tag.type === "success" && (<div>
                        <div>Price Guarantee</div>
                        <div>$710 </div>
                    </div>)}
                    {/* wrong condition */}
                    {tag.type === "fail" && (<div>
                        <div>Revised Price Guarantee</div>
                        <div style={{ color: "#FF5858" }}>$710 </div>
                        <div>Difference</div>
                        <div style={{ height: "auto" }}>iPhone Xs 64G Power Off,CracksiPhone Xs 64G Power Off,CracksiPhone Xs 64G Power Off,CracksiPhone Xs 64G Power Off,CracksiPhone Xs 64G Power Off,CracksiPhone Xs 64G Power Off,CracksiPhone Xs 64G Power Off,CracksiPhone Xs 64G Power Off,CracksiPhone Xs 64G Power Off,CracksiPhone Xs 64G Power Off,CracksiPhone Xs 64G Power Off,Cracks </div>
                    </div>)}
                </div>
            </div>
        );
    }
}

export default ListedForSale;