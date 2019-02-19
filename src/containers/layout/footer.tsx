import * as React from 'react';
import { Link } from 'react-router-dom';
import './footer.less';
import { Row, Col, Input, Button } from 'antd';
import { IFooterState } from './interface/index.interface';

export default class Footer extends React.Component<{ router: any }, IFooterState> {
  public readonly state = {
    links: [
      [
        {
          text: 'SELL YOUR PHONE',
          href: ''
        },
        {
          text: 'How it Works',
          href: '' // todo
        },
        {
          text: 'Prepare to Ship',
          href: '/faq?index=9'
        },
        {
          text: 'FAQ',
          href: '/faq'
        }
      ],
      [
        {
          text: 'ABOUT US',
          href: ''
        },
        {
          text: 'Who We Are',
          href: '' // todo
        },
        {
          text: 'Why Up Trade',
          href: '/why-uptrade'
        },
        {
          text: 'Contact Us',
          href: '/contact'
        },
        {
          text: 'How Much Is My Phone Worth',
          href: '/how-much-is-my-phone-worth'
        },
        {
          text: 'Sell Broken iPhone',
          href: '/sell-broken-iphone'
        }
      ],
    ]
  }
  public render() {
    const linksGroup = this.state.links.map((group, key) => (
      <Col span={6} key={key} className="links-group">
        {
          group.map((link, index) => <p key={index} className="item" onClick={this.handleLink.bind(this, link)} data-href={link.href}>{link.text}</p>)
        }
      </Col>
    ))
    return (
      <div className="comp-footer-container">
        <div className="wave-bg" />
        <div className="section-box">
          <div className="content-wrapper">
            <div className="links-group-wrapper">
              <Row gutter={56}>
                <Col span={3}><img src={require('@/images/logo.png')} /></Col>
                {
                  linksGroup
                }
                <Col span={6} offset={3} className="email-group">
                  <p className="title">CONNECT WITH US!</p>
                  <Input
                    placeholder="Enter your email"
                    style={{ margin: '10px 0 14px 0' }}
                  />
                  <Button type="primary">Subscribe</Button>
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
    this.props.router.history.push(link.href);
    return true;
  }
} 