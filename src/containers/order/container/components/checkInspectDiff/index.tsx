import * as React from "react";
import "./index.less";
import ReportModalContent from "../reportModalContent";
import Modal from "@/components/modal";

export default function CheckInspectDiff(props: any) {
  const { phoneConditionQuestion, inquiryInfo } = props;
  return (
    <span
      onClick={() => {
        (Modal as any).confirm({
          icon: "",
          className: "comp-check-inspect__modal",
          centered: true,
          maskClosable: true,
          children: (
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
