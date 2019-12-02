import React, { useContext, useEffect } from "react";
import "./index.less";
import { AccountInfoContext, IAccountInfoContext } from "../../../../context";

export function UserOrderList() {
  const accountInfoContext = useContext(AccountInfoContext);
  const {
    accountInfoContextValue,
    getUserOrderList
  } = accountInfoContext as IAccountInfoContext;
  const { userOrderList } = accountInfoContextValue;
  console.log(userOrderList);
  useEffect(() => {
    userOrderList();
  }, []);
  return <div className="user-order-list">123</div>;
}
