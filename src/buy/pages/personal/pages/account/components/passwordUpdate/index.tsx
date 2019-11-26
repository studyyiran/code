import React, { useContext, useEffect, useRef } from "react";
import { FormWrapper } from "../../../../../../components/formWrapper";
import { Input } from "antd";
import { AccountInfoContext, IAccountInfoContext } from "../../../../context";
import { UpdateFormLayout } from "../updateFormLayout";
import { hocFormCompare } from "../../../../../../common-modules/commonUtil";
import {
  safeEqual
} from "../../../../../../common/utils/util";
import { tipsContent } from "../../../../../../common/constValue";
const { RenderButton } = UpdateFormLayout as any;

export default function PasswordUpdateForm(props: any) {
  const accountInfoContext = useContext(AccountInfoContext);
  const {
    accountInfoContextValue,
    userEditPassword
  } = accountInfoContext as IAccountInfoContext;
  const { isLoading } = accountInfoContextValue;
  const formRef: any = useRef(null);
  const { userInfo, isEdit, setIsEdit } = props;

  // useEffect(() => {
  // callBackWhenPassAllFunc([() => isEdit], () => {
  //   const { form } = formRef.current.props;
  //   const { setFields, resetFields } = form;
  //   // 为什么reset不生效 为什么充满了异步的问题?
  //   setFields({
  //     currentPassword: {
  //       value: ""
  //     }
  //   });
  // });
  // }, [isEdit]);

  const formConfigView = [
    {
      needFieldDecorator: false,
      label: "Password",
      renderFormEle: () => <Input disabled={!isEdit} value="********" />
    },
    {
      renderFormEle: () => (
        <RenderButton isLoading={isLoading && isLoading.userEditPassword} />
      )
    }
  ];

  const formConfigUpdate = [
    {
      label: "Current password",
      id: "currentPassword",
      initialValue: "",
      rules: [
        {
          required: true,
          message: tipsContent.currentPasswordError
        }
      ],
      renderFormEle: () => <Input.Password disabled={!isEdit} />
    },
    {
      label: "New password",
      id: "password",
      initialValue: "",
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
      renderFormEle: () => <Input.Password disabled={!isEdit} />
    },
    {
      label: "Confirm New password",
      id: "confirmPassword",
      initialValue: "",
      validateTrigger: "onBlur",
      rules: [
        {
          required: true,
          validator: hocFormCompare(
            formRef,
            "password",
            "New " + tipsContent.passwordMismatch
          )
        }
      ],
      renderFormEle: () => <Input.Password disabled={!isEdit} />
    },
    {
      renderFormEle: () => (
        <RenderButton isLoading={isLoading && isLoading.userEditPassword} />
      )
    }
  ];

  async function onSubmitHandler(values: any) {
    if (values) {
      try {
        await userEditPassword(values);
        props.successHandler();
      } catch (e) {
        if (e && e.code && safeEqual(20002, e.code)) {
          if (
            formRef &&
            formRef.current &&
            formRef.current.props &&
            formRef.current.props.form &&
            formRef.current.props.form.setFields
          ) {
            formRef.current.props.form.setFields({
              // 能否只新增错误信息?不改变value
              currentPassword: {
                errors: [new Error(tipsContent.currentPasswordError)]
              }
            });
          }
        }
      }
    }
  }

  return (
    <FormWrapper
      wrappedComponentRef={(inst: any) => (formRef.current = inst)}
      formConfig={isEdit ? formConfigUpdate : formConfigView}
      onSubmit={onSubmitHandler}
    />
  );
}
