import React, { useContext } from "react";
import "./index.less";
// import { EntryPageContext, IEntryPageContext } from "./context";
import { Input } from "antd";
import { FormWrapper } from "../../../../components/formWrapper";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../context/authToken/context";
import Button from "../../../../components/button";
import {locationHref} from "../../../../common/utils/routerHistory";

export default function PersonalLogin() {
  const storeAuthContext = useContext(StoreAuthContext);
  const {
    userLogin,
    storeAuthContextValue
  } = storeAuthContext as IStoreAuthContext;
  const { isLoading } = storeAuthContextValue;
  const formConfig = [
    {
      id: "email",
      rules: [
        {
          // type: "email",
          message: "no you cant"
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      id: "password",
      rules: [
        {
          message: "no you cant"
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      renderFormEle: () => <Button isLoading={isLoading && isLoading.login}>submit</Button>
    }
  ];

  function onSubmitHandler(values: any) {
    userLogin(values).then((res: string) => {
      // 点击登录成功后进行跳转
      console.log('get it' );
      console.log(res);
      locationHref('/account')
    })
  }

  return (
    <div className="login-page">
      <FormWrapper formConfig={formConfig} onSubmit={onSubmitHandler} />
    </div>
  );
}
