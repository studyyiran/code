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
import Modal from "../../../../components/modal";
import { getLocationUrl } from "../../../../common/utils/util";

export default function UserForgetPassword() {
  const formRef: any = useRef(null);
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
          message: tipsContent.emailMistake
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      renderFormEle: () => (
        <Button isLoading={isLoading && isLoading.forgetPasswordEmail}>
          Send verification link
        </Button>
      )
    }
  ];

  function onSubmitHandler(values: any) {
    forgetPasswordEmail(values)
      .then((res: string) => {
        (Modal as any).confirm({
          width: "70%",
          closable: false,
          title: null,
          footer: "single",
          maskClosable: true,
          cancelText: "Got it",
          onCancel: () => {
            locationHref(getLocationUrl("buyhome"));
          },
          children: (
            <div className="content">
              <p>
                We have sent a message to {values ? values.email : ""} with a
                link to reset your password. Be sure to check your spam filters
                if you can't find the email in your in-box.
              </p>
            </div>
          )
        });
      })
      .catch(() => {
        const { form } = formRef.current.props;
        const { setFields } = form;
        form.setFields({
          // 能否只新增错误信息?不改变value
          email: {
            value: values.email,
            errors: [new Error(tipsContent.emailCantSendNotRegistered)]
          }
        });
      });
  }

  return (
    <div className="user-page user-register">
      <div className="pc-common-card">
        <div className="form-left-part">
          <h1>Forget Password</h1>
          <div className="form-wrapper-component">
            <FormWrapper
              wrappedComponentRef={(inst: any) => (formRef.current = inst)}
              formConfig={formConfig}
              onSubmit={onSubmitHandler}
            />
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
