import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
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
import PayCardImages from "../../../detail/components/payCardImages";
import { PayForm } from "./components/payForm";

let addressErrorTips = "The address could not be found.";

function PaymentInner(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const formRef = useRef();
  const postInfoCapture = useRef({
    invoiceSameAddr: {},
    invoiceInfo: {},
    paymentType: ""
  });
  const {
    orderInfoContextDispatch,
    orderInfoContextValue,
    validaddress,
    startOrder,
  } = orderInfoContext as IOrderInfoContext;

  const [showLoadingMask, setShowLoadingMask] = useState(false);
  const [paymentType, setPaymentType] = useState("CREDIT_CARD");
  // const [inputChangeStatus, setInputChangeStatus] = useState(false);

  // 计算总价
  const { calcTotalPrice } = useGetTotalPrice();

  const { invoiceSameAddr, userInfo, invoiceInfo } = orderInfoContextValue;

  const totalPrice = calcTotalPrice();
  //  价格变化的时候，重新设置。
  const timeRef = useRef();

  const addressInfo = useMemo(() => {
    return invoiceSameAddr
      ? userInfo
      : { ...invoiceInfo, userEmail: userInfo.userEmail };
  }, [invoiceInfo, invoiceSameAddr, userInfo]);

  // 这个地址检验,其实应该内置到表单中去.但是因为来不及优化,只能在post的时候,再进行检测
  const postHandler = useCallback(async () => {
    function checkResolve() {
      // 储存赋值快照
      (postInfoCapture as any).current = {
        invoiceSameAddr,
        invoiceInfo,
        paymentType
      };
      return Promise.resolve();
    }
    if (invoiceSameAddr) {
      // same的情况下,不需要任何检测
      return checkResolve();
    }
    const form = (formRef.current as any).props.form;
    if (!form) {
      return Promise.reject();
    }
    const allValues = form.getFieldsValue();
    // 第一道检测
    try {
      await form.validateFieldsAndScroll((err: any, values: any) => {
        // 先验证表单
        if (!err) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      });
    } catch (e) {
      return Promise.reject();
    }
    try {
      await validaddress({ userInfo: allValues });
      return checkResolve();
    } catch (e) {
      Message.error("Something went wrong, please check the billing address.");
      form.setFields({
        street: {
          errors: [new Error(addressErrorTips)]
        }
      });
      window.scroll(0, 0);
      return Promise.reject();
    }
  }, [invoiceInfo, invoiceSameAddr, paymentType, validaddress]);

  // 开始发起请求
  const createOrderHandler = useCallback(
    async (props: any) => {
      // startLoading
      try {
        setShowLoadingMask(true);
        // 开启全屏loading
        const {
          invoiceInfo,
          paymentType,
          invoiceSameAddr
        } = postInfoCapture.current;
        await startOrder({
          payInfo: { ...props, paymentType: paymentType },
          invoiceSameAddr,
          invoiceInfo
        });
        locationHref("/buy/confirmation");
      } catch (e) {
        console.error(e);
      }
      setShowLoadingMask(false);
    },
    [startOrder]
  );

  const paypalPay = useCallback(
    (amount: any, info: any) => {
      console.log("start paypalPay");
      console.log(info);
      // @ts-ignore
      paypal
        .Buttons({
          onClick: function(a: any, actions: any) {
            setShowLoadingMask(true);
            // 封锁逻辑
            // setInputChangeStatus(true);
            // if (a && a.fundingSource === "paypal") {
            //   setInputChangeStatus(true);
            // }
            // 异步调用
            return postHandler()
              .then(() => {
                return actions.resolve();
              })
              .catch(() => {
                console.log("2222");
                setShowLoadingMask(false);
                return actions.reject();
              });
          },
          onCancel: function() {
            setShowLoadingMask(false);
            console.log("onCancel");
            // setInputChangeStatus(false);
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
              createOrderHandler({
                paypalOrderId: details.id
              });
            });
          }
        })
        .render("#paypal-button-container");
    },
    [createOrderHandler, postHandler]
  );

  // 渲染paypal
  useEffect(() => {
    console.log("run");
    // 只有有价格才是有效的
    function clear() {
      console.log("clear");
      if (timeRef.current) {
        window.clearTimeout(timeRef.current);
      }
      // 每次触发更新操作的时候.清空
      const dom: any = document.querySelector(`#${constValue.paypalButtonId}`);
      if (dom) {
        dom.innerHTML = "";
      }
    }
    if (totalPrice && !isServer() && paymentType === "PAYPAL") {
      // 根据形势整合数据
      if (addressInfo) {
        (timeRef.current as any) = window.setTimeout(() => {
          paypalPay(totalPrice, addressInfo);
        }, 400);
        return clear;
      }
    }
    return clear;
  }, [addressInfo, paymentType, paypalPay, totalPrice]);

  // function getCreditValue(key: string) {
  //   return payInfo &&
  //     payInfo.creditCardInfo &&
  //     (payInfo.creditCardInfo as any)[key]
  //     ? (payInfo.creditCardInfo as any)[key]
  //     : "";
  // }
  return (
    <div className="payment-page">
      <section className="address">
        <h2 className="order-common-less-title">Billing Address</h2>
        <p>Select the address that matches your card or payment method.</p>
        <div className="checkbox-container-group">
          <div className="checkbox-container">
            <Checkbox
              // disabled={inputChangeStatus}
              checked={invoiceSameAddr === true}
              onChange={() => {
                orderInfoContextDispatch({
                  type: orderInfoReducerTypes.setInvoiceSameAddr,
                  value: true
                });
              }}
            >
              <span>Same as shipping address</span>
            </Checkbox>
          </div>
          <div className="checkbox-container">
            <Checkbox
              // disabled={inputChangeStatus}
              checked={invoiceSameAddr === false}
              onChange={() => {
                orderInfoContextDispatch({
                  type: orderInfoReducerTypes.setInvoiceSameAddr,
                  value: false
                });
              }}
            >
              <span>Use a different billing address</span>
            </Checkbox>
          </div>
        </div>
      </section>
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
      </div>
      <section className="pay-card">
        <h2 className="order-common-less-title">Payment information</h2>

        <div className="checkbox-container-group">
          <div className="checkbox-container">
            <Checkbox
              // disabled={inputChangeStatus}
              checked={paymentType === "CREDIT_CARD"}
              onChange={() => {
                setPaymentType("CREDIT_CARD");
              }}
            >
              <header className="card my-card">
                <span>Credit card</span>
                <PayCardImages />
              </header>
            </Checkbox>
          </div>
          <div className="checkbox-container">
            <Checkbox
              // disabled={inputChangeStatus}
              checked={paymentType === "PAYPAL"}
              onChange={() => {
                setPaymentType("PAYPAL");
              }}
            >
              <header className="paypayl-part card my-card">
                <span>PayPal</span>
                <div className="img-container">
                  <img src={require("./res/paypal.png")} />
                </div>
              </header>
            </Checkbox>
          </div>
        </div>
      </section>
      {paymentType === "CREDIT_CARD" ? (
        <PayForm
          addressInfo={addressInfo}
          amount={totalPrice}
          onGetNonce={(nonce, cardData, buyerVerificationToken) => {
            // 获取到回调.
            // 1 检测表单
            postHandler().then(() => {
              console.log(buyerVerificationToken);
              // 2 发起后端调用
              createOrderHandler({
                creditCardInfo: {
                  cardNo: cardData.last_4,
                  invalidDate: `${cardData.exp_month}/${String(
                    cardData.exp_year
                  ).slice(2)}`,
                  userName: `${addressInfo.firstName} ${addressInfo.lastName}`,
                  pinCode: "", // 没有获得form控件的回传.
                  cardId: nonce,
                  verificationToken: buyerVerificationToken
                }
              });
            });
          }}
        />
      ) : (
        <div id={constValue.paypalButtonId} />
      )}

      <LoadingMask visible={showLoadingMask} />
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
