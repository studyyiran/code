import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './footer.less';
import { Row, Col, Input, Button } from 'antd';
import { IFooterState } from './interface/index.interface';
// import commonStore from '@/store/common'
import config from '../../config';

export default class Footer extends React.Component<{ router: any }, IFooterState> {
  public readonly state = {
    email: ''
  }
  public render() {
    const linksGroup = config.FOOTERLINKS.map((group, key) => (
      <Col span={5} key={key} className="links-group">
        {
          group.map((link, index) => <p key={index} className={classnames('item', { nocursor: !link.href })} onClick={this.handleLink.bind(this, link)} data-href={link.href}>{link.text}</p>)
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
                  <form
                    action="https://uptradeit.us20.list-manage.com/subscribe/post?u=d5c899a65eeea99f76cc22169&id=5af7b8030d" method="post" target="_blank">
                    <Input
                      placeholder="Enter your email"
                      name="EMAIL"
                      style={{ margin: '10px 0 14px 0' }}
                      onChange={this.handChangeInput}
                    />
                    <input type="hidden" name="b_d5c899a65eeea99f76cc22169_5af7b8030d" value="" />
                    <Button className="foot-subscribe" htmlType="submit" type="primary">SUBSCRIBE</Button>
                  </form>
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


        {/* <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />
        <style type="text/css">
          {`#mc_embed_signup {
          background: #fff; 
          clear:left; 
          font:14px Helvetica,Arial,sans-serif; 
          }`}
        </style>
        <div id="mc_embed_signup">
          <form action="https://uptradeit.us20.list-manage.com/subscribe/post?u=d5c899a65eeea99f76cc22169&id=5af7b8030d" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
            <div id="mc_embed_signup_scroll">
              <h2>Sign up to receive news, tips, and offers</h2>
              <div className="indicates-required"><span className="asterisk" /> indicates required</div>
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">Email Address <span className="asterisk" /></label>
                <input type="email" value="" name="EMAIL" className="required email" id="mce-EMAIL" />
              </div>
              <div id="mce-responses" className="clear">
                <div className="response" id="mce-error-response" style={{ display: 'none' }} />
                <div className="response" id="mce-success-response" style={{ display: 'none' }} />
              </div>
              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                <input type="text" name="b_d5c899a65eeea99f76cc22169_5af7b8030d" value="" />
              </div>
              <div className="clear">
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
              </div>
            </div>
          </form>
        </div> */}
        {/* <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'/>
        <script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script> */}
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

  // private handleSubscribe = async () => {
  //   if (!this.state.email || !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/.test(this.state.email)) {
  //     return;
  //   }
  //   const result = await commonStore.onSubscribe(this.state.email);

  //   if (result) {
  //     notification.success({
  //       message: 'Successfully subscribed.',
  //     });
  //     this.setState({
  //       email: ''
  //     })
  //   }
  // }
} 