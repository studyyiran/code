import React, { useContext, useState } from "react";
import "./index.less";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../common-modules/context/authToken/context";
import Button from "../../../../components/button";
import { Message } from "../../../../components/message";
import { getUrlAllParams } from "../../../../common/utils/util";
import RouterLink from "../../../../common-modules/components/routerLink";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import { UseGetParams } from "../../../../common-modules/commonUseHook";

export default function UserRegisterEmail() {
  const [time, setTime] = useState(0);
  const storeAuthContext = useContext(StoreAuthContext);
  const { token } = UseGetParams();
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
      setTime(60);
      window.setInterval(() => {
        setTime(time => --time);
      }, 1000);
    });
  }
  if (token) {
    return (
      <div className="user-page user-register">
        <div className="pc-common-card">
          <div className="form-left-part">
            <h1>One Step to Go</h1>
            <div className="content-container">
              <p className="result">
                We sent a message to{" "}
                {params && params.email ? params.email : ""} with a link to
                verify your account.
              </p>
              <p className="content">
                Be sure to check your spam filters if you can't find the email
                in your in-box.
              </p>
              <div className="button-container">
                <Button
                  onClick={onSubmitHandler}
                  isLoading={isLoading.userActiveEmailResend}
                  disabled={Boolean(time)}
                >
                  Resend verification email{time ? `(${time})` : ""}
                </Button>
                <Button className="disabled-status">
                  <RouterLink to={"/buy"}>Go Back Home</RouterLink>
                </Button>
              </div>
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
