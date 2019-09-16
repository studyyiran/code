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
          })}
        <button className="common-button">Next</button>
      </Form>
    </div>
  );
}

// 便于注入属性和方法
const FormPartWrapper: any = Form.create({ name: "dontknow" })(FormPart);

export default FormPartWrapper;
