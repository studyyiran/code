import * as React from 'react';
import { observer } from 'mobx-react'
import { Form, Input, Col, Row, Button } from 'antd';
import { IContactFormProps } from '../interface/contact.interface';

import { } from 'antd/lib/form';

import './form.less';

// form的col
const col = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};


@observer
class ContactForm extends React.Component<IContactFormProps> {

  public handleOk = () => {
    this.props.form.validateFields((err, item) => {
      if (!err) {
        this.props.onOk(item);
      }
    })
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="comp-contact-form-container">
        <Form hideRequiredMark={true} layout="vertical">
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                {...col}
                label="Your name"
              >
                {getFieldDecorator('userName', {
                  rules: [{
                    required: true,
                    message: 'Please input',
                  }],
                })(
                  <Input placeholder="Please input" />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...col}
                label="Your e-mail"
              >
                {getFieldDecorator('userEmail', {
                  rules: [{
                    pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
                    required: true,
                    message: 'Please input',
                  }],
                })(
                  <Input placeholder="Please input" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                {...col}
                label="Your message"
              >
                {getFieldDecorator('content', {
                  rules: [{
                    required: true,
                    message: 'Please input',
                  }],
                })(
                  <Input.TextArea rows={24} style={{ height: 150, resize: 'none' }} />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="button-group">
          <Button style={{ width: '100%' }} htmlType="submit" onClick={this.handleOk} type="primary" size="large">SUBMIT</Button>
        </div>
      </div>
    )
  }
}

export default Form.create()(ContactForm)