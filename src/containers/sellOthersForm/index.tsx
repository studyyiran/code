import React, { useState, useContext } from "react";
import "./index.less";
import "../commonCss/contact.less";
import { Form, Input, Checkbox, Row, Col } from "antd";
const { Item } = Form;
import "./index.less";
import RouterLink from "@/components/routerLink";
import {
  ISelectModelContext,
  SelectModelContext
} from "@/pages/sell/selectModelProcess/context";
import FormPartWrapper from "@/components/formPart/form";

export default function() {
  const [showForm, setShowForm] = useState(true);
  const selectModelContext = useContext(SelectModelContext);
  const { createEmail } = selectModelContext as ISelectModelContext;
  function handlerFormPost(values: any) {
    const { brand, model, storage = "", carrier = "", condition = [] } = values;
    const configArr = [
      {
        title: "From",
        content: values.email
      },
      {
        title: "Model",
        content: brand + model + storage + carrier
      },
      {
        title: "Condition",
        content: condition.join(",")
      }
    ];
    createEmail({
      toEmail: values.email,
      nickName: "",
      subject: "Request to sell other phone",
      content:
        "<html><body><p>" +
        configArr
          .map(
            ({ title, content }: any) => `<label>${title}: ${content}</label>`
          )
          .join("") +
        "</p></body></html>"
    }).then(() => {
      setShowForm(false);
    });
  }
  return (
    <div className="page-container__title contact-common-css page-sell-others-container">
      <div className="bg-container bg-1">
        <section className="page-container__title">
          <h1>{showForm ? "Sell other phone" : "Thank you"}</h1>
        </section>
      </div>
      <div className="bg-container bg-2">
        <div className="common-card">
          <section>
            {showForm ? (
              <FormPartWrapper onPostHandler={handlerFormPost as any} renderformConfig={renderformConfig}/>
            ) : (
              <RenderContent />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function RenderContent() {
  return (
    <div className="thank-page">
      <p>Thanks for telling us about your phone!</p>
      <p>
        Your phone may not be in high demand. We need 1 to 2 business days to
        research our global sales channels to provide you an accurate quote. We
        will reach out to you once complete.
      </p>
      <p>Please <RouterLink className="common-a" to="/contact">contact us</RouterLink> if you have any question.</p>
      <button className="common-button">
        <RouterLink to={"/sell"}>Place Another Phone</RouterLink>RouterLink>
      </button>
      <RouterLink className="common-a" to={"/"}>
        Back to Home
      </RouterLink>
    </div>
  );
}

const renderformConfig = (props: any) => {
  const formContentArr = [
    {
      id: "brand",
      title: "Manufacturel (e.g. Apple)",
      required: true
    },
    {
      id: "model",
      title: "Phone Model (e.g. iPhone 7)",
      required: true
    },
    {
      id: "storage",
      title: "Storage (e.g. 64GB or Not Sure)"
    },
    {
      id: "carrier",
      title: "Carrier (e.g. AT&T or Not Sure)"
    },
    {
      id: "condition",
      title: "Select all that apply",
      type: "checkboxGroup",
      render: () => {
        const checkBoxContent = [
          {
            id: "condition1",
            content: "Not Lost or Stolen"
          },
          {
            id: "condition2",
            content: "No Screen Crack"
          },
          {
            id: "condition3",
            content: "Fully Functional"
          },
          {
            id: "condition4",
            content: "Password Removed"
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
      id: "email",
      title: "Contact Email",
      rules: [
        {
          required: true,
          type: "email",
          message: "The input is not valid E-mail!"
        }
      ]
    },
    {
      id: "confirmEmail",
      title: "Confirm Email",
      rules: [
        {
          required: true,
          message: "please confirm the Email",
          validator: (rule: any, value: any, callback: any) => {
            if (props.form.getFieldValue("email") !== value) {
              callback("notsame");
            }
            callback();
          }
        }
      ]
    }
  ];
  return formContentArr
}
