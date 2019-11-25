import React from "react";
import { safeEqual } from "../../../../common/utils/util";
import "./index.less";

/*
如果有倒计时的数值.返回倒计时
传入剩余时间 渲染
 */
export function FiveCountDown(props: { timeArr?: any[]; children?: any }) {
  const { timeArr } = props;
  function renderTimer(timeArr: any[]) {
    const staticArr = ["d", "h", "m", "s"];
    let timerString = "";
    timeArr.forEach((time: string, index: number) => {
      // 秒的处理.
      if (time) {
        if (index === 3) {
          timerString += ` ${time}${staticArr[index]}`;
        } else if (!safeEqual(time, 0)) {
          // 前两位删除首0
          if (safeEqual(0, time[0])) {
            if (time.length > 1) {
              // 如果有两位
              time = time[1];
            } else {
              // 如果真的为0
              time = ''
            }
          }
          if (time) {
            timerString += ` ${time}${staticArr[index]}`;
          }
        }
      }
    });
    return timerString;
  }
  return (
    <div className="act-timer">
      <div className="img-container">
        <img src={require("./res/tag.svg")} />
      </div>
      <div className="content">
        <span>Holiday Special</span>
        {timeArr ? <span className="timer">Ends in{renderTimer(timeArr)}</span> : null}
        {props.children}
      </div>
    </div>
  );
}
