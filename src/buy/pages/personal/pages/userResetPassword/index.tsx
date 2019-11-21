import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.less";
// import { EntryPageContext, IEntryPageContext } from "./context";
import { Input } from "antd";
import { FormWrapper } from "../../../../components/formWrapper";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../common-modules/context/authToken/context";
import Button from "../../../../components/button";
import { locationHref } from "../../../../common/utils/routerHistory";
import RouterLink from "../../../../common-modules/components/routerLink";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import { hocFormCompare } from "../../../../common-modules/commonUtil";
import { UseGetParams } from "../../../../common-modules/commonUseHook";
import { getLocationUrl } from "../../../../common/utils/util";
import { tipsContent } from "../../../../common/constValue";
import { Message } from "../../../../components/message";

export default function UserResetPassword(props: any) {
  const formRef: any = useRef(null);
  const [token, setToken] = useState("");
  // @ts-ignore
  const { token: tokenFromUrl } = UseGetParams();

  const storeAuthContext = useContext(StoreAuthContext);
  const {
    changePasswordByToken,
    storeAuthContextValue,
    userTokenValid
  } = storeAuthContext as IStoreAuthContext;
  const { isLoading } = storeAuthContextValue;
  useEffect(() => {
    if (tokenFromUrl) {
      userTokenValid(tokenFromUrl)
        .then(() => {
          setToken(tokenFromUrl);
        })
        .catch(() => {
          locationHref(getLocationUrl("login"));
        });
    } else {
      locationHref(getLocationUrl("login"));
    }
  }, [token]);
  const formConfig = [
    {
      label: "New Password",
      id: "password",
      validateTrigger: "onBlur",
      rules: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            const minLength = 8;
            if (value && value.length >= minLength) {
              callback();
            } else {
              callback(
                `Password is too short(minimum is ${minLength} characters)`
              );
            }
          }
        }
      ],
      renderFormEle: () => <Input.Password />
    },
    {
      label: "Confirm New Password",
      id: "confirmPassword",
      validateTrigger: "onBlur",
      rules: [
        {
          required: true,
          validator: hocFormCompare(
            formRef,
            "password",
            tipsContent.passwordMismatch
          )
        }
      ],
      renderFormEle: () => <Input.Password />
    },
    {
      renderFormEle: () => (
        <Button isLoading={isLoading && isLoading.changePasswordByToken}>
          Log in
        </Button>
      )
    }
  ];

  function onSubmitHandler(values: any) {
    values.token = token;
    changePasswordByToken(values).then((res: string) => {
      // 点击登录成功后进行跳转
      Message.success(tipsContent.PasswordFinishReset);
      locationHref(getLocationUrl("login"));
    });
  }

  if (token) {
    return (
      <div className="user-page user-register">
        <div className="pc-common-card">
          <div className="form-left-part">
            <h1>Create New Password</h1>
            <div className="form-wrapper-component">
              <FormWrapper
                wrappedComponentRef={(inst: any) => (formRef.current = inst)}
                formConfig={formConfig}
                onSubmit={onSubmitHandler}
              />
              <p className="more-action">
                <span>Already have an account? </span>
                <RouterLink to={getLocationUrl('login')}>Log in</RouterLink>
              </p>
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
