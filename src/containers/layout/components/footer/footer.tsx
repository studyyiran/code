import * as React from "react";
import { useContext } from "react";
import "./footer.less";
import { Collapse, Form, message } from "antd";
import { RenderByCondition } from "./RenderByCondition";
import {
  ISelectModelContext,
  SelectModelContext
} from "pages/sell/selectModelProcess/context";
import RouterLink from "components/routerLink";
import footerInfo from "../../../../buy/common-modules/config/footerLinks.config";

const { Panel } = Collapse;

interface IFooterState {
  email: string;
}

export default class Footer extends React.Component<{}, IFooterState> {
  public readonly state = {
    email: ""
  };
  public render() {
    function RenderFunc(props: any) {
      return props.arr.map(({ subTitle, href, isBuy }: any) => {
        return (
          <li key={subTitle}>
            <RouterLink to={href} isBuy={isBuy}>
              <span style={{ cursor: "pointer" }} onClick={clickUrlHandler}>
                {subTitle}
              </span>
            </RouterLink>
          </li>
        );
      });
    }
    return (
      <footer className="comp-footer">
        <div className="width-container">
          <header className="footer__logo flex-grid">
            <div>
              <RouterLink to={"/"} isBuy={true}>
                <img src={require("images/logo.svg")} />
              </RouterLink>
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
                        <RenderFunc arr={arr} />
                      </ul>
                    );
                  })}
                </div>
              }
            />
            <div className="footer__email-form">
              <h2>Subscribe To Our Newsletter</h2>
              <RenderEmailForm />
            </div>
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
            {arr.map(({ subTitle, href, isBuy }: any) => {
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
                    <span style={{ cursor: "pointer" }}>{subTitle}</span>
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
