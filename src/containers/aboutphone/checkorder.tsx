import * as React from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import config from '@/config';
import Layout from '@/containers/aboutphone/layout';
import './checkorder.less';
import { Button } from 'antd';
import { ICheckOutProps, ICheckOutStates, EBrandType, EShipmentType } from './interface/index.interface';
import { checkOrderPageValidate } from '@/containers/aboutphone/pageValidate';
import { IOrderDetail } from '../order/interface/order.inerface';
import { noteUserModal } from '@/containers/aboutphone/pageValidate';

@inject('yourphone', 'user', 'common')
@observer
export default class FinalStep extends React.Component<ICheckOutProps, ICheckOutStates> {
  public static readonly displayName: string = '订单完成页面';

  public readonly state: Readonly<ICheckOutStates> = {
    brandText: (type: number) => {
      switch (type) {
        case EBrandType.IPHONE:
          return (
            <>
              <p><strong>Disable find my iPhone and remove your SIM Card</strong></p>
              <span className="text">Make sure to wipe your device of all personal information</span>
              <Link to="/how-to-factory-reset-iphone" target="__blank" className="tips">Read our helpful intructions for more detail</Link>
            </>
          )
          break;
        case EBrandType.ANDROID:
          return (
            <>
              <p><strong>Sign out of your Google account and remove your SIM Card</strong></p>
              <span className="text">Make sure to wipe your device of all personal information</span>
              <Link to="/how-to-factory-reset-android-phone" target="__blank" className="tips">Read our helpful intructions for more detail</Link>
            </>
          )
          break;
        case EBrandType.ALL:
          return (
            <>
              <p><strong>iOS: Disable find my iPhone and remove your SIM Card</strong>&nbsp;&nbsp;&nbsp;&nbsp;<Link style={{ display: 'inline' }} to="/how-to-factory-reset-iphone" target="__blank" className="tips">More detail</Link></p>
              <p><strong>Android: Sign out of your Google account and remove your SIM Card</strong>&nbsp;&nbsp;&nbsp;&nbsp;<Link style={{ display: 'inline' }} to="/how-to-factory-reset-iphone" target="__blank" className="tips">More detail</Link></p>
              <span className="text">Pack your device in a box with protective packaging material for shipment</span>
            </>
          )
        default:
          return null;
      }
    },
    translateMore: false,
    checkboxType: true
  }

  public componentDidMount() {
    // 隐藏左侧价格模块
    this.props.user.isShowLeftPrice = false;
    if (!checkOrderPageValidate()) {
      this.props.history.push('/sell/yourphone/brand');
      return;
    }

    if (this.props.user.preOrder.appendOrderDetail) {
      this.props.yourphone.getAllOrders(this.props.match.params.orderNo, this.props.user.preOrder.userEmail || '');
    } else {
      this.props.yourphone.getOrderDetail(this.props.match.params.orderNo, this.props.user.preOrder.userEmail || '');
    }

    // 清除相关信息
    this.props.user.preOrder = {
      userEmail: '',
    }
    this.props.yourphone.destory();
    sessionStorage.removeItem('preOrder');
  }

  public componentWillUnmount() {
    this.props.yourphone.desoryUnmount();
  }

  public render() {
    const { orderDetail, allOrdersDetail } = this.props.yourphone; // 选中的品牌， 苹果为52

    return (
      <div className="page-checkorder-container">
        <Layout hideBottom={true} userEmail={orderDetail ? orderDetail.userEmail : ''}>
          <div className="content-wrapper">
            <div className={classnames("order-summary-wrapper", { multiple: allOrdersDetail.length > 1, active: this.state.translateMore })}>
              <p className="main-title">Order Summary</p>
              <div className="summary-wrapper-container">
                {
                  allOrdersDetail.map((detail: IOrderDetail) => {
                    return (
                      <div className="summary-wrapper" key={detail.orderNo}>
                        <p className="sub-title"><span>Order Number</span><em>{detail.orderNo}</em></p>
                        <div className="content-wrapper">
                          <div className="info-wrapper">
                            <div className="info-item">
                              <span className="label">Model</span>
                              <p className="content">{detail.orderItem.product.isTBD ? 'Other' : (detail.orderItem.productName)}</p>
                            </div>
                            <div className="info-item">
                              <span className="label">Guaranteed Price</span>
                              <p className="content">{detail.orderItem.product.isTBD ? 'TBD' : `\$${detail.orderItem.amountDollar}`}</p>
                            </div>
                          </div>

                        </div>
                      </div>
                    )
                  })
                }
                {allOrdersDetail.length > 1 && <div className="btn-group" onClick={this.handleTranslateMore}><span>{!!!this.state.translateMore && `${allOrdersDetail.length} Orders in total`}</span><em /></div>}
              </div>
            </div>

            <div className="final-step-wrapper">
              <h2>Your Next Steps</h2>
              <div className="step">
                <p className="name">Reset Your Phone</p>
                <div className="detail" >
                  {this.state.brandText(this.props.yourphone.checkOrderStepType)}
                </div>
              </div>
              <div className="step">
                <p className="name">Print Shipping Label</p>
                <div className="detail">
                  <div className={classnames('checkbox-wrapper', { active: this.state.checkboxType })}>
                    <div className="checkbox" onClick={this.handleTranslateCheckbox.bind(this, true)} />
                    <div className="content">
                      <p><strong>Use my own box and print shipping label</strong></p>
                      <span className="text">You can leave your package in your mailbox or find the closest location</span>
                      {
                        orderDetail && orderDetail.shippoTransaction.carrier === EShipmentType.FEDEX && <Link to={config.DEFAULT.FedExUrl} target="__blank" className="tips">Find the closest FedEx location</Link>
                      }

                      {
                        orderDetail && orderDetail.shippoTransaction.carrier === EShipmentType.USPS && <Link to={config.DEFAULT.USPSUrl} target="__blank" className="tips">Find the closest USPS location</Link>
                      }

                    </div>
                    <a target="__blank" href={orderDetail && this.state.checkboxType ? orderDetail.shippoTransaction.ext.labelUrl : 'javascript:;'}>
                      <Button type="primary" className="checkbox-button" disabled={!this.state.checkboxType}>PRINT</Button>
                    </a>
                  </div>
                  <div className={classnames('checkbox-wrapper', { active: !this.state.checkboxType })}>
                    <div className="checkbox" onClick={this.handleTranslateCheckbox.bind(this, false)} />
                    <div className="content">
                      <p>Send me a box and shipping Label</p>
                      <span className="text">Help us reduce waste and only select if you don't have a spare time</span>
                    </div>
                    <Button type="primary" className="checkbox-button" disabled={this.state.checkboxType} onClick={this.handleSendBox}>SEND BOX</Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Layout>
      </div >
    )
  }

  private handleSendBox = async () => {
    const detail = this.props.yourphone.orderDetail;
    if (!detail) {
      return null;
    }
    const result = await this.props.yourphone.sendBox(detail.orderNo, detail.userEmail);

    if (result) {
      noteUserModal({
        title: 'Thanks! A box will be sent to you.',
        content: (<><br /> <br />This window will be closed after 10 seconds.</>),
        type: 'success',
        seconds: 10,
        update: (seconds) => (<><br /> <br />This window will be closed after {seconds} seconds.</>)
      });
    }
    return true;
  }

  private handleTranslateCheckbox = (type: boolean) => {
    this.setState({
      checkboxType: type
    })
  }

  private handleTranslateMore = () => {
    this.setState({
      translateMore: !this.state.translateMore
    })
  }
}