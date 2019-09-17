import * as React from "react";
import "./index.less";
import { Modal } from "antd";
import ReportModalContent from "../reportModalContent";

export default function CheckInspectDiff(props: any) {
  const { phoneConditionQuestion, inquiryInfo } = props;
  return (
    <span
      onClick={() => {
        Modal.confirm({
          icon: "",
          className: "comp-check-inspect__modal",
          centered: true,
          maskClosable: true,
          content: (
            <ReportModalContent
              phoneConditionQuestion={phoneConditionQuestion}
              inquiryInfo={inquiryInfo}
            />
          )
        });
      }}
      className="comp-check-inspect canclick"
    >{`View Inspection Result >`}</span>
  );
}
