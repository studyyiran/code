import React from "react";
import { Form, Input } from "antd";
const { Item } = Form;

function FormPart(props: any) {
  function handlerFormPost(e: any) {
    // 阻止默认
    e.preventDefault();
    // 最终验证
    props.form.validateFields((error: any, values: any) => {
      if (!error) {
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
        {props
          .renderformConfig(props)
          .map(({ title, index, type, render, id, rules, required }: any) => {
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
                })(render ? render() : <Input />)}
              </Item>
            );
          })}
        <button className="common-button button-centered">
          {props.buttonContent ? props.buttonContent : "Next"}
        </button>
      </Form>
    </div>
  );
}

interface IFormPartWrapper {
  onPostHandler: () => {};
  renderformConfig: () => {};
  buttonContent?: "";
}

// 便于注入属性和方法
export default function FormPartWrapper(props: IFormPartWrapper): any {
  const A: any = Form.create({ name: "dontknow" })(FormPart);
  return <A {...props} />;
  // return Form.create({ name: "dontknow" })(otherProps => {
  //   return <FormPart {...props} {...otherProps} />;
  // });
}
