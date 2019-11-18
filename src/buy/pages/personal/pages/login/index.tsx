import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.less";
import "../../common.less";
// import { EntryPageContext, IEntryPageContext } from "./context";
import { Input } from "antd";
import { FormWrapper } from "../../../../components/formWrapper";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../common-modules/context/authToken/context";
import Button from "../../../../components/button";
import { locationHref } from "../../../../common/utils/routerHistory";
import {
  callBackWhenPassAllFunc,
  getUrlAllParams
} from "../../../../common/utils/util";
import RouterLink from "../../../../components/routerLink";
import { RenderByCondition } from "../../../../components/RenderByCondition";

export default function PersonalLogin() {
  const formRef: any = useRef(null);
  formRef.current = null;
  const storeAuthContext = useContext(StoreAuthContext);
  const {
    userLogin,
    userActive,
    storeAuthContextValue
  } = storeAuthContext as IStoreAuthContext;
  const { isLoading } = storeAuthContextValue;
  const formConfig = [
    {
      label: "Email",
      id: "email",
      rules: [
        {
          type: "email",
          message: "Please enter a valid email"
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      label: "Password",
      id: "password",
      rules: [
        {
          message: "Incorrect email or password"
        }
      ],
      renderFormEle: () => <Input.Password />
    },
    {
      renderFormEle: () => <a className="forget-button">Forgot password</a>
    },
    {
      renderFormEle: () => (
        <Button isLoading={isLoading && isLoading.login}>Log in</Button>
      )
    }
  ];

  useEffect(() => {
    callBackWhenPassAllFunc([], () => {
      const params = getUrlAllParams();
      if (params) {
        const { domaintype, authtoken, uptradeemail } = params;
        switch (domaintype) {
          case "WEBSITE_USER_ACTIVE":
            // 激活用户请求
            userActive(authtoken);
            const { form } = formRef.current.props;
            form.setFields({
              email: {
                value: uptradeemail
              }
            });
            break;
        }
      }
    });
  }, []);

  function onSubmitHandler(values: any) {
    userLogin(values)
      .then((res: string) => {
        // 点击登录成功后进行跳转
        locationHref("/user-account");
      })
      .catch((e: any) => {
        const { form } = formRef.current.props;
        form.setFields({
          password: {
            errors: [new Error(e && e.resultMessage ? e.resultMessage : "")]
          }
        });
      });
  }

  return (
    <div className="user-page user-login">
      <div className="pc-common-card">
        <div className="form-left-part">
          <h1>Log In</h1>
          <div className="form-wrapper-component">
            <FormWrapper
              wrappedComponentRef={(inst: any) => (formRef.current = inst)}
              formConfig={formConfig}
              onSubmit={onSubmitHandler}
            />
            <p className="more-action">
              <span>Dont have an account? </span>
              <RouterLink to={"/user-register"}>Create an account</RouterLink>
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
}
