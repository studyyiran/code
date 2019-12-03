import React, { useContext, useEffect } from "react";
import "./index.less";
import { AccountInfoContext, IAccountInfoContext } from "../../../../context";
import * as moment from "moment-timezone";
import RouterLink from "../../../../../../common-modules/components/routerLink";
import { InnerDivImage } from "../../../../../detail/components/innerDivImage";

export function UserOrderList() {
  const accountInfoContext = useContext(AccountInfoContext);
  const {
    accountInfoContextValue,
    getUserOrderList
  } = accountInfoContext as IAccountInfoContext;
  const { userOrderList } = accountInfoContextValue;
  console.log(userOrderList);
  useEffect(() => {
    // 首次渲染可能会没有token
    window.setTimeout(() => {
      getUserOrderList();
    }, 100);
  }, []);

  function renderList() {
    if (userOrderList && userOrderList.length) {
      console.log(userOrderList);
      return userOrderList.map(item => {
        const { groupOrderNo, createdDt, suborderList } = item;
        return (
          <div className="user-order-item">
            <header>
              <span>Order #{groupOrderNo}</span>
              <span>
                {moment
                  .tz(createdDt, "America/Chicago")
                  .format("LLLL")
                  .split(",")
                  .slice(0, 2)
                  .join(",")}
              </span>
            </header>
            <ul className="sub-order-list">
              {suborderList &&
                suborderList.length &&
                suborderList.map(orderInfo => {
                  const { img, productName, status } = orderInfo;
                  return (
                    <li className="sub-order-item">
                      <InnerDivImage imgUrl={img} />
                      <div className="content-container">
                        <h3>{productName}</h3>
                        <h3>{status}</h3>
                      </div>
                    </li>
                  );
                })}
            </ul>
            <div className="link-container">
              <RouterLink to={"/check-order"}>Check order details</RouterLink>
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  }
  return <div className="user-order-list">{renderList()}</div>;
}
