import * as React from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Row, Col, Collapse, Form, Input, message } from 'antd';
import Layout from '@/containers/aboutphone/layout';
import { IPaymentProps, IPaymentStates, EPayType } from './interface/index.interface';
import { paymentPageValidate } from '@/containers/aboutphone/pageValidate';
import yourphoneStore from './store/yourphone.store';
import './payment.less';

const Panel = Collapse.Panel;
const leftHeader = <div className='paypal-bg' />;

/** 
 * 根据yourphone的payment来判断用户选择哪种收款方式： PAYPAL | ECHECK
 */

@inject('yourphone', 'user')
@observer
class YourPayment extends React.Component<IPaymentProps, IPaymentStates> {

  public readonly state: Readonly<IPaymentStates> = {
    activeSide: this.props.yourphone.payment
  }

  public componentDidMount() {
    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;
    if (!paymentPageValidate()) {
      this.props.history.push('/sell/account');
      return;
    }

    if (typeof this.props.onRef === 'function') {
      this.props.onRef!(this); // 让done page里获取到这个组件实例，调用其validateData方法
    }
  }

  public validateData = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // 必须要选中一种支付方式
      const { payment } = this.props.yourphone;
      if (payment === '') {
        message.info('how would you like to pay?');
        resolve(false);
        return;
      }

      // 用户并没有修改有关的支付信息，不需要执行下面的校验
      if (!this.props.yourphone.isLeftOnEdit && !this.props.yourphone.isRightOnEdit) {
        switch (this.props.yourphone.payment) {
          case EPayType.PAYPAL:
            this.props.yourphone.paypal = { email: this.props.user.preOrder.userEmail || '' };
            break;
          case EPayType.ECHECK:
            this.props.yourphone.echeck = {
              firstName: this.props.yourphone.addressInfo.firstName,
              lastName: this.props.yourphone.addressInfo.lastName,
              email: this.props.user.preOrder.userEmail || ''
            }
            break;
        }
        resolve(true);
        return;
      }

      this.props.form.validateFields((err, values) => {
        if (err) {
          resolve(false);
          return;
        }

        const { email, email_confirm, firstName, lastName, paypal_email, paypal_email_confirm } = values;

        // 判断两次输入echeck的email是否一致
        if (email !== email_confirm) {
          this.props.form.setFields({
            email_confirm: {
              value: email_confirm,
              errors: [new Error("The emails don't matach.")]
            }
          });
          resolve(false);
          return;
        }
        // 判断两次输入paypal的email是否一致
        if (paypal_email !== paypal_email_confirm) {
          this.props.form.setFields({
            paypal_email_confirm: {
              value: paypal_email_confirm,
              errors: [new Error("The emails don't matach.")]
            }
          });
          resolve(false);
          return;
        }

        switch (this.props.yourphone.payment) {
          case EPayType.PAYPAL:
            this.props.yourphone.paypal = { email: paypal_email };
            break;
          case EPayType.ECHECK:
            this.props.yourphone.echeck = {
              firstName,
              lastName,
              email
            }
            break;
        }
        // 于此更新preOrder，使得该页面以弹窗形式出现依旧能更新preOrder
        try {
          this.props.user.preOrder = {
            ...this.props.user.preOrder,
            checkInfo: { ...this.props.yourphone.echeck },
            payment: this.props.yourphone.payment,
            paypalInfo: { ...this.props.yourphone.paypal },
          }
        } catch (error) { console.warn(error, 'in payment page preOrder') }

        resolve(true);
      });
    });
  }

  public render() {
    let leftContent: React.ReactNode;
    let rightContent: React.ReactNode;

    const { getFieldDecorator } = this.props.form;

    const { paypal, echeck } = this.props.yourphone;

    // paypal的结构
    switch (this.props.yourphone.isLeftOnEdit) {
      case false:
        leftContent = (
          <div className="left-wrapper">
            <p className="description">Confirm your paypal address so we can send you the payment of ryour phone.</p>
            <p className="email">
              <span className="title">Paypal email address</span>
              <br />
              <span className="address">{this.props.user.preOrder.userEmail}</span>
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
                  {
                    getFieldDecorator('paypal_email', {
                      rules: [
                        {
                          required: true,
                          type: 'email',
                          message: "Please enter a valid email."
                        }
                      ],
                      initialValue: paypal.email,
                      validateTrigger: 'onBlur',
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item label="Confirm Paypal email address">
                  {
                    getFieldDecorator('paypal_email_confirm', {
                      rules: [
                        {
                          required: true,
                          type: 'email',
                          message: "Please enter a valid email."
                        }
                      ],
                      validateTrigger: 'onBlur',
                      initialValue: paypal.email,
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
              </Form>
            </div>
            <p className="difference" onClick={this.changeEditState.bind(this, 'paypal')} >My email for Paypal is the same as contact email</p>
          </div>
        );
        break;
    }

    // eCheck的结构
    switch (this.props.yourphone.isRightOnEdit) {
      case false:
        rightContent = (
          <div className="right-wrapper">
            <p className="description">Confirm your address so we can send you the check of your phone.</p>
            <p className="name">
              <span className="title">Name</span>
              <br />
              <span className="address">{`${this.props.yourphone.addressInfo.firstName} ${this.props.yourphone.addressInfo.lastName}`}</span>
            </p>
            <p className="email">
              <span className="title">eCheck email address</span>
              <br />
              <span className="address">{this.props.user.preOrder.userEmail}</span>
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
                      validateTrigger: 'onBlur',
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
                      validateTrigger: 'onBlur',
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
                      validateTrigger: 'onBlur',
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
                      validateTrigger: 'onBlur',
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
          <Collapse
            onChange={this.handlePaypalCollapseExtend}
            activeKey={this.props.yourphone.payment}
            // defaultActiveKey={[this.props.yourphone.payment]}
            className={classnames({ active: this.props.yourphone.payment === EPayType.PAYPAL })}>
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
          <Collapse
            onChange={this.handleEcheckCollapseExtend}
            activeKey={this.props.yourphone.payment}
            // defaultActiveKey={[this.props.yourphone.payment]}
            className={classnames({ active: this.props.yourphone.payment === EPayType.ECHECK })}>
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
            ? <Layout nextCb={this.handleNext} disabled={!this.props.yourphone.isDonePayment}>{paymentHTML}</Layout>
            : (paymentHTML)
        }
      </div>
    );
  }

  private handlePaypalCollapseExtend = (type: string[]) => {
    console.log(type)
    console.log(this.props.yourphone.payment)
    if (this.props.yourphone.payment === EPayType.PAYPAL && !type.length) {
      this.props.yourphone.payment = '';
    }

    if (!type.length) {
      return;
    }

    this.props.yourphone.payment = type[1] ? type[1] : type[0];
    this.props.yourphone.isRightOnEdit = false;
  }

  private handleEcheckCollapseExtend = (type: string[]) => {
    console.log(type)
    console.log(this.props.yourphone.payment)
    if (this.props.yourphone.payment === EPayType.ECHECK && !type.length) {
      this.props.yourphone.payment = '';
    }

    if (!type.length) {
      return;
    }

    this.props.yourphone.payment = type[1] ? type[1] : type[0];
    this.props.yourphone.isLeftOnEdit = false;
  }

  private changeEditState = (type: string): void => { // 切换成可编辑状态
    if (type === 'paypal') {
      this.props.yourphone.isLeftOnEdit = !this.props.yourphone.isLeftOnEdit;
      this.props.yourphone.paypal = {
        email: ''
      }
      onValuesChange(false, false, this.props.yourphone.paypal);
    }

    if (type === 'check') {
      this.props.yourphone.isRightOnEdit = !this.props.yourphone.isRightOnEdit;
      this.props.yourphone.echeck = {
        email: '',
        firstName: '',
        lastName: ''
      }
      onValuesChange(false, false, this.props.yourphone.echeck);
    }
  }

  private handleNext = async () => {
    const isOk = await this.validateData();
    if (isOk) {
      this.props.history.push('/sell/yourphone/done');
    }
  }
}

const onValuesChange = (props: any, changedValues: any, allValues: any) => {
  console.log(allValues);
  if (yourphoneStore.payment === EPayType.PAYPAL) {
    console.log(4)
    if (allValues.paypal_email && allValues.paypal_email_confirm && yourphoneStore.isLeftOnEdit) {
      console.log(5)
      yourphoneStore.isPaymentFormFilled = true;
      return false;
    }

    console.log(6)
    yourphoneStore.isPaymentFormFilled = false;
    // false
    return false;
  }

  console.log(1)
  if (allValues.firstName && allValues.lastName && allValues.email && allValues.email_confirm && yourphoneStore.isRightOnEdit) {
    console.log(2)
    yourphoneStore.isPaymentFormFilled = true;
    return false;
  }

  console.log(3)
  yourphoneStore.isPaymentFormFilled = false;
  return true;
}

export default Form.create({ onValuesChange: onValuesChange })(YourPayment);