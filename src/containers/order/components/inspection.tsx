import * as React from "react";
import { IOrderProps } from "@/containers/order/interface/order.inerface";
import "./inspection.less";
import Tag from "@/components/tag";
import TipsIcon from "@/pages/sell/selectModelProcess/components/tipsIcon";
import CheckInspectDiff from "../container/components/checkInspectDiff";

const priceUnit = "$";
export default function InspectionWrapper(props: any) {
  const { inquiryInfo } = props;
  const { submitted, revised, isDifferent, differentReason } = inquiryInfo;
  const innerProps = {
    order: {
      inquiryInfo: {
        isDifferent: isDifferent,
        differentReason,
        price: revised ? revised.amount : submitted.amount
      }
    }
  };
  return <Inspection {...innerProps} />;
}
class Inspection extends React.Component<any> {
  public handleApprove = () => {
    this.props.order.approveRevisedPrice();
  };
  public handleReturnProduct = () => {
    this.props.order.returnProduct();
  };
  public render() {
    const { inquiryInfo } = this.props.order;
    const { isDifferent, differentReason, price } = inquiryInfo;

    function renderAcceptLine() {
      return (
        <div className="accept-line">
          <button className="common-button">Accept</button>
          <div className="tips">
            <span>{`< Return Device`}</span>
            <TipsIcon />
          </div>
        </div>
      );
    }
    // 是否match
    return (
      <div className="page-difference">
        <section className="line-with-title">
          <h3>Inspection Result</h3>
          <Tag status={isDifferent ? "fail" : "success"}>{differentReason || 'Matched'}</Tag>
        </section>
        {!isDifferent && (
          <section>
            <ul className="information-list">
              <li className="price-view">
                <span>Price Guarantee</span>
                <span data-matched={isDifferent ? "false" : "true"}>
                  {priceUnit}
                  {price}
                </span>
              </li>
              <li>
                <span>Congratulations!</span>
                <span>
                  The condition you selected matches our inspection result.
                </span>
              </li>
            </ul>
          </section>
        )}
        {isDifferent && (
          <div className="content-container">
            <section className="revised-part">
              <div className="revised-line">
                <h3>Your revised offer is</h3>
                <div>
                  <span>
                    {priceUnit}
                    {price}
                  </span>
                </div>
              </div>
              {renderAcceptLine()}
            </section>
            <section className="video-part">
              <p>
                We had to revise your offer based on the following results
                during our inspection process
              </p>
              <video className="comp-video" />
              <CheckInspectDiff />
              <div className="mb-ele">{renderAcceptLine()}</div>
            </section>
          </div>
        )}
        {/*{!isMatch && (*/}
        {/*  <div className="inspected-fail-body">*/}
        {/*    <div className="col-1">*/}
        {/*      <p>Difference</p>*/}
        {/*      <p>*/}
        {/*        {inspectionInfo.productName !== "" && (*/}
        {/*          <>*/}
        {/*            {inspectionInfo.productName}*/}
        {/*            <br />*/}
        {/*          </>*/}
        {/*        )}*/}
        {/*        {inspectionInfo.differentCondition.join(",")}*/}
        {/*        {this.props.order.orderDetail.orderItem.notice &&*/}
        {/*          ", " + this.props.order.orderDetail.orderItem.notice}*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*    <div className="col-2">*/}
        {/*      <p>Revised Price Guarantee</p>*/}
        {/*      <p>${inspectionInfo.revisedPrice} </p>*/}
        {/*    </div>*/}
        {/*    <div className="col-3">*/}
        {/*      <div className="approve-btn" onClick={this.handleApprove}>*/}
        {/*        APPROVE REVISED PRICE*/}
        {/*      </div>*/}
        {/*      <div className="unapprove-btn" onClick={this.handleReturnProduct}>*/}
        {/*        Return Product*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    );
  }
}

// export default Inspection;
