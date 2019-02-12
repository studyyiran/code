import * as React from 'react';
import './footer.less';
import { Row, Col, Input, Button } from 'antd';
import { IFooterState } from './interface/index.interface';

export default class Footer extends React.Component<object, IFooterState> {
  public readonly state = {
    links: [
      [
        {
          text: 'SELL YOUR PHONE',
          href: ''
        },
        {
          text: 'How it Works',
          href: ''
        },
        {
          text: 'Prepare to Ship',
          href: ''
        },
        {
          text: 'Return Promise',
          href: ''
        },
        {
          text: 'Device Grades',
          href: ''
        },
        {
          text: 'FAQ',
          href: ''
        }
      ],
      [
        {
          text: 'PRESS',
          href: ''
        },
        {
          text: 'Blog',
          href: ''
        }
      ]
    ]
  }
  public render() {
    const linksGroup = this.state.links.map((group, key) => (
      <Col span={4} key={key} className="links-group">
        {
          group.map((link, index) => <p key={index} className="item" data-href={link.href}>{link.text}</p>)
        }
      </Col>
    ))
    return (
      <div className="comp-footer-container">
        <div className="content-wrapper">
          <div className="wave-bg" />
          <div className="links-group-wrapper">
            <Row gutter={48}>
              <Col span={3}><img src={require('@/images/logo.png')} /></Col>
              {
                linksGroup
              }
              <Col span={4} className="links-group">
                <p className="item">PRESS</p>
                <p className="item">Blog</p>
              </Col>
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
    )
  }
} 