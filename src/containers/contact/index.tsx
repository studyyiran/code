import * as React from "react";
import "./index.less";
import "../commonCss/contact.less";
import FormPartWrapper from "components/formPart/form";
import { Checkbox, Col, Row, Form, Input, message } from "antd";
import { useState } from "react";
import { useContext } from "react";
import {
  ISelectModelContext,
  SelectModelContext
} from "pages/sell/selectModelProcess/context";
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

const helpInfo = [
  {
    title: "We are located at",
    desc: (
      <>
        UP Trade Technologies
        <br />
        550 S Watters Rd Suite 276
        <br />
        Allen, TX 75013
      </>
    )
  },
  {
    title: "Hours",
    desc: (
      <>
        M-F: 9am to 5pm
        <br />
        Saturday: CLOSED
        <br />
        Sunday: CLOSED
      </>
    )
  },
  {
    title: "Direct ",
    desc: "972.833.0136"
  },
  {
    title: "Email us",
    desc: "support@uptradeit.com"
  }
];

export default function(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const { createEmail } = selectModelContext as ISelectModelContext;
  function handlerFormPost(values: any, callbackFunc?: any) {
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
            ({ title, content }: any) =>
              `<div><label>${title}: </label>${content}</div>`
          )
          .join("") +
        "</p></body></html>"
    }).then(() => {
      if (callbackFunc) {
        callbackFunc();
      }
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
        <div className="common-card with-contact">
          <section>
            <h2>{staticContent.formTitle}</h2>
            <FormPartWrapper
              gutter={12}
              history={props.history}
              buttonContent="Submit"
              renderformConfig={renderformConfig}
              onPostHandler={handlerFormPost}
            />
          </section>
          <section>
            <RenderContactInfo list={helpInfo} />
          </section>
        </div>
      </div>
    </div>
  );
}

function RenderContactInfo(props: any) {
  const { list } = props;
  return (
    <ul className="contact-info">
      {list.map(({ title, desc }: any) => {
        return (
          <li key={title}>
            <h3>{title}</h3>
            <p>{desc}</p>
          </li>
        );
      })}
    </ul>
  );
}

const renderformConfig = (props: any) => {
  const formContentArr = [
    {
      id: "fullName",
      title: "Full Name",
      required: true,
      sm: 12
    },
    {
      id: "email",
      title: "Email",
      required: true,
      sm: 12,
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
