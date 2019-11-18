import React, { useContext } from "react";
import "./index.less";
import {IStoreAuthContext, StoreAuthContext} from "../../../../common-modules/context/authToken/context";

export default function AccountPage() {
  const storeTestNameContext = useContext(StoreAuthContext);
  const {
    storeAuthContextValue
  } = storeTestNameContext as IStoreAuthContext;
  const { userInfo } = storeAuthContextValue;
  console.log(userInfo);
  return <div className="account-page">{userInfo && userInfo.email ? userInfo.email : 'empty'}</div>;
}
