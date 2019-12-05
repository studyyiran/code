import React, { useEffect, useState } from "react";
import { notification } from "antd";
import "./index.less";
import Svg from "../svg";

export default function NewBuyNotice(props: any): any {
  const [current, setCurrent] = useState(0);
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
    if (data && data.length) {
      setCurrent(0);
      const interval = window.setInterval(() => {
        // openNotification();
        setCurrent((value: number) => {
          if (value < data.length - 1) {
            return ++value;
          } else {
            return 0;
          }
        });
        return () => {
          window.clearInterval(interval);
        };
      }, 5000);
    }
  }, [data]);
  return data && data.length && data[current] ? (
    <div className="notice-container">
      <Info {...data[current]} />
    </div>
  ) : null;
}

function Info(props: any) {
  const { orderInfo, city, orderTime, productPic } = props;
  return (
    <div className="comp-new-buy-notice">
      <img src={productPic} />
      <section>
        <h1>{orderInfo}</h1>
        {/*<span className="location">{city}</span>*/}
        <div className="date-container">
          <Svg />
          <span>{orderTime}</span>
        </div>
      </section>
    </div>
  );
}
