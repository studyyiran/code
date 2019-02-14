import * as React from 'react';
import { IOrderProps } from '@/containers/order/interface/order.inerface';
import Tag from '@/components/tag';
import './orderComplete.less';

class ListedForSale extends React.Component<IOrderProps> {
    public render() {
        // const tag = {
        //     type: "fail",
        //     text: "Wrong Condition"
        // }
        const tag = {
            type: "success",
            text: "Matched"
        }
        return (
            <div className="comp-order-lisedForSale">
                <div className="auction-result table">
                    <p>Auction Result</p>
                    <div>
                        <div>Final Sale Price</div>
                        <div>$660</div>
                        <section className="table-table">
                            <div>
                                <div>Price Guarantee <span>Paid</span></div>
                                <div>$610</div>
                            </div>
                            <div>
                                <div>Bonus <span>Paid</span></div>
                                <div>$50</div>
                            </div>
                        </section>

                    </div>
                </div>
                <div className="inspection-success-result table">
                    <p>
                        <span>Inspection Result</span>
                        <Tag className="inspect-title-tag" {...tag} />
                    </p>
                    <div>
                        <div>Price Guarantee</div>
                        <div>$710 </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListedForSale;