import * as React from "react";
import { Icon } from "antd";
import { IOrderProps } from "@/containers/order/interface/order.inerface";
import Tag from "@/components/tag";
import InspectPart from "../container/components/inspectPart";
import ResultPart from "../container/components/resultPart";
import "./listedForSale.less";

export default function() {
  const fakeProps: any = {
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
  return <ListedForSale {...fakeProps} />;
}

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
        <ResultPart />
        <InspectPart />
      </div>
    );
  }
}

// export default ListedForSale;
