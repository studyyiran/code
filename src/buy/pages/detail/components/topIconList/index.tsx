import React from "react";
import './index.less'

export function TopIconList() {
  const config = [
    {
      title: "Actual Photos of Phone",
      icon: require("./res/1.png")
    },
    {
      title: "50+ Point Inspection",
      icon: require("./res/2.png")
    },
    {
      title: "30-day money back guarantee",
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
