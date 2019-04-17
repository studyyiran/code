import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './footer.less';
import { Row, Col, Input, Button, notification } from 'antd';
import { IFooterState } from './interface/index.interface';
import commonStore from '@/store/common'
import config from '../../config';

export default class Footer extends React.Component<{ router: any }, IFooterState> {
  public readonly state = {
    email: ''
  }
  public render() {
    const linksGroup = config.FOOTERLINKS.map((group, key) => (
      <Col span={5} key={key} className="links-group">
        {
          group.map((link, index) => <p key={index} className={classnames('item', { nocursor: link.href })} onClick={this.handleLink.bind(this, link)} data-href={link.href}>{link.text}</p>)
        }
      </Col>
    ))
    return (
      <div className="comp-footer-container">
        <div className="wave-bg" />
        <div className="section-box">
          <div className="content-wrapper">
            <div className="links-group-wrapper">
              <Row gutter={80}>
                <Col span={5}><img src={require('@/images/logo.png')} className="logo" /></Col>
                {
                  linksGroup
                }
                <Col span={6} offset={1} className="email-group">
                  <p className="title">CONNECT WITH US!</p>
                  <Input
                    placeholder="Enter your email"
                    style={{ margin: '10px 0 14px 0' }}
                    onChange={this.handChangeInput}
                  />
                  <Button className="foot-subscribe" htmlType="submit" type="primary" onClick={this.handleSubscribe}>SUBSCRIBE</Button>
                </Col>
              </Row>
            </div>
            <div className="copyright">
              <span className="item item--copy">&#169; 2019 UpTrade Technologies, Inc.</span>
              <Link to="/privacy-policy"><span className="item item--policy">Privacy Policy</span></Link>
              <Link to="/terms"><span className="item item--terms">Terms of Use</span></Link>
            </div>
          </div>
        </div>

      </div>
    )
  }

  private handleLink = (link: { [key: string]: string }) => {
    if (!link.href) {
      return false;
    }
    console.log(this.props.router.history)
    if (/\/faq/.test(link.href) && this.props.router.history.location.pathname === '/faq') {
      window.location.href = location.origin + link.href;
      return false;
    }
    this.props.router.history.push(link.href);
    return true;
  }


  private handChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.target.value
    })
  }

  private handleSubscribe = async () => {
    if (!this.state.email || !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/.test(this.state.email)) {
      return;
    }
    const result = await commonStore.onSubscribe(this.state.email);

    if (result) {
      notification.success({
        message: 'Successfully subscribed.',
      });
      this.setState({
        email: ''
      })
    }
  }
} 