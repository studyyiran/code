import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './footer.less';
import { Row, Col, Input, Button } from 'antd';
// import commonStore from '@/store/common'
import config from '../../../../config';

const footerInfo = [
  {
    title: 'Buy',
    className: 'footer-group-buy',
    arr: [
      {
        subTitle: 'Smartphones',
        href: 'Smartphones'
      },
      {
        subTitle: 'Tablets',
        href: 'Tablets'
      },
      {
        subTitle: 'Macbooks',
        href: 'Macbooks'
      }
    ]
  },
  {
    title: 'Sell',
    className: 'footer-group-sell',
    arr: [
      {
        subTitle: 'Smartphones',
        href: 'Smartphones'
      },
      {
        subTitle: 'Tablets',
        href: 'Tablets'
      },
      {
        subTitle: 'Macbooks',
        href: 'Macbooks'
      }
    ]
  }
]

interface IFooterState {
  email: string
}

interface IRenderByCondition {
  isMobile?: boolean,
  ComponentMb: any,
  ComponentPc: any,
}

function RenderByCondition(props: IRenderByCondition) {
  const {isMobile, ComponentMb, ComponentPc} = props
  if (isMobile) {
    return ComponentMb
  } else {
    return ComponentPc
  }
}

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
    return <footer className="comp-footer">
      <h1 className="footer__logo">UpTrade</h1>
      <form className="footer__email-form">
        <h2>Keep in touch</h2>
        <p>123</p>
        <input placeholder="Email"/>
      </form>
      <RenderByCondition ComponentMb={
        <div className="footer__group">
          {footerInfo.map(({className, title, arr}) => {
            return <ul className={className} key={title}>
              <h2>{title}</h2>
              {arr.map(({subTitle, href}) => {
                return <li key={subTitle}>
                  <Link to={href}>{subTitle}</Link>
                </li>
              })}
            </ul>
          })}
        </div>
      } ComponentPc={
        <div className="footer__group">
          {footerInfo.map(({className, title, arr}) => {
            return <ul className={className} key={title}>
              <h2>{title}</h2>
              {arr.map(({subTitle, href}) => {
                return <li key={subTitle}>
                  <Link to={href}>{subTitle}</Link>
                </li>
              })}
            </ul>
          })}
        </div>
      } />
    </footer>
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
} 