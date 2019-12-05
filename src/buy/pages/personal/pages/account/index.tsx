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
import { UserOrderList } from "./pages/userOrderList";
import { ITag } from "../../../../../containers/blog/interface/blog.interface";
import { Tabs } from "../../../../../components/tabs";
const { TabPane } = Tabs as any;

export default function AccountPage() {
  const storeTestNameContext = useContext(StoreAuthContext);
  const { storeAuthContextValue } = storeTestNameContext as IStoreAuthContext;
  const { userInfo, tokenInfo, currentStatus } = storeAuthContextValue;

  useEffect(() => {
    if (tokenInfo && tokenInfo.token === "") {
      // 为了修改邮箱后想回到首页,所以统一修改成返回首页
      locationHref(getLocationUrl("home"));
    }
  }, [tokenInfo]);

  /*
  根据上一步的状态,返回成功弹框的内容
   */
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

  /*
  根据操作的名称,弹出对应的success弹框
   */
  function successHandler(name: string, obj: any) {
    if (obj && obj.hideMessage) {
      return;
    }
    Message.success(`Your ${name} updated successfully`);
  }

  function tabChangeHandler() {}

  return (
    <div className="account-page">
      <h1>Account overview</h1>

      <div className="main">
        <div className="tips">{currentStatusToContent(currentStatus)}</div>
        <Tabs className="tabs-container" defaultActiveKey="Settings">
          <TabPane key="Settings" tab="Settings">
            <div className="form-part">
              <UpdateFormLayout
                userInfo={userInfo}
                title="Edit Profile"
                successHandler={successHandler.bind({}, "profile")}
              >
                <NameAndEmail />
              </UpdateFormLayout>
              <UpdateFormLayout
                userInfo={userInfo}
                title="Password Settings"
                successHandler={successHandler.bind({}, "password")}
              >
                <PasswordUpdateForm />
              </UpdateFormLayout>
              <UpdateFormLayout
                userInfo={userInfo}
                title="Address Details"
                successHandler={successHandler.bind({}, "address")}
              >
                <AddressFormUpdate />
              </UpdateFormLayout>
            </div>
          </TabPane>
          <TabPane key="Orders" tab="Orders">
            <UserOrderList userInfo={userInfo} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
