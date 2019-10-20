import { UserInformation } from "../pages/information";
import { IOrderInfoState } from "./index";
import Shipping from "../pages/shipping";
import Payment from "../pages/payment";
import Confirmation from "../pages/confirmation";
import React from "react";
import { nameToContent } from "../util";

export const routerConfig: {
  continueButton?: string;
  backButton?: string;
  relativePath: string;
  name: string;
  renderDisplayContent?: any;
  Component: any;
}[] = [
  {
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
            Credit card ending $
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
    relativePath: "confirmation",
    name: "Confirmation",
    Component: Confirmation
  }
];

export const expressOptionConfig: { tokenId: string; title: string }[] = [
  {
    tokenId: "usps_parcel_select",
    title: "5-8 Business Days Free Shipping"
  },
  {
    tokenId: "usps_priority",
    title: "3-4 Business Days Express Shipping"
  }
];
