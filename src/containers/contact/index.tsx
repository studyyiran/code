import * as React from "react";
import "./index.less";
import "../commonCss/contact.less";
import FormPartWrapper from "@/components/formPart/form";
import {Checkbox, Col, Row, Form, Input, message} from "antd";
import { useState } from "react";
import { useContext } from "react";
import {
  ISelectModelContext,
  SelectModelContext
} from "@/pages/sell/selectModelProcess/context";
const { Item } = Form;
const { TextArea } = Input;
interface IStaticContent {
  title: string;
  desc: string;
  formTitle: string;
}

const staticContent: IStaticContent = {
  title: "Contact us?",
  desc: "",
  formTitle: "Send us a message"
};

export default function() {
  const selectModelContext = useContext(SelectModelContext);
  const { createEmail } = selectModelContext as ISelectModelContext;
  function handlerFormPost(values: any) {
    const { fullName, message: userMessage, email } = values;
    const configArr = [
      {
        title: "From",
        content: email
      },
      {
        title: "Full Name",
        content: fullName
      },
      {
        title: "Message",
        content: userMessage
      }
    ];
    createEmail({
      toEmail: values.email,
      nickName: "",
      subject: "Customer Message",
      content:
        "<html><body><p>" +
        configArr
          .map(
            ({ title, content }: any) => `<label>${title}: ${content}</label>`
          )
          .join("") +
        "</p></body></html>"
    }).then(() => {
      message.success("Succeed to send");
    });
  }
  return (
    <div className="page-contact-container contact-common-css">
      <div className="bg-container bg-1">
        <section className="page-container__title">
          <h1>{staticContent.title}</h1>
          <p className="sub-desc">{staticContent.desc}</p>
        </section>
      </div>
      <div className="bg-container bg-2">
        <div className="common-card">
          <section>
            <h2>{staticContent.formTitle}</h2>
            <FormPartWrapper
              buttonContent="Submit"
              renderformConfig={renderformConfig}
              onPostHandler={handlerFormPost}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

const renderformConfig = (props: any) => {
  const formContentArr = [
    {
      id: "fullName",
      title: "Full Name",
      required: true
    },
    {
      id: "email",
      title: "Contact Email",
      required: true,
      rules: [
        {
          required: true,
          type: "email",
          message: "The input is not valid E-mail!"
        }
      ]
    },
    {
      id: "message",
      title: "Message",
      rules: [{ required: true, message: "The input is not valid E-mail!" }],
      render: () => {
        return <TextArea maxLength={500} />;
      }
    }
  ];
  return formContentArr;
};
