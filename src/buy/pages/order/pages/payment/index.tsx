import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { Checkbox, Form, Input, Row, Col } from "antd";
import { PaymentInformation } from "../information";
import { IOrderInfoContext, OrderInfoContext } from "../../context";
import PayCardImages from "../../../../pages/detail/components/payCardImages";
import Svg from "../../../../components/svg";
import useGetTotalPrice from "../../components/orderLayout/useHook";
import { constValue } from "../../../../common/constValue";
import { callBackWhenPassAllFunc } from "../../../../common/utils/util";
function PaymentInner(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const {
    orderInfoContextValue,
    createOrder
  } = orderInfoContext as IOrderInfoContext;

  // 计算总价
  const { calcTotalPrice } = useGetTotalPrice();
  const totalPrice = calcTotalPrice();
  //  价格变化的时候，重新设置。
  useEffect(() => {
    callBackWhenPassAllFunc([() => totalPrice], () => {
      paypalPay(totalPrice);
    });
  }, [totalPrice]);

  function paypalPay(amount: any) {
    // @ts-ignore
    paypal
      .Buttons({
        createOrder: function(data: any, actions: any) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount
                }
              }
            ]
          });
        },
        onApprove: function(data: any, actions: any) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function(details: any) {
            // This function shows a transaction success message to your buyer.
            //那这个id，和接口一起传到后台就行
            createOrder({
              payInfo: {
                paymentType: "CREDIT_CARD",
                creditCardInfo: {},
                paypalOrderId: details.id
              },
              invoiceSameAddr: sameAsShipping
            });
          });
        }
      })
      .render("#paypal-button-container");
  }

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
          <header className="paypayl-part card">
            <span>
              PayPal<span>-2.9%+$0.30 Fee</span>
            </span>

            <div className="img-container">
              <img src={require("./res/paypal.png")} />
            </div>
          </header>
          <div />
        </div>
      </section>
      {/*<section className="pay-card">*/}
      {/*  <h2 className="order-common-less-title">Payment information</h2>*/}
      {/*  <div className="pay-card-container">*/}
      {/*    <header className="card">*/}
      {/*      <span>Credit card</span>*/}
      {/*      <PayCardImages />*/}
      {/*    </header>*/}
      {/*    <Form className="card">*/}
      {/*      <Form.Item>*/}
      {/*        {getFieldDecorator("cardNo", {*/}
      {/*          initialValue: getCreditValue("cardNo"),*/}
      {/*          rules: [*/}
      {/*            {*/}
      {/*              required: true,*/}
      {/*              validateTrigger: "onBlur",*/}
      {/*              message: "Enter a valid card number"*/}
      {/*            }*/}
      {/*          ]*/}
      {/*        })(*/}
      {/*          <Input*/}
      {/*            placeholder={"Card number"}*/}
      {/*            suffix={<Svg icon={"lock"} />}*/}
      {/*          />*/}
      {/*        )}*/}
      {/*      </Form.Item>*/}
      {/*      <Form.Item>*/}
      {/*        {getFieldDecorator("userName", {*/}
      {/*          initialValue: getCreditValue("userName"),*/}
      {/*          rules: [*/}
      {/*            {*/}
      {/*              required: true,*/}
      {/*              validateTrigger: "onBlur",*/}
      {/*              message:*/}
      {/*                "Enter your name exactly as it's written on your card"*/}
      {/*            }*/}
      {/*          ]*/}
      {/*        })(<Input placeholder={"Name on card"} />)}*/}
      {/*      </Form.Item>*/}
      {/*      <Row gutter={24}>*/}
      {/*        <Col sm={14} xs={14}>*/}
      {/*          <Form.Item>*/}
      {/*            {getFieldDecorator("invalidDate", {*/}
      {/*              initialValue: getCreditValue("invalidDate"),*/}
      {/*              rules: [*/}
      {/*                {*/}
      {/*                  required: true,*/}
      {/*                  validateTrigger: "onBlur",*/}
      {/*                  message: "Enter a valid card expiry date"*/}
      {/*                }*/}
      {/*              ]*/}
      {/*            })(<Input placeholder={"Expiration date(MM/YY)"} />)}*/}
      {/*          </Form.Item>*/}
      {/*        </Col>*/}
      {/*        <Col sm={10} xs={10}>*/}
      {/*          <Form.Item>*/}
      {/*            {getFieldDecorator("pinCode", {*/}
      {/*              initialValue: getCreditValue("pinCode"),*/}
      {/*              rules: [*/}
      {/*                {*/}
      {/*                  required: true,*/}
      {/*                  validateTrigger: "onBlur",*/}
      {/*                  message: "Enter the CVV or security code on your card"*/}
      {/*                }*/}
      {/*              ]*/}
      {/*            })(<Input placeholder={"Security code"} />)}*/}
      {/*          </Form.Item>*/}
      {/*        </Col>*/}
      {/*      </Row>*/}
      {/*    </Form>*/}
      {/*  </div>*/}
      {/*</section>*/}
      {/*<section className="address">*/}
      {/*  <h2 className="order-common-less-title">Billing Address</h2>*/}
      {/*  <p>Select the address that matches your card or payment method.</p>*/}
      {/*  <div className="checkbox-container-group">*/}
      {/*    <div className="checkbox-container">*/}
      {/*      <Checkbox*/}
      {/*        checked={sameAsShipping === true}*/}
      {/*        onChange={() => {*/}
      {/*          setSameAsShipping(true);*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <span>Same as shipping address</span>*/}
      {/*      </Checkbox>*/}
      {/*    </div>*/}
      {/*    <div className="checkbox-container">*/}
      {/*      <Checkbox*/}
      {/*        checked={sameAsShipping === false}*/}
      {/*        onChange={() => {*/}
      {/*          setSameAsShipping(false);*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <span>Use a different billing address</span>*/}
      {/*      </Checkbox>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      <div id={constValue.paypalButtonId} />
      {/*选择决定表单*/}
      {/*暂时屏蔽*/}
      {/*{sameAsShipping === true ? (*/}
      {/*  props.renderButton(handleNext)*/}
      {/*) : (*/}
      {/*  <PaymentInformation*/}
      {/*    renderButton={(informationHandleNext: any) => {*/}
      {/*      return props.renderButton(() => {*/}
      {/*        // 检测表单*/}
      {/*        if (informationHandleNext()) {*/}
      {/*          // 设置开始提交*/}
      {/*          return handleNext();*/}
      {/*        } else {*/}
      {/*          return false;*/}
      {/*        }*/}
      {/*      });*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
}
const Payment = Form.create()(PaymentInner);
export default Payment;
