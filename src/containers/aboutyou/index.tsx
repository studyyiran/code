import * as React from 'react';
import { inject, observer } from 'mobx-react';
import './index.less';
import { Form, Input, Button, Icon } from 'antd';
import { IAboutYouProps, IAboutYouState } from './interface/index.interface';
@inject('user')
@observer
class AboutYou extends React.Component<IAboutYouProps, IAboutYouState> {
  public static readonly displayName: string = "about you";
  public readonly state = {
    isValidate: false,
    validateStatus: undefined,
    help: undefined,
    value: ''
  }
  public componentDidMount() {
    // 隐藏左侧价格模块
    this.props.user.isShowLeftPrice = false;
    // 当有userEmail时，校验是否为邮箱格式，并高亮
    const userEmail = this.props.user.preOrder.userEmail;
    const regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/;
    if (userEmail && regExp.test(userEmail)) {
      this.setState({
        value: userEmail
      })
      this.setState({ isValidate: true });
    }
  }
  public render() {
    // const { getFieldDecorator } = this.props.form;
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
              validateStatus={this.state.validateStatus}
              help={this.state.help}
            >
              <Input
                autoFocus={true}
                autoComplete="off"
                onChange={this.handleValidate}
                onPressEnter={this.handleSubmit}
                onBlur={this.handleValidateBlur}
                defaultValue={this.props.user.preOrder.userEmail}
                value={this.state.value}
                size="large"
              />
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
    const state: IAboutYouState = {
      isValidate: this.state.isValidate,
      help: undefined,
      validateStatus: undefined,
    }

    if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/.test(this.state.value)) {
      state.help = <><Icon type="close-circle" />&nbsp;Please enter a valid email address</>;
      state.validateStatus = 'error';
    } else {
      // this.props.user.getPreOrderKey(this.state.value);
      // this.props.history.push('/sell/yourphone/brand');
    }

    this.setState(state);

    // if (!this.state.validateStatus && /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/.test(this.state.value)) {
    //   this.props.user.getPreOrderKey(this.state.value);
    //   this.props.history.push('/sell/yourphone/brand');
    // } else {
    //   const state: IAboutYouState = {
    //     isValidate: this.state.isValidate,
    //     help: <><Icon type="close-circle" />Please enter a valid email address</>,
    //     validateStatus: 'error',
    //   }
    //   this.setState(state);
    // }
  }

  private handleValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const state = {
      isValidate: false,
      value: value
    }
    if (value.trim()) {
      state.isValidate = true;
    }
    this.setState(state);
  }

  private handleValidateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const state: IAboutYouState = {
      isValidate: this.state.isValidate,
      help: undefined,
      validateStatus: undefined,
    }
    if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/.test(e.target.value)) {
      state.help = <><Icon type="close-circle" />&nbsp;Please enter a valid email address</>;
      state.validateStatus = 'error';
    }
    this.setState(state);
  }
}

export default Form.create()(AboutYou);