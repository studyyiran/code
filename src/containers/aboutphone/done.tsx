import * as React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import { Modal, Button } from 'antd';
import Layout from '@/containers/aboutphone/layout';
import ShippingPage from '@/containers/aboutphone/shipping';
import PaymentPage from '@/containers/aboutphone/payment';
import ConditionPage from '@/containers/aboutphone/conditions';
import ChangeModal from '@/containers/aboutphone/components/changemodal';
import { donePageValidate } from '@/containers/aboutphone/pageValidate';
import './done.less';
import { IDoneProps, IDoneStates, EChangeType, EPayType } from './interface/index.interface';

@inject('yourphone', 'user')
@observer
export default class YoureDone extends React.Component<IDoneProps, IDoneStates> {
  public pageRef: React.Component;
  public readonly state: Readonly<IDoneStates> = {
    isChecked: false, // 勾选协议
    showEditModal: false, // 展示弹窗
    pageType: '', // 弹窗内置的页面组件
    loading: false
  }

  public constructor(props: IDoneProps) {
    super(props);
  }

  public componentDidMount() {
    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;
    if (!donePageValidate()) {
      this.props.history.push('/sell/account');
      return;
    }
  }

  public handleOnRef = (child: React.Component) => {
    this.pageRef = child;
  }


  public render() {
    let Page: React.ReactNode | null = null;
    let payment: React.ReactNode | null = null;
    let phoneNode: React.ReactNode | null = null;

    const { yourphone, user } = this.props;

    switch (this.state.pageType) {
      case EChangeType.SHIPPING:
        Page = <ShippingPage {...this.props} hideLayout={true} onRef={this.handleOnRef} />;
        break;
      case EChangeType.PAYMENT:
        Page = <PaymentPage {...this.props} hideLayout={true} onRef={this.handleOnRef} />;
        break;
      case EChangeType.CONDITION:
        Page = <ConditionPage {...this.props} hideLayout={true} onRef={this.handleOnRef} />;
        break;
    }

    // payment
    switch (this.props.yourphone.payment) {
      case EPayType.PAYPAL:
        payment = (
          <>
            <img className="paypal-logo" src={require('@/images/paypal.png')} />
            <p className="email-info">
              <span className="label">E-mail</span>
              <span className="address">{yourphone.paypal.email}</span>
            </p>
            <p className="tips">Cash will be deposited directly to your PayPal account as soon as we recieve your phone. Please make sure it is correct!</p>
          </>
        );
        break;
      case EPayType.ECHECK:
        payment = (
          <>
            <p className="echeck-title">eCheck</p>
            <p className="email-info">
              <span className="label">Name</span>
              <span className="address">{`${yourphone.echeck.firstName} ${yourphone.echeck.lastName}`}</span>
            </p>
            <p className="email-info">
              <span className="label">E-mail</span>
              <span className="address">{`${yourphone.echeck.email}`}</span>
            </p>
            <p className="tips">You will get paid by eCheck. Please make sure the name and email is correct!</p>
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
              <span className="content">{yourphone.inquiryDetail && yourphone.inquiryDetail.product.name}</span>
            </p>
            <p className="info-item">
              <span className="label">Carrier</span>
              <span className="content">{yourphone.activeCarrierDescription}</span>
            </p>
            <p className="info-item condition">
              <span className="label">Condition</span>
              <span className="content">{yourphone.inquiryDetail && yourphone.inquiryDetail.ppvs.map(ppv => ppv.value).join(', ')}<span className="edit-bg" onClick={this.handlePageChoose.bind(this, EChangeType.CONDITION)} /></span>
            </p>
            <style>
              {`.info-wrapper .info-item.condition .content {
                -webkit-box-orient: vertical;
              }`
              }
            </style>
          </>
        );
        break;
    }

    // 缺少物流目的地
    const shippingAddress = [];
    const addressInfo = yourphone.addressInfo;
    shippingAddress.push(addressInfo.addressLine.trim());
    if (addressInfo.addressLineOptional && addressInfo.addressLineOptional !== "") {
      shippingAddress.push(addressInfo.addressLineOptional.trim());
    }
    shippingAddress.push(addressInfo.city + ", " + addressInfo.state);
    shippingAddress.push(addressInfo.zipCode);

    return (
      <div className="page-youredone-container">
        <Layout hideBottom={true}>
          <div className="content-wrapper">
            <div className="top-part-wrapper">
              <div className="show-module">
                <div className="show-header">
                  <span className="name">Your Payment</span>
                  <span className="edit-bg" onClick={this.handlePageChoose.bind(this, EChangeType.PAYMENT)} />
                </div>
                <div className="show-content">
                  {payment}
                </div>
              </div>
              <div className="show-module">
                <div className="show-header">
                  <span className="name">Your Information</span>
                  <span className="edit-bg" onClick={this.handlePageChoose.bind(this, EChangeType.SHIPPING)} />
                </div>
                <div className="show-content">
                  <p className="info-item">
                    <span className="label">E-mail</span>
                    <span className="content">{user.preOrder.userEmail}</span>
                  </p>
                  <p className="info-item">
                    <span className="label">Name</span>
                    <span className="content">{`${yourphone.addressInfo.firstName} ${yourphone.addressInfo.lastName}`}</span>
                  </p>
                  <p className="info-item">
                    <span className="label">Address</span>
                    <span className="content">{shippingAddress.join(', ')}</span>
                  </p>
                  {yourphone.addressInfo.mobile && <p className="info-item">
                    <span className="label">Phone No. </span>
                    <span className="content">+1 {yourphone.addressInfo.mobile}</span>
                  </p>}
                </div>
              </div>
            </div>
            <div className="bottom-part-wrapper">
              <p className="phone-name">Your Phone</p>
              <div className="phone-info-wrapper">
                <img className="img" src={require('@/images/noprice.png')} />
                <div className="info-wrapper">
                  {phoneNode}
                </div>
              </div>
            </div>
            <div className="terms-of-service">
              <span onClick={this.handleServiceCheck} className={classnames('text-with-icon', { checked: this.state.isChecked })} >By checking this box, you agree to our </span>
              <Link to='/terms' className="highlight">Terms of Service </Link>
            </div>
            <Button
              disabled={!this.state.isChecked}
              onClick={this.handleShip}
              className="ship-btn"
              type="primary"
              size="large"
              loading={this.state.loading}
            >
              ALL GOOD. Let’s Ship It!
            </Button>
            {/* <p className={classnames('ship-btn', { active: this.state.isChecked })} onClick={this.handleShip}>ALL GOOD. Let’s Ship It!</p> */}
          </div>
        </Layout>
        <Modal
          width={800}
          visible={this.state.showEditModal}
          footer={null}
          onCancel={this.toggleChangeModal}
        >
          <ChangeModal type={this.state.pageType} onSave={this.onSave} >
            {Page}
          </ChangeModal>
        </Modal>
      </div>
    );
  }

  private handleServiceCheck = () => {
    this.setState({ isChecked: !this.state.isChecked });
  }

  private handlePageChoose = (type: IDoneStates['pageType']) => {
    this.setState({
      showEditModal: true,
      pageType: type
    });
  }

  private toggleChangeModal = () => {
    this.setState({ showEditModal: false });
  }

  private handleShip = async () => {
    if (!this.state.isChecked) {
      return;
    }

    this.setState({
      loading: true
    })

    // 开始创建订单
    const isOrderCreated = await this.props.yourphone.createOrder();
    this.setState({
      loading: false
    })
    if (isOrderCreated) {
      try {
        this.props.user.preOrder = {
          ...this.props.user.preOrder,
          addressInfo: { ...this.props.yourphone.addressInfo },
          checkInfo: { ...this.props.yourphone.echeck },
          payment: this.props.yourphone.payment,
          paypalInfo: { ...this.props.yourphone.paypal },
        }
      } catch (error) { console.warn(error, 'in done page preOrder') }
      this.props.history.push('/sell/yourphone/checkorder');
    }
  }

  private onSave = async () => {
    const isOk = await (this.pageRef as any).validateData();
    if (isOk) {
      this.setState({ showEditModal: false });
    }
  }
}