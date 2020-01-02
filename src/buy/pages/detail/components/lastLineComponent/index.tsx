import { constValue } from "../../../../common/constValue";
import React from "react";
import "./index.less";
import { Carousel } from "antd";
import { RenderByCondition } from "../../../../components/RenderByCondition";

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
    <div className="icons-card">
      <RenderByCondition
        ComponentPc={
          <div className="when-pc">
            {arr.map((item: any) => {
              return <Haha {...item} />;
            })}
          </div>
        }
        ComponentMb={
          <Carousel className="mb-carousel">
            {arr.map((item: any) => {
              return <Haha {...item} />;
            })}
          </Carousel>
        }
      />
    </div>
  );
}

function Haha(props: any): any {
  const { img, title, content } = props;
  return (
    <div className="item">
      <img src={img} />
      <div className="content">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
}
