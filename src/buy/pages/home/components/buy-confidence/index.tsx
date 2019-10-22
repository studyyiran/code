import * as React from "react";
import { useState } from "react";
import "./index.less";
import { Rate } from "antd";
import { Carousel } from "antd";

export default function BuyConfidence(props: any) {
  const { isMob } = props; // 区别于mob端或者web端

  const tabList = [
    {
      name: "Virginia",
      comments: "The customer service exceeded my expectations!!!",
      star: 5
    },
    {
      name: "Craig",
      comments:
        "Fast, professional, great price. Definitely doing business here in the future.",
      star: 5
    },
    {
      name: "Jessica",
      comments: "Super easy and quick",
      star: 5
    }
  ];

  const [chooseData, setChooseData] = useState(tabList[0]); // chooseData

  if (isMob) {
    return (
      <div className={"buy-home-confidence-mob-wrapper"}>
        <div className={"buy-home-confidence-title"}>Buy With Confidence</div>
        <Carousel>
          {tabList.map((t, index) => {
            return (
              <div className={"buy-home-confidence-mob"} key={index}>
                <div
                  className={"buy-confidence-comments"}
                  dangerouslySetInnerHTML={{ __html: t.comments }}
                />

                <div className={"star-wrapper"}>
                  <Rate disabled defaultValue={t.star} />
                </div>
                <div className={"comment-user"}>{t.name}</div>
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  }

  return (
    <div className={"buy-home-confidence-web-wrapper"}>
      <div className={"buy-home-confidence-web"}>
        <div className={"buy-home-confidence-title"}>Buy With Confidence</div>
        <div
          className={"buy-confidence-comments"}
          dangerouslySetInnerHTML={{ __html: chooseData.comments }}
        />

        <div className={"star-wrapper"}>
          <Rate disabled defaultValue={chooseData.star} />
        </div>

        <div className={"buy-home-confidence-tab-wrapper"}>
          <div className={"tab-wrapper-overflow"}>
            {tabList.map((t, index) => {
              return (
                <span
                  key={index}
                  className={`tab-item ${
                    chooseData.name === t.name ? "active" : "inactive"
                  }`}
                  onClick={() => {
                    setChooseData(t);
                  }}
                >
                  {t.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
