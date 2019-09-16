import React, { useState, useContext } from "react";
import ContactForm from "@/containers/contact/component/form";
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

export default function() {
  const [showForm, setShowForm] = useState(true);
  const selectModelContext = useContext(SelectModelContext);
  const { createEmail } = selectModelContext as ISelectModelContext;
  function handlerFormPost(values: any) {
    console.log(values);
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
      subject: "",
      content:
        "<p>" +
        configArr
          .map(
            ({ title, content }: any) => `<label>${title}: ${content}</label>`
          )
          .join("") +
        "</p>"
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
              <FormPartWrapper onPostHandler={handlerFormPost as any} />
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
      <p>Please contact us if you have any question.</p>
      <button className="common-button">
        <RouterLink to={"/newsell"}>Place Another Phone</RouterLink>RouterLink>
      </button>
      <RouterLink className="common-a" to={"/"}>
        Back to Home
      </RouterLink>
    </div>
  );
}

function FormPart(props: any) {
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
          <Row gutter={24}>
            <Item label="Select all that apply">
              {getFieldDecorator("condition", {
                rules: [{ required: false, message: "Please input" }]
              })(
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
              )}
            </Item>
          </Row>
        );
      }
    },
    {
      id: "email",
      title: "Contact Email",
      required: true,
      rules: [
        {
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
  function handlerFormPost(e: any) {
    // 阻止默认
    e.preventDefault();
    // 最终验证
    props.form.validateFields((error: any, values: any) => {
      console.log(error);
      if (!error) {
        console.log(values);
        props.onPostHandler(values);
      }
    });
    //
  }
  const { getFieldDecorator, setFieldsValue } = props.form;

  // Form 最终代理一个submit
  return (
    <div className="form-part-container">
      <Form onSubmit={handlerFormPost}>
        {formContentArr.map(
          ({ title, index, type, render, id, rules, required }: any) => {
            if (type === "checkboxGroup") {
              return render();
            } else {
              return (
                <Item label={title} key={id}>
                  {getFieldDecorator(id, {
                    rules: rules
                      ? rules
                      : [
                          {
                            required: required,
                            message: "Please input"
                          }
                        ]
                  })(<Input />)}
                </Item>
              );
            }
          }
        )}
        <button className="common-button">Next</button>
      </Form>
    </div>
  );
}

// 便于注入属性和方法
const FormPartWrapper: any = Form.create({ name: "dontknow" })(FormPart);
