import React, { useContext } from "react";
import RouterLink from "../routerLink";
import { getLocationUrl } from "../../../common/utils/util";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../context/authToken/context";

export function LoginButton(props: any) {
  const storeAuthContext = useContext(StoreAuthContext);
  const {
    userLogout,
    storeAuthContextValue
  } = storeAuthContext as IStoreAuthContext;
  const { tokenInfo } = storeAuthContextValue;
  console.log(tokenInfo);
  if (tokenInfo && tokenInfo.token) {
    return <a onClick={userLogout}>Log Out</a>;
  } else {
    return (
      <RouterLink to={getLocationUrl("login")}>Log In/Sign Up</RouterLink>
    );
  }
}

export function LoginWrapper(props: {
  renderWhenHaveLogin?: any;
  renderNotLogin?: any;
}) {
  const storeAuthContext = useContext(StoreAuthContext);
  const {
    userLogout,
    storeAuthContextValue
  } = storeAuthContext as IStoreAuthContext;
  const { tokenInfo } = storeAuthContextValue;
  const { renderWhenHaveLogin, renderNotLogin } = props;
  if (tokenInfo && tokenInfo.token) {
    if (renderWhenHaveLogin) {
      return renderWhenHaveLogin({
        url: getLocationUrl("login"),
        createUrl: '/account/create'
      });
    }
  } else {
    if (renderNotLogin) {
      return renderNotLogin({
        url: getLocationUrl("login"),
        createUrl: '/account/create'
      });
    }
  }
  return null;
}
