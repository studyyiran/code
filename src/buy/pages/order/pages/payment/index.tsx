import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./index.less";
import { Checkbox, Form } from "antd";
import { PaymentInformation } from "../information";
import {
  IOrderInfoContext,
  OrderInfoContext,
  orderInfoReducerTypes
} from "../../context";
import useGetTotalPrice from "../../components/orderLayout/useHook";
import { constValue } from "../../../../common/constValue";
import { isServer } from "../../../../common/utils/util";
import { locationHref } from "../../../../common/utils/routerHistory";
import LoadingMask from "../../../productList/components/loading";
import { Message } from "../../../../components/message";

let addressErrorTips = "The address could not be found.";

function PaymentInner(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const formRef = useRef();
  const {
    orderInfoContextDispatch,
    orderInfoContextValue,
    validaddress,
    startOrder,
    orderProcessRecord
  } = orderInfoContext as IOrderInfoContext;

  const [showLoadingMask, setShowLoadingMask] = useState(false);
  const [inputChangeStatus, setInputChangeStatus] = useState(false);

  // 计算总价
  const { calcTotalPrice, totalProductPrice } = useGetTotalPrice();

  const { invoiceSameAddr, userInfo, invoiceInfo } = orderInfoContextValue;

  // 需要检测.在每一帧.为了要进行重新渲染.(因为地址会变化.)
  const validAddressSuccessful = useMemo(() => {}, []);

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

  // 这个地址检验,其实应该内置到表单中去.但是因为来不及优化,只能在post的时候,再进行检测
  async function postHandler() {
    const form = (formRef.current as any).props.form;
    if (!form) {
      return Promise.reject();
    }
    const allValues = form.getFieldsValue()
    console.log(allValues)
    try {
      const a = await validaddress({ userInfo: allValues });
    } catch (e) {
      Message.error("Something went wrong, please check the billing address.");
      form.setFields({
        street: {
          errors: [new Error(addressErrorTips)]
        }
      });
      return Promise.reject();
    }
    const b = form.validateFieldsAndScroll((err: any, values: any) => {
      // 先验证表单
      if (!err) {
        const result = values;
        orderProcessRecord(undefined, result);
        orderInfoContextDispatch({
          type: orderInfoReducerTypes.setUserInfo,
          value: result
        });
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    });
    return b
  }

  function paypalPay(amount: any, info: any) {
    console.log("start paypalPay");
    console.log(info);
    // @ts-ignore
    paypal
      .Buttons({
        onClick: function(a: any, actions: any) {
          // 封锁逻辑
          setInputChangeStatus(true);
          if (a && a.fundingSource === "paypal") {
            setInputChangeStatus(true);
          }
          // 异步调用
          const promise = postHandler()
            .then(() => {
              return actions.resolve();
            })
            .catch(() => {
              return actions.reject();
            });
          return promise;
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
              await startOrder({
                paymentType: "PAYPAL",
                paypalOrderId: details.id
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

  // function getCreditValue(key: string) {
  //   return payInfo &&
  //     payInfo.creditCardInfo &&
  //     (payInfo.creditCardInfo as any)[key]
  //     ? (payInfo.creditCardInfo as any)[key]
  //     : "";
  // }

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
            wrappedComponentRef={(inst: any) => {
              formRef.current = inst;
            }}
            onFormChangeHandler={(
              props: any,
              changedValues: any,
              allValues: any
            ) => {
              // 如果监听到目标变更 都进行重置.然后重新验证.
              orderInfoContextDispatch({
                type: orderInfoReducerTypes.setInvoiceInfo,
                value: allValues
              });
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

let lastTimeRef = 0;
function afterMinTimeCall(callback: any, time: number) {
  if (!isServer()) {
    //  如果有time直接清空
    if (lastTimeRef) {
      window.clearTimeout(lastTimeRef);
    }
    lastTimeRef = window.setTimeout(callback, time);
  }
}

const Payment = Form.create()(PaymentInner);
export default Payment;
