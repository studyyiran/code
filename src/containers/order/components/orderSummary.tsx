import * as React from "react";
import UserInfo from '@/containers/order/components/userInfo';
import MachineInfo from '@/containers/order/components/machineInfo';
import { IOrderProps, IOrderSummaryState } from '@/containers/order/interface/order.inerface';
import ArrowToBottom from '@/images/order/arrowToBottom.png';
import ArrowToTop from '@/images/order/arrowToTop.png';
import "./orderSummary.less";

class OrderSummary extends React.Component<IOrderProps & { normal?: boolean }, IOrderSummaryState>{
    constructor(props: IOrderProps & { normal?: boolean }) {
        super(props);
        this.state = {
            isOpen: !!props.normal,
            normal: !!props.normal
        }
    }
    public openOrder = () => {
        this.setState({
            isOpen: true
        })
    }
    public closeOrder = () => {
        this.setState({
            isOpen: false
        })
    }
    public render() {
        return (
            <div className={"comp-order-summary" + ((this.state.isOpen || this.state.normal) ? " isOpened" : "")}>
                <p>Order Summary</p>
                <div className="info-container">
                    <MachineInfo productName={this.props.order.orderDetail.orderItem.productName} {...this.props.order.machineInfo} />
                    <UserInfo {...this.props.order.userInformation} />
                    {(!this.state.normal && this.state.isOpen) && <div className="close-btn">
                        <img src={ArrowToTop} alt="" onClick={this.closeOrder} />
                    </div>}
                </div>
                {(!this.state.normal && !this.state.isOpen) && <div className="open-btn">
                    <img src={ArrowToBottom} alt="" onClick={this.openOrder} />
                </div>}
            </div>
        );
    }
}

export default OrderSummary;