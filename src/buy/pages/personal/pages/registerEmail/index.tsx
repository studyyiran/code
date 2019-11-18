import React, { useContext } from "react";
import "./index.less";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../common-modules/context/authToken/context";
import Button from "../../../../components/button";
import { Message } from "../../../../components/message";
import { getUrlAllParams } from "../../../../common/utils/util";
import { useParams } from "react-router-dom";
import RouterLink from "../../../../common-modules/components/routerLink";
import { RenderByCondition } from "../../../../components/RenderByCondition";

export default function UserRegisterEmail() {
  const storeAuthContext = useContext(StoreAuthContext);
  const { token } = useParams();
  const {
    storeAuthContextValue,
    userActiveEmailResend
  } = storeAuthContext as IStoreAuthContext;
  const { isLoading } = storeAuthContextValue;
  const params = getUrlAllParams();

  function onSubmitHandler() {
    userActiveEmailResend(token).then((res: string) => {
      // 点击登录成功后进行跳转
      Message.success("resend success");
    });
  }
  if (token) {
    return (
      <div className="user-page user-register">
        <div className="pc-common-card">
          <div className="form-left-part">
            <h1>Congrats</h1>
            <div className="form-wrapper-component">
              <p className="result">
                Succeed to create your UpTrade account for email address
                {params && params.email ? params.email : ""}
              </p>
              <p className="content">
                Your account has not been verified yet.We sent a message to{" "}
                {params && params.email ? params.email : ""} with a link to
                verify your account. Be sure to check your spam filters if you
                can't find the email in your in-box.
                <a onClick={onSubmitHandler}> Resend verification email</a>
              </p>

              <Button className="disabled-status">
                <RouterLink to={"/buy"}>Go Back Home</RouterLink>
              </Button>
            </div>
          </div>
          <RenderByCondition
            ComponentMb={null}
            ComponentPc={<img src={require("../../res/bg.jpg")} />}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}
