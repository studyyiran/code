import * as React from "react";
import { Form, Col, Row, Input } from "antd";
import "./index.less";
import { useContext } from "react";
import {
  IOrderInfoContext,
  OrderInfoContext,
  orderInfoReducerTypes
} from "../../context";

function UserInformationWrapper(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const {
    orderInfoContextValue,
    orderInfoContextDispatch,
    checkAddress
  } = orderInfoContext as IOrderInfoContext;
  const { userInfo } = orderInfoContextValue;
  return (
    <PureForm
      {...props}
      propsInfo={userInfo}
      submitHandler={(result: any) => {
        // 开始验证地址 // 返回promise
        return checkAddress(result).then(() => {
          // 地址通过后,才提交最终的结果
          orderInfoContextDispatch({
            type: orderInfoReducerTypes.setUserInfo,
            value: result
          });
        });
      }}
    />
  );
}

function PaymentInformationWrapper(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const {
    orderInfoContextValue,
    orderInfoContextDispatch
  } = orderInfoContext as IOrderInfoContext;
  const { invoiceInfo } = orderInfoContextValue;
  return (
    <PureForm
      {...props}
      hideTitle={true}
      hideEmail={true}
      propsInfo={invoiceInfo}
      submitHandler={(result: any) => {
        orderInfoContextDispatch({
          type: orderInfoReducerTypes.setInvoiceInfo,
          value: result
        });
        return true;
      }}
    />
  );
}

function PureForm(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const { zipCodeToAddressInfo } = orderInfoContext as IOrderInfoContext;
  const { propsInfo, form, renderButton, hideEmail, submitHandler } = props;
  const {
    getFieldDecorator,
    getFieldValue,
    isFieldTouched,
    getFieldError
  } = form;

  const userPhoneError =
    isFieldTouched("userPhone") && getFieldError("userPhone");

  function validateData() {
    let result = false;
    form.validateFields((err: any, values: any) => {
      if (!err) {
        result = values;
      }
    });
    return result;
  }

  // 失去焦点的时候判断下否能拉取接口，全手动处理
  function handleZipCodeBlur() {}

  // 调用内部的检验程序
  function handleNext() {
    const result = validateData();
    if (result && submitHandler) {
      return submitHandler(result);
    } else {
      return false;
    }
  }

  async function handleZipCodeChange(e: any) {
    const { setFieldsValue, setFields } = form;
    const value = e.target.value;
    if (!/(\d{5,5})|(0\d{4,4})/.test(value)) {
      return;
    }
    const addressInfo = await zipCodeToAddressInfo(value);
    if (addressInfo.state && addressInfo.city) {
      setFieldsValue({ state: addressInfo.state });
      setFieldsValue({ city: addressInfo.city });
    } else {
      setFieldsValue({ state: "" });
      setFieldsValue({ city: "" });
      setFields({
        zipCode: {
          value: value,
          errors: [new Error("Please enter a valid zipCode")]
        }
      });
    }
  }

  const infomationHTML = (
    <Form layout="vertical">
      <Row gutter={24}>
        {!hideEmail ? (
          <Col>
            <Form.Item label="Email address">
              {getFieldDecorator("userEmail", {
                rules: [
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email."
                  }
                ],
                initialValue: propsInfo.userEmail,
                validateTrigger: "onBlur"
              })(<Input />)}
            </Form.Item>
          </Col>
        ) : null}
        <Col sm={12} xs={24}>
          <Form.Item label="First name">
            {getFieldDecorator("firstName", {
              rules: [
                {
                  required: true,
                  pattern: /\w+/,
                  message: "Please enter a valid first name."
                }
              ],
              initialValue: propsInfo.firstName
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item label="Last name">
            {getFieldDecorator("lastName", {
              rules: [
                {
                  required: true,
                  pattern: /\w+/,
                  message: "Please enter a valid last name."
                }
              ],
              initialValue: propsInfo.lastName
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Street">
        {getFieldDecorator("street", {
          rules: [
            {
              required: true,
              pattern: /\w+/,
              message: "Please enter a valid address."
            }
          ],
          initialValue: propsInfo.street
        })(<Input />)}
      </Form.Item>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Apartment, suite">
            {getFieldDecorator("apartment", {
              rules: [
                {
                  pattern: /\w+/,
                  message: "Please enter a valid address."
                }
              ],
              initialValue: propsInfo.apartment
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Zip/Postal code">
            {getFieldDecorator("zipCode", {
              rules: [
                {
                  message: <>&nbsp;Please enter a valid zipCode.</>,
                  required: true,
                  pattern: /(\d{5,5})|(0\d{4,4})/
                }
              ],
              validateTrigger: "onBlur",
              initialValue: propsInfo.zipCode
            })(
              <Input
                onChange={handleZipCodeChange}
                maxLength={5}
                onBlur={handleZipCodeBlur}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="City">
            {getFieldDecorator("city", {
              rules: [
                {
                  required: true,
                  pattern: /\w+/,
                  message: "Please enter a valid city."
                }
              ],
              initialValue: propsInfo.city
            })(<Input disabled={getFieldValue("state") ? false : true} />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="State">
            {getFieldDecorator("state", {
              rules: [
                {
                  message: "Please enter a valid state.",
                  whitespace: true
                }
              ],
              initialValue: propsInfo.state
            })(<Input disabled={true} />)}
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Country"
        help="We currently only support trades in the United States"
        // validateStatus="validating"
      >
        {getFieldDecorator("country", {
          rules: [
            {
              pattern: /\w+/,
              message: "Please enter a valid Country."
            }
          ],
          // initialValue: propsInfo.country,
          initialValue: "US",
          validateTrigger: "onBlur"
        })(<Input disabled={true} />)}
      </Form.Item>
      <Form.Item
        label="Phone Number"
        help={
          userPhoneError ||
          "We'll only call you if there is an issure with your order"
        }
        // validateStatus={}
      >
        {getFieldDecorator("userPhone", {
          rules: [
            {
              required: true,
              pattern: /\d{10}/,
              message: "Please enter a valid mobile."
            }
          ],
          initialValue: propsInfo.userPhone,
          validateTrigger: "onBlur"
        })(<Input maxLength={10} />)}
      </Form.Item>
    </Form>
  );
  return (
    <div className={"page-infomation-container"}>
      {!props.hideTitle ? (
        <h2 className="order-common-less-title">Customer Information</h2>
      ) : null}
      <div className="container">{infomationHTML}</div>
      {renderButton(handleNext)}
    </div>
  );
}
export const UserInformation = Form.create<any>()(UserInformationWrapper);
export const PaymentInformation = Form.create<any>()(PaymentInformationWrapper);
