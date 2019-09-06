import * as React from "react";
import { Icon } from "antd";
import { IOrderProps } from "@/containers/order/interface/order.inerface";
import Tag from "@/components/tag";
import InspectPart from "../container/components/inspectPart";
import ResultPart from "../container/components/resultPart";
import "./listedForSale.less";

export default function(props: any) {
  const { inquiryInfo } = props;
  const { submitted, revised, isDifferent, differentReason } = inquiryInfo;
  const innerProps = {
    order: {
      inquiryInfo: {
        isDifferent: isDifferent,
        differentReason,
        price: revised.amount
      }
    }
  };
  return <ListedForSale {...innerProps} />;
}

class ListedForSale extends React.Component<any> {
  public render() {
    const { inquiryInfo } = this.props.order;
    const { isDifferent, differentReason, price } = inquiryInfo;
    const tag = {
      type: isDifferent,
      text: differentReason
    };
    // const paymentInfo = this.props.order.paymentInfo;
    return (
      <div className="comp-order-lisedForSale">
        <ResultPart />
        <InspectPart {...inquiryInfo} />
      </div>
    );
  }
}

// export default ListedForSale;
