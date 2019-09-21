import React, { useContext } from "react";
import { inject, observer } from "mobx-react";
import { Divider, Input, Button, Form, Icon } from "antd";
import "./checkOrderNo.less";
import {
  TotalOrderInfoContext,
  ITotalOrderInfoContext
} from "./container/context";
import { setOrderCache } from "@/containers/order/util";
import "../../containers/commonCss/contact.less";
import { getQueryString } from "utils";

const nextUrl = "/order";

export default function CheckOrderNoContainer(props: any) {
  const totalOrderInfoContext = useContext(TotalOrderInfoContext);
  const { checkForOrder } = totalOrderInfoContext as ITotalOrderInfoContext;
  return <CheckOrderNo checkForOrder={checkForOrder} {...props} />;
}

@inject("order")
@observer
class CheckOrderNo extends React.Component<any, any> {
  public state = {
    email: "",
    validateEmail: undefined,
    emailInputHelp: "",
    orderNo: "",
    validateOrderNo: undefined,
    orderInputHelp: "",
    formError: ""
  };
  public async componentDidMount() {
    document.title = "Check My Order | UpTradeit.com";
    const email = getQueryString("email");
    const orderId = getQueryString("orderId");
    if (email && orderId) {
      try {
        this.postEmail(decodeURIComponent(email), decodeURIComponent(orderId));
      } catch (e) {
        console.error(e);
      }
    }
  }
  public render() {
    return (
      <div className="page-container__title contact-common-css page-checkOrder-container">
        <div className="bg-container bg-1">
          <section className="page-container__title">
            <h1>Check My Order</h1>
          </section>
        </div>
        <div className="bg-container bg-2">
          <div className="common-card">
            <div className="form ">
              <Form>
                <div className="check-label">Contact Email on My Order</div>
                <Form.Item
                  validateStatus={this.state.validateEmail}
                  help={this.state.emailInputHelp}
                >
                  <Input
                    value={this.state.email}
                    type="email"
                    onChange={this.handleChangeEmail}
                    size="large"
                    onBlur={this.checkFormat}
                  />
                </Form.Item>
                <div className="check-label">My Order Number</div>
                <Form.Item
                  validateStatus={this.state.validateOrderNo}
                  help={this.state.orderInputHelp}
                >
                  <Input
                    value={this.state.orderNo}
                    onChange={this.handleChangeOrderNo}
                    size="large"
                  />
                </Form.Item>
              </Form>
              {this.state.formError !== "" && (
                <div className="form-error">{this.state.formError}</div>
              )}
              <button
                className="common-button"
                onClick={this.onSubmit}
                disabled={this.state.email === "" || this.state.orderNo === ""}
              >
                Check Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  /**
   * email change event
   */
  private handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = {
      email: e.target.value,
      validateEmail: undefined,
      emailInputHelp: ""
    };
    this.setState(state);
    return true;
  };
  /**
   * orderNo change event
   */
  private handleChangeOrderNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = {
      orderNo: e.target.value,
      validateOrderNo: undefined,
      orderInputHelp: ""
    };
    this.setState(state);
  };
  private checkFormat = () => {
    const email = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    if (!email.test(this.state.email) && this.state.email !== "") {
      this.setState({
        validateEmail: "error",
        emailInputHelp: (
          <>
            <Icon type="close-circle" />
            &nbsp;Please enter a valid email address
          </>
        )
      });
    }
  };

  private postEmail = async (email: any, orderId: any) => {
    try {
      const b = await this.props.checkForOrder(email, orderId);
      if (b.groupOrderNo) {
        // 应该不能单独取消一个子订单？这个应该放在内部去判断。
        // 根据操作记录判断CRM取消订单
        setOrderCache({
          email,
          orderId
        });
        this.props.history.push(nextUrl);
      } else {
        this.setState({
          formError: "The email address does not match the order number"
        });
      }
    } catch (e) {
      this.setState({
        formError: e.resultMessage
      });
    }
  };

  private onSubmit = async () => {
    let canSubmit = true;
    // 校验email
    const email = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    if (!email.test(this.state.email)) {
      canSubmit = false;
      this.setState({
        validateEmail: "error",
        emailInputHelp: (
          <>
            <Icon type="close-circle" />
            &nbsp;Please enter a valid email address
          </>
        )
      });
    }
    // if (!/^[0-9]*$/.test(this.state.orderNo)) {
    //   canSubmit = false;
    //   this.setState({
    //     validateOrderNo: "error",
    //     orderInputHelp: "Please enter a valid order number"
    //   });
    // }
    if (canSubmit) {
      this.postEmail(this.state.email, this.state.orderNo);
    }
  };
}

// export default CheckOrderNo;
