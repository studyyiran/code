import { IProductDetail } from "../../context/interface";
import React from "react";
import "./index.less";

export function InspectPersonInfo({
  buyProductRemark,
  userInfo,
  hideImg
}: {
  buyProductRemark: any;
  hideImg?: boolean;
  userInfo: IProductDetail["userInfo"];
}) {
  // 就算有if 有的时候 也不好
  if (userInfo) {
    return (
      <div className="Inspect-person-info">
        <div className="first">
          {hideImg ? null : (
            <img src={userInfo.userImg || require("./res/defaulthead.png")} />
          )}
          {buyProductRemark ? (
            <div className="second">
              <h3 className="title-style">
                <span className="blue">Inspected by </span><span>{userInfo.userName || `UpTrade`}</span>
              </h3>
              <p className="title-style">{buyProductRemark}</p>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
