import * as React from 'react';
import { inject, observer } from 'mobx-react';
import './index.less';
import { Form, Input, Button, Icon } from 'antd';
import { IAboutYouProps, IAboutYouState } from './interface/index.interface';
@inject('user')
@observer
class AboutYou extends React.Component<IAboutYouProps, IAboutYouState> {
  public readonly state = {
    isValidate: false
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { isValidate } = this.state;
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
              required={true}
            >
              {
                getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
                      message: <p><Icon type="close-circle" /> Please enter a valid email address</p>
                    }
                  ],
                  initialValue: this.props.user.preOrder.userEmail
                })(
                  <Input
                    placeholder="example@gmail.com"
                    autoFocus={true}
                    autoComplete="off"
                    onChange={this.handleValidate}
                    onPressEnter={this.handleSubmit}
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button
                block={true}
                style={{ background: isValidate ? '#00CFFF' : '#f3f3f3', fontSize: '18px', color: isValidate ? '#fff' : '#000', fontWeight: 'bold', height: '48px' }}
                onClick={this.handleSubmit}
              >GET STARTED</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }

  private handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.user.getPreOrderKey(values.email);
        this.props.history.push('/sell/yourphone/brand');
      }
    })
  }

  private handleValidate = () => {
    this.props.form.validateFields((err, values) => {
      this.setState({ isValidate: !err ? true : false });
    });
  }
}

export default Form.create()(AboutYou);