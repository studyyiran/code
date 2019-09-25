import * as React from "react";
import { inject, observer } from "mobx-react";
import { Row, Col, Form, Input, message } from "antd";
import { IPaymentProps, IPaymentStates, EPayType } from "../../index.interface";
import yourPhoneStore from "@/containers/aboutphone/store/yourphone.store";
import "./index.less";
import ButtonGroup from "@/pages/sell/selectModelProcess/components/buttonGroup";
import PriceTitle from "@/pages/sell/selectModelProcess/components/priceTitle";
/**
 * 根据yourphone的payment来判断用户选择哪种收款方式： PAYPAL | ECHECK
 */

@inject("yourphone", "user", "common")
@observer
class YourPayment extends React.Component<IPaymentProps, IPaymentStates> {
  public readonly state: Readonly<IPaymentStates> = {
    activeSide: this.props.yourphone.payment
  };

  public componentDidMount() {
    // 显示左侧价格模块
    // this.props.user.isShowLeftPrice = true;
    // if (!paymentPageValidate()) {
    //   this.props.history.push("/sell/yourphone/brand");
    //   return;
    // }

    if (typeof this.props.onRef === "function") {
      this.props.onRef!(this); // 让done page里获取到这个组件实例，调用其validateData方法
    }
  }

  public validateData = (): Promise<boolean> => {
    return new Promise(resolve => {
      // 必须要选中一种支付方式
      const payment = this.state.activeSide;

      if (payment === "") {
        message.info("how would you like to pay?");
        resolve(false);
        return;
      }
      this.props.yourphone.payment = this.state.activeSide;
      // 用户并没有修改有关的支付信息，不需要执行下面的校验
      if (
        !this.props.yourphone.isLeftOnEdit &&
        !this.props.yourphone.isRightOnEdit
      ) {
        switch (this.state.activeSide) {
          case EPayType.PAYPAL:
            this.props.yourphone.paypal = {
              email: this.props.user.preOrder.userEmail || ""
            };
            break;
          case EPayType.ECHECK:
            this.props.yourphone.echeck = {
              firstName: this.props.yourphone.addressInfo.firstName,
              lastName: this.props.yourphone.addressInfo.lastName,
              email: this.props.user.preOrder.userEmail || ""
            };
            break;
        }

        // 于此添加，解决用户直接选择了一个支付方式并且没有修改支付信息的情况
        try {
          this.props.user.preOrder = {
            ...this.props.user.preOrder,
            checkInfo: { ...this.props.yourphone.echeck },
            payment: this.state.activeSide,
            paypalInfo: { ...this.props.yourphone.paypal }
          };
        } catch (error) {
          console.warn(error, "in payment page preOrder");
        }

        resolve(true);
        return;
      }
      this.props.form.validateFields((err, values) => {
        if (err) {
          resolve(false);
          return;
        }

        const {
          email,
          email_confirm,
          firstName,
          lastName,
          paypal_email,
          paypal_email_confirm
        } = values;

        // 判断两次输入echeck的email是否一致
        if (
          !email ||
          !email_confirm ||
          email.toLowerCase() !== email_confirm.toLowerCase()
        ) {
          this.props.form.setFields({
            email_confirm: {
              value: email_confirm,
              errors: [new Error("The emails don't match.")]
            }
          });
          resolve(false);
          return;
        }
        // 判断两次输入paypal的email是否一致
        if (paypal_email !== paypal_email_confirm) {
          this.props.form.setFields({
            paypal_email_confirm: {
              value: paypal_email_confirm,
              errors: [new Error("The emails don't match.")]
            }
          });
          resolve(false);
          return;
        }

        switch (this.state.activeSide) {
          case EPayType.PAYPAL:
            this.props.yourphone.paypal = { email: paypal_email };
            break;
          case EPayType.ECHECK:
            this.props.yourphone.echeck = {
              firstName,
              lastName,
              email
            };
            break;
        }
        // 于此更新preOrder，使得该页面以弹窗形式出现依旧能更新preOrder
        try {
          this.props.user.preOrder = {
            ...this.props.user.preOrder,
            checkInfo: { ...this.props.yourphone.echeck },
            payment: this.state.activeSide,
            paypalInfo: { ...this.props.yourphone.paypal }
          };
        } catch (error) {
          console.warn(error, "in payment page preOrder");
        }

        resolve(true);
      });
    });
  };

  public render() {
    let leftContent: React.ReactNode;
    let rightContent: React.ReactNode;
    const { getFieldDecorator } = this.props.form;

    const { paypal, echeck } = this.props.yourphone;
    // paypal的结构
    switch (this.props.yourphone.isLeftOnEdit) {
      case false:
        leftContent = (
          <div className="wrapper">
            <div className="form-wrapper">
              <Form layout="vertical">
                <Form.Item label="PayPal email address">
                  <Input
                    value={
                      this.props.yourphone.paypal.email ||
                      this.props.yourphone.addressInfo.userEmail
                    }
                  />
                </Form.Item>
                <Form.Item label="Confirm PayPal email address">
                  <Input />
                </Form.Item>
              </Form>
            </div>
          </div>
        );
        break;

      case true:
        leftContent = (
          <div className="wrapper">
            <div className="form-wrapper">
              <Form layout="vertical">
                <Form.Item label="PayPal email address">
                  {getFieldDecorator("paypal_email", {
                    rules: [
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email."
                      }
                    ],
                    initialValue:
                      this.props.yourphone.paypal.email ||
                      this.props.yourphone.addressInfo.userEmail,
                    validateTrigger: "onBlur"
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Confirm PayPal email address">
                  {getFieldDecorator("paypal_email_confirm", {
                    rules: [
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email."
                      }
                    ],
                    validateTrigger: "onBlur",
                    initialValue: ""
                  })(<Input />)}
                </Form.Item>
              </Form>
            </div>
          </div>
        );
        break;
    }

    // eCheck的结构
    switch (this.props.yourphone.isRightOnEdit) {
      case false:
        rightContent = (
          <div className="wrapper">
            <div className="form-wrapper">
              <Form layout="vertical">
                <Form.Item label="First Name">
                  <Input
                    value={
                      this.props.yourphone.addressInfo.firstName ||
                      this.props.yourphone.echeck.firstName
                    }
                  />
                </Form.Item>
                <Form.Item label="Last Name">
                  <Input
                    value={
                      this.props.yourphone.addressInfo.lastName ||
                      this.props.yourphone.echeck.lastName
                    }
                  />
                </Form.Item>
                <Form.Item label="eCheck email address">
                  <Input
                    value={
                      this.props.user.preOrder.userEmail ||
                      this.props.yourphone.echeck.email
                    }
                  />
                </Form.Item>
                <Form.Item label="Confirm eCheck email address">
                  <Input value={""} />
                </Form.Item>
              </Form>
            </div>
          </div>
        );
        break;
      case true:
        rightContent = (
          <div className="wrapper">
            <div className="form-wrapper">
              <Form layout="vertical">
                <Form.Item label="First Name">
                  {getFieldDecorator("firstName", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter a valid first name."
                      }
                    ],
                    validateTrigger: "onBlur",
                    initialValue: this.props.yourphone.addressInfo.firstName
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Last Name">
                  {getFieldDecorator("lastName", {
                    rules: [
                      {
                        required: true,
                        pattern: /\w+/,
                        message: "Please enter a valid last name."
                      }
                    ],
                    validateTrigger: "onBlur",
                    initialValue: this.props.yourphone.addressInfo.lastName
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="eCheck email address">
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email."
                      }
                    ],
                    validateTrigger: "onBlur",
                    initialValue: this.props.user.preOrder.userEmail
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Confirm eCheck email address">
                  {getFieldDecorator("email_confirm", {
                    rules: [
                      {
                        required: true,
                        type: "email",
                        message: "please confirm the Email",
                        validator: (rule: any, value: any, callback: any) => {
                          if (
                            !this.props.form.getFieldValue("email") ||
                            !value ||
                            this.props.form
                              .getFieldValue("email")
                              .toLowerCase() !== value.toLowerCase()
                          ) {
                            console.log("no");
                            callback("notsame");
                          }
                          callback();
                        }
                      }
                    ],
                    validateTrigger: "onBlur",
                    initialValue: ""
                  })(<Input />)}
                </Form.Item>
              </Form>
            </div>
          </div>
        );
        break;
    }

    const paymentHTML = (
      <div className="payment-type-container">
        <div
          className="echeck-container container-border"
          data-selected={
            this.state.activeSide
              ? this.state.activeSide === EPayType.ECHECK
              : true
          }
          onClick={this.handleEcheckCollapseExtend}
        >
          <div className="recommended comp-top-tag">Recommended</div>
          <header>
            <h3>eCheck</h3>
            {/*<img src={require("./img/echeck.svg")}/>*/}
            <span>- No Fees</span>
          </header>
          <p className="description">
            eChecks works just like regular checks. We email it to you and you
            print it. After you print, it works just like a regular check.
          </p>
          {rightContent}
        </div>
        <div
          className="paypal-container container-border"
          data-selected={this.state.activeSide === EPayType.PAYPAL}
          onClick={this.handlePaypalCollapseExtend}
        >
          <header>
            <img src={require("./img/paypal.png")} />
            <span>- 2.9% + $0.30 fee</span>
          </header>
          <p className="description">
            Confirm your PayPal address so we can send you the payment for your
            phone.
          </p>
          {leftContent}
        </div>
      </div>
    );
    return (
      <div className={"page-payment-container"}>
        <PriceTitle>How would you like to get paid?</PriceTitle>
        {paymentHTML}
        <ButtonGroup
          {...this.props}
          handleNext={this.handleNext}
          disabled={!this.checkFormValueSame()}
        />
      </div>
    );
  }

  private checkFormValueSame() {
    const formValues = this.props.form.getFieldsValue();
    const checkArr: string[] = [];
    Object.keys(formValues).forEach((key: string) => {
      if (key.indexOf("email") !== -1) {
        checkArr.push(formValues[key]);
      }
    });
    if (
      checkArr.length === 2 &&
      checkArr[0] &&
      checkArr[1] &&
      checkArr[0].toLowerCase() === checkArr[1].toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  }

  private handlePaypalCollapseExtend = () => {
    this.props.yourphone.isLeftOnEdit = true;
    this.props.yourphone.isRightOnEdit = false;
    this.setState({
      activeSide: "PAYPAL"
    });
  };

  private handleEcheckCollapseExtend = () => {
    this.props.yourphone.isLeftOnEdit = false;
    this.props.yourphone.isRightOnEdit = true;
    this.setState({
      activeSide: "CHECK"
    });
  };

  private handleNext = async () => {
    const isOk = await this.validateData();
    if (isOk) {
      // @ts-ignore
      this.props.goNextPage();
      // this.props.history.push("/sell/yourphone/shipment");
    }
  };
}

const onValuesChange = (props: any, changedValues: any, allValues: any) => {
  if (yourPhoneStore.payment === EPayType.PAYPAL) {
    if (
      allValues.paypal_email &&
      allValues.paypal_email_confirm &&
      yourPhoneStore.isLeftOnEdit
    ) {
      yourPhoneStore.isPaymentFormFilled = true;
      return false;
    }

    yourPhoneStore.isPaymentFormFilled = false;
    // false
    return false;
  }

  if (
    allValues.firstName &&
    allValues.lastName &&
    allValues.email &&
    allValues.email_confirm &&
    yourPhoneStore.isRightOnEdit
  ) {
    yourPhoneStore.isPaymentFormFilled = true;
    return false;
  }

  yourPhoneStore.isPaymentFormFilled = false;
  return true;
};

export default Form.create({ onValuesChange: onValuesChange })(YourPayment);
