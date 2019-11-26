import React, { useContext, useEffect, useRef } from "react";
import { FormWrapper } from "../../../../../../components/formWrapper";
import { Input } from "antd";
import { AccountInfoContext, IAccountInfoContext } from "../../../../context";
import { UpdateFormLayout } from "../updateFormLayout";
import { hocFormCompare } from "../../../../../../common-modules/commonUtil";
import { callBackWhenPassAllFunc } from "../../../../../../common/utils/util";
import { tipsContent } from "../../../../../../common/constValue";
import Modal from "../../../../../../components/modal";
import "./index.less";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../../../common-modules/context/authToken/context";
const { RenderButton } = UpdateFormLayout as any;

export default function NameAndEmail(props: any) {
  const accountInfoContext = useContext(AccountInfoContext);
  const storeAuthContext = useContext(StoreAuthContext);
  const { userLogout, userEmailExist } = storeAuthContext as IStoreAuthContext;
  const {
    accountInfoContextValue,
    userEditProfile
  } = accountInfoContext as IAccountInfoContext;
  const { isLoading } = accountInfoContextValue;
  const formRef: any = useRef(null);
  const { userInfo, isEdit, setIsEdit } = props;
  // 设置表单数据.时刻同步更新
  useEffect(() => {
    // 在打开表单的时候,填充上正确的数据
    if (isEdit && userInfo) {
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
  }, [userInfo, isEdit]);

  const { email, firstName, lastName } = userInfo;
  const formConfigView = [
    {
      label: "First name",
      renderFormEle: () => <Input disabled={!isEdit} value={firstName} />
    },
    {
      label: "Last name",
      renderFormEle: () => <Input disabled={!isEdit} value={lastName} />
    },
    {
      label: "Email",
      renderFormEle: () => <Input disabled={!isEdit} value={email} />
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
      validateTrigger: "onBlur",
      validateFirst: true,
      rules: [
        {
          required: true,
          type: "email",
          message: tipsContent.emailMistake
        },
        {
          validator: async (rule: any, value: any, callback: any) => {
            if (value) {
              if (value === userInfo.email) {
                callback();
              }
              try {
                const res = await userEmailExist(value);
                // true 代表邮箱已经存在了.所有要报错
                if (res) {
                  callback(tipsContent.emailHaveRegistered);
                }
                // false代表邮箱未存在 所以可用
                callback();
              } catch (e) {
                // 代码邮箱有问题.
                callback("Email error");
              }
            } else {
              callback(tipsContent.emailMistake);
            }
          }
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
          validator: hocFormCompare(formRef, "email", tipsContent.emailMismatch)
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
      // 判断email是否相同
      const next = async () => {
        await userEditProfile({
          firstName,
          lastName,
          email
        });
        // 如果两者不相等,name就不要弹.
        props.successHandler({
          hideMessage: email !== userInfo.email
        });
      };
      if (!userInfo || email !== userInfo.email) {
        (Modal as any).confirm({
          width: "70%",
          closable: false,
          title: null,
          className: "reset-email-modal",
          maskClosable: true,
          onOk: () => {
            next().then(userLogout);
          },
          children: (
            <div className="content">
              <p>
                We will send a message to {email} with a link to verify your new
                email. Be sure to check your spam filters if you can't find the
                email in your in-box.
              </p>
              <p>
                And you will be forced to log out before you verify your new
                email, do you still need to update the email?
              </p>
            </div>
          )
        });
      } else {
        next();
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
