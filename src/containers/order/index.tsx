import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IOrderProps, IProgressType } from '@/containers/order/interface/order.inerface';
import ProgressBar from '@/containers/order/components/progressBar';
import MachineInfo from '@/containers/order/components/machineInfo';
import DeliverSatus from '@/containers/order/components/deliverSatus';
import UserInfo from '@/containers/order/components/userInfo';
import './index.less';

@inject("order")
@observer
class Order extends React.Component<IOrderProps> {
  public componentDidMount() {
    this.props.order.getOrderDetail("1001");
  }
  public render() {
    // 根据订单状态展示不同页面
    const alreadyLoadData = !!this.props.order.orderDetail.orderNo;
    // 组件展示对象
    const ReactNodeConfig = {
      deliver: false
    }
    // 是否展示物流(已发货未收货，已收货未质检)
    if ((this.props.order.orderDetail.status === IProgressType.TO_BE_RECEIVED) || (this.props.order.orderDetail.status === IProgressType.TO_BE_INSPECTED)) {
      ReactNodeConfig.deliver = true;
    }
    return (
      <div className="page-order-container">
        <section>
          <ProgressBar data={this.props.order.progressType} />
          {ReactNodeConfig.deliver && <DeliverSatus {...this.props} />}
          {
            alreadyLoadData && (<>
              <p>Order Summary</p>
              <div className="info-container">
                <MachineInfo {...this.props.order.machineInfo} />
                <UserInfo {...this.props.order.userInformation} />
              </div>
            </>)
          }
        </section>
      </div>
    )
  }
}

export default Order;