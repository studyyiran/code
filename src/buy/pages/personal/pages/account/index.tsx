import React, { useContext } from "react";
import "./index.less";
import {AccountInfoContext, IAccountInfoContext} from "../../context";

export default function AccountPage() {
  const storeTestNameContext = useContext(AccountInfoContext);
  const {
    accountInfoContextValue
  } = storeTestNameContext as IAccountInfoContext;
  const { userInfo } = accountInfoContextValue;
  console.log(userInfo);
  return <div className="account-page">{123}</div>;
}
