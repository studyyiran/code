import { IProductDetail } from "../../context/interface";
import React from "react";
import "./index.less";

export function InspectPersonInfo({
  buyProductRemark,
  userInfo
}: {
  buyProductRemark: any;
  userInfo: IProductDetail["userInfo"];
}) {
  // 就算有if 有的时候 也不好
  if (userInfo) {
    return (
      <div className="Inspect-person-info">
        <div className="first">
          <img src={userInfo.userImg || require("./res/defaulthead.png")} />
          {buyProductRemark ? (
            <div className="second">
              <h3 className="title-style">
                Inspected by <span className="name-part">{userInfo.userName || `UpTrade`}</span>
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
