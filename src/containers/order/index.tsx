import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IOrderProps } from '@/containers/order/interface/order.inerface';
// import OrderPlaced from "@/containers/order/orderPlaced";
// import PackageSent from '@/containers/order/packageSent';
// import EL from '@/containers/order/packageReceived';
// import EL from '@/containers/order/InspectionCompleted';
// import EL from '@/containers/order/listForSale';
import EL from '@/containers/order/orderCompleted';
import './index.less';

@inject("order")
@observer
class Order extends React.Component<IOrderProps> {
  public componentDidMount() {
    this.props.order.getOrderDetail();
  }
  public render() {
    return (
      <div className="page-order-container">
        <EL {...this.props} />
      </div>
    )
  }
}

export default Order;