import * as React from 'react';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Row, Col, Collapse, Form } from 'antd';
import Layout from '@/containers/aboutphone/layout';
import { IPaymentProps, IPaymentStates, EShipmentType } from './interface/index.interface';
import { shipmentPageValidate } from '@/containers/aboutphone/pageValidate';
import config from '@/config';
import './shipment.less';

const Panel = Collapse.Panel;
const leftHeader = <div className='fedex-bg' />;
const rightHeader = <div className='USPS-bg' />;

@inject('yourphone', 'user', 'common')
@observer
class Shipment extends React.Component<IPaymentProps, IPaymentStates> {

  public readonly state: Readonly<IPaymentStates> = {
    activeSide: this.props.yourphone.payment
  }

  public componentDidMount() {
    // 显示左侧价格模块
    this.props.user.isShowLeftPrice = true;
    if (!shipmentPageValidate()) {
      this.props.history.push('/sell/yourphone/brand');
      return;
    }

    if (typeof this.props.onRef === 'function') {
      this.props.onRef!(this); // 让done page里获取到这个组件实例，调用其validateData方法
    }
    this.props.yourphone.getNearExpressStores();
  }

  public colLayout(span: number = 11) {
    const isMobile = this.props.common.isMobile;
    return !isMobile ? { span } : {}
  }

  public render() {
    const leftContent = (
      <div className="left-wrapper">
        {
          this.props.yourphone.FedExNearStores && (
            <>
              <p className="description">The closest FedEx location is:</p>
              <p className="address">
                <p className="title">{this.props.yourphone.FedExNearStores.name}</p>
                <p className="title">{this.props.yourphone.FedExNearStores.vicinity}</p>
              </p>
            </>
          )
        }
        <a className="difference" href={config.DEFAULT.FedExUrl}>Find the closest FedEx location</a>
      </div>
    )
    const rightContent = (
      <div className="right-wrapper">
        <p className="description">You can leave your package in your mailbox or find the closest location</p>
        {
          this.props.yourphone.USPSNearStores && (
            <>
              <p className="address">
                <p className="title">{this.props.yourphone.USPSNearStores.name}</p>
                <p className="title">{this.props.yourphone.USPSNearStores.vicinity}</p>
              </p>
            </>
          )
        }
        <a className="difference" href={config.DEFAULT.USPSUrl}>Find all USPS location</a>
      </div>
    );
    const isMobile = this.props.common.isMobile;


    const paymentHTML = (
      <Row gutter={30} style={!isMobile ? { paddingTop: '42px' } : {}}>
        <Col {...this.colLayout(12)} className="paypal-col-wrapper">
          <Collapse
            onChange={this.handleCollapseExtend.bind(this, EShipmentType.FEDEX)}
            activeKey={this.props.yourphone.expressCarrier}
            className={classnames({ active: this.props.yourphone.expressCarrier === EShipmentType.FEDEX })}>
            <Panel
              header={leftHeader}
              showArrow={false}
              key={EShipmentType.FEDEX}
            >
              {leftContent}
            </Panel>
          </Collapse>
        </Col>
        <Col {...this.colLayout(12)} className="echeck-col-wrapper">
          <Collapse
            onChange={this.handleCollapseExtend.bind(this, EShipmentType.USPS)}
            activeKey={this.props.yourphone.expressCarrier}
            className={classnames({ active: this.props.yourphone.expressCarrier === EShipmentType.USPS })}>
            <Panel
              header={rightHeader}
              showArrow={false}
              key={EShipmentType.USPS}
            >
              {rightContent}
            </Panel>
          </Collapse>
        </Col>
      </Row>
    )

    return (
      <div className={classnames('page-payment-container', { notlayout: this.props.hideLayout })}>
        {
          !this.props.hideLayout
            ? <Layout nextCb={this.handleNext} disabled={!this.props.yourphone.isDoneShipment}>{paymentHTML}</Layout>
            : (paymentHTML)
        }
      </div>
    );
  }

  private handleCollapseExtend = (type: string) => {
    if (this.props.yourphone.expressCarrier === type) {
      this.props.yourphone.expressCarrier = '';
      return;
    }

    this.props.yourphone.expressCarrier = type;
  }


  private handleNext = async () => {
    try {
      this.props.user.preOrder = {
        ...this.props.user.preOrder,
        expressCarrier: this.props.yourphone.expressCarrier
      }
    } catch (error) { console.warn(error, 'in payment page preOrder') }
    this.props.history.push('/sell/yourphone/done');
  }
}

export default Form.create()(Shipment);