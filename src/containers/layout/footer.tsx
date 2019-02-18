import * as React from 'react';
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
          href: '' // todo
        },
        {
          text: 'Return Promise',
          href: '' // todo
        },
        {
          text: 'Device Grades',
          href: '' // todo 
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
          href: '/why'
        },
        {
          text: 'Contact Us',
          href: '/contact'
        },
        {
          text: 'Sell Broken iPhone',
          href: '/broken'
        }
      ],
      [
        {
          text: 'PRESS',
          href: ''
        },
        {
          text: 'How Much Is My Phone Worth',
          href: '/howmuch'
        }
      ]
    ]
  }
  public render() {
    const linksGroup = this.state.links.map((group, key) => (
      <Col span={4} key={key} className="links-group">
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
              <Row gutter={48}>
                <Col span={3}><img src={require('@/images/logo.png')} /></Col>
                {
                  linksGroup
                }
                <Col span={4} className="email-group">
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
              <span className="item item--policy">Privacy Policy</span>
              <span className="item item--terms">Terms of Use</span>
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