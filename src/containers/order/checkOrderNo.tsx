import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Divider, Input, Button, Form } from 'antd';
import { IOrderProps } from '@/containers/order/interface/order.inerface';
import { RouteComponentProps } from 'react-router';
import './checkOrderNo.less';

@inject("order")
@observer
class CheckOrderNo extends React.Component<IOrderProps & RouteComponentProps> {
    public state = {
        email: '',
        validateEmail: undefined,
        emailInputHelp: '',
        orderNo: '',
        validateOrderNo: undefined,
        orderInputHelp: '',
        formError: ''
    }
    public render() {
        return (
            <div className="page-checkOrder-container">
                <p className="title">Check Your Order</p>
                <Divider />
                <div className="form">
                    <Form>
                        <div className="check-label">Email on your order</div>
                        <Form.Item
                            validateStatus={this.state.validateEmail}
                            help={this.state.emailInputHelp}
                        >
                            <Input
                                value={this.state.email}
                                type="email"
                                onChange={this.handleChangeEmail}
                                size="large"
                            />
                        </Form.Item>
                        <div className="check-label">Order number</div>
                        <Form.Item
                            validateStatus={this.state.validateOrderNo}
                            help={this.state.orderInputHelp}
                        >
                            <Input
                                value={this.state.orderNo}
                                onChange={this.handleChangeOrderNo}
                                size="large"
                            />
                        </Form.Item>
                    </Form>
                    {
                        this.state.formError !== "" && (<div className="form-error">
                            {this.state.formError}
                        </div>)
                    }
                    <Button
                        size="large"
                        type="primary"
                        style={{ width: 400 }}
                        onClick={this.onSubmit}
                    >CHECK ORDER</Button>
                </div>
            </div>
        );
    }
    /**
     * email change event
     */
    private handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {


        const state = {
            email: e.target.value,
            validateEmail: undefined,
            emailInputHelp: ''
        }
        this.setState(state);
        return true;
    }
    /**
     * orderNo change event
     */
    private handleChangeOrderNo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const state = {
            orderNo: e.target.value,
            validateOrderNo: undefined,
            orderInputHelp: ''
        }
        this.setState(state);
    }

    private onSubmit = async () => {
        let canSubmit = true;
        // 校验email
        const email = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if (!email.test(this.state.email)) {
            canSubmit = false;
            this.setState({
                validateEmail: 'error',
                emailInputHelp: 'Please enter a valid email address'
            });
        }
        if (this.state.orderNo === "") {
            canSubmit = false;
            this.setState({
                validateOrderNo: 'error',
                orderInputHelp: 'Please enter a valid order number'
            });
        }
        if (canSubmit) {
            const b = await this.props.order.getOrderDetail(this.state.email, this.state.orderNo);
            if (b.orderNo) {
                this.props.order.orderDetail = b;
                // 需要处理订单取消
                console.error("这里需要处理订单取消的");
                this.props.history.push(`/order/${this.state.orderNo}`);
            } else {
                this.setState({
                    formError: "just a error"
                });
            }
        }
    }
}

export default CheckOrderNo;