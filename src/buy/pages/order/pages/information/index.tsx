import * as React from "react";
import { Form, Col, Row, Input } from "antd";
import "./index.less";
import { useContext } from "react";
import {
  IOrderInfoContext,
  OrderInfoContext,
  orderInfoReducerTypes
} from "../../context";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../common-modules/context/authToken/context";
import { LoginPop } from "../../../../common-modules/components/LoginPop";

function UserInformationWrapper(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const accountInfoContext = useContext(StoreAuthContext);
  const {
    orderInfoContextValue,
    orderInfoContextDispatch,
    checkAddress,
    orderProcessRecord
  } = orderInfoContext as IOrderInfoContext;
  const { userInfo } = orderInfoContextValue;
  const { storeAuthContextValue } = accountInfoContext as IStoreAuthContext;
  const { userInfoForm } = storeAuthContextValue;
  return (
    <PureForm
      {...props}
      // 这个问题能引申出很多问题.我们交给表单的数据源的安全,是否能够保证?你用dispatch,能否解决数据不被意外变动的问题呢?需要去制作demo来考证,直接修改store数据的影响.我其实并不敢相信他居然能修改成功.
      // propsInfo={Object.assign(userInfoForm, userInfo)}
      propsInfo={{...userInfoForm, ...userInfo}}
      submitHandler={(result: any) => {
        // 开始验证地址 // 返回promise
        return checkAddress(result).then(() => {
          // 地址通过后,才提交最终的结果
          orderProcessRecord(undefined, result);
          orderInfoContextDispatch({
            type: orderInfoReducerTypes.setUserInfo,
            value: result
          });
        });
      }}
    >
      {/*<LoginPop />*/}
    </PureForm>
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
    form.validateFieldsAndScroll((err: any, values: any) => {
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
    // 这个如果需要 可以放开 进行主动检查更新
    // if (value) {
    //   getOrderTax(value)
    // }
    await zipCodeToAddressInfo(value, form);
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
        <h2 className="order-common-less-title">Shipping Address</h2>
      ) : null}
      {props.children}
      <div className="container">{infomationHTML}</div>
      {renderButton ? renderButton(handleNext, props) : null}
    </div>
  );
}
export const UserInformation = Form.create<any>()(UserInformationWrapper);
export const PaymentInformation = Form.create<any>({
  onValuesChange: (props, changedValues, allValues) => {
    if (props && props.onFormChangeHandler) {
      props.onFormChangeHandler(props, changedValues, allValues);
    }
    // 如果所有值都ok.
    // 那么每次都延迟生成一个表单.(冲掉之前的.)
    // 也就是时刻都同步了dispatch 这边的功能是进行转发

    // 外面的功能是进行渲染.根据不同的情况,使用永远正确的数值,进行渲染.就和修改价格一样.

    // 外部根据用户的选择,来进行对应的判定和按钮渲染.
    // currentSelect状态  currentShippingInfo状态.

    // props.form.validateFields((err: any, values: any) => {
    //   console.log(err);
    // });
  }
})(PaymentInformationWrapper);
