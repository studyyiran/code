import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Input, Button, Form, Icon } from 'antd';
import config from 'config/index';
import './invitation_code.less';
export default class InvationCode extends React.Component<RouteComponentProps> {
  public state = {
    btnHasDisabled: true,
    code: '',
    validateStatus: undefined,
    help: ''
  }
  public render() {
    return (
      <div className="page-invation-code-container">
        <div className="top">
          <h1>We Sell Your Phone for More</h1>
          <p>UPTRADE is available for limited guests</p>
        </div>
        <div className="content">
          <a className="link-out" href="https://mailchi.mp/dc6bcab117d9/uptrade-access-code">Request invite code to get early access ></a>
          <div className="input-group">
            <label>I already have an invite code</label>
            <Form>
              <Form.Item
                validateStatus={this.state.validateStatus}
                help={<p className="def-close-circle-p-node">{this.state.help}</p>}
              >
                <Input
                  value={this.state.code}
                  onChange={this.handleChangeCode}
                  onPressEnter={this.onSubmit}
                  placeholder="Please input"
                  size="large"
                />
              </Form.Item>
            </Form>
          </div>
          <Button
            size="large"
            type="primary"
            disabled={this.state.btnHasDisabled}
            onClick={this.onSubmit}
          >SUBMIT</Button>
        </div>
      </div>
    )
  }
  private handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = {
      code: e.target.value,
      validateStatus: undefined,
      help: '',
      btnHasDisabled: true
    }
    if (e.target.value) {
      state.btnHasDisabled = false
    }
    this.setState(state)
  }

  private onSubmit = () => {
    if (this.state.btnHasDisabled) {
      return false;
    }
    const state = {
      validateStatus: 'error',
      help: <><Icon className="def-close-circle" type="close-circle" /><span>Please enter a valid invite code.</span></>,
    }

    if (this.state.code !== config.DEFAULT.invatationCode) {
      this.setState(state)
      return;
    }
    sessionStorage.setItem('invitationCode', '1');
    this.props.history.push('/');
    return true;
  }
}