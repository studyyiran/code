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
  getLocationUrl,
  getUrlAllParams,
  safeEqual
} from "../../../../common/utils/util";
import RouterLink from "../../../../common-modules/components/routerLink";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import { tipsContent } from "../../../../common/constValue";
import Modal from "../../../../components/modal";

export default function PersonalLogin() {
  const [showResetEmailModal, setShowResetEmailModal] = useState(false);
  const formRef: any = useRef(null);
  const formPopRef: any = useRef(null);
  const storeAuthContext = useContext(StoreAuthContext);
  const {
    userLogin,
    userActive,
    userEmailChange,
    storeAuthContextValue,
    setCurrentStatus
  } = storeAuthContext as IStoreAuthContext;
  const { isLoading } = storeAuthContextValue;
  const urlParams = getUrlAllParams() || {};
  const { domaintype, authtoken, uptradeemail } = urlParams;

  function isResetEmail() {
    if (domaintype && domaintype === "WEBSITE_USER_CHANGE_EMAIL") {
      return domaintype;
    } else {
      return null;
    }
  }
  useEffect(() => {
    callBackWhenPassAllFunc([], () => {
      // 如果有domaintype 需要做一些额外的请求.
      if (domaintype) {
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
            // 激活用户手动设置邮箱
            formRef.current.props.form.setFields({
              email: {
                value: uptradeemail
              }
            });
            setShowResetEmailModal(true);

            // userEmailChange(authtoken).then(success.bind({}, domaintype));
            break;
        }
      }
    });
  }, []);

  const formConfig = [
    {
      label: "Email",
      id: "email",
      rules: [
        {
          required: true,
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
          required: true,
          message: tipsContent.errorPassword
        }
      ],
      renderFormEle: () => <Input.Password />
    },
    {
      renderFormEle: () => (
        <RouterLink to="/account/forget-password" className="forget-button">
          Forgot password?
        </RouterLink>
      )
    },
    {
      renderFormEle: () => (
        <Button isLoading={isLoading && isLoading.login}>Log in</Button>
      )
    }
  ];

  function onSubmitHandler(values: any) {
    const targetStatus = isResetEmail();
    let promiseObj;
    const loginSuccess = (res: string) => {
      // 点击登录成功后进行跳转
      const nextUrl = targetStatus
        ? "/account/management"
        : getLocationUrl("home");
      locationHref(nextUrl);
    };
    if (targetStatus) {
      promiseObj = userEmailChange({
        token: authtoken,
        email: uptradeemail,
        ...values
      });
      promiseObj
        .then(() => {
          setCurrentStatus(targetStatus);
          // 触发自动登录
          return userLogin({
            email: uptradeemail,
            ...values
          });
        })
        .then(loginSuccess);
    } else {
      promiseObj = userLogin(values).then(loginSuccess);
    }
    promiseObj.catch((e: any) => {
      // 根据当前的进入的情境,来修改
      const form = targetStatus
        ? formPopRef.current.props.form
        : formRef.current.props.form;
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
      error = new Error(
        targetStatus ? "Wrong password" : tipsContent.errorPassword
      );
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
              hideRequiredMark={true}
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
      <Hehe
        visible={showResetEmailModal}
        formPopRef={formPopRef}
        onSubmitHandler={onSubmitHandler}
        isLoading={isLoading}
      />
    </div>
  );
}

function Hehe(props: any) {
  const { visible, formPopRef, onSubmitHandler, isLoading } = props;
  const formConfig = [
    {
      label: "Password",
      id: "password",
      rules: [
        {
          required: true,
          message: "Wrong password"
        }
      ],
      renderFormEle: () => <Input.Password />
    },
    {
      renderFormEle: () => (
        <Button isLoading={isLoading && isLoading.userEmailChange}>
          Log in
        </Button>
      )
    }
  ];
  return (
    <Modal
      visible={visible}
      className={"reset-email-modal-login"}
      title={null}
      footer={null}
      closable={false}
    >
      <div>
        <h3>Log In to Activate New Email</h3>
        <FormWrapper
          hideRequiredMark={true}
          wrappedComponentRef={(inst: any) => (formPopRef.current = inst)}
          formConfig={formConfig}
          onSubmit={onSubmitHandler}
        />
      </div>
    </Modal>
  );
}
