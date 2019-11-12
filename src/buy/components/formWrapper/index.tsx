import React from "react";
import { Form } from "antd";

interface IFormConfig {
  id: string;
  rules: [];
  renderFormEle: any;
}

interface ITest {
  onSubmit: any;
  form: any;
  formConfig: any;
}

function FormWrapperComponent(props: any) {
  const { form, formConfig, onSubmit } = props;
  const { getFieldDecorator, getFieldError, validateFields } = form;

  function onSubmitHandler(e: any) {
    e.preventDefault();
    validateFields((error: any, values: any) => {
      if (!error) {
        console.log(values);
        onSubmit && onSubmit(values);
      }
    });
  }

  const inner = formConfig.map((formConfig: IFormConfig) => {
    const { id, renderFormEle, ...otherConfig } = formConfig;
    if (id) {
      return (
        <Form.Item>
          {getFieldDecorator(id, otherConfig)(renderFormEle())}
        </Form.Item>
      );
    } else {
      return <Form.Item>{renderFormEle()}</Form.Item>;
    }
  });
  return <Form onSubmit={onSubmitHandler}>{inner}</Form>;
}

export const FormWrapper: any = Form.create()(FormWrapperComponent);
