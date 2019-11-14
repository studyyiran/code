import React, { useContext, useRef } from "react";
import "./index.less";
// import { EntryPageContext, IEntryPageContext } from "./context";
import { Input } from "antd";
import { FormWrapper } from "../../../../components/formWrapper";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../context/authToken/context";
import Button from "../../../../components/button";
import { locationHref } from "../../../../common/utils/routerHistory";
import RouterLink from "../../../../components/routerLink";
import { RenderByCondition } from "../../../../components/RenderByCondition";

export default function UserRegister() {
  const formRef : any = useRef(null);
  formRef.current = null
  const storeAuthContext = useContext(StoreAuthContext);
  const {
    userRegister,
    storeAuthContextValue
  } = storeAuthContext as IStoreAuthContext;
  const { isLoading } = storeAuthContextValue;
  function compareToFirstPassword(rule: any, value: any, callback: any) {
    if (formRef && formRef.current) {
      const { form } = formRef.current.props;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    }
    callback();
  }
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
      label: "Password",
      id: "password",
      validateTrigger: "onBlur",
      rules: [
        {
          required: true,
          message: "Incorrect email or password"
        },
        {
          validator: (rule: any, value: any, callback: any) => {
            const minLength = 8;
            if (value && value.length > minLength) {
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
      label: "Confirm Password",
      id: "confirmPassword",
      validateTrigger: "onBlur",
      rules: [
        {
          required: true,
          message: "Incorrect email or password"
        },
        {
          validator: compareToFirstPassword
        }
      ],
      renderFormEle: () => <Input.Password />
    },
    {
      renderFormEle: () => (
        <Button isLoading={isLoading && isLoading.userRegister}>Create an account</Button>
      )
    }
  ];

  function onSubmitHandler(values: any) {
    userRegister(values).then((res: string) => {
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
              wrappedComponentRef={(inst: any) => formRef.current = inst}
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
