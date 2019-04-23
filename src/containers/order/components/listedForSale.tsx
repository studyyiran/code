import * as React from 'react';
import { Icon } from 'antd';
import { IOrderProps } from '@/containers/order/interface/order.inerface';
import Tag from '@/components/tag';
import './listedForSale.less';

class ListedForSale extends React.Component<IOrderProps> {
  public render() {
    const inspectionInfo = this.props.order.inspectionInfo;
    const tag = {
      type: inspectionInfo.diffStatus,
      text: inspectionInfo.differenceText
    };
    const paymentInfo = this.props.order.paymentInfo;
    return (
      <div className="comp-order-lisedForSale">
        <div className="auction-result table">
          <p>Auction Result</p>
          <div>
            <div>Final Sale Price</div>
            <div>Pending</div>
            <div>Price Guarantee
                            {
                paymentInfo.priceGuaranteeStatus && (
                  <span className="paid">
                    Paid
                      <Icon className="paid-check" type="check" />
                  </span>
                )
              }
              {
                !paymentInfo.priceGuaranteeStatus && (
                  <span className="not-paid">To Be Paid</span>
                )
              }
            </div>
            <div>${paymentInfo.priceGuarantee}</div>
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
            <div>${inspectionInfo.amount}</div>
          </div>)}
          {/* wrong condition */}
          {tag.type === "fail" && (<div>
            <div>Revised Price Guarantee</div>
            <div style={{ color: "#FF5858" }}>${inspectionInfo.revisedPrice}</div>
            <div>Difference</div>
            <div style={{ height: "auto" }}>
              {inspectionInfo.productName !== "" && (
                <>
                  {inspectionInfo.productName}
                  <br />
                </>
              )}
              {inspectionInfo.differentCondition.join(",")}
            </div>
          </div>)}
        </div>
      </div>
    );
  }
}

export default ListedForSale;