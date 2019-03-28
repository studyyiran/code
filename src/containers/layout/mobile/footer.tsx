import * as React from 'react';
import { Input, notification } from 'antd';
import { Link } from 'react-router-dom';
import { FOOTERLINKS } from 'config';
import commonStore from '@/store/common';
import './footer.less';

export default class Footer extends React.Component {
  public render() {
    return (
      <div className="comp-mobile-footer-container">
        <div className="list-box">
          {
            [...FOOTERLINKS].map((group, key) => (
              <dl key={key}>
                {
                  group.map((link, index) => {
                    if (!link.href) {
                      return <dt key={index}>{link.text}</dt>
                    }
                    return <dd key={index}><Link to={link.href}>{link.text}</Link></dd>;
                  })
                }
              </dl>
            ))
          }
        </div>
        <div className="subscribe">
          <header>CONNECT WITH US!</header>
          <div className="input-group">
            <Input.Search
              placeholder="Enter your email"
              onSearch={this.handleSubscribe}
              enterButton="SUBSCRIBE"
              style={{ width: '100%' }}
              className="subscribe-input"
            />
          </div>
        </div>
        <div className="logo-box">
          <img src={require('@/images/logo.png')} alt="" />
          <div className="copy">&copy; 2019 UpTrade Technologies, Inc.</div>
        </div>
        <div className="link-list">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </div>
      </div>
    )
  }

  private handleSubscribe = async (value: string) => {
    if (!value || !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/.test(value)) {
      return;
    }
    const result = await commonStore.onSubscribe(value);

    if (result) {
      notification.success({
        message: 'Successfully subscribed.',
      });
    }
  }
}