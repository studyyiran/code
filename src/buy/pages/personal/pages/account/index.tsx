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
        return (
          <p>
            Your profile updated successfully
            <Svg />
          </p>
        );
        break;
    }
  }

  return (
    <div className="account-page">
      <h1>Create new account</h1>
      <div className="tips">{currentStatusToContent(currentStatus)}</div>
      <div>tabbar</div>
      <div className="form-part">
        <UpdateFormLayout title="Edit Profile">
          <NameAndEmail userInfo={userInfo} />
        </UpdateFormLayout>
        <UpdateFormLayout title="Password Setting">
          <PasswordUpdateForm userInfo={userInfo} />
        </UpdateFormLayout>
        <UpdateFormLayout title="Address Details">
          <AddressFormUpdate userInfo={userInfo} />
        </UpdateFormLayout>
      </div>
    </div>
  );
}
