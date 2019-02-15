import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Col, Row, Input } from 'antd';
import Layout from '@/containers/aboutphone/layout';
import './shipping.less';
import { IShippingProps } from './interface/index.interface';
@inject('yourphone')
@observer
class ShippingAddress extends React.Component<IShippingProps> {

  public componentDidMount() {
    this.props.yourphone.createInquiry();
    this.props.form.validateFields(['zipCode'], (errors, values) => {
      if (!errors) { console.log('ininiin'); }
    });
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { addressInfo } = this.props.yourphone;
    return (
      <div className="page-shipping-container">
        <Layout nextCb={this.goNextCb} >
          <Form layout="vertical" style={{ paddingTop: '59px' }}>
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
                          validator: this.handleZipCode
                        }
                      ],
                      initialValue: addressInfo.zipCode,
                    })(
                      <Input />
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
                  help="We’ll only call you if there is an issue with your sale."
                >
                  {
                    getFieldDecorator('mobile', {
                      rules: [
                        {
                          pattern: /\d+/,
                          message: "Please enter a valid city."
                        }
                      ],
                      initialValue: addressInfo.mobile
                    })(
                      <Input />
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
                  <Input value="United States" disabled={true} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Layout>
      </div>
    );
  }

  private handleZipCode = async (rule: any, value: any, callback: any) => {
    const { setFieldsValue } = this.props.form;

    if (!/\d{5,5}/.test(value)) {
      callback('Please enter a valid zipCode.');
      return;
    }

    await this.props.yourphone.getAmericaState(value);
    if (this.props.yourphone.americaStates) {
      setFieldsValue({ 'state': this.props.yourphone.americaStates.state });
      setFieldsValue({ 'city': this.props.yourphone.americaStates.city });
    }
    callback();
  }

  private goNextCb = () => {
    this.props.form.validateFields((err, values) => {
      if (err) { return; }

      this.props.yourphone.addressInfo = { ...this.props.yourphone.addressInfo, ...values };
      this.props.history.push('/sell/yourphone/payment');
    });
  }
}

export default Form.create()(ShippingAddress);