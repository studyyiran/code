import React, { useEffect, useRef, useState } from "react";
import { locationHref } from "../../../../common/utils/routerHistory";
import { constValue } from "../../../../common/constValue";
import LoadingMask from "../../../productList/components/loading";
import { isServer } from "../../../../common/utils/util";

interface IPayPalButton {
  id: string;
  finishPayCallBack: any;
  amount: number;
  payInfo: {
    firstName?: string;
    userEmail?: string;
    lastName?: string;
    street?: string;
    apartment?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    userPhone?: string;
  };
}

export function PayPaylButton(props: IPayPalButton) {
  const { id = "paypal-button-id", finishPayCallBack, amount, payInfo } = props;
  const [showLoadingMask, setShowLoadingMask] = useState(false);
  const timeRef = useRef();

  useEffect(() => {
    // 只有有价格才是有效的
    if (!isServer()) {
      if (amount && payInfo) {
        if (timeRef && timeRef.current) {
          window.clearTimeout(timeRef.current);
        }
        (timeRef.current as any) = window.setTimeout(() => {
          // 每次触发更新操作的时候.清空
          const dom: any = document.querySelector(`#${id}`);
          if (dom) {
            dom.innerHTML = "";
          }
          paypalPay(amount, payInfo);
        }, 400);
        return () => {
          if (timeRef.current) {
            window.clearTimeout(timeRef.current);
          }
        };
      }
    }
    return () => {};
  }, [amount, payInfo]);

  function paypalPay(amount: any, info: any) {
    console.log("start paypalPay");
    console.log(amount);
    console.log(info);
    // @ts-ignore
    paypal
      .Buttons({
        onInit: function() {
          console.log("haha");
        },
        onClick: function(a: any) {
          if (a && a.fundingSource === "paypal") {
            setShowLoadingMask(true);
          }
        },
        onCancel: function() {
          console.log("onCancel");
          setShowLoadingMask(false);
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
            // startLoading
            try {
              // 开启全屏loading
              finishPayCallBack && finishPayCallBack(details.id);
            } catch (e) {
              console.error(e);
            }
            setShowLoadingMask(false);
          });
        }
      })
      .render(`#${id}`);
  }

  return (
    <div className="paypal-button-container">
      <div id={id} />
      <LoadingMask visible={showLoadingMask} />
    </div>
  );
}
