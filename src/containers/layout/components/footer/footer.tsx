import * as React from "react";
import {useContext} from "react";
import classnames from "classnames";
import "./footer.less";
import {Col, Collapse, Form, message} from "antd";
// import commonStore from 'store/common'
import config from "../../../../config";
import {RenderByCondition} from "./RenderByCondition";
import {ISelectModelContext, SelectModelContext} from "pages/sell/selectModelProcess/context";
import RouterLink from "components/routerLink";
import getSellPath from "utils/util";

const { Panel } = Collapse;

export const footerInfo = [
  {
    title: "Buy",
    className: "",
    arr: [
      {
        isBuy: true,
        subTitle: "Buy Home",
        href: "/buy"
      },
      {
        isBuy: true, //用于判定是哪一个端的跳转
        subTitle: "Buy Now",
        href: "/buy-phone"
      }
    ]
  },
  {
    title: "Sell",
    className: "",
    arr: [
      {
        subTitle: "Sell Home",
        href: "/sell"
      },
      {
        subTitle: "How To Sell",
        href: "/how-to-sell-my-home"
      },
      {
        subTitle: "Sell Now",
        href: getSellPath()
      }
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
              <img src={require("images/logo.svg")} />
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
                        {
                          // @ts-ignore
                          arr.map(({ subTitle, href, isBuy }) => {
                          return (
                            <li key={subTitle}>
                              <RouterLink to={href} isBuy={isBuy}>
                               <span style={{cursor: "pointer"}} onClick={clickUrlHandler}>{subTitle}</span>
                              </RouterLink>
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
                <RouterLink to="/terms">
                  <span className="last">Terms & Conditions</span>
                </RouterLink>
                <RouterLink to="/privacy-policy">
                  <span>Privacy Policy</span>
                </RouterLink>
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

function clickUrlHandler() {
  window.scroll(0, 0);
}

export function MbFooter(props: any): any {
  const { onClickHandler } = props;
  return footerInfo.map(({ className, title, arr }: any) => {
    return (
      <ul className="item" key={title}>
        <Collapse expandIconPosition="right">
          <Panel header={<h2>{title}</h2>} key={title}>
            {
              arr.map(({ subTitle, href, isBuy }: any) => {
              return (
                <li
                  key={subTitle}
                  onClick={() => {
                    if (onClickHandler) {
                      onClickHandler();
                    }
                    if (clickUrlHandler) {
                      clickUrlHandler();
                    }
                  }}
                >
                  <RouterLink to={href} isBuy={isBuy}>
                    <span style={{cursor: "pointer"}}>{subTitle}</span>
                  </RouterLink>
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
                message.success("Succeed to subscribe");
              })
              .catch((errorRes: any) => {
                console.error(errorRes);
              });
          }
        });
      }}
    >
      <Form.Item>
        {innerProps.form.getFieldDecorator("email", {
          rules: [
            {
              required: true,
              type: "email",
              message: "Please enter a valid email."
            }
          ]
        })(<input placeholder="Email" aria-placeholder="Email" />)}
      </Form.Item>
      <button className="common-button">Subscribe</button>
    </Form>
  );
  const A = Form.create({ name: "dontknow" })(EmailForm);
  return <A />;
}
