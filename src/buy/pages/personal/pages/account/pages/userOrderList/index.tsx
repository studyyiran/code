import React, { useContext, useEffect } from "react";
import "./index.less";
import { AccountInfoContext, IAccountInfoContext } from "../../../../context";
import * as moment from "moment-timezone";

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
        const { groupOrderNo, createdDt, subOrderList } = item;
        return (
          <div>
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
            <ul>
              {subOrderList.map(orderInfo => {
                const { img, productName, status } = orderInfo;
                return (
                  <div>
                    <img src={img} />
                    <div>
                      <h3>{productName}</h3>
                      <h3>{status}</h3>
                      <h3>price???</h3>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        );
      });
    } else {
      return null;
    }
  }
  return <div className="user-order-list">{renderList()}</div>;
}
