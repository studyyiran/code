import React, { useContext, useEffect, useRef } from "react";
import { FormWrapper } from "../../../../../../components/formWrapper";
import { Input } from "antd";
import { AccountInfoContext, IAccountInfoContext } from "../../../../context";
import { UpdateFormLayout } from "../updateFormLayout";
import { hocFormCompare } from "../../../../../../common-modules/commonUtil";
import { callBackWhenPassAllFunc } from "../../../../../../common/utils/util";
const { RenderButton } = UpdateFormLayout as any;

export default function NameAndEmail(props: any) {
  const accountInfoContext = useContext(AccountInfoContext);
  const {
    accountInfoContextValue,
    userEditProfile
  } = accountInfoContext as IAccountInfoContext;
  const { isLoading } = accountInfoContextValue;
  const formRef: any = useRef(null);
  formRef.current = null;
  const { userInfo, isEdit, setIsEdit } = props;
  // 设置表单数据
  useEffect(() => {
    if (userInfo) {
      const { email, firstName, lastName } = userInfo;
      // 为什么第一帧的时候 current没有值
      const { form } = formRef.current.props;
      const { setFields } = form;
      setFields({
        email: {
          value: email
        },
        confirmEmail: {
          value: email
        },
        firstName: {
          value: firstName
        },
        lastName: {
          value: lastName
        }
      });
    }
  }, [userInfo]);

  useEffect(() => {
    callBackWhenPassAllFunc([() => isEdit], () => {
      const { email, firstName, lastName } = userInfo;
      const { form } = formRef.current.props;
      const { setFields } = form;
      setFields({
        email: {
          value: email
        },
        confirmEmail: {
          value: email
        },
        firstName: {
          value: firstName
        },
        lastName: {
          value: lastName
        }
      });
    });
  }, [isEdit]);

  const formConfigView = [
    {
      label: "First name",
      id: "firstName",
      renderFormEle: () => <Input disabled={!isEdit} />
    },
    {
      label: "Last name",
      id: "lastName",
      renderFormEle: () => <Input disabled={!isEdit} />
    },
    {
      label: "Email",
      id: "email",
      renderFormEle: () => <Input disabled={!isEdit} />
    },
    {
      renderFormEle: () => (
        <RenderButton isLoading={isLoading && isLoading.userEditProfile} />
      )
    }
  ];

  const formConfigUpdate = [
    {
      label: "First name",
      id: "firstName",
      renderFormEle: () => <Input disabled={!isEdit} />
    },
    {
      label: "Last name",
      id: "lastName",
      renderFormEle: () => <Input disabled={!isEdit} />
    },
    {
      label: "Email",
      id: "email",
      rules: [
        {
          required: true,
          type: "email",
          message: "Please enter a valid email"
        }
      ],
      renderFormEle: () => <Input disabled={!isEdit} />
    },
    {
      label: "Confirm email address",
      id: "confirmEmail",
      validateTrigger: "onBlur",
      rules: [
        {
          required: true,
          type: "email",
          message: "Please enter a valid email"
        },
        {
          validator: hocFormCompare(
            formRef,
            "email",
            "Two email that you enter is inconsistent!"
          )
        }
      ],
      renderFormEle: () => <Input disabled={!isEdit} />
    },
    {
      renderFormEle: () => (
        <RenderButton isLoading={isLoading && isLoading.userEditProfile} />
      )
    }
  ];

  async function onSubmitHandler(values: any) {
    if (values) {
      const { firstName, lastName, email } = values;
      await userEditProfile({
        firstName,
        lastName,
        email
      });
    }
    setIsEdit(false);
  }

  return (
    <FormWrapper
      wrappedComponentRef={(inst: any) => (formRef.current = inst)}
      formConfig={isEdit ? formConfigUpdate : formConfigView}
      onSubmit={onSubmitHandler}
    />
  );
}
