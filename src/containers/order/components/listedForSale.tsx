import * as React from "react";
import { Icon } from "antd";
import { IOrderProps } from "containers/order/interface/order.inerface";
import Tag from "components/tag";
import InspectPart from "../container/components/inspectPart";
import ResultPart from "../container/components/resultPart";
import "../container/common.less";

// 这应该是待上架的组件.
// 这次需求删除了Auction模块.并merge

export default function ListedForSaleWrapper(props: any) {
  const {
    inquiryInfo,
    paymentInfo,
    phoneConditionQuestion,
    containInsuranceFee
  } = props;
  const { submitted, revised, isDifferent, differentReason } = inquiryInfo;
  const innerProps = {
    inquiryInfo: {
      isDifferent: isDifferent,
      differentReason,
      price: revised.amount,
      revised,
      submitted
    },
    paymentInfo,
    phoneConditionQuestion: phoneConditionQuestion
  };
  return (
    <ListedForSale {...innerProps} containInsuranceFee={containInsuranceFee} />
  );
}

class ListedForSale extends React.Component<any> {
  public render() {
    // debugger;
    const { inquiryInfo, paymentInfo, phoneConditionQuestion, containInsuranceFee } = this.props;
    const { isDifferent, differentReason, price } = inquiryInfo;
    const tag = {
      type: isDifferent,
      text: differentReason
    };
    // const paymentInfo = this.props.order.paymentInfo;
    return (
      <div>
        {/*两个inspectPart里面 只有这个才有可能需要渲染tips */}
        {/*<ResultPart {...inquiryInfo} {...paymentInfo} />*/}
        <InspectPart
          containInsuranceFee={containInsuranceFee}
          paymentInfo={paymentInfo}
          inquiryInfo={inquiryInfo}
          phoneConditionQuestion={phoneConditionQuestion}
        />
      </div>
    );
  }
}

// export default ListedForSale;
