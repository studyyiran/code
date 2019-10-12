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
import RouterLink from "@/components/routerLink";
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
      img: require("./img/bg_1.png")
    },
    {
      title: "No box? No problem!",
      desc:
        "If you don't have a box, don't worry. Let us know and we will send one to you.",
      img: require("./img/bg_2.png")
    },
    {
      title: "FedEx Is Too Far",
      desc:
        "We offer a USPS option which allows you to ship your phone from the comfort of your home.",
      img: require("./img/bg_3.png")
    },
    {
      title: "Need help to reset Phone?",
      desc:
        "If you need help resetting your phone. We can walk you through step by step to ensure your data is safe.",
      img: require("./img/bg_4.png")
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
                <div className="img-container">
                  <img src={img} />
                </div>
              </li>
            );
          }
        )}
      </ul>
    </section>
  );
}

export default function(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const { createEmail } = selectModelContext as ISelectModelContext;
  function handlerFormPost(values: any, callBack: any) {
    const { email, condition, other } = values;
    const configArr = [
      {
        title: "From",
        content: email
      },
      {
        title: "Need help",
        content: condition.join(",")
      },
      {
        title: "Other",
        content: other
      }
    ];
    createEmail({
      toEmail: values.email,
      nickName: "",
      subject: "Need help with order",
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
      callBack();
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
              history={props.history}
            />
          </section>
        </div>
      </div>
      <HelpList />
      <section className="last-part">
        <h2>The simplest way to sell your phone.</h2>
        <p>Let use know how we can help</p>
        <button className="common-button button-centered">
          <RouterLink to="/contact">Leave a message</RouterLink>
        </button>
      </section>
    </div>
  );
}

const renderformConfig = (props: any) => {
  const formContentArr = [
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
      id: "condition",
      title: "I need help with:",
      type: "checkboxGroup",
      render: () => {
        const checkBoxContent = [
          {
            id: "condition1",
            content: "Request more time"
          },
          {
            id: "condition2",
            content: "I don't have a box"
          },
          {
            id: "condition3",
            content: "Use USPS instead"
          },
          {
            id: "condition4",
            content: "Reseting my phone"
          }
        ];
        return (
          <Checkbox.Group>
            {checkBoxContent.map(({ id, content }: any) => {
              return (
                <Col key={id}>
                  <Checkbox value={content} className="check-box">
                    {content}
                  </Checkbox>
                </Col>
              );
            })}
          </Checkbox.Group>
        );
      }
    },
    {
      id: "other",
      title: "Other",
      rules: [{ required: true, message: "The input is not valid E-mail!" }],
      render: () => {
        return <TextArea maxLength={500} />;
      }
    }
  ];
  return formContentArr;
};
