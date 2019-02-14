import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import { IOrderProps, IProgressType } from '@/containers/order/interface/order.inerface';
import ProgressBar from '@/containers/order/components/progressBar';
import DeliverSatus from '@/containers/order/components/deliverSatus';
import OrderSummary from '@/containers/order/components/orderSummary';
import Inspection from '@/containers/order/components/inspection';
import ToBeReturn from '@/containers/order/components/toBeReturn';
import ListedForSale from '@/containers/order/components/listedForSale';
import OrderComplete from '@/containers/order/components/orderComplete';
import './index.less';

@inject("order")
@observer
class Order extends React.Component<IOrderProps & RouteComponentProps<{ id: string }>> {
  public componentDidMount() {
    // 如果store的订单详情存在就不重新获取
    if (this.props.order.orderDetail.orderNo !== this.props.match.params.id) {
      this.props.order.getOrderDetail(this.props.match.params.id);
    }
  }
  public render() {
    // 根据订单状态展示不同页面
    const alreadyLoadData = !!this.props.order.orderDetail.orderNo;
    // 组件展示对象
    const ReactNodeConfig = {
      deliver: false,
      inspected: false,
      orderSummary: true,
      isToBeReturn: false,
      listedForSale: false,
      orderComplete: false
    }
    // 是否展示物流(已发货未收货，已收货未质检)
    if ((this.props.order.orderDetail.status === IProgressType.TO_BE_RECEIVED) || (this.props.order.orderDetail.status === IProgressType.TO_BE_INSPECTED)) {
      ReactNodeConfig.deliver = true;
      ReactNodeConfig.orderSummary = false;
    }
    // 是否展示质检模块
    if (this.props.order.orderDetail.status === IProgressType.DIFFERENCE_INSPECTED) {
      ReactNodeConfig.inspected = true;
      ReactNodeConfig.orderSummary = false;
    }
    // 是否展示退货模块
    if (this.props.order.orderDetail.status === IProgressType.TO_BE_RETURNED || this.props.order.orderDetail.status === IProgressType.TRANSACTION_FAILED) {
      ReactNodeConfig.isToBeReturn = true;
      ReactNodeConfig.orderSummary = false;
    }
    // 展示拍卖模块
    if (this.props.order.orderDetail.status === IProgressType.LISTED_FOR_SALE) {
      ReactNodeConfig.listedForSale = true;
      ReactNodeConfig.orderSummary = false;
    }
    // 展示订单完成模块
    if (this.props.order.orderDetail.status === IProgressType.TRANSACTION_SUCCEED) {
      ReactNodeConfig.orderComplete = true;
      ReactNodeConfig.orderSummary = false;
    }
    return (
      <div className="page-order-container">
        <section>
          <ProgressBar data={this.props.order.progressType} />
          <div className="page-order-body">
            {ReactNodeConfig.deliver && <DeliverSatus {...this.props} />}
            {ReactNodeConfig.inspected && <Inspection {...this.props} />}
            {ReactNodeConfig.isToBeReturn && <ToBeReturn {...this.props} />}
            {ReactNodeConfig.listedForSale && < ListedForSale {...this.props} />}
            {ReactNodeConfig.orderComplete && <OrderComplete {...this.props} />}
            {
              alreadyLoadData && (<OrderSummary order={this.props.order} normal={ReactNodeConfig.orderSummary} />)
            }
          </div>

        </section>
      </div>
    )
  }
}

export default Order;