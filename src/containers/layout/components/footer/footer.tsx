import * as React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import "./footer.less";
import { Row, Col, Input, Button, Form, message } from "antd";
// import commonStore from '@/store/common'
import config from "../../../../config";
import Svg from "@/components/svg";
import { RenderByCondition } from "./RenderByCondition/index";
import { Collapse } from "antd";
import { useContext } from "react";
import {
  SelectModelContext,
  ISelectModelContext
} from "@/pages/sell/selectModelProcess/context";
const { Panel } = Collapse;

export const footerInfo = [
  {
    title: "Sell",
    className: "",
    arr: [
      {
        subTitle: "How To Sell",
        href: "/sell-my-phone"
      }
      // {
      //   subTitle: 'Sell Now',
      //   href: ''
      // }
    ]
  },
  {
    title: "Resources",
    className: "",
    arr: [
      {
        subTitle: "Contact Us",
        href: "/contact"
      },
      {
        subTitle: "Blog",
        href: "/blog"
      },
      {
        subTitle: "FAQs",
        href: "/faq"
      }
    ]
  },
  {
    title: "About Us",
    className: "",
    arr: [
      {
        subTitle: "Who We Are",
        href: "/who-we-are"
      }
    ]
  },
  {
    title: "Account",
    className: "",
    arr: [
      {
        subTitle: "Check My Order",
        href: "/check-order"
      }
    ]
  }
];

interface IFooterState {
  email: string;
}

export default class Footer extends React.Component<
  { router: any },
  IFooterState
> {
  public readonly state = {
    email: ""
  };
  public render() {
    const linksGroup = config.FOOTERLINKS.map((group, key) => (
      <Col span={5} key={key} className="links-group">
        {group.map((link, index) => (
          <p
            key={index}
            className={classnames("item", { nocursor: !link.href })}
            onClick={this.handleLink.bind(this, link)}
            data-href={link.href}
          >
            {link.text}
          </p>
        ))}
      </Col>
    ));
    return (
      <footer className="comp-footer">
        <div className="width-container">
          <header className="footer__logo flex-grid">
            <div>
              <img src={require("@/images/logo.svg")} />
            </div>
            <div />
          </header>
          <div className="container flex-grid">
            <RenderByCondition
              ComponentMb={
                <div className="footer__group">
                  <MbFooter />
                </div>
              }
              ComponentPc={
                <div className="footer__group">
                  {footerInfo.map(({ className, title, arr }) => {
                    return (
                      <ul className="item" key={title}>
                        <h2>{title}</h2>
                        {arr.map(({ subTitle, href }) => {
                          return (
                            <li key={subTitle}>
                              <Link to={href}>{subTitle}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  })}
                </div>
              }
            />
            <form className="footer__email-form">
              <h2>Subscribe To Our Newsletter</h2>
              <RenderEmailForm />
            </form>
          </div>
          <div className="flex-grid">
            <div>
              <div>
                <span className="last">Terms & Conditions</span>
                <span>Privacy Policy</span>
              </div>
              <span>© 2019 UP Trade Technologies, Inc.</span>
            </div>
            <div />
          </div>
        </div>
      </footer>
    );
  }

  private handleLink = (link: { [key: string]: string }) => {
    if (!link.href) {
      return false;
    }
    if (
      /\/faq/.test(link.href) &&
      this.props.router.history.location.pathname === "/faq"
    ) {
      window.location.href = location.origin + link.href;
      return false;
    }
    this.props.router.history.push(link.href);
    return true;
  };

  private handChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.target.value
    });
  };
}

export function MbFooter(props: any): any {
  const { onClickHandler } = props;
  return footerInfo.map(({ className, title, arr }: any) => {
    return (
      <ul className="item" key={title}>
        <Collapse expandIconPosition="right">
          <Panel header={<h2>{title}</h2>} key={title}>
            {arr.map(({ subTitle, href }: any) => {
              return (
                <li key={subTitle} onClick={onClickHandler}>
                  <Link to={href}>
                    <span>{subTitle}</span>
                  </Link>
                </li>
              );
            })}
          </Panel>
        </Collapse>
      </ul>
    );
  });
}

function RenderEmailForm() {
  const selectModelContext = useContext(SelectModelContext);
  const { emailSubscribed } = selectModelContext as ISelectModelContext;
  const EmailForm: any = (innerProps: any) => (
    <Form
      className="post-email"
      onSubmit={(e: any) => {
        e.preventDefault();
        innerProps.form.validateFields((error: any, values: any) => {
          if (!error) {
            emailSubscribed(values.email)
              .then((res: any) => {
                message.success('subscribe success!');
              })
              .catch((errorRes: any) => {
                console.error(errorRes);
              });
          }
        });
      }}
    >
      <Form.Item>
        {innerProps.form.getFieldDecorator("email")(
          <input placeholder="Email" aria-placeholder="Email" />
        )}
      </Form.Item>
      <button className="common-button">Subscribe</button>
    </Form>
  );
  const A = Form.create({ name: "dontknow" })(EmailForm);
  return <A />;
}
