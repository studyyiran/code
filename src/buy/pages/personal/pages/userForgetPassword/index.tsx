import React, { useContext, useRef } from "react";
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

export default function UserForgetPassword() {
  const storeAuthContext = useContext(StoreAuthContext);
  const {
    forgetPasswordEmail,
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
          required: true,
          message: "Please enter a valid email"
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      renderFormEle: () => (
        <Button isLoading={isLoading && isLoading.forgetPasswordEmail}>
          Create an account
        </Button>
      )
    }
  ];

  function onSubmitHandler(values: any) {
    forgetPasswordEmail(values).then((res: string) => {
      // 点击登录成功后进行跳转
      if (res) {
        locationHref(
          `/user-register-email/${res}/?email=${
            values && values.email ? values.email : ""
          }`
        );
      }
    });
  }

  return (
    <div className="user-page user-register">
      <div className="pc-common-card">
        <div className="form-left-part">
          <h1>Create new account</h1>
          <div className="form-wrapper-component">
            <FormWrapper
              formConfig={formConfig}
              onSubmit={onSubmitHandler}
            />
            <p className="more-action">
              <span>Already have an account? </span>
              <RouterLink to={"/user-login"}>Log in</RouterLink>
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
