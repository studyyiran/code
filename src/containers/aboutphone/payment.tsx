import * as React from 'react';
import { Row, Col, Collapse, Form, Input } from 'antd';
import Layout from '@/containers/aboutphone/layout';
import './payment.less';

const Panel = Collapse.Panel;
const leftHeader = <div className='paypal-bg' />;
export default class YourPayment extends React.Component {

  public readonly state = {
    isLeftOnEdit: false,
    isRightOnEdit: false
  }

  public render() {
    let leftContent: React.ReactNode;
    let rightContent: React.ReactNode;

    switch (this.state.isLeftOnEdit) {
      case false:
        leftContent = (
          <div className="left-wrapper">
            <p className="description">Confirm your paypal address so we can send you the payment of ryour phone.</p>
            <p className="email">
              <span className="title">Paypal email address</span>
              <br />
              <span className="address">thomas.paine@gmail.com</span>
            </p>
            <p className="difference">My email for Paypal is not the same as contact email ></p>
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
            <p className="difference">My email for Paypal is the same as contact email ></p>
          </div>
        );
        break;
    }


    switch (this.state.isRightOnEdit) {
      case false:
        rightContent = (
          <div className="right-wrapper">
            <p className="description">Confirm your address so we can send you the check of your phone.</p>
            <p className="email">
              <span className="title">Address</span>
              <br />
              <span className="address">123 Main Street South;San Francisco California</span>
            </p>
            <p className="difference">My check address is not the same as contact address></p>
          </div>
        );
        break;
      case true:
        rightContent = (
          <div className="right-wrapper">
            <p className="description">Confirm your address so we can send you the check of your phone.</p>
            <div className="form-wrapper">
              <Form layout="vertical">
                <Form.Item label="Address Line 1 ">
                  <Input />
                </Form.Item>
                <Form.Item label="Address Line 2 (Optional)">
                  <Input />
                </Form.Item>
              </Form>
            </div>
            <p className="difference">My check address is the same as contact address></p>
          </div>
        );
        break;
    }

    return (
      <div className="page-payment-container">
        <Layout nextPath="/sell/yourphone/done">
          <Row gutter={30} style={{ paddingTop: '42px' }}>
            <Col span={12}>
              <Collapse>
                <Panel
                  header={leftHeader}
                  showArrow={false}
                  key="1"
                >
                  {leftContent}
                </Panel>
              </Collapse>
            </Col>
            <Col span={12}>
              <Collapse>
                <Panel
                  header={<h3>Check</h3>}
                  showArrow={false}
                  key="1"
                >
                  {rightContent}
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </Layout>
      </div>
    );
  }
}