import * as React from 'react';
import { IOrderProps } from '@/containers/order/interface/order.inerface';
import './inspection.less';
import Tag from '@/components/tag';

class Inspection extends React.Component<IOrderProps> {
  public handleApprove = () => {
    this.props.order.approveRevisedPrice();
  }
  public handleReturnProduct = () => {
    this.props.order.returnProduct();
  }
  public render() {
    const inspectionInfo = this.props.order.inspectionInfo;
    const tag = {
      type: inspectionInfo.diffStatus,
      text: inspectionInfo.differenceText
    };
    // 是否match
    const isMatch = inspectionInfo.diffStatus === "success";
    return (
      <div className="comp-order-inspection">
        <p className="inspection-title">
          <span>Inspection Result</span>
          <Tag className="inspect-title-tag" {...tag} />
        </p>
        {isMatch && (<div className="inspected-success-body">
          <div className="col-1">
            <div>Price Guarantee</div>
            <div>${inspectionInfo.amount}</div>
          </div>
          <div className="col-2">
            <p>
              <span>Congratulations!</span>
              <br />
              The condition you selected matches our inspection result.
                        </p>
          </div>
        </div>)}
        {!isMatch && (<div className="inspected-fail-body">
          <div className="col-1">
            <p>Difference</p>
            <p>
              {inspectionInfo.productName !== "" && (
                <>
                  {inspectionInfo.productName}
                  <br />
                </>
              )}
              {inspectionInfo.differentCondition.join(",")}
            </p>
          </div>
          <div className="col-2">
            <p>Revised Price Guarantee</p>
            <p>${inspectionInfo.revisedPrice} </p>
          </div>
          <div className="col-3">
            <div className="approve-btn" onClick={this.handleApprove}>APPROVE REVISED PRICE</div>
            <div className="unapprove-btn" onClick={this.handleReturnProduct}>Return Product</div>
          </div>
        </div>)
        }
      </div>
    );
  }
}

export default Inspection;