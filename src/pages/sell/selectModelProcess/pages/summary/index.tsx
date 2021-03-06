import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Checkbox, Button } from "antd";
import Information from "../information";
import PaymentPage from "../payment";
import ChangeModal from "containers/aboutphone/components/changemodal";
import "./index.less";
import {
  IDoneProps,
  IDoneStates,
  EChangeType,
  EPayType
} from "../../index.interface";
import { ModalProps } from "antd/lib/modal";
import OrderInfo from "./orderInfo";
import { noteUserModal } from "containers/aboutphone/pageValidate";
import ButtonGroup from "pages/sell/selectModelProcess/components/buttonGroup";
import RenderCard from "./renderCard";
import {
  SelectModelContext,
  ISelectModelContext
} from "pages/sell/selectModelProcess/context";
import Modal from "components/modal";
const titleCollect = {
  [EChangeType.SHIPPING]: {
    main: 'Change Your Information',
  },
  [EChangeType.PAYMENT]: {
    main: 'How would you like to get paid?',
  },
};
export default function SummaryWrapper(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextValue,
    createOrderStart
  } = selectModelContext as ISelectModelContext;
  const {
    needInsurance,
    expressOption,
    userProductList,
    paymentTimeType
  } = selectModelContextValue;
  const staticMap = {
    "1": "THREE_DAYS",
    "2": "SEVEN_DAYS",
    "3": "SEND_BOX"
  };
  const myProps: any = {
    goNextPage: props.goNextPage,
    needInsurance,
    createOrderStart,
    sendBox:
      expressOption &&
      expressOption.sendDateType &&
      staticMap[expressOption.sendDateType] === "SEND_BOX",
    expreeSendDateType:
      expressOption &&
      expressOption.sendDateType &&
      staticMap[expressOption.sendDateType],
    subOrders: userProductList.map((item: any) => {
      return {
        brandId: item.brand,
        inquiryKey: item.inquiryKey
      };
    }),
    paymentTimeType: paymentTimeType,
  };
  return <Summary {...props} {...myProps} />;
}

@inject("yourphone", "user", "common")
@observer
class Summary extends React.Component<IDoneProps, IDoneStates> {
  // @ts-ignore
  public pageRef: React.Component;
  public readonly state: Readonly<IDoneStates> = {
    isChecked: true, // 勾选协议（多余字段）
    showEditModal: false, // 展示弹窗
    pageType: "", // 弹窗内置的页面组件
    startLoading: false,
    loadingAppend: false
  };

  public constructor(props: IDoneProps) {
    super(props);
  }

  public componentDidMount() {
    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;
    // if (!donePageValidate()) {
    //   this.props.history.push('/sell/yourphone/brand');
    //   return;
    // }

    if (this.props.user.preOrder.appendOrderDetail) {
      this.setState({
        isChecked: true
      });
    }
  }

  public handleOnRef = (child: React.Component) => {
    this.pageRef = child;
  };

  public render() {
    let Page: React.ReactNode | null = null;
    let payment: React.ReactNode | null = null;
    let phoneNode: React.ReactNode | null = null;

    const { yourphone, user, common } = this.props;
    const chooseConditionInMobile = common.isMobile
      ? { onClick: this.handlePageChoose.bind(this, EChangeType.CONDITION) }
      : {}; // 移动端，condition弹窗触发点在ppv内容上

    switch (this.state.pageType) {
      case EChangeType.SHIPPING:
        Page = <Information {...this.props} onRef={this.handleOnRef} />;
        break;
      case EChangeType.PAYMENT:
        Page = <PaymentPage {...this.props} onRef={this.handleOnRef} />;
        break;
      case EChangeType.CONDITION:
        Page = <div>Conditions</div>;
        // Page = <Conditions />;
        break;
    }

    // payment
    switch (this.props.yourphone.payment) {
      case EPayType.PAYPAL:
        payment = (
          <>
            <img
              className="logo paypal-logo"
              src={require("../payment/img/paypal.png")}
            />
            <ul>
              <li>
                <h3>Name</h3>
                <p>{`${yourphone.addressInfo.firstName} ${yourphone.addressInfo.lastName}`}</p>
              </li>
              <li>
                <h3>Email</h3>
                <p>{yourphone.paypal.email}</p>
              </li>
            </ul>
          </>
        );
        break;
      case EPayType.ECHECK:
        console.log(yourphone);
        payment = (
          <>
            <h3 className="logo">eCheck</h3>
            <ul>
              <li>
                <h3>Name</h3>
                <p>{`${yourphone.echeck.firstName} ${yourphone.echeck.lastName}`}</p>
              </li>
              <li>
                <h3>Email</h3>
                <p>{yourphone.echeck.email}</p>
              </li>
            </ul>
          </>
        );
        break;
    }

    // isTBD
    switch (this.props.yourphone.isTBD) {
      case true:
        phoneNode = (
          <p className="info-item">
            <span className="label">Your Phone</span>
            <span className="content">Other Phone</span>
          </p>
        );
        break;
      case false:
        phoneNode = (
          <>
            <p className="info-item">
              <span className="label">Your Phone</span>
              <span className="content">
                {yourphone.inquiryDetail &&
                  yourphone.inquiryDetail.product.name}
              </span>
            </p>
            <p className="info-item">
              <span className="label">Carrier</span>
              <span className="content">
                {yourphone.activeCarrierDescription}
              </span>
            </p>
            <p className="info-item condition">
              <span className="label">Condition</span>
              <span className="content" {...chooseConditionInMobile}>
                {yourphone.inquiryDetail &&
                  yourphone.inquiryDetail.ppvs.map(ppv => ppv.value).join(", ")}
                <span
                  className="edit-bg"
                  onClick={this.handlePageChoose.bind(
                    this,
                    EChangeType.CONDITION
                  )}
                />
              </span>
            </p>
          </>
        );
        break;
    }

    // 缺少物流目的地
    const shippingAddress = [];
    const addressInfo = yourphone.addressInfo;
    shippingAddress.push(addressInfo.addressLine.trim());
    if (
      addressInfo.addressLineOptional &&
      addressInfo.addressLineOptional !== ""
    ) {
      shippingAddress.push(addressInfo.addressLineOptional.trim());
    }
    shippingAddress.push(addressInfo.city + ", " + addressInfo.state);
    shippingAddress.push(addressInfo.zipCode);

    // 弹窗添加属性
    const customizeModalProps: any = {
      className: "ant-modal-in-done-page",
      visible: this.state.showEditModal,
      footer: null,
      centered: true,
      title: titleCollect[this.state.pageType] ? titleCollect[this.state.pageType]['main'] : '',
      onCancel: this.toggleChangeModal,
      width: "90%",
      needDefaultScroll: true
    };
    return (
      <div className="page-summary">
        <h2>Review your order</h2>
        <div className="top-card-container">
          <RenderCard
            title={"Your Payment"}
            onEdit={this.handlePageChoose.bind(this, EChangeType.PAYMENT)}
          >
            {payment}
          </RenderCard>
          <RenderCard
            title={"Your Information"}
            onEdit={this.handlePageChoose.bind(this, EChangeType.SHIPPING)}
          >
            <ul className="information">
              <li>
                <h3>Email</h3>
                <p>{user.preOrder.userEmail}</p>
              </li>
              <li>
                <h3>Name</h3>
                <p>{`${yourphone.addressInfo.firstName} ${yourphone.addressInfo.lastName}`}</p>
              </li>
              <li>
                <h3>Address</h3>
                <p>{shippingAddress.join(", ")}</p>
              </li>
              <li>
                <h3>Phone Number</h3>
                <p>+1 {yourphone.addressInfo.mobile}</p>
              </li>
            </ul>
          </RenderCard>
        </div>
        <RenderCard title={"Your Order"}>
          <OrderInfo />
        </RenderCard>
        {this.renderTerms()}
        <ButtonGroup
          {...this.props}
          disabled={!this.state.isChecked}
          handleNext={this.handleShip}
        >
          <Button type="primary" loading={this.state.startLoading}>
            Confirm
          </Button>
        </ButtonGroup>
        <Modal {...customizeModalProps}>
          <ChangeModal type={this.state.pageType} onSave={this.onSave}>
            {Page}
          </ChangeModal>
        </Modal>
      </div>
    );
  }

  public renderTerms() {
    return (
      <div className="terms-of-service">
        {/*<Checkbox*/}
        {/*  onChange={this.handleServiceCheck}*/}
        {/*>*/}
        {/*  */}
        {/*</Checkbox>*/}
        <span>By clicking confirm, you agree to our </span>
        <Link to="/terms" className="highlight" target="_blank">
          Terms of Service{" "}
        </Link>
      </div>
    );
  }

  private handleServiceCheck = () => {
    // this.setState({ isChecked: !this.state.isChecked });
  };

  private handlePageChoose = (type: IDoneStates["pageType"]) => {
    this.setState({
      showEditModal: true,
      pageType: type
    });
  };

  private toggleChangeModal = () => {
    this.setState({ showEditModal: false });
  };

  private handleAppend = async () => {
    if (!this.state.isChecked) {
      return;
    }

    this.setState({
      loadingAppend: true
    });

    // 开始创建订单
    let isOrderCreated = false;
    if (this.props.user.preOrder.appendOrderDetail) {
      isOrderCreated = await this.props.yourphone.appendOrder(
        this.props.user.preOrder,
        () => {
          noteUserModal({
            title: "Failed to submit the order!",
            content: (
              <>
                There is something wrong with your order, please try again.
                <br /> <br />
                This window will be closed after 10 seconds.
              </>
            ),
            type: "info",
            seconds: 10,
            update: seconds => (
              <>
                There is something wrong with your order, please try again.
                <br /> <br />
                This window will be closed after {seconds} seconds.
              </>
            ),
            customerOk: () => {
              // 清除相关信息
              this.props.user.preOrder = {
                userEmail: ""
              };
              this.props.yourphone.destory();
              sessionStorage.removeItem("preOrder");
              this.props.yourphone.desoryUnmount();
              // this.props.history.push("/sell/yourphone/brand");
            }
          });
        }
      );
    } else {
      isOrderCreated = await this.props.yourphone.createOrder();
    }
    this.setState({
      loadingAppend: false
    });
    if (isOrderCreated) {
      try {
        this.props.user.preOrder = {
          ...this.props.user.preOrder,
          addressInfo: { ...this.props.yourphone.addressInfo },
          checkInfo: { ...this.props.yourphone.echeck },
          payment: this.props.yourphone.payment,
          paypalInfo: { ...this.props.yourphone.paypal }
        };
        if (!this.props.user.preOrder.appendOrderDetail) {
          this.props.user.preOrder.appendOrderDetail = this.props.yourphone
            .orderDetail
            ? { ...this.props.yourphone.orderDetail }
            : null;
        }
      } catch (error) {
        console.warn(error, "in done page preOrder");
      }

      this.props.yourphone.destoryByAppendOrder();

      // this.props.history.push("/sell/yourphone/brand");
    }
  };

  private handleShip = async () => {
    if (!this.state.isChecked || this.state.startLoading) {
      return;
    }
    // 开始创建订单
    let isOrderCreated = false;
    if (this.props.user.preOrder.appendOrderDetail) {
      isOrderCreated = await this.props.yourphone.appendOrder(
        this.props.user.preOrder,
        () => {
          noteUserModal({
            title: "Failed to submit the order!",
            content: (
              <>
                There is something wrong with your order, please try again.
                <br /> <br />
                This window will be closed after 10 seconds.
              </>
            ),
            type: "info",
            seconds: 10,
            update: seconds => (
              <>
                There is something wrong with your order, please try again.
                <br /> <br />
                This window will be closed after {seconds} seconds.
              </>
            ),
            customerOk: () => {
              // 清除相关信息
              this.props.user.preOrder = {
                userEmail: ""
              };
              this.props.yourphone.destory();
              sessionStorage.removeItem("preOrder");
              this.props.yourphone.desoryUnmount();
              // this.props.history.push("/sell/yourphone/brand");
            }
          });
        }
      );
    } else {
      // 整合数据
      const {
        needInsurance,
        paymentTimeType,
        sendBox,
        expreeSendDateType,
        subOrders,
        createOrderStart
      } = this.props as any;
      const {
        userEmail,
        firstName,
        lastName,
        addressLine: street,
        addressLineOptional: apartment,
        city,
        state,
        zipCode,
        country,
        mobile: userPhone
      } = this.props.yourphone.addressInfo;
      const userInfo = {
        userEmail,
        firstName,
        lastName,
        city,
        state,
        zipCode,
        country,
        userPhone,
        street,
        apartment
      };
      const {
        payment,
        echeck: checkInfo,
        paypal: payPalInfo,
        expressCarrier: express
      } = this.props.yourphone;
      const paymentInfo = {
        payment,
        checkInfo,
        payPalInfo
      };
      const expressInfo = {
        express,
        needInsurance
      };
      const postData = {
        paymentTimeType,
        sendBox,
        expreeSendDateType,
        userInfo,
        paymentInfo,
        expressInfo,
        subOrders
      };
      this.setState({
        startLoading: true
      });
      // next
      try {
        isOrderCreated = await createOrderStart(postData);
        // isOrderCreated = await createOrderStart(123);
        (this.props as any).goNextPage();
      } catch (e) {
        this.setState({
          startLoading: false
        });
        console.error(e);
      }
    }

    if (isOrderCreated) {
      try {
        this.props.user.preOrder = {
          ...this.props.user.preOrder,
          addressInfo: { ...this.props.yourphone.addressInfo },
          checkInfo: { ...this.props.yourphone.echeck },
          payment: this.props.yourphone.payment,
          paypalInfo: { ...this.props.yourphone.paypal }
        };
      } catch (error) {
        console.warn(error, "in done page preOrder");
      }

      if (this.props.yourphone.orderDetail) {
        let orderNo = this.props.yourphone.orderDetail.orderNo;
        if (this.props.user.preOrder.appendOrderDetail) {
          orderNo = this.props.user.preOrder.appendOrderDetail.orderNo;
        }
        this.props.yourphone.orderDetail = null;
        // this.props.history.push("/sell/yourphone/checkorder/" + orderNo);
      }
    }
  };

  private onSave = async () => {
    const isOk = await (this.pageRef as any).validateData();
    if (isOk) {
      this.setState({ showEditModal: false });
    }
  };
}
