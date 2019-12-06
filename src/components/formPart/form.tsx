import React from "react";
import { Form, Input, message, Row, Col } from "antd";
const { Item } = Form;

function FormPart(props: any) {
  const { getFieldDecorator, resetFields } = props.form;
  function handlerFormPost(e: any) {
    // 阻止默认
    e.preventDefault();
    // 最终验证
    props.form.validateFields((error: any, values: any) => {
      if (!error) {
        props.onPostHandler(values, () => {
          resetFields();
          message.success("Message Sent");
          window.setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        });
      }
    });
    //
  }

  // Form 最终代理一个submit
  return (
    <div className="form-part-container">
      <Form onSubmit={handlerFormPost}>
        <Row gutter={props.gutter ? props.gutter : 0}>
          {props
            .renderformConfig(props)
            .map(
              ({
                title,
                index,
                type,
                render,
                id,
                rules,
                required,
                sm = 24
              }: any) => {
                return (
                  <Col sm={sm} xs={24}>
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
                  </Col>
                );
              }
            )}
        </Row>
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
