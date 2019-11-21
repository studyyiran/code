import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../common-modules/context/authToken/context";
import Button from "../../../../components/button";
import { Message } from "../../../../components/message";
import { getLocationUrl } from "../../../../common/utils/util";
import RouterLink from "../../../../common-modules/components/routerLink";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import { UseGetParams } from "../../../../common-modules/commonUseHook";
import { locationHref } from "../../../../common/utils/routerHistory";

export default function UserRegisterEmail() {
  const [time, setTime] = useState(0);
  const storeAuthContext = useContext(StoreAuthContext);
  // @ts-ignore
  const { token, email } = UseGetParams();
  const {
    storeAuthContextValue,
    userActiveEmailResend,
    userTokenValid
  } = storeAuthContext as IStoreAuthContext;
  const { isLoading } = storeAuthContextValue;

  useEffect(() => {
    if (token) {
      userTokenValid(token).catch(() => {
        locationHref(getLocationUrl("login"));
      });
    } else {
      locationHref(getLocationUrl("login"));
    }
  }, [token, userTokenValid]);

  function onSubmitHandler() {
    userActiveEmailResend(token).then((res: string) => {
      // 点击登录成功后进行跳转
      Message.success("resend success");
      setTime(60);
      const timeref = window.setInterval(() => {
        setTime(time => {
          if (time <= 0) {
            window.clearInterval(timeref);
            return time;
          } else {
            return --time;
          }
        });
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
              {email ? (
                <p className="result">
                  We sent a message to {email} with a link to verify your
                  account.
                </p>
              ) : null}
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
