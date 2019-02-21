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
  public componentDidMount() {
    // 当有userEmail时，校验是否为邮箱格式，并高亮
    const userEmail = this.props.user.preOrder.userEmail;
    const regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/;
    if (userEmail && regExp.test(userEmail)) {
      this.setState({ isValidate: true });
    }
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
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
                      type: 'email',
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
                disabled={!this.state.isValidate}
                size="large"
                type="primary"
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

  private handleValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // this.props.form.validateFields((err, values) => {
    //   this.setState({ isValidate: !err ? true : false });
    //   console.log(this.state.isValidate);
    // });
    console.log(e.target.value)
    if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/.test(e.target.value)) {
      this.setState({ isValidate: true });
      return true;
    }

    this.setState({ isValidate: false });
    return false;
  }
}

export default Form.create()(AboutYou);