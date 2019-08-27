import * as React from "react";
import { inject, observer } from "mobx-react";
import { Form, Col, Row, Input } from "antd";
import Layout from "@/containers/aboutphone/layout";
import "./index.less";
import {
  IShippingProps,
  IShippingState
} from "../../interface/index.interface";
import { IProductInfo } from "@/store/interface/user.interface";
import { shippingPageValidate } from "@/containers/aboutphone/pageValidate";
import yourphoneStore from "../../store/yourphone.store";
import classnames from "classnames";

// create form value 变化时候判断 按钮是否能高亮
const onValuesChange = (props: any, changedValues: any, allValues: any) => {
  let disabled = false;

  Object.keys(allValues).forEach((v: string) => {
    if (
      !allValues[v] &&
      v !== "state" &&
      v !== "addressLineOptional" &&
      v !== "mobile" &&
      v !== "country"
    ) {
      disabled = true;
    }
  });

  yourphoneStore.isAddressValuesAndDisabled = disabled;
};

@inject("yourphone", "user", "common")
@observer
class ShippingAddress extends React.Component<IShippingProps, IShippingState> {
  public state = {
    help: "We’ll only call you if there is an issue with your sale.",
    validateStatus: undefined,
    isLoadingZipCode: true
  };

  public componentDidMount() {
    // 判断是否页面需要必备数据，分TBD的情况
    // if (!shippingPageValidate()) {
    //   this.props.history.push("/sell/yourphone/brand");
    //   return;
    // }

    // didmount 的时候校验是否填了字段
    const { getFieldsValue } = this.props.form;
    const allValus = getFieldsValue();

    onValuesChange(false, false, allValus);

    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;
    this.props.user.isShowLeftPriceMobile = true;

    if (typeof this.props.onRef === "function") {
      this.props.onRef!(this);
    }
  }

  public componentWillUnmount() {
    this.props.user.isShowLeftPriceMobile = false;
  }

  public validateData = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this.props.form.validateFields(async (err, values) => {
        if (err) {
          resolve(false);
        }

        if (!values.state) {
          const result = await this.handleZipCodeChange({
            target: { value: values.zipCode }
          } as React.ChangeEvent<HTMLInputElement>);
          if (result) {
            reject(1);
          } else {
            reject(2);
          }
        }

        this.props.yourphone.addressInfo = {
          ...this.props.yourphone.addressInfo,
          ...values
        };

        // 弹窗检验额外添加
        // if (this.props.hideLayout) {
        if (
          /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/.test(
            values.userEmail
          )
        ) {
          this.props.user.preOrder = {
            ...this.props.user.preOrder,
            userEmail: values.userEmail
          };
        }
        // }
        resolve(true);
      });
    });
  };

  public colLayout(span: number = 11) {
    const isMobile = this.props.common.isMobile;
    return !isMobile ? { span } : {};
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { addressInfo } = this.props.yourphone;
    const isMobile = this.props.common.isMobile;

    const infomationHTML = (
      <Form layout="vertical">
        {/* 在弹窗时才有 */}
        {
          // this.props.hideLayout &&
          <Row>
            <Col {...this.colLayout()}>
              <Form.Item label="Email address">
                {getFieldDecorator("userEmail", {
                  rules: [
                    {
                      required: true,
                      type: "email",
                      message: "Please enter a valid email."
                    }
                  ],
                  initialValue: this.props.user.preOrder.userEmail,
                  validateTrigger: "onBlur"
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        }
        <Row gutter={32}>
          <Col {...this.colLayout()}>
            <Form.Item label="First name" required={true}>
              {getFieldDecorator("firstName", {
                rules: [
                  {
                    required: true,
                    pattern: /\w+/,
                    message: "Please enter a valid first name."
                  }
                ],
                initialValue: addressInfo.firstName
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col {...this.colLayout()}>
            <Form.Item label="Last name">
              {getFieldDecorator("lastName", {
                rules: [
                  {
                    required: true,
                    pattern: /\w+/,
                    message: "Please enter a valid last name."
                  }
                ],
                initialValue: addressInfo.lastName
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col {...this.colLayout()}>
            <Form.Item label="Address Line 1">
              {getFieldDecorator("addressLine", {
                rules: [
                  {
                    required: true,
                    pattern: /\w+/,
                    message: "Please enter a valid address."
                  }
                ],
                initialValue: addressInfo.addressLine
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col {...this.colLayout()}>
            <Form.Item label="Address Line 2(Optional)">
              {getFieldDecorator("addressLineOptional", {
                rules: [
                  {
                    pattern: /\w+/,
                    message: "Please enter a valid address."
                  }
                ],
                initialValue: addressInfo.addressLineOptional
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col {...this.colLayout(7)}>
            <Form.Item label="Zip Code">
              {getFieldDecorator("zipCode", {
                rules: [
                  {
                    message: <>&nbsp;Please enter a valid zipCode.</>,
                    required: true,
                    pattern: /(\d{5,5})|(0\d{4,4})/
                  }
                ],
                validateTrigger: "onBlur",
                initialValue: addressInfo.zipCode
              })(
                <Input
                  onChange={this.handleZipCodeChange}
                  maxLength={5}
                  onBlur={this.handleZipCodeBlur}
                />
              )}
            </Form.Item>
          </Col>
          <Col {...this.colLayout(8)}>
            <Form.Item label="City">
              {getFieldDecorator("city", {
                rules: [
                  {
                    required: true,
                    pattern: /\w+/,
                    message: "Please enter a valid city."
                  }
                ],
                initialValue: addressInfo.city
              })(<Input disabled={this.state.isLoadingZipCode} />)}
            </Form.Item>
          </Col>
          <Col {...this.colLayout(7)}>
            <Form.Item label="State">
              {getFieldDecorator("state", {
                rules: [
                  {
                    message: "Please enter a valid state.",
                    whitespace: true
                  }
                ],
                initialValue: addressInfo.state
              })(<Input disabled={true} />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col {...this.colLayout()}>
            <Form.Item
              label="Phone"
              help={this.state.help}
              validateStatus={this.state.validateStatus}
            >
              {getFieldDecorator("mobile", {
                rules: [
                  {
                    required: true,
                    pattern: /\d{10}/
                    // message: "Please enter a valid mobile."
                  }
                ],
                initialValue: addressInfo.mobile,
                validateTrigger: "onBlur"
              })(<Input onBlur={this.handleBlurPhone} maxLength={10} />)}
            </Form.Item>
          </Col>
          <Col {...this.colLayout()}>
            <Form.Item
              label="Country"
              // validateStatus="validating"
              help="We currently only support trades in the United States"
            >
              {getFieldDecorator("country", {
                rules: [
                  {
                    pattern: /\w+/,
                    message: "Please enter a valid Country."
                  }
                ],
                initialValue: addressInfo.country,
                validateTrigger: "onBlur"
              })(<Input disabled={true} />)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );

    return (
      <div
        className={classnames("page-shipping-container", {
          notlayout: this.props.hideLayout
        })}
      >
        {!this.props.hideLayout ? (
          <Layout
            nextCb={this.handleNext}
            disabled={this.props.yourphone.isAddressValuesAndDisabled}
          >
            {infomationHTML}
          </Layout>
        ) : (
          infomationHTML
        )}
      </div>
    );
  }

  private handleBlurPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    const state: IShippingState = {
      help: "We’ll only call you if there is an issue with your sale.",
      validateStatus: undefined,
      isLoadingZipCode: this.state.isLoadingZipCode
    };

    if (!value) {
      state.help = "Please enter a valid mobile.";
      state.validateStatus = "error";
    }

    if (value && !/\d{10}/.test(value)) {
      state.help = "Please enter a valid mobile.";
      state.validateStatus = "error";
    }

    this.setState(state);
  };
  // 失去焦点的时候判断下否能拉取接口，全手动处理
  private handleZipCodeBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { getFieldError, setFields } = this.props.form;
    
    const err = getFieldError("zipCode")
      // @ts-ignore
      ? (getFieldError("zipCode")[0] as string)
      : false;
    console.log(err);
    if (err) {
      const value = e.target.value;
      setTimeout(() => {
        setFields({
          zipCode: {
            value: value,
            errors: [new Error(err)]
          }
        });
      });
    }
  };

  private handleNext = async () => {
    let isOk = false;

    try {
      isOk = await this.validateData();
    } catch (e) {
      isOk = false;
      if (e === 1) {
        this.handleNext();
      }
    }

    if (isOk) {
      try {
        const productInfo: Partial<IProductInfo> = {
          ...this.props.user.preOrder.productInfo,
          inquiryDetail: this.props.yourphone.inquiryDetail
        };
        this.props.user.preOrder = {
          ...this.props.user.preOrder,
          addressInfo: { ...this.props.yourphone.addressInfo },
          productInfo
        };
      } catch (error) {
        console.warn(error, "in shipping page preOrder");
      }

      this.props.history.push("/sell/yourphone/payment");
    }
  };

  private handleZipCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { setFieldsValue, setFields } = this.props.form;
    const value = e.target.value;

    if (!/(\d{5,5})|(0\d{4,4})/.test(value)) {
      return;
    }
    this.setState({
      isLoadingZipCode: true
    });
    await this.props.yourphone.getAmericaState(value);

    this.setState({
      isLoadingZipCode: false
    });

    if (
      this.props.yourphone.americaStates &&
      this.props.yourphone.americaStates.state &&
      this.props.yourphone.americaStates.city
    ) {
      setFieldsValue({ state: this.props.yourphone.americaStates.state });
      setFieldsValue({ city: this.props.yourphone.americaStates.city });
      setFields({
        zipCode: {
          value: value
          // errors: []
        }
      });
      return true;
    } else {
      setFieldsValue({ state: "" });
      setFieldsValue({ city: "" });
      setFields({
        zipCode: {
          value: value,
          errors: [new Error("Please enter a valid zipCode")]
        }
      });
      return false;
    }

    // const value = e.target.value;

    // if (!value) {
    // setFieldsValue({ 'state': '' });
    // setFieldsValue({ 'city': '' });
    // }
  };
}
export default Form.create<IShippingProps>({ onValuesChange: onValuesChange })(
  ShippingAddress
);
