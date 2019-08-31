import * as React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import { Modal, Button, Tooltip } from 'antd';
import Layout from '@/containers/aboutphone/layout';
import ShippingPage from './page/shipping';
import PaymentPage from './page/payment';
// import Conditions from './page/condition';
import ChangeModal from '@/containers/aboutphone/components/changemodal';
import { donePageValidate } from '@/containers/aboutphone/pageValidate';
import './done.less';
import { IDoneProps, IDoneStates, EChangeType, EPayType } from './interface/index.interface';
import { ModalProps } from 'antd/lib/modal';
import { noteUserModal } from '@/containers/aboutphone/pageValidate';

@inject('yourphone', 'user', 'common')
@observer
export default class YoureDone extends React.Component<IDoneProps, IDoneStates> {
  public pageRef: React.Component;
  public readonly state: Readonly<IDoneStates> = {
    isChecked: false, // 勾选协议
    showEditModal: false, // 展示弹窗
    pageType: '', // 弹窗内置的页面组件
    loadingComplete: false,
    loadingAppend: false
  }

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
      })
    }
  }

  public handleOnRef = (child: React.Component) => {
    this.pageRef = child;
  }


  public render() {
    let Page: React.ReactNode | null = null;
    let payment: React.ReactNode | null = null;
    let phoneNode: React.ReactNode | null = null;

    const { yourphone, user, common } = this.props;
    const chooseConditionInMobile = common.isMobile ? { onClick: this.handlePageChoose.bind(this, EChangeType.CONDITION) } : {}; // 移动端，condition弹窗触发点在ppv内容上

    switch (this.state.pageType) {
      case EChangeType.SHIPPING:
        Page = <ShippingPage {...this.props} hideLayout={true} onRef={this.handleOnRef} />;
        break;
      case EChangeType.PAYMENT:
        Page = <PaymentPage {...this.props} hideLayout={true} onRef={this.handleOnRef} />;
        break;
      case EChangeType.CONDITION:
        Page = <div>Conditions</div>
        // Page = <Conditions />;
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
              <span className="content" {...chooseConditionInMobile} >{yourphone.inquiryDetail && yourphone.inquiryDetail.ppvs.map(ppv => ppv.value).join(', ')}<span className="edit-bg" onClick={this.handlePageChoose.bind(this, EChangeType.CONDITION)} /></span>
            </p>
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


    // 弹窗添加属性
    const customizeModalProps: ModalProps = {
      className: 'ant-modal-in-done-page',
      visible: this.state.showEditModal,
      footer: null,
      onCancel: this.toggleChangeModal
    };

    customizeModalProps['width'] = this.props.common.isMobile ? '3.33rem' : 900;
    return (
      <div className="page-youredone-container">
        <Layout hideBottom={true}>
          <div className="content-wrapper">
            <div className="top-part-wrapper">
              <div className="show-module">
                <div className="show-header">
                  <span className="name">Your Payment</span>
                  {!user.preOrder.appendOrderDetail && <span className="edit-bg" onClick={this.handlePageChoose.bind(this, EChangeType.PAYMENT)} />}
                </div>
                <div className="show-content">
                  {payment}
                </div>
              </div>
              <div className="show-module">
                <div className="show-header">
                  <span className="name">Your Information</span>
                  {!user.preOrder.appendOrderDetail && <span className="edit-bg" onClick={this.handlePageChoose.bind(this, EChangeType.SHIPPING)} />}
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
                {
                  !this.props.common.isMobile &&
                  <img className="img" src={yourphone.inquiryDetail && !yourphone.isTBD ? yourphone.inquiryDetail.product.imageUrl : require('@/images/noprice.png')} />
                }
                <div className="info-wrapper">
                  {phoneNode}
                </div>
              </div>
            </div>
            <div className="terms-of-service">
              <span onClick={this.handleServiceCheck} className={classnames('text-with-icon', { checked: this.state.isChecked })} >By checking this box, you agree to our </span>
              {
                this.props.common.isMobile
                  ? <Link to='/terms' className="highlight" target="_blank">Terms of &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Service </Link>
                  : <Link to='/terms' className="highlight" target="_blank">Terms of Service </Link>
              }
            </div>
            <div className="button-group">
              {
                this.props.common.isMobile ? (
                  <Button
                    disabled={!this.state.isChecked}
                    onClick={this.handleAppend}
                    className="ship-btn ghost"
                    type="primary"
                    size="large"
                    loading={this.state.loadingAppend}
                  >
                    PLACE ANOTHER ORDER
                </Button>
                ) : (
                    <Tooltip title="If you want to place another order with the same information, payment and the same shipping label.">
                      <Button
                        disabled={!this.state.isChecked}
                        onClick={this.handleAppend}
                        className="ship-btn ghost"
                        type="primary"
                        size="large"
                        loading={this.state.loadingAppend}
                      >
                        PLACE ANOTHER ORDER
                      </Button>
                    </Tooltip>
                  )
              }
              <Button
                disabled={!this.state.isChecked}
                onClick={this.handleShip}
                className="ship-btn"
                type="primary"
                size="large"
                loading={this.state.loadingComplete}
              >
                COMPLETE
              </Button>
            </div>

            {/* <p className={classnames('ship-btn', { active: this.state.isChecked })} onClick={this.handleShip}>ALL GOOD. Let’s Ship It!</p> */}
          </div>
        </Layout>
        <Modal
          {...customizeModalProps}
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

  private handleAppend = async () => {
    if (!this.state.isChecked) {
      return;
    }

    this.setState({
      loadingAppend: true
    })

    // 开始创建订单
    let isOrderCreated = false;
    if (this.props.user.preOrder.appendOrderDetail) {
      isOrderCreated = await this.props.yourphone.appendOrder(this.props.user.preOrder, () => {
        noteUserModal({
          title: 'Failed to submit the order!',
          content: (<>There is something wrong with your order, please try again.<br /> <br />This window will be closed after 10 seconds.</>),
          type: 'info',
          seconds: 10,
          update: (seconds) => (<>There is something wrong with your order, please try again.<br /> <br />This window will be closed after {seconds} seconds.</>),
          customerOk: () => {
            // 清除相关信息
            this.props.user.preOrder = {
              userEmail: '',
            }
            this.props.yourphone.destory();
            sessionStorage.removeItem('preOrder');
            this.props.yourphone.desoryUnmount();
            this.props.history.push('/sell/yourphone/brand')
          }
        });
      });
    } else {
      isOrderCreated = await this.props.yourphone.createOrder();
    }
    this.setState({
      loadingAppend: false
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
        if (!this.props.user.preOrder.appendOrderDetail) {
          this.props.user.preOrder.appendOrderDetail = this.props.yourphone.orderDetail ? { ...this.props.yourphone.orderDetail } : null
        }
      } catch (error) { console.warn(error, 'in done page preOrder') }

      this.props.yourphone.destoryByAppendOrder();

      this.props.history.push('/sell/yourphone/brand');
    }
  }

  private handleShip = async () => {
    if (!this.state.isChecked) {
      return;
    }

    this.setState({
      loadingComplete: true
    })

    // 开始创建订单
    let isOrderCreated = false;
    if (this.props.user.preOrder.appendOrderDetail) {
      isOrderCreated = await this.props.yourphone.appendOrder(this.props.user.preOrder, () => {
        noteUserModal({
          title: 'Failed to submit the order!',
          content: (<>There is something wrong with your order, please try again.<br /> <br />This window will be closed after 10 seconds.</>),
          type: 'info',
          seconds: 10,
          update: (seconds) => (<>There is something wrong with your order, please try again.<br /> <br />This window will be closed after {seconds} seconds.</>),
          customerOk: () => {
            // 清除相关信息
            this.props.user.preOrder = {
              userEmail: '',
            }
            this.props.yourphone.destory();
            sessionStorage.removeItem('preOrder');
            this.props.yourphone.desoryUnmount();
            this.props.history.push('/sell/yourphone/brand')
          }
        });
      });
    } else {
      isOrderCreated = await this.props.yourphone.createOrder();
    }
    this.setState({
      loadingComplete: false
    })
    if (isOrderCreated) {
      try {
        this.props.user.preOrder = {
          ...this.props.user.preOrder,
          addressInfo: { ...this.props.yourphone.addressInfo },
          checkInfo: { ...this.props.yourphone.echeck },
          payment: this.props.yourphone.payment,
          paypalInfo: { ...this.props.yourphone.paypal }
        }
      } catch (error) { console.warn(error, 'in done page preOrder') }

      if (this.props.yourphone.orderDetail) {
        let orderNo = this.props.yourphone.orderDetail.orderNo;
        if (this.props.user.preOrder.appendOrderDetail) {
          orderNo = this.props.user.preOrder.appendOrderDetail.orderNo
        }
        this.props.yourphone.orderDetail = null;
        this.props.history.push('/sell/yourphone/checkorder/' + orderNo);
      }
    }
  }

  private onSave = async () => {
    const isOk = await (this.pageRef as any).validateData();
    if (isOk) {
      this.setState({ showEditModal: false });
    }
  }
}