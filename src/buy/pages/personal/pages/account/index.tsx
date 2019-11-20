import React, { useContext, useEffect, useRef } from "react";
import "./index.less";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../common-modules/context/authToken/context";
import { UpdateFormLayout } from "./components/updateFormLayout";
import NameAndEmail from "./components/nameAndEmail";
import PasswordUpdateForm from "./components/passwordUpdate";
import AddressFormUpdate from "./components/addressFormUpdate";
import { locationHref } from "../../../../common/utils/routerHistory";
import { getLocationUrl } from "../../../../common/utils/util";
import Svg from "../../../../components/svg";
import { Message } from "../../../../components/message";

export default function AccountPage() {
  const storeTestNameContext = useContext(StoreAuthContext);
  const { storeAuthContextValue } = storeTestNameContext as IStoreAuthContext;
  const { userInfo, tokenInfo, currentStatus } = storeAuthContextValue;

  useEffect(() => {
    if (tokenInfo && tokenInfo.token === "") {
      locationHref(getLocationUrl("login"));
    }
  }, [tokenInfo]);

  function currentStatusToContent(domaintype: string) {
    switch (domaintype) {
      case "WEBSITE_USER_ACTIVE":
        //
        return (
          <p>
            Your account has been verified successfully
            <Svg />
          </p>
        );
        break;
      case "WEBSITE_USER_CHANGE_EMAIL":
        //
        return (
          <p>
            Your profile updated successfully
            <Svg />
          </p>
        );
        break;
      default:
        return "";
        break;
    }
  }

  function successHandler(name: string) {
    Message.success(`Your ${name} updated successfully`);
  }

  return (
    <div className="account-page">
      <h1>Account overview</h1>
      <div className="main">
        <div className="tips">{currentStatusToContent(currentStatus)}</div>
        <div className="tabbar">
          <span>Setting</span>
        </div>
        <div className="form-part">
          <UpdateFormLayout
            title="Edit Profile"
            successHandler={() => {
              successHandler("profile");
            }}
          >
            <NameAndEmail userInfo={userInfo} />
          </UpdateFormLayout>
          <UpdateFormLayout
            title="Password Setting"
            successHandler={() => {
              successHandler("password");
            }}
          >
            <PasswordUpdateForm userInfo={userInfo} />
          </UpdateFormLayout>
          <UpdateFormLayout
            title="Address Details"
            successHandler={() => {
              successHandler("address");
            }}
          >
            <AddressFormUpdate userInfo={userInfo} />
          </UpdateFormLayout>
        </div>
      </div>
    </div>
  );
}
