import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Col, Row, Input } from 'antd';
import Layout from '@/containers/aboutphone/layout';
import './shipping.less';
import { IShippingProps, IShippingState } from './interface/index.interface';
import { IProductInfo } from '@/store/interface/user.interface';
import { shippingPageValidate } from '@/containers/aboutphone/pageValidate';
import yourphoneStore from './store/yourphone.store';

const onValuesChange = (props: any, changedValues: any, allValues: any) => {
  let disabled = false;
  Object.keys(allValues).forEach((v: string) => {
    if (!allValues[v] && v !== 'state' && v !== 'addressLineOptional' && v !== 'mobile' && v !== 'country') {

      disabled = true;
    }
  })

  yourphoneStore.isAddressValuesAndDisabled = disabled;

}


@inject('yourphone', 'user')
@observer
class ShippingAddress extends React.Component<IShippingProps, IShippingState> {
  public state = {
    help: 'We’ll only call you if there is an issue with your sale.',
    validateStatus: undefined
  }
  public componentDidMount() {
    // 判断是否页面需要必备数据，分TBD的情况
    if (!shippingPageValidate()) {
      this.props.history.push('/sell/account');
      return;
    }

    // didmount 的时候校验是否填了字段
    const { getFieldsValue } = this.props.form;
    const allValus = getFieldsValue();
    onValuesChange(false, false, allValus);
    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;
    // this.props.yourphone.createInquiry();
    // this.props.form.validateFields(['zipCode'], (errors, values) => {
    //   if (!errors) { console.log('ininiin'); }
    // });
    if (typeof this.props.onRef === 'function') {
      this.props.onRef!(this);
    }
  }

  public validateData = (): Promise<boolean> => {
    return new Promise((resolve) => {
      this.props.form.validateFields((err, values) => {
        if (err) {
          resolve(false);
        }

        this.props.yourphone.addressInfo = { ...this.props.yourphone.addressInfo, ...values, };

        // 给store里的paypal和echeck填入contact infomation作为默认，供payment页面初始化用
        // TODO:
        // this.props.yourphone.paypal.email = this.props.user.preOrder.userEmail ? this.props.user.preOrder.userEmail : '';
        // this.props.yourphone.echeck.firstName = this.props.yourphone.addressInfo.firstName;
        // this.props.yourphone.echeck.lastName = this.props.yourphone.addressInfo.lastName;
        // this.props.yourphone.echeck.email = this.props.user.preOrder.userEmail ? this.props.user.preOrder.userEmail : '';
        if (this.props.hideLayout) { // 弹窗检验额外添加
          this.props.user.preOrder = {
            ...this.props.user.preOrder,
            userEmail: values.userEmail
          }
        }
        resolve(true);
      });
    });
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { addressInfo } = this.props.yourphone;
    const infomationHTML = (
      <Form layout="vertical" style={{ paddingTop: '40px' }}>
        {/* 在弹窗时才有 */}
        {
          this.props.hideLayout &&
          <Row>
            <Col span={11}>
              <Form.Item label="Email address">
                {
                  getFieldDecorator('userEmail', {
                    rules: [
                      {
                        required: true,
                        type: 'email',
                        message: "Please enter a valid email."
                      }
                    ],
                    initialValue: this.props.user.preOrder.userEmail,
                    validateTrigger: 'onBlur',
                  })(
                    <Input />
                  )
                }
              </Form.Item>
            </Col>
          </Row>
        }
        <Row gutter={32}>
          <Col span={11}>
            <Form.Item label="First name" required={true}>
              {
                getFieldDecorator('firstName', {
                  rules: [
                    {
                      required: true,
                      pattern: /\w+/,
                      message: "Please enter a valid first name."
                    }
                  ],
                  initialValue: addressInfo.firstName,
                })(
                  <Input />
                )
              }
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="Last name">
              {
                getFieldDecorator('lastName', {
                  rules: [
                    {
                      required: true,
                      pattern: /\w+/,
                      message: "Please enter a valid last name."
                    }
                  ],
                  initialValue: addressInfo.lastName
                })(
                  <Input />
                )
              }
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={11}>
            <Form.Item label="Address Line 1">
              {
                getFieldDecorator('addressLine', {
                  rules: [
                    {
                      required: true,
                      pattern: /\w+/,
                      message: "Please enter a valid address."
                    }
                  ],
                  initialValue: addressInfo.addressLine
                })(
                  <Input />
                )
              }
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="Address Line 2(Optional)">
              {
                getFieldDecorator('addressLineOptional', {
                  rules: [
                    {
                      pattern: /\w+/,
                      message: "Please enter a valid address."
                    }
                  ],
                  initialValue: addressInfo.addressLineOptional
                })(
                  <Input />
                )
              }
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={7}>
            <Form.Item label="Zip Code">
              {
                getFieldDecorator('zipCode', {
                  rules: [
                    {
                      required: true,
                      validator: this.handleZipCode,
                    }
                  ],
                  validateTrigger: 'onBlur',
                  initialValue: addressInfo.zipCode,
                })(
                  <Input onChange={this.handleZipCodeChange} />
                )
              }
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="State">
              {
                getFieldDecorator('state', {
                  rules: [
                    {
                      message: "Please enter a valid state.",
                      whitespace: true
                    }
                  ],
                  initialValue: addressInfo.state,
                })(
                  <Input disabled={true} />
                )
              }
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="City">
              {
                getFieldDecorator('city', {
                  rules: [
                    {
                      required: true,
                      pattern: /\w+/,
                      message: "Please enter a valid city."
                    }
                  ],
                  initialValue: addressInfo.city
                })(
                  <Input />
                )
              }
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={11}>
            <Form.Item
              label="Phone(optional)"
              help={this.state.help}
              validateStatus={this.state.validateStatus}
            >
              {
                getFieldDecorator('mobile', {
                  rules: [
                    {
                      pattern: /\d{11,11}/,
                      // message: "Please enter a valid mobile."
                    }
                  ],
                  initialValue: addressInfo.mobile,
                  validateTrigger: 'onBlur'
                })(
                  <Input
                    onBlur={this.handleBlurPhone}
                  />
                )
              }
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Country"
              // validateStatus="validating"
              help="We currently only support trades in the United States"
            >
              {
                getFieldDecorator('country', {
                  rules: [
                    {
                      pattern: /\w+/,
                      message: "Please enter a valid Country."
                    }
                  ],
                  initialValue: addressInfo.country,
                  validateTrigger: 'onBlur'
                })(
                  <Input disabled={true} />
                )
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
    return (
      <div className="page-shipping-container">

        {
          !this.props.hideLayout
            ? <Layout nextCb={this.handleNext} disabled={this.props.yourphone.isAddressValuesAndDisabled}>{infomationHTML}</Layout>
            : (infomationHTML)
        }
      </div>
    );
  }

  private handleBlurPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const state: IShippingState = {
      help: 'We’ll only call you if there is an issue with your sale.',
      validateStatus: undefined
    }
    if (value && !/\d{11,11}/.test(value)) {
      state.help = 'Please enter a valid mobile.';
      state.validateStatus = 'error';
    }

    this.setState(state);
  }

  private handleZipCode = async (rule: any, value: any, callback: any) => {
    const { setFieldsValue } = this.props.form;
    if (!/\d{5,5}/.test(value)) {
      callback('Please enter a valid zipCode.');
      return;
    }

    await this.props.yourphone.getAmericaState(value);
    if (this.props.yourphone.americaStates && this.props.yourphone.americaStates.state && this.props.yourphone.americaStates.city) {
      setFieldsValue({ 'state': this.props.yourphone.americaStates.state });
      setFieldsValue({ 'city': this.props.yourphone.americaStates.city });
      callback();
    } else {
      // setFields({
      //   zipCode: {
      //     value: value,
      //     errors: [new Error('Please enter a valid zipCode')],
      //   }
      // });
      callback('Please enter a valid zipCode.');
    }
  }

  private handleNext = async () => {
    const isOk = await this.validateData();
    if (isOk) {
      try {
        const productInfo: Partial<IProductInfo> = {
          ...this.props.user.preOrder.productInfo,
          inquiryDetail: this.props.yourphone.inquiryDetail
        }
        this.props.user.preOrder = {
          ...this.props.user.preOrder,
          addressInfo: { ...this.props.yourphone.addressInfo },
          productInfo
        }
      } catch (error) { console.warn(error, 'in shipping page preOrder') }
      this.props.history.push('/sell/yourphone/payment');
    }
  }

  private handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { setFieldsValue } = this.props.form;
    const value = e.target.value;
    if (!value) {
      setFieldsValue({ 'state': '' });
      setFieldsValue({ 'city': '' });
    }
  }
}
export default Form.create({ onValuesChange: onValuesChange })(ShippingAddress);