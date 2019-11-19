import React, { useContext, useEffect, useRef } from "react";
import "./index.less";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../common-modules/context/authToken/context";
import {UpdateFormLayout} from "./components/updateFormLayout";
import NameAndEmail from "./components/nameAndEmail";
import PasswordUpdateForm from "./components/passwordUpdate";
import AddressFormUpdate from "./components/addressFormUpdate";

const {RenderButton} = UpdateFormLayout

export default function AccountPage() {
  const storeTestNameContext = useContext(StoreAuthContext);
  const { storeAuthContextValue } = storeTestNameContext as IStoreAuthContext;
  const { userInfo } = storeAuthContextValue;


  return (
    <div className="account-page">
      <UpdateFormLayout title="Edit Profile">
        <NameAndEmail userInfo={userInfo}/>
      </UpdateFormLayout>
      <UpdateFormLayout title="Password Setting">
        <PasswordUpdateForm userInfo={userInfo}/>
      </UpdateFormLayout>
      <UpdateFormLayout title="Address Details">
        <AddressFormUpdate userInfo={userInfo}/>
      </UpdateFormLayout>
    </div>
  );
}
