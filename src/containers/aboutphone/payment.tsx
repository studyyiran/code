import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col, Collapse, Form, Input } from 'antd';
import Layout from '@/containers/aboutphone/layout';
import './payment.less';
import { IPaymentProps } from './interface/index.interface';

const Panel = Collapse.Panel;
const leftHeader = <div className='paypal-bg' />;
@inject('yourphone')
@observer
export default class YourPayment extends React.Component<IPaymentProps> {

  public readonly state = {
    isLeftOnEdit: false,
    isRightOnEdit: false
  }

  public render() {
    let leftContent: React.ReactNode;
    let rightContent: React.ReactNode;

    const { paypal, echeck } = this.props.yourphone;
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
            <p className="difference" onClick={this.changeEditState.bind(this, 'paypal')} >My email for Paypal is not the same as contact email ></p>
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
            <p className="difference" onClick={this.changeEditState.bind(this, 'paypal')} >My email for Paypal is the same as contact email ></p>
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
              <span className="address">{echeck.lastName}</span>
            </p>
            <p className="difference" onClick={this.changeEditState.bind(this, 'check')} >My check address is not the same as contact address></p>
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
            <p className="difference" onClick={this.changeEditState.bind(this, 'check')}>My check address is the same as contact address></p>
          </div>
        );
        break;
    }

    const paymentHTML = (
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
    )

    return (
      <div className="page-payment-container">
        {
          !this.props.hideLayout
            ? <Layout nextPath="/sell/yourphone/done">{paymentHTML}</Layout>
            : (paymentHTML)
        }
      </div>
    );
  }

  private changeEditState = (type: string): void => {
    if (type === 'paypal') {
      this.setState({ isLeftOnEdit: !this.state.isLeftOnEdit });
    }

    if (type === 'check') {
      this.setState({ isRightOnEdit: !this.state.isRightOnEdit });
    }
  }
}