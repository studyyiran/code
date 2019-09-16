
import * as React from "react";
import "./index.less";
import "../commonCss/contact.less";
import FormPartWrapper from "@/components/formPart/form";
import { Checkbox, Col, Row, Form, Input } from "antd";
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
  title: "Need help with your order?",
  desc:
    "Let us know how we can assist you with your order. We will get back to you within 1 business day.",
  formTitle: "Fill out the form below"
};

function HelpList() {
  interface IStaticHelpContent {
    title: string;
    desc: string;
    img: string;
  }

  const staticHelpContent: IStaticHelpContent[] = [
    {
      title: "Need more time?",
      desc:
        "Let us know how we can assist you with your order. We will get back to you within 1 business day.",
      img: require("./bg.jpg")
    },
    {
      title: "Need more time?",
      desc:
        "Let us know how we can assist you with your order. We will get back to you within 1 business day.",
      img: require("./bg.jpg")
    },
    {
      title: "Need more time?",
      desc:
        "Let us know how we can assist you with your order. We will get back to you within 1 business day.",
      img: require("./bg.jpg")
    }
  ];
  return (
    <section className="comp-help-list">
      <h2>Where here to help</h2>
      <ul>
        {staticHelpContent.map(
          ({ title, desc, img }: IStaticHelpContent, index) => {
            return (
              <li key={index} className="help-info">
                <div className="desc-content">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
                <img src={img} />
              </li>
            );
          }
        )}
      </ul>
    </section>
  );
}

export default function() {
  const selectModelContext = useContext(SelectModelContext);
  const { createEmail } = selectModelContext as ISelectModelContext;
  function handlerFormPost(values: any) {
    const { fullName, message, email } = values;
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
        content: message
      }
    ];
    createEmail({
      toEmail: values.email,
      nickName: "",
      subject: "",
      content:
        "<p>" +
        configArr
          .map(
            ({ title, content }: any) => `<label>${title}: ${content}</label>`
          )
          .join("") +
        "</p>"
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
