import React from "react";
import { Form } from "antd";
import { callBackWhenPassAllFunc } from "../../common/utils/util";

interface IFormConfig {
  id: string;
  label: string;
  rules: [];
  renderFormEle: any;
}

class FormWrapperComponent extends React.Component<any, any> {
  render () {
    const { form, formConfig, onSubmit, setValueJson } = this.props;
    const { getFieldDecorator, validateFields, setFields } = form;

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
      const { id, renderFormEle, label, ...otherConfig } = formConfig;
      if (id) {
        return (
          <Form.Item label={label}>
            {getFieldDecorator(id, otherConfig)(renderFormEle())}
          </Form.Item>
        );
      } else if (renderFormEle) {
        return <Form.Item label={label}>{renderFormEle()}</Form.Item>;
      }
      return null
    });
    return <Form onSubmit={onSubmitHandler} layout={"vertical"}>{inner}</Form>;
  }
}

export const FormWrapper: any = Form.create()(FormWrapperComponent);
