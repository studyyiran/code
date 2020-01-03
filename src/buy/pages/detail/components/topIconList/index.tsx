import React from "react";
import './index.less'

export function TopIconList() {
  const config = [
    {
      title: "Real Photos",
      icon: require("./res/1.png")
    },
    {
      title: "Inspected by UpTrade",
      icon: require("./res/2.png")
    },
    {
      title: "Fully Functional",
      icon: require("./res/3.png")
    }
  ];
  return (
    <ul className="top-icon-list">
      {config.map(({ title, icon }, index) => {
        return (
          <li key={index} data-index={index}>
            <img src={icon} />
            <span className="title">{title}</span>
          </li>
        );
      })}
    </ul>
  );
}
