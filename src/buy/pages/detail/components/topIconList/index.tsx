import React from "react";

export function TopIconList() {
  const config = [
    {
      title: "Real Photos",
      icon: require("./res/1.png")
    },
    {
      title: "Real Photos",
      icon: require("./res/2.png")
    },
    {
      title: "Real Photos",
      icon: require("./res/3.png")
    }
  ];
  return (
    <ul>
      {config.map(({ title, icon }, index) => {
        return (
          <div key={index}>
            <img src={icon} />
            <span>{title}</span>
          </div>
        );
      })}
    </ul>
  );
}
