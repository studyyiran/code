import React, { useContext, useRef, useState } from "react";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../context/authToken/context";
import Modal from "../../../components/modal";
import { tipsContent } from "../../../common/constValue";
import { Input } from "antd";
import Button from "../../../components/button";
import { FormWrapper } from "../../../components/formWrapper";
import { LoginWrapper } from "../loginButton";
import { locationHref } from "../../../common/utils/routerHistory";
import { safeEqual } from "../../../common/utils/util";
import "./index.less";

export function LoginPop() {
  const formRef: any = useRef(null);
  const storeAuthContext = useContext(StoreAuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const {
    storeAuthContextValue,
    userLogin
  } = storeAuthContext as IStoreAuthContext;
  const { isLoading } = storeAuthContextValue;

  function loginSubmit(values: any) {
    userLogin(values)
      .then((res: string) => {
        // 点击登录成功后进行跳转
        setShowLogin(false);
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
        <Button
          className="button-centered"
          isLoading={isLoading && isLoading.login}
        >
          Log in
        </Button>
      )
    }
  ];
  return (
    <>
      <LoginWrapper
        renderNotLogin={({ url, createUrl }: any) => (
          <div className="login-pop-container">
            <div className="login-pop">
              <h2 className="title">Express checkout</h2>
              <div className="content-container">
                <button
                  className="common-button"
                  onClick={() => {
                    setShowLogin(true);
                  }}
                >
                  Log In
                </button>
                <a target="_blank" href={createUrl}>
                  Create an account
                </a>
              </div>
            </div>
            <div className="fenge-line-container">
              <span className="span-line" />
              <span className="or">OR</span>
              <span className="span-line" />
            </div>
          </div>
        )}
      />
      <Modal
        className="login-form-modal"
        width={"85%"}
        visible={showLogin}
        title="Log In"
        footer={null}
        onCancel={() => {
          setShowLogin(false);
        }}
      >
        <FormWrapper
          wrappedComponentRef={(inst: any) => (formRef.current = inst)}
          onSubmit={loginSubmit}
          formConfig={formConfig}
        />
      </Modal>
    </>
  );
}
