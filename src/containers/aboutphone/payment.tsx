import * as React from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Row, Col, Collapse, Form, Input, message } from 'antd';
import Layout from '@/containers/aboutphone/layout';
import { IPaymentProps, IPaymentStates, EPayType } from './interface/index.interface';
import './payment.less';

const Panel = Collapse.Panel;
const leftHeader = <div className='paypal-bg' />;
@inject('yourphone')
@observer
class YourPayment extends React.Component<IPaymentProps, IPaymentStates> {

  public readonly state: Readonly<IPaymentStates> = {
    isLeftOnEdit: false,
    isRightOnEdit: false,
    activeSide: this.props.yourphone.payment
  }

  public render() {
    let leftContent: React.ReactNode;
    let rightContent: React.ReactNode;

    const { getFieldDecorator } = this.props.form;

    const { paypal, echeck } = this.props.yourphone;

    // paypal的结构
    switch (this.state.isLeftOnEdit) {
      case false:
        leftContent = (
          <div className="left-wrapper">
            <p className="description">Confirm your paypal address so we can send you the payment of ryour phone.</p>
            <p className="email">
              <span className="title">Paypal email address</span>
              <br />
              <span className="address">{paypal.email}</span>
            </p>
            <p className="difference" onClick={this.changeEditState.bind(this, 'paypal')} >My email for Paypal is not the same as contact email</p>
          </div>
        );
        break;

      case true:
        leftContent = (
          <div className="left-wrapper">
            <p className="description">Confirm your paypal address so we can send you the payment of ryour phone.</p>
            <div className="form-wrapper">
              <Form layout="vertical">
                <Form.Item label="Paypal email address">
                  <Input />
                </Form.Item>
                <Form.Item label="Confirm Paypal email address">
                  <Input />
                </Form.Item>
              </Form>
            </div>
            <p className="difference" onClick={this.changeEditState.bind(this, 'paypal')} >My email for Paypal is the same as contact email</p>
          </div>
        );
        break;
    }

    // eCheck的结构
    switch (this.state.isRightOnEdit) {
      case false:
        rightContent = (
          <div className="right-wrapper">
            <p className="description">Confirm your address so we can send you the check of your phone.</p>
            <p className="name">
              <span className="title">Name</span>
              <br />
              <span className="address">{`${echeck.firstName} ${echeck.lastName}`}</span>
            </p>
            <p className="email">
              <span className="title">eCheck email address</span>
              <br />
              <span className="address">{echeck.email}</span>
            </p>
            <p className="difference" onClick={this.changeEditState.bind(this, 'check')} >The name and email for eCheck is not the same as contact information</p>
          </div>
        );
        break;
      case true:
        rightContent = (
          <div className="right-wrapper">
            <p className="description">Confirm your address so we can send you the check of your phone.</p>
            <div className="form-wrapper">
              <Form layout="vertical">
                <Form.Item label="First Name">
                  {
                    getFieldDecorator('firstName', {
                      rules: [
                        {
                          required: true,
                          message: "Please enter a valid first name."
                        }
                      ],
                      initialValue: echeck.firstName,
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="Last Name">
                  {
                    getFieldDecorator('lastName', {
                      rules: [
                        {
                          required: true,
                          pattern: /\w+/,
                          message: "Please enter a valid last name."
                        }
                      ],
                      initialValue: echeck.lastName
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="eCheck email address">
                  {
                    getFieldDecorator('email', {
                      rules: [
                        {
                          required: true,
                          type: 'email',
                          message: "Please enter a valid email."
                        }
                      ],
                      initialValue: echeck.email
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="confirm eCheck email address">
                  {
                    getFieldDecorator('email_confirm', {
                      rules: [
                        {
                          required: true,
                          type: 'email',
                          message: "Please enter a valid email."
                        }
                      ],
                      initialValue: echeck.email
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
              </Form>
            </div>
            <p className="difference" onClick={this.changeEditState.bind(this, 'check')}>The name and email for eCheck is the same as contact information</p>
          </div>
        );
        break;
    }

    const paymentHTML = (
      <Row gutter={30} style={{ paddingTop: '42px' }}>
        <Col span={12}>
          <Collapse onChange={this.handlePaypalCollapseExtend} className={classnames({ active: this.props.yourphone.payment === EPayType.PAYPAL })}>
            <Panel
              header={leftHeader}
              showArrow={false}
              key={EPayType.PAYPAL}
            >
              {leftContent}
            </Panel>
          </Collapse>
        </Col>
        <Col span={12}>
          <Collapse onChange={this.handleEcheckCollapseExtend} className={classnames({ active: this.props.yourphone.payment === EPayType.ECHECK })}>
            <Panel
              header={<h3>eCheck</h3>}
              showArrow={false}
              key={EPayType.ECHECK}
            >
              {rightContent}
            </Panel>
          </Collapse>
        </Col>
      </Row>
    )

    return (
      <div className="page-payment-container">
        {
          !this.props.hideLayout
            ? <Layout nextCb={this.handleNext} >{paymentHTML}</Layout>
            : (paymentHTML)
        }
      </div>
    );
  }

  private handlePaypalCollapseExtend = (type: string[]) => {
    if (this.props.yourphone.payment === EPayType.PAYPAL && !type.length) {
      this.props.yourphone.payment = '';
    }

    if (!type.length) {
      return;
    }

    this.props.yourphone.payment = type[0];
  }

  private handleEcheckCollapseExtend = (type: string[]) => {
    if (this.props.yourphone.payment === EPayType.ECHECK && !type.length) {
      this.props.yourphone.payment = '';
    }

    if (!type.length) {
      return;
    }

    this.props.yourphone.payment = type[0];
  }

  private changeEditState = (type: string): void => { // 切换成可编辑状态
    if (type === 'paypal') {
      this.setState({ isLeftOnEdit: !this.state.isLeftOnEdit });
    }

    if (type === 'check') {
      this.setState({ isRightOnEdit: !this.state.isRightOnEdit });
    }
  }

  private handleNext = () => {
    // 必须要选中一种支付方式
    const { payment } = this.props.yourphone;
    if (payment === '') {
      message.info('how would you like to pay?');
      return;
    }

    this.props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      // 判断两次输入的email是否一致
      const { email, email_confirm, firstName, lastName } = values;
      if (email !== email_confirm) {
        this.props.form.setFields({
          email_confirm: {
            value: email_confirm,
            errors: [new Error("The emails don't matach.")]
          }
        });
        return;
      }

      switch (this.state.activeSide) {
        case 'left':
          this.props.yourphone.paypal = { email: email };
          break;
        case 'right':
          this.props.yourphone.echeck = {
            firstName,
            lastName,
            email
          }
          break;
      }
      
      this.props.history.push('/sell/yourphone/done');
    });
  }
}

export default Form.create()(YourPayment);