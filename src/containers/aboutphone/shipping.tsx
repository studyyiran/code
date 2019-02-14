import * as React from 'react';
import { Form, Col, Row, Input, Select } from 'antd';
import Layout from '@/containers/aboutphone/layout';
import './shipping.less';
const { Option } = Select;
export default class ShippingAddress extends React.Component {
  public render() {
    return (
      <div className="page-shipping-container">
        <Layout nextPath="/sell/yourphone/payment">
          <Form layout="vertical" style={{paddingTop: '59px'}}>
            <Row gutter={32}>
              <Col span={11}>
                <Form.Item label="First name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item label="Last name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col span={11}>
                <Form.Item label="Address Line 1">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item label="Address Line 2(Optional)">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col span={7}>
                <Form.Item label="Zip Code">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="State">
                  <Select placeholder="Please select state">
                    <Option value="DC" >DC</Option>
                    <Option value="Seattle" >Seattle</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="City">
                  <Select placeholder="Please select city" disabled={true}>
                    <Option value="DC" >DC</Option>
                    <Option value="Seattle" >Seattle</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col span={11}>
                <Form.Item
                  label="Phone(optional)"
                  help="We’ll only call you if there is an issue with your sale."
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="Country"
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
}