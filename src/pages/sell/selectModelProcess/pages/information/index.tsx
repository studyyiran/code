import * as React from "react";
import { inject, observer } from "mobx-react";
import { Form, Col, Row, Input } from "antd";
import Layout from "containers/aboutphone/layout";
import "./index.less";
import { IShippingProps, IShippingState } from "../../index.interface";
import { IProductInfo } from "store/interface/user.interface";
import yourPhoneStore from "containers/aboutphone/store/yourphone.store";
import ButtonGroup from "../../components/buttonGroup";
import classnames from "classnames";
import { useContext } from "react";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../../buy/common-modules/context/authToken/context";
import { LoginPop } from "../../../../../buy/common-modules/components/LoginPop";
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

  yourPhoneStore.isAddressValuesAndDisabled = disabled;
};

export default Form.create<IShippingProps>({ onValuesChange: onValuesChange })(
  InformationWrapper
);

function InformationWrapper(props: any) {
  const storeAuthContext = useContext(StoreAuthContext);
  const { storeAuthContextValue } = storeAuthContext as IStoreAuthContext;
  const { userInfoForm } = storeAuthContextValue;
  return <Information {...props} userInfoForm={userInfoForm} />;
}

@inject("yourphone", "user", "common")
@observer
class Information extends React.Component<IShippingProps, IShippingState> {
  public state = {
    help: "We’ll only call you if there is an issue with your sale.",
    validateStatus: undefined,
    isLoadingZipCode: true
  };

  public mergeFormData() {
    const { userInfoForm } = this.props as any;
    const { addressInfo } = this.props.yourphone;
    console.log("start");
    console.log(addressInfo);
    if (addressInfo && userInfoForm) {
      Object.keys(addressInfo).forEach((key: string) => {
        switch (key) {
          case "addressLine":
            addressInfo.addressLine =
              addressInfo.addressLine || userInfoForm.street;
            break;
          case "mobile":
            addressInfo.mobile = addressInfo.mobile || userInfoForm.userPhone;
            break;
          case "addressLineOptional":
            addressInfo.addressLineOptional =
              addressInfo.addressLineOptional || userInfoForm.apartment;
            break;
          default:
            addressInfo[key] = addressInfo[key] || userInfoForm[key];
        }
        // 额外新增.因为以前的数据模型 email并不在其中.在另外一个字段中
        addressInfo.userEmail = userInfoForm.userEmail;
      });
    }
    // didmount 的时候校验是否填了字段
    const { getFieldsValue } = this.props.form;
    // cache填充是异步的
    window.setTimeout(() => {
      const allValus = getFieldsValue();
      onValuesChange(this.props, false, allValus);
    }, 200);

    if (typeof this.props.onRef === "function") {
      this.props.onRef!(this);
    }
  }

  public componentDidMount() {
    this.mergeFormData();
  }

  public componentDidUpdate(prevProps: any) {
    const { userInfoForm } = this.props as any;
    if (
      userInfoForm &&
      (!prevProps ||
        !prevProps.userInfoForm ||
        userInfoForm.firstName !== prevProps.userInfoForm.firstName)
    ) {
      this.mergeFormData();
    }
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
                  initialValue:
                    this.props.user.preOrder.userEmail || addressInfo.userEmail,
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
        <Row gutter={24}>
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
        <Row gutter={32}>
          <Col {...this.colLayout()}>
            <Form.Item
              label="Phone Number"
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
        </Row>
      </Form>
    );
    return (
      <div className={"page-infomation-container"}>
        <LoginPop isBuySide={false} />
        <h2>Information</h2>
        <div className="container">{infomationHTML}</div>
        <ButtonGroup
          {...this.props}
          handleNext={this.handleNext}
          disabled={this.props.yourphone.isAddressValuesAndDisabled}
        />
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
    const something: any = getFieldError("zipCode");
    const err = something ? (something[0] as string) : false;
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
      // this.props.history.push("/sell/yourphone/payment");
      // @ts-ignore
      this.props.goNextPage();
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
