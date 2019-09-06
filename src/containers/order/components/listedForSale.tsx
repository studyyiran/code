import * as React from "react";
import { Icon } from "antd";
import { IOrderProps } from "@/containers/order/interface/order.inerface";
import Tag from "@/components/tag";
import InspectPart from "../container/components/inspectPart";
import ResultPart from "../container/components/resultPart";
import "./listedForSale.less";

export default function(props: any) {
  const { inquiryInfo, paymentInfo } = props;
  const { submitted, revised, isDifferent, differentReason } = inquiryInfo;
  const innerProps = {
    order: {
      inquiryInfo: {
        isDifferent: isDifferent,
        differentReason,
        price: revised.amount
      },
      paymentInfo
    }
  };
  return <ListedForSale {...innerProps} />;
}

class ListedForSale extends React.Component<any> {
  public render() {
    const { inquiryInfo, paymentInfo } = this.props.order;
    const { isDifferent, differentReason, price } = inquiryInfo;
    const tag = {
      type: isDifferent,
      text: differentReason
    };
    // const paymentInfo = this.props.order.paymentInfo;
    return (
      <div className="comp-order-sale">
        <ResultPart {...inquiryInfo} {...paymentInfo} />
        <InspectPart {...inquiryInfo} />
      </div>
    );
  }
}

// export default ListedForSale;
