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
          <div className="name-part">
            <h3 className="title-style">Inspected by</h3>
            <span>{userInfo.userName || `UpTrade`}</span>
          </div>
        </div>
        {buyProductRemark ? (
          <div className="second">
            <h3 className="title-style">
              Inspection Notes
              <img src={require("./res/notes-icon.svg")} />
            </h3>
            <p>{buyProductRemark}</p>
          </div>
        ) : null}
      </div>
    );
  } else {
    return null;
  }
}
