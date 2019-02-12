import * as React from 'react';
import './index.less';
import { Form, Input, Button } from 'antd';
export default class AboutYou extends React.Component {
  public render() {
    return (
      <div className="page-aboutyou-container">
        <div className="header-wrapper">
          <p className="main-title">About You</p>
          <p className="description">We just need an email address to send you a shipping label.</p>
        </div>
        <div className="form-submit-wrapper">
          <Form layout="vertical">
            <Form.Item
              label="Email address"
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button block={true} style={{ background: '#f3f3f3', fontSize: '18px', color: '#000', fontWeight: 'bold', height: '48px'}}>GET STARTED</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}