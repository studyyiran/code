import React, { useContext, useState } from "react";
import "./index.less";
import { Checkbox, Form, Input, Row, Col } from "antd";
import { PaymentInformation } from "../information";
import { IOrderInfoContext, OrderInfoContext } from "../../context";
import PayCardImages from "../../../../pages/detail/components/payCardImages";
import Svg from "../../../../components/svg";
function PaymentInner(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const {
    orderInfoContextValue,
    createOrder
  } = orderInfoContext as IOrderInfoContext;
  const { invoiceSameAddr, payInfo } = orderInfoContextValue;
  const { getFieldDecorator, validateFields } = props.form;
  const [sameAsShipping, setSameAsShipping] = useState(invoiceSameAddr);
  function handleNext() {
    let result;
    // 检测card表单
    validateFields((err: any, values: any) => {
      if (!err) {
        // 解耦提交和拉取请求
        result = createOrder({
          payInfo: {
            paymentType: "CREDIT_CARD",
            creditCardInfo: values
          },
          invoiceSameAddr: sameAsShipping
        });
      } else {
        result = false;
      }
    });
    // 返回
    return result;
  }

  function getCreditValue(key: string) {
    return payInfo &&
      payInfo.creditCardInfo &&
      (payInfo.creditCardInfo as any)[key]
      ? (payInfo.creditCardInfo as any)[key]
      : "";
  }

  return (
    <div className="payment-page">
      <section className="pay-card">
        <h2 className="order-common-less-title">Payment information</h2>
        <div className="pay-card-container">
          <header className="card">
            <span>Credit card</span>
            <PayCardImages />
          </header>
          <Form className="card">
            <Form.Item>
              {getFieldDecorator("cardNo", {
                initialValue: getCreditValue("cardNo"),
                rules: [
                  {
                    required: true,
                    validateTrigger: "onBlur",
                    message: "Enter a valid card number"
                  }
                ]
              })(
                <Input
                  placeholder={"Card number"}
                  suffix={<Svg icon={"lock"} />}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("userName", {
                initialValue: getCreditValue("userName"),
                rules: [
                  {
                    required: true,
                    validateTrigger: "onBlur",
                    message:
                      "Enter your name exactly as it's written on your card"
                  }
                ]
              })(<Input placeholder={"Name on card"} />)}
            </Form.Item>
            <Row gutter={24}>
              <Col sm={14} xs={14}>
                <Form.Item>
                  {getFieldDecorator("invalidDate", {
                    initialValue: getCreditValue("invalidDate"),
                    rules: [
                      {
                        required: true,
                        validateTrigger: "onBlur",
                        message: "Enter a valid card expiry date"
                      }
                    ]
                  })(<Input placeholder={"Expiration date(MM/YY)"} />)}
                </Form.Item>
              </Col>
              <Col sm={10} xs={10}>
                <Form.Item>
                  {getFieldDecorator("pinCode", {
                    initialValue: getCreditValue("pinCode"),
                    rules: [
                      {
                        required: true,
                        validateTrigger: "onBlur",
                        message: "Enter the CVV or security code on your card"
                      }
                    ]
                  })(<Input placeholder={"Security code"} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </section>
      <section className="address">
        <h2 className="order-common-less-title">Billing Address</h2>
        <p>Select the address that matches your card or payment method.</p>
        <div className="checkbox-container-group">
          <div className="checkbox-container">
            <Checkbox
              checked={sameAsShipping === true}
              onChange={() => {
                setSameAsShipping(true);
              }}
            >
              <span>Same as shipping address</span>
            </Checkbox>
          </div>
          <div className="checkbox-container">
            <Checkbox
              checked={sameAsShipping === false}
              onChange={() => {
                setSameAsShipping(false);
              }}
            >
              <span>Use a different billing address</span>
            </Checkbox>
          </div>
        </div>
      </section>
      {sameAsShipping === true ? (
        props.renderButton(handleNext)
      ) : (
        <PaymentInformation
          renderButton={(informationHandleNext: any) => {
            return props.renderButton(() => {
              // 检测表单
              if (informationHandleNext()) {
                // 设置开始提交
                return handleNext();
              } else {
                return false;
              }
            });
          }}
        />
      )}
    </div>
  );
}
const Payment = Form.create()(PaymentInner);
export default Payment;
