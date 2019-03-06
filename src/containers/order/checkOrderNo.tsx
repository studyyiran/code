import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Divider, Input, Button, Form, Icon } from 'antd';
import { IOrderProps } from '@/containers/order/interface/order.inerface';
import { RouteComponentProps } from 'react-router';
import { getQueryString } from '@/utils/function';
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
    public async componentDidMount() {
        const token = getQueryString("token");
        // 存在token
        if (token) {
            // 如果可以获取到订单信息则跳转，否则停留当前页面
            const order = this.props.order
            const getOrderDetail = await order.getOrderDetailByToken(token);
            if (getOrderDetail) {
                // saveloginmes
                order.autoSaveLoginMes();
                // 自动定向到订单详情去
                this.props.history.push(`/order`);
            }
        }
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
                                onBlur={this.checkFormat}
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
                        disabled={this.state.email === "" || this.state.orderNo === ""}
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
    private checkFormat = () => {
        const email = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if (!email.test(this.state.email) && this.state.email !== "") {
            this.setState({
                validateEmail: 'error',
                emailInputHelp: <><Icon type="close-circle" />&nbsp;Please enter a valid email address</>
            });
        }
    }

    private onSubmit = async () => {
        let canSubmit = true;
        // 校验email
        const email = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if (!email.test(this.state.email)) {
            canSubmit = false;
            this.setState({
                validateEmail: 'error',
                emailInputHelp: <><Icon type="close-circle" />&nbsp;Please enter a valid email address</>
            });
        }
        if (!/^[0-9]*$/.test(this.state.orderNo)) {
            canSubmit = false;
            this.setState({
                validateOrderNo: 'error',
                orderInputHelp: 'Please enter a valid order number'
            });
        }
        if (canSubmit) {
            const b = await this.props.order.getOrderDetail(this.state.email, this.state.orderNo);
            if (b.orderNo) {
                // 根据操作记录判断CRM取消订单
                if (b.orderRecords.find(v =>
                    (v.beforeStatus === "TO_BE_SHIPPED" || v.beforeStatus === "TO_BE_RECEIVED")
                    && v.afterStatus === "TRANSACTION_FAILED")) {
                    this.setState({
                        formError: "This order has been cancelled"
                    });
                    return;
                }
                // 保存订单数据
                this.props.order.setOrderDetail(b);
                // email, orderNo 存入缓存
                this.props.order.autoSaveLoginMes();
                // 跳转订单详情
                this.props.history.push(`/order`);
            } else {
                this.setState({
                    formError: "The email address does not match the order number"
                });
            }
        }
    }
}

export default CheckOrderNo;