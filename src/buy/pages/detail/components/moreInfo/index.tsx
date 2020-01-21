import React, { useEffect, useState } from "react";
import "./index.less";
import { isServer } from "../../../../common/utils/util";

export function MoreInfo(): any {
  const [currentKey, setCurrentKey] = useState(0);
  useEffect(() => {
    if (!isServer()) {
      window.setTimeout(() => {
        setCurrentKey(Date.now());
      });
    }
  }, []);
  const content = [
    {
      icon: require("./res/uptrade-check.svg"),
      title: "What UpTrade Certified Means",
      content:
        "UpTrade Certified is our guarantee that the device listed for sale is like new in quality, fully functional, and not blacklisted. It starts with an industry leading inspection process. The 50+ point inspection checks for and ensures that every hardware and software feature on the phone works. We then sanitize and clean the phone before it is ready to be shipped to you."
    },
    {
      icon: require("./res/phone.png"),
      title: "Our Story",
      content:
        "Our mission is to make today better so that the world will be brighter tomorrow; to build a company where the life of used electronics is extended through the hands of others or recycled to help reduce carbon footprint. We are committed to providing a fast, easy, safe, and trustworthy service for everyone."
    }
  ];
  return (
    <div className="more-info-container">
      {content.map(({ icon, title, content }) => {
        return (
          <div className="more-info" key={title}>
            {/*暂时强制更新 为了解决首次不正常渲染的问题*/}
            <img src={icon} key={currentKey + icon} />
            <h3 className="sub-title-size-main">{title}</h3>
            <p>{content}</p>
          </div>
        );
      })}
    </div>
  );
}
