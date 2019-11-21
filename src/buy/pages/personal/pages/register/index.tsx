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
import { tipsContent } from "../../../../common/constValue";
import {getLocationUrl} from "../../../../common/utils/util";

export default function UserRegister() {
  const formRef: any = useRef(null);
  const storeAuthContext = useContext(StoreAuthContext);
  const {
    userRegister,
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
          message: tipsContent.emailMistake
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
      label: "Confirm Password",
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
        <Button isLoading={isLoading && isLoading.userRegister}>
          Create an account
        </Button>
      )
    }
  ];

  function onSubmitHandler(values: any) {
    userRegister(values)
      .then((res: string) => {
        // 点击登录成功后进行跳转
        if (res) {
          locationHref(
            `/account/create/${res}/${
              values && values.email ? values.email : ""
            }`
          );
        }
      })
      .catch(() => {
        if (
          formRef &&
          formRef.current &&
          formRef.current.props &&
          formRef.current.props.form &&
          formRef.current.props.form.setFields
        ) {
          formRef.current.props.form.setFields({
            // 能否只新增错误信息?不改变value
            email: {
              value: values.email,
              errors: [new Error(tipsContent.emailHaveRegistered)]
            }
          });
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
}
