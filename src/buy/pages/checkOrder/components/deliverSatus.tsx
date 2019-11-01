import * as React from "react";
import {
  IOrderProps,
  IDeliverSatus,
  IShippingAddress
} from "../interface/order.inerface";
import "./deliverSatus.less";
import { Modal } from "antd";
const FEDICON = require("../static/fedIcon.png");
const UPSICON = require("../static/uspsIcon.png");

export default function(props: any) {
  console.log(props.transInfo);
  // 纯函数外面简单的数据封装
  return <DeliverSatus order={props.transInfo || {}} />;
}

class DeliverSatus extends React.Component<IOrderProps, IDeliverSatus> {
  constructor(props: IOrderProps) {
    super(props);
    this.state = {
      loading: false,
      visible: false
    };
  }
  public showModal = () => {
    this.setState({
      visible: true
    });
  };
  public closeModal = () => {
    this.setState({
      visible: false
    });
  };
  public render() {
    // 条数大于1，只显示第一条
    const deliverInfos: IShippingAddress[] = [];
    const deliverInfosProps = this.props.order.deliverInfos;
    if (!deliverInfosProps) {
      return null;
    }
    if (deliverInfosProps.length > 2) {
      deliverInfos.push(deliverInfosProps[0]);
      deliverInfos.push(deliverInfosProps[1]);
    } else {
      // 没有物流信息，不展示此模块
      if (deliverInfosProps.length === 0) {
        return null;
      } else {
        deliverInfosProps.map(v => {
          deliverInfos.push(v);
          return true;
        });
      }
    }
    // 有没有多条
    let hasMuch = false;
    if (deliverInfosProps.length > 2) {
      hasMuch = true;
    }
    const shippoTransaction = this.props.order.deliverNoInfo;
    return (
      <div className="comp-order-deliverSatus">
        <p className="title">Delivery Status</p>
        <div className="deliverSatus-body">
          <div className="col-1">
            {deliverInfos.map((t, i) => {
              return (
                <div key={i}>
                  {i !== 0 && <div className="line" />}
                  <div className="list-item">
                    <div className="date">{t.date}</div>
                    <div className="date-list">
                      {t.listData.map((v, j) => (
                        <div className="date-item" key={i + "_" + j}>
                          <div className="time">{v.time}</div>
                          <div className="desc">
                            {v.listData[0] && (
                              <p className="info">{v.listData[0]}</p>
                            )}
                            {v.listData[1] && (
                              <p className="pos">{v.listData[1]}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-2">
            <div>
              <img
                src={
                  shippoTransaction.carrier &&
                  shippoTransaction.carrier === "USPS"
                    ? UPSICON
                    : FEDICON
                }
                alt=""
              />
              {shippoTransaction && (
                <div>
                  <p className="name">{shippoTransaction.carrier}</p>
                  {shippoTransaction.trackingNumber && (
                    <p className="orderNo">
                      {shippoTransaction.trackingNumber}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {hasMuch && (
          <div className="footer">
            <div onClick={this.showModal}>Check Detail ></div>
          </div>
        )}
        <Modal
          visible={this.state.visible}
          title=""
          footer={null}
          onCancel={this.closeModal}
          width={800}
          wrapClassName="antd-modal-deliverSatus-body"
        >
          <div className="antd-modal-deliverSatus-body">
            <div className="col-2">
              <div>
                <img
                  src={
                    shippoTransaction.carrier &&
                    shippoTransaction.carrier === "USPS"
                      ? UPSICON
                      : FEDICON
                  }
                  alt=""
                />
                {shippoTransaction && (
                  <div>
                    <p className="name">{shippoTransaction.carrier}</p>
                    <p className="orderNo">
                      {shippoTransaction.trackingNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-1">
              {deliverInfosProps.map((t, i) => {
                return (
                  <div key={i}>
                    {i !== 0 && <div className="line" />}
                    <div className="list-item">
                      <div className="date">{t.date}</div>
                      <div className="date-list">
                        {t.listData.map((v, j) => (
                          <div className="date-item" key={i + "_" + j}>
                            <div className="time">{v.time}</div>
                            <div className="desc">
                              {v.listData[0] && (
                                <p className="info">{v.listData[0]}</p>
                              )}
                              {v.listData[1] && (
                                <p className="pos">{v.listData[1]}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

// export default DeliverSatus;
