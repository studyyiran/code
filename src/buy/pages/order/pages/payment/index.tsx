import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.less";
import { Checkbox, Form, Input, Row, Col } from "antd";
import { PaymentInformation } from "../information";
import {
  IOrderInfoContext,
  OrderInfoContext,
  orderInfoReducerTypes
} from "../../context";
import PayCardImages from "../../../../pages/detail/components/payCardImages";
import Svg from "../../../../components/svg";
import useGetTotalPrice from "../../components/orderLayout/useHook";
import { constValue } from "../../../../common/constValue";
import {
  afterMinTimeCall,
  callBackWhenPassAllFunc,
  isServer
} from "../../../../common/utils/util";
import { locationHref } from "../../../../common/utils/routerHistory";
import LoadingMask from "../../../productList/components/loading";
import { Message } from "../../../../components/message";

let addressErrorTips = "The address could not be found.";

function PaymentInner(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const ajaxStatus = useRef();
  const [validAddressSuccessful, setValidAddressSuccessful] = useState(false);

  const {
    orderInfoContextDispatch,
    orderInfoContextValue,
    validaddress,
    createOrder
  } = orderInfoContext as IOrderInfoContext;

  const [showLoadingMask, setShowLoadingMask] = useState(false);
  const [inputChangeStatus, setInputChangeStatus] = useState(false);

  // 计算总价
  const { calcTotalPrice, totalProductPrice } = useGetTotalPrice();

  const {
    invoiceSameAddr,
    payInfo,
    userInfo,
    invoiceInfo
  } = orderInfoContextValue;
  const { getFieldDecorator, validateFields } = props.form;

  function isOkInfo() {
    if (invoiceSameAddr) {
      // 因为是obj.检验一个必填
      if (userInfo && userInfo.userEmail) {
        return true;
      } else {
        return false;
      }
    } else {
      const notRequiredArr: any[] = ["apartment"];
      // 地址合法 有值 就行
      return (
        validAddressSuccessful &&
        invoiceInfo &&
        invoiceInfo.country &&
        Object.keys(invoiceInfo).every((key: string) => {
          return (
            notRequiredArr.some(notRequired => notRequired === key) ||
            invoiceInfo[key]
          );
        })
      );
    }
  }

  function RenderFakeButton() {}

  const totalPrice = calcTotalPrice();
  const productPrice = totalProductPrice();
  //  价格变化的时候，重新设置。
  const timeRef = useRef();
  const isOkBool = isOkInfo();

  // 首次展示
  useEffect(() => {
    // 只有有价格才是有效的
    if (productPrice && !isServer()) {
      let info = userInfo;
      // 根据形势整合数据
      if (info) {
        if (timeRef && timeRef.current) {
          window.clearTimeout(timeRef.current);
        }
        (timeRef.current as any) = window.setTimeout(() => {
          // 每次触发更新操作的时候.清空
          const dom: any = document.querySelector(
            `#${constValue.paypalButtonId}`
          );
          if (dom) {
            dom.innerHTML = "";
          }
          paypalPay(totalPrice, info);
        }, 400);
        return () => {
          if (timeRef.current) {
            window.clearTimeout(timeRef.current);
          }
        };
      }
    }
    return () => {};
  }, [productPrice, totalPrice, userInfo]);

  useEffect(() => {
    // 只有有价格才是有效的
    if (productPrice && !isServer()) {
      let info = {};
      // 根据形势整合数据
      if (invoiceSameAddr) {
        info = userInfo;
      } else {
        info = { ...invoiceInfo, userEmail: userInfo.userEmail };
      }
      if (info) {
        if (isOkBool) {
          if (timeRef && timeRef.current) {
            window.clearTimeout(timeRef.current);
          }
          (timeRef.current as any) = window.setTimeout(() => {
            // 每次触发更新操作的时候.清空
            const dom: any = document.querySelector(
              `#${constValue.paypalButtonId}`
            );
            if (dom) {
              dom.innerHTML = "";
            }
            paypalPay(totalPrice, info);
          }, 400);
          return () => {
            if (timeRef.current) {
              window.clearTimeout(timeRef.current);
            }
          };
        }
      }
    }
    return () => {};
  }, [
    productPrice,
    totalPrice,
    userInfo,
    invoiceInfo,
    invoiceSameAddr,
    isOkBool
  ]);

  function paypalPay(amount: any, info: any) {
    console.log("start paypalPay");
    console.log(info);
    // @ts-ignore
    paypal
      .Buttons({
        onClick: function(a: any) {
          console.log("hehe");
          setInputChangeStatus(true);
          if (a && a.fundingSource === "paypal") {
            setInputChangeStatus(true);
          }
        },
        onCancel: function() {
          console.log("onCancel");
          setInputChangeStatus(false);
        },
        createOrder: function(data: any, actions: any) {
          // This function sets up the details of the transaction, including the amount and line item details.
          const {
            firstName = undefined,
            userEmail = undefined,
            lastName = undefined,
            street = undefined,
            apartment = undefined,
            city = undefined,
            state = undefined,
            zipCode = undefined,
            userPhone = undefined
          } = info;
          return actions.order.create({
            payer: {
              name: {
                given_name: firstName,
                surname: lastName
              },
              address: {
                address_line_1: street,
                address_line_2: apartment,
                admin_area_2: city,
                admin_area_1: state,
                postal_code: zipCode,
                country_code: "US"
              },
              email_address: userEmail,
              phone: userPhone
                ? {
                    phone_type: "MOBILE",
                    phone_number: {
                      national_number: userPhone
                    }
                  }
                : null
            },
            application_context: {
              shipping_preference: "NO_SHIPPING"
            },
            purchase_units: [
              {
                amount: {
                  value: amount,
                  currency_code: "USD"
                }
              }
            ]
          });
        },
        onApprove: function(data: any, actions: any) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(async function(details: any) {
            // This function shows a transaction success message to your buyer.
            //那这个id，和接口一起传到后台就行
            console.log(details.id);
            // startLoading
            try {
              setShowLoadingMask(true);
              // 开启全屏loading
              await createOrder({
                payInfo: {
                  paymentType: "PAYPAL",
                  creditCardInfo: {},
                  paypalOrderId: details.id
                },
                invoiceSameAddr: invoiceSameAddr
              });
              locationHref("/buy/confirmation");
            } catch (e) {
              console.error(e);
            }
            setShowLoadingMask(false);
          });
        }
      })
      .render("#paypal-button-container");
  }

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
          invoiceSameAddr: invoiceSameAddr
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
        {/*<div className="pay-card-container">*/}
        {/*  <header className="paypayl-part card">*/}
        {/*    <span>*/}
        {/*      PayPal<span>-2.9%+$0.30 Fee</span>*/}
        {/*    </span>*/}

        {/*    <div className="img-container">*/}
        {/*      <img src={require("./res/paypal.png")} />*/}
        {/*    </div>*/}
        {/*  </header>*/}
        {/*  <div />*/}
        {/*</div>*/}
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
      <section className="address">
        <h2 className="order-common-less-title">Billing Address</h2>
        <p>Select the address that matches your card or payment method.</p>
        <div className="checkbox-container-group">
          <div className="checkbox-container">
            <Checkbox
              disabled={inputChangeStatus}
              checked={invoiceSameAddr === true}
              onChange={() => {
                if (!inputChangeStatus) {
                  orderInfoContextDispatch({
                    type: orderInfoReducerTypes.setInvoiceSameAddr,
                    value: true
                  });
                }
              }}
            >
              <span>Same as shipping address</span>
            </Checkbox>
          </div>
          <div className="checkbox-container">
            <Checkbox
              disabled={inputChangeStatus}
              checked={invoiceSameAddr === false}
              onChange={() => {
                if (!inputChangeStatus) {
                  orderInfoContextDispatch({
                    type: orderInfoReducerTypes.setInvoiceSameAddr,
                    value: false
                  });
                }
              }}
            >
              <span>Use a different billing address</span>
            </Checkbox>
          </div>
        </div>
      </section>
      <LoadingMask visible={showLoadingMask} />
      {/*选择决定表单*/}
      {/*暂时屏蔽*/}
      <div className="paypal-container">
        {invoiceSameAddr === true ? null : (
          <PaymentInformation
            onFormChangeHandler={(
              props: any,
              changedValues: any,
              allValues: any
            ) => {
              // 如果监听到目标变更 都进行重置.然后重新验证.
              let arr = [
                {
                  name: "street",
                  time: 1000
                },
                {
                  name: "city",
                  time: 1
                }
              ];
              let findTarget = arr.find((item1: any) => {
                return !!Object.keys(changedValues).find((item2: any) => {
                  return item2 === item1.name;
                });
              });
              // 只有当前变更 并且都有值的时候
              if (findTarget && arr.every(item => allValues[item.name])) {
                // 重置
                setValidAddressSuccessful(false);
                props.form.setFields({
                  street: {
                    value: allValues.street
                  }
                });
                // @ts-ignore
                function checkFunc() {
                  ajaxStatus.current = validaddress({ userInfo: allValues });
                  (ajaxStatus.current as any).then((res: any) => {
                    setValidAddressSuccessful(true);
                  });
                  (ajaxStatus.current as any).catch(() => {
                    (ajaxStatus.current as any) = checkFunc;
                    Message.error(
                      "Something went wrong, please check the billing address."
                    );
                    props.form.setFields({
                      street: {
                        errors: [new Error(addressErrorTips)]
                      }
                    });
                  });
                }
                // 验证
                afterMinTimeCall(findTarget.time, checkFunc);
              }
              orderInfoContextDispatch({
                type: orderInfoReducerTypes.setInvoiceInfo,
                value: allValues
              });
            }}
            // renderButton={(informationHandleNext: any) => {
            //   return props.renderButton(() => {
            //     // 检测表单
            //     if (informationHandleNext()) {
            //       // 设置开始提交
            //       return handleNext();
            //     } else {
            //       return false;
            //     }
            //   });
            // }}
            renderButton={(informationHandleNext: any, formInnerProps: any) => {
              if (isOkInfo()) {
                return null;
              } else {
                return (
                  <div
                    className="paypal-button-mask"
                    onClick={() => {
                      formInnerProps.form.validateFieldsAndScroll(
                        (err: any, values: any) => {
                          // 先验证表单
                          if (!err) {
                            // 如果验证通过了
                            if (!validAddressSuccessful) {
                              // 如果当前没有?
                              if (!ajaxStatus.current) {
                                // 直接设置非法
                                formInnerProps.form.setFields({
                                  street: {
                                    errors: [new Error(addressErrorTips)]
                                  }
                                });
                              } else {
                                // 如果promise已经变成方法
                                if (
                                  (ajaxStatus.current as any) instanceof
                                  Function
                                ) {
                                  (ajaxStatus.current as any)();
                                }
                              }
                            }
                          }
                        }
                      );
                      informationHandleNext();
                    }}
                  />
                );
              }
            }}
          />
        )}
        <div className="placeholder" />
        <div id={constValue.paypalButtonId} />
      </div>
      {props.renderButton()}
    </div>
  );
}
const Payment = Form.create()(PaymentInner);
export default Payment;
