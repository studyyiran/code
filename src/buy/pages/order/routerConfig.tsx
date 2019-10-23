import {UserInformation} from "./pages/information";
import {IOrderInfoState} from "./context";
import Shipping from "./pages/shipping";
import {nameToContent} from "./util";
import Payment from "./pages/payment";
import Confirmation from "./pages/confirmation";
import React from "react";

export const routerConfig: {
  continueButton?: string;
  title: string;
  backButton?: string;
  relativePath: string;
  name: string;
  renderDisplayContent?: any;
  Component: any;
}[] = [
  {
    title: 'Check out - Information | Uptradeit.com',
    continueButton: "Continue to shipping",
    backButton: "< Back to store",
    relativePath: "info",
    name: "Information",
    Component: UserInformation,
    renderDisplayContent: ({ userInfo }: IOrderInfoState) => {
      const { firstName, lastName, street, apartment, userPhone } = userInfo;
      return `${firstName} ${lastName}, ${
        apartment ? street + " " + apartment : street
      }, ${userPhone}`;
    }
  },
  {
    title: 'Check out - Shipping | Uptradeit.com',
    continueButton: "Continue to payment",
    backButton: "< Back to information",
    relativePath: "shipping",
    name: "Shipping",
    Component: Shipping,
    renderDisplayContent: ({ userExpress, expressInfo }: IOrderInfoState) => {
      if (expressInfo && expressInfo.length) {
        const result = expressInfo.find(({ token }) => {
          return String(token) === String(userExpress);
        });
        if (result && result.name) {
          return nameToContent(result.name);
        }
      }
      return "";
    }
  },
  {
    title: 'Check out - Payment | Uptradeit.com',
    continueButton: "Pay now",
    backButton: "< Back to shipping",
    relativePath: "payment",
    name: "Payment",
    Component: Payment,
    renderDisplayContent: ({ payInfo }: IOrderInfoState) => {
      console.log(payInfo);
      if (payInfo && payInfo.creditCardInfo && payInfo.creditCardInfo.cardNo) {
        return (
          <div>
            Credit card ending in $
            {payInfo.creditCardInfo.cardNo.slice(
              payInfo.creditCardInfo.cardNo.length - 4
            )}
          </div>
        );
      } else {
        return "";
      }
    }
  },
  {
    title: 'Check out - Confirm | Uptradeit.com',
    relativePath: "confirmation",
    name: "Confirmation",
    Component: Confirmation
  }
];