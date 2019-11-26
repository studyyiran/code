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
  getUrlAllParams,
  safeEqual
} from "../../../../common/utils/util";
import RouterLink from "../../../../common-modules/components/routerLink";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import { tipsContent } from "../../../../common/constValue";

export default function PersonalLogin() {
  const formRef: any = useRef(null);
  const storeAuthContext = useContext(StoreAuthContext);
  const {
    userLogin,
    userActive,
    userEmailChange,
    storeAuthContextValue,
    setCurrentStatus
  } = storeAuthContext as IStoreAuthContext;
  const { isLoading } = storeAuthContextValue;
  const formConfig = [
    {
      label: "Email",
      id: "email",
      rules: [
        {
          type: "email",
          message: tipsContent.emailMistake
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      label: "Password",
      id: "password",
      rules: [
        {
          message: tipsContent.errorPassword
        }
      ],
      renderFormEle: () => <Input.Password />
    },
    {
      renderFormEle: () => (
        <RouterLink to="/account/forget-password" className="forget-button">
          Forgot password
        </RouterLink>
      )
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
        // 当成功的时候
        const success = (type: string) => {
          formRef.current.props.form.setFields({
            email: {
              value: uptradeemail
            }
          });
          setCurrentStatus(type);
        };

        switch (domaintype) {
          case "WEBSITE_USER_ACTIVE":
            // 激活用户请求
            userActive(authtoken).then(success.bind({}, domaintype));
            break;
          case "WEBSITE_USER_CHANGE_EMAIL":
            // 激活用户请求
            userEmailChange(authtoken).then(success.bind({}, domaintype));
            break;
        }
      }
    });
  }, []);

  function onSubmitHandler(values: any) {
    userLogin(values)
      .then((res: string) => {
        // 点击登录成功后进行跳转
        locationHref("/account/management");
      })
      .catch((e: any) => {
        const { form } = formRef.current.props;
        let error = {};
        if (e && e.code) {
          if (safeEqual(e.code, 20006)) {
            error = new Error(tipsContent.unverifiedEmail);
            form.setFields({
              email: {
                value: values && values.email,
                errors: [error]
              }
            });
            return;
          }
        }
        error = new Error(tipsContent.errorPassword);
        form.setFields({
          password: {
            value: values && values.password,
            errors: [error]
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
              <RouterLink to={"/account/create"}>Create an account</RouterLink>
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
