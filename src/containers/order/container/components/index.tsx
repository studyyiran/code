import React from "react";
import Tag from "@/components/tag";
import TipsIcon from "@/pages/sell/selectModelProcess/components/tipsIcon";
import "./index.less";

const priceUnit = "$";
export default function Index(props: any) {
  props = {
    order: {
      inspectionInfo: {
        // diffStatus: "fail",
        diffStatus: "success",
        differenceText: "differenceText",
        amount: "amount",
        revisedPrice: "revisedPrice",
        productName: "productName",
        differentCondition: [1, 2, 3, 4, 5]
      },
      paymentInfo: {
        priceGuaranteeStatus: "priceGuaranteeStatus",
        priceGuarantee: "priceGuarantee"
      }
    }
  };

  const inspectionInfo = props.order.inspectionInfo;
  const tag = {
    type: inspectionInfo.diffStatus,
    text: inspectionInfo.differenceText
  };
  return (
    <div className="page-difference">
      <section className="comp-inspection-result">
        <h3>Inspection Result</h3>
        <Tag className="inspect-title-tag" {...tag} />
      </section>
      <div className="content-container">
        <section className="revised-part">
          <div className="revised-line">
            <h3>Your revised offer is</h3>
            <div>
              <span>
                {priceUnit}
                {`after price`}
              </span>
            </div>
          </div>
          <div className="accept-line">
            <button className="common-button">Accept</button>
            <div className="tips">
              <span>{`< Return Device`}</span>
              <TipsIcon />
            </div>
          </div>
        </section>
        <section className="video-part">
          <p>
            We had to revise your offer based on the following results during
            our inspection process
          </p>
          <video className="comp-video" />
          <span className="tips">{`View Inspection Result >`}</span>
        </section>
      </div>
    </div>
  );
}
