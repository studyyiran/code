import * as React from "react";
import ContactForm from "@/containers/contact/component/form";
import "./index.less";
import "../commonCss/contact.less";
import { Form, Input, Checkbox } from "antd";
const { Item } = Form;

export default function() {
  function handlerFormPost(values: any) {
    console.log(values);
    //
  }
  return (
    <div className="page-container__title contact-common-css">
      <div className="bg-container bg-1">
        <section className="page-container__title">
          <h1>Sell other phone</h1>
        </section>
      </div>
      <div className="bg-container bg-2">
        <div className="common-card">
          <section>
            <FormPartWrapper onPostHandler={handlerFormPost as any} />
          </section>
        </div>
      </div>
    </div>
  );
}

function FormPart(props: any) {
  const formContentArr = [
    {
      id: "brand",
      title: "123"
    },
    {
      id: "model",
      title: "456"
    },
    {
      id: "storage",
      title: "456"
    },
    {
      id: "carrier",
      title: "456"
    },
    {
      type: "checkboxGroup",
      render: () => {
        const checkBoxContent = [
          {
            id: "condition1",
            content: "112"
          },
          {
            id: "condition2",
            content: "112"
          },
          {
            id: "condition3",
            content: "112"
          },
          {
            id: "condition4",
            content: "112"
          }
        ];
        return (
          <Item label="Select all that apply">
            {getFieldDecorator("condition", {
              rules: [{ required: true, message: "Please input" }]
            })(
              <Checkbox.Group>
                {checkBoxContent.map(({ id, content }: any) => {
                  return (
                    <Checkbox key={id} value={id}>
                      {content}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            )}
          </Item>
        );
      }
    },
    {
      id: "email",
      title: "456"
    },
    {
      id: "confirmEmail",
      title: "456",
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
          ({ title, index, type, render, id, rules }: any) => {
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
                            required: true,
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
