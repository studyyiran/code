import React, { useEffect, useState } from "react";
import { locationHref } from "../../../../common/utils/routerHistory";
import { constValue } from "../../../../common/constValue";
import LoadingMask from "../../../productList/components/loading";

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

  useEffect(() => {
    if (amount && payInfo) {
      paypalPay(amount, payInfo);
    }
  }, [amount, payInfo]);

  function paypalPay(amount: any, info: any) {
    console.log("start paypalPay");
    console.log(info);
    // @ts-ignore
    paypal
      .Buttons({
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
              setShowLoadingMask(true);
              // 开启全屏loading
              finishPayCallBack && finishPayCallBack(details.id);
            } catch (e) {
              console.error(e);
            }
            setShowLoadingMask(false);
          });
        }
      })
      .render(id);
  }

  return (
    <div className="paypal-button-container">
      <div id={id} />
      <LoadingMask visible={showLoadingMask} />
    </div>
  );
}
