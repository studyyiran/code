import * as React from 'react';
import { IOrderProps, IDeliverSatus } from '@/containers/order/interface/order.inerface';
import UPSICON from '@/images/order/upsIcon.png';
import './deliverSatus.less';
import { Modal } from 'antd';

class DeliverSatus extends React.Component<IOrderProps, IDeliverSatus> {
    constructor(props: IOrderProps) {
        super(props);
        this.state = {
            loading: false,
            visible: false
        }
    }
    public showModal = () => {
        this.setState({
            visible: true,
        });
    }
    public closeModal = () => {
        this.setState({
            visible: false,
        });
    }
    public render() {
        return (
            <div className="comp-order-deliverSatus">
                <p className="title">Delivery Status</p>
                <div className="deliverSatus-body">
                    <div className="col-1">
                        <div className="list-item">
                            <div className="date">Jan 14</div>
                            <div className="date-list">
                                <div className="date-item">
                                    <div className="time">01:32 PM</div>
                                    <div className="desc">
                                        <p className="info">A mechanical failure has delayed. We’re adjusting plans to deliver your package as quickly as possible.</p>
                                        <p className="pos">Paris, France</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="line" />
                        <div className="list-item">
                            <div className="date">Jan 14</div>
                            <div className="date-list">
                                <div className="date-item">
                                    <div className="time">01:32 PM</div>
                                    <div className="desc">
                                        <p className="info">A mechanical failure has delayed. We’re adjusting plans to deliver your package as quickly as possible.</p>
                                        <p className="pos">Paris, France</p>
                                    </div>
                                </div>
                                <div className="date-item">
                                    <div className="time">01:32 PM</div>
                                    <div className="desc">
                                        <p className="info">A mechanical failure has delayed. We’re adjusting plans to deliver your package as quickly as possible.</p>
                                        <p className="pos">Paris, France</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div>
                            <img src={UPSICON} alt="" />
                            <div>
                                <p className="name">UPS</p>
                                <p className="tel">XY1303918832FR</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div onClick={this.showModal}>Check Detail ></div>
                </div>
                <Modal
                    visible={this.state.visible}
                    title=""
                    footer={null}
                    onCancel={this.closeModal}
                    width={800}
                    wrapClassName="antd-modal-deliverSatus-body"
                >
                    <div className="antd-modal-deliverSatus-body">
                        <div className="col-2">
                            <div>
                                <img src={UPSICON} alt="" />
                                <div>
                                    <p className="name">UPS</p>
                                    <p className="tel">XY1303918832FR</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-1">
                            <div className="list-item">
                                <div className="date">Jan 14</div>
                                <div className="date-list">
                                    <div className="date-item">
                                        <div className="time">01:32 PM</div>
                                        <div className="desc">
                                            <p className="info">A mechanical failure has delayed. We’re adjusting plans to deliver your package as quickly as possible.</p>
                                            <p className="pos">Paris, France</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="line" />
                            <div className="list-item">
                                <div className="date">Jan 14</div>
                                <div className="date-list">
                                    <div className="date-item">
                                        <div className="time">01:32 PM</div>
                                        <div className="desc">
                                            <p className="info">A mechanical failure has delayed. We’re adjusting plans to deliver your package as quickly as possible.</p>
                                            <p className="pos">Paris, France</p>
                                        </div>
                                    </div>
                                    <div className="date-item">
                                        <div className="time">01:32 PM</div>
                                        <div className="desc">
                                            <p className="info">A mechanical failure has delayed. We’re adjusting plans to deliver your package as quickly as possible.</p>
                                            <p className="pos">Paris, France</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }
}

export default DeliverSatus;