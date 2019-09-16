import React, { useEffect } from "react";
import { notification } from "antd";
import "./index.less";
import Svg from "@/components/svg";

export default function NewBuyNotice(props: any): any {
  const { data } = props;
  const openNotification = () => {
    notification.open({
      message: "Notification Title",
      placement: "bottomLeft",
      duration: null,
      description: (
        <div className="comp-new-buy-notice">
          "This is the content of the notification. This is the content of the
          notification. This is the content of the notification."
        </div>
      ),
      onClick: () => {
        console.log("Notification Clicked!");
      }
    });
  };
  useEffect(() => {
    const interval = window.setInterval(() => {
      // openNotification();
      return () => {
        window.clearInterval(interval);
      };
    }, 1000);
  }, []);
  return <div className="notice-container">
    <Info {...data} />
  </div>;
}

function Info(props: any) {
  const { orderInfo, city, orderTime, productPic } = props;
  return (
    <div className="comp-new-buy-notice">
      <img src={productPic} />
      <section>
        <h1>{orderInfo}</h1>
        <span className="location">{city}</span>
        <div className="date-container">
          <Svg />
          <span>{orderTime}</span>
        </div>
      </section>
    </div>
  );
}
