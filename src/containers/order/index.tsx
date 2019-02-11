import * as React from 'react';
// import OrderPlaced from "@/containers/order/orderPlaced";
// import PackageSent from '@/containers/order/packageSent';
// import EL from '@/containers/order/packageReceived';
// import EL from '@/containers/order/InspectionCompleted';
// import EL from '@/containers/order/listForSale';
import EL from '@/containers/order/orderCompleted';
import './index.less';

export default class Order extends React.Component<{ route: { [key: string]: any } }> {
  public render() {
    return (
      <div className="page-order-container">
        <EL />
      </div>
    )
  }
}