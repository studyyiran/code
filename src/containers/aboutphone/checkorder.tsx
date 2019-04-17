import * as React from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import config from '@/config';
import Layout from '@/containers/aboutphone/layout';
import './checkorder.less';
import { Button } from 'antd';
import { ICheckOutProps, ICheckOutStates } from './interface/index.interface';
import { checkOrderPageValidate } from '@/containers/aboutphone/pageValidate';
import { IOrderDetail } from '../order/interface/order.inerface';

@inject('yourphone', 'user', 'common')
@observer
export default class FinalStep extends React.Component<ICheckOutProps, ICheckOutStates> {
  public static readonly displayName: string = '订单完成页面';

  public readonly state: Readonly<ICheckOutStates> = {
    brandText: (
      <>
        <p>Remove your SIM Card</p>
        <p>Make sure to wipe your device of all personal information</p>
        <p>Pack your device in a box with protective packaging material for shipment</p>
      </>),

    detailText: (label: React.ReactNode) => (
      <>
        <p>Print out your free shipping label</p>
        <small>* If you don't have a printer, you can go to Fedex location to print it according to the following tracking number</small>
        {label}
        <p>Take your package to your local FedEx location</p>
      </>
    ),
    translateMore: false
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
    // this.props.user.preOrder = {
    //   userEmail: '',
    // }
    // this.props.yourphone.destory();
  }

  public componentWillUnmount() {
    // this.props.yourphone.desoryUnmount();
  }

  public render() {
    const { activeBrandsId, orderDetail, allOrdersDetail } = this.props.yourphone; // 选中的品牌， 苹果为52

    return (
      <div className="page-checkorder-container">
        <Layout hideBottom={true} userEmail={orderDetail ? orderDetail.userEmail : ''}>
          <div className="content-wrapper">
            <div className={classnames("order-summary-wrapper", { multiple: allOrdersDetail.length > 1, active: this.state.translateMore })}>
              <p className="main-title">Order Summary</p>
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

            <div className="final-step-wrapper">
              <h2>Your Next Steps</h2>
              <div className="step">
                <p className="name">Reset Your Phone</p>
                <div className="detail" >
                  {this.state.brandText}
                </div>
                <Link to={activeBrandsId === 52 ? '/how-to-factory-reset-iphone' : '/how-to-factory-reset-android-phone'} className="tips" target="_blank">Read our helpful instructions for more details</Link>
              </div>
              <div className="step">
                <p className="name">Print Shipping Label and Ship within 7 days</p>
                <div className="detail">
                  {this.state.detailText(this.labelRender())}
                </div>
                <a href={config.DEFAULT.FedExUrl} target="__blank" className="tips">How to find the local FedEx location</a>
              </div>
            </div>

          </div>
        </Layout>
      </div >
    )
  }

  private handleTranslateMore = () => {
    this.setState({
      translateMore: !this.state.translateMore
    })
  }

  private labelRender = () => {
    const { orderDetail } = this.props.yourphone; // 选中的品牌， 苹果为52
    return (
      <div className="shipping-label-wrapper">
        <div className="left">
          <span>Tracking Number</span>
          <span>{orderDetail && orderDetail.shippoTransaction.trackingNumber}</span>
        </div>
        <div className="button-group">
          <a target="__blank" href={orderDetail ? '/up-api/up-trade-it/api/orders/download-label?code=' + orderDetail.downloadCode : 'javascript:;'}><Button type="primary" ghost={true} size="small">DOWNLOAD</Button></a>
          <a target="__blank" href={orderDetail ? orderDetail.shippoTransaction.ext.labelUrl : 'javascript:;'}><Button type="primary" size="small">PRINT</Button></a>
        </div>
      </div>
    )
  }
}