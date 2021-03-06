import * as React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Button } from 'antd';
import './header.less';
export default class Header extends React.Component<{ router: any }> {
  public state = {
    active: false
  }
  public render() {
    const active = classnames('comp-mobile-header-container', { active: this.state.active });
    return (
      <div className={active}>
        <div className="header-box">
          <div className="logo">
            <a href="/"><img src={require('images/logo.png')} alt="" /></a>
          </div>
          <div className="right" onClick={this.handleClick}>
            {!this.state.active ? <img src={require('images/nav.png')} alt="" /> : <img src={require('images/close.png')} alt="" />}
          </div>
        </div>
        <div className="toggle-mask" />
        <div className="toggle-box">
          <div className="list" onClick={this.handleGoTo.bind(this, '/who-we-are')}>About Us</div>
          <div className="list" onClick={this.handleGoTo.bind(this, '/how-to-sell-my-home')}>How it Works</div>
          <div className="list" onClick={this.handleGoTo.bind(this, '/check-order')}>Check My Order</div>
          <div className="button-group">
            {/*<Button type="primary" onClick={this.handleGoTo.bind(this, '/sell/yourphone/brand')}>SELL NOW</Button>*/}
          </div>
        </div>
      </div>
    )
  }

  private handleClick = () => {
    this.setState({
      active: !this.state.active
    })
  }

  private handleGoTo = (url: string) => {
    this.setState({
      active: false
    })
    this.props.router.history.push(url);
  }
}