import * as React from "react";
import "./index.less";
import { Form, message } from "antd";
import { Collapse } from "antd";
import { useContext } from "react";
import RouterLink from "buy/components/routerLink";
import { RenderByCondition } from "buy/components/RenderByCondition";
import { GlobalSettingContext, IGlobalSettingContext } from "../../context";
import footerInfo from "../../common/config/footerLinks.config";

const { Panel } = Collapse;

export default function Footer(props: any) {
  return (
    <footer className="comp-footer">
      <div className="width-container">
        <header className="footer__logo flex-grid">
          <div>
            <img src={require("buy/common/static/logo.svg")} />
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
                {footerInfo.map(({ title, arr }) => {
                  return (
                    <ul className="item" key={title}>
                      <h2>{title}</h2>
                      {arr.map(({ subTitle, href }) => {
                        return (
                          <li key={subTitle}>
                            <RouterLink onClick={clickUrlHandler} to={href}>
                              {subTitle}
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
          <div className="footer__email-form">
            <h2>Subscribe To Our Newsletter</h2>
            <RenderEmailForm />
          </div>
        </div>
      </div>
      <div className="footer-bottom-wrapper">
        <div>
          <div className="desc">
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
    </footer>
  );
}

export function MbFooter(props: any): any {
  const { onClickHandler } = props;
  return footerInfo.map(({ title, arr }: any) => {
    return (
      <ul className="item" key={title}>
        <Collapse expandIconPosition="right">
          <Panel header={<h2>{title}</h2>} key={title}>
            {arr.map(({ subTitle, href }: any) => {
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
                  <RouterLink to={href}>
                    <span>{subTitle}</span>
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
  const selectModelContext = useContext(GlobalSettingContext);
  const { emailSubscribed } = selectModelContext as IGlobalSettingContext;
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

function clickUrlHandler() {
  window.scroll(0, 0);
}