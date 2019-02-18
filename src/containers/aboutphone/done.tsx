import * as React from 'react';
import { inject, observer } from 'mobx-react';
import classnames from 'classnames';
import { Modal } from 'antd';
import Layout from '@/containers/aboutphone/layout';
import ShippingPage from '@/containers/aboutphone/shipping';
import PaymentPage from '@/containers/aboutphone/payment';
import ConditionPage from '@/containers/aboutphone/conditions';
import ChangeModal from '@/containers/aboutphone/components/changemodal';
import './done.less';
import { IDoneProps, IDoneStates, EChangeType } from './interface/index.interface';

@inject('yourphone', 'user')
@observer
export default class YoureDone extends React.Component<IDoneProps, IDoneStates> {

  public readonly state: Readonly<IDoneStates> = {
    isChecked: false, // 勾选协议
    showEditModal: false, // 展示弹窗
    pageType: '' // 弹窗内置的页面组件
  }

  public render() {

    let page: React.ReactNode | null = null;

    switch (this.state.pageType) {
      case EChangeType.SHIPPING:
        page = <ShippingPage {...this.props} hideLayout={true} />;
        break;
      case EChangeType.PAYMENT:
        page = <PaymentPage {...this.props} hideLayout={true} />;
        break;
      case EChangeType.CONDITION:
        page = <ConditionPage {...this.props} hideLayout={true} />;
        break;
    }

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
                  <img src={require('@/images/paypal.png')} />
                  <p className="email-info">
                    <span className="label">E-mail</span>
                    <span className="address">Thomas.Paine@gmail.com</span>
                  </p>
                  <p className="tips">Cash will be deposited directly to your PayPal account as soon as we recieve your phone. Please make sure it is correct!</p>
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
                    <span className="content">Thomas.Paine@gmail.com</span>
                  </p>
                  <p className="info-item">
                    <span className="label">Name</span>
                    <span className="content">Thomas Paine</span>
                  </p>
                  <p className="info-item">
                    <span className="label">Address</span>
                    <span className="content">123 Main Street South San Francisco California, 94105</span>
                  </p>
                  <p className="info-item">
                    <span className="label">Phone No. </span>
                    <span className="content">+1 415 222-9191</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bottom-part-wrapper">
              <p className="phone-name">Your Phone</p>
              <div className="phone-info-wrapper">
                <img className="img" src={require('@/images/noprice.png')} />
                <div className="info-wrapper">
                  <p className="info-item">
                    <span className="label">Your Phone</span>
                    <span className="content">iPhone 8 Plus</span>
                  </p>
                  <p className="info-item">
                    <span className="label">Carrier</span>
                    <span className="content">AT&T</span>
                  </p>
                  <p className="info-item">
                    <span className="label">Condition</span>
                    <span className="content">No Cracks, No Scratchs, Screen is Bright, Turns On, Buttons Brokend No Cracks, No Scratchs, Screen is Bright, Turns On, Buttons Brokend <span className="edit-bg" onClick={this.handlePageChoose.bind(this, EChangeType.CONDITION)} /></span>
                  </p>
                </div>
              </div>
            </div>
            <div className="terms-of-service">
              <span onClick={this.handleServiceCheck} className={classnames('text-with-icon', { checked: this.state.isChecked })} >By checking this box, you agree to our </span>
              <span className="highlight">Terms of Service </span>
            </div>
            <p className={classnames('ship-btn', { active: this.state.isChecked })} onClick={this.handleShip}>ALL GOOD. Let’s Ship It!</p>
          </div>
        </Layout>
        <Modal
          width={800}
          visible={this.state.showEditModal}
          footer={null}
          onCancel={this.toggleChangeModal}
        >
          <ChangeModal type={this.state.pageType} onSave={this.onSave} >
            {page}
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

  private handleShip = () => {
    if (!this.state.isChecked) {
      return;
    }
    this.props.history.push('/sell/yourphone/checkorder');
  }

  private onSave = () => {
    this.setState({ showEditModal: false });
  }
}