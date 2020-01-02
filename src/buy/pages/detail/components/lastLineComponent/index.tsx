import { constValue } from "../../../../common/constValue";
import React from "react";
import "./index.less";

export function LastLineComponent() {
  const arr = [
    {
      img: require("./res/free-shipping.svg"),
      title: "Fast Shipping",
      content: "Quality, fully functional, used refurbished phones"
    },
    {
      img: require("./res/return.svg"),
      title: `${constValue.REFUNDTIME} Days Return`,
      content: "Return for any reason or no reason at all "
    },
    {
      img: require("./res/secure-payment.svg"),
      title: "Secure Payment",
      content: "Visa, Mastercard, Amex - Powered by PayPal"
    },
    {
      img: require("./res/customer-support.svg"),
      title: "Customer Support",
      content: "Contact us by chat, mail, phone"
    }
  ];
  return (
    <ul className="icons-card">
      {arr.map(({ img, title, content }) => {
        return (
          <li>
            <img src={img} />
            <div>
              <h3>{title}</h3>
              <p>{content}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
