import * as React from "react";
import {
  IOrderProps,
  IDeliverSatus,
  IShippingAddress
} from "@/containers/order/interface/order.inerface";
import UPSICON from "@/images/order/upsIcon.png";
import "./deliverSatus.less";
import { Modal } from "antd";
import { getDeliverInfos } from "../util";

export default function(props: any) {
  // function wraper(props: any) {
  const { sendInfo, returnInfo } = props.shippingInfo;
  let currentInfo = [];
  if (returnInfo && returnInfo.length) {
    currentInfo = returnInfo;
  } else if (sendInfo && sendInfo.length) {
    currentInfo = sendInfo;
  }
  currentInfo = getDeliverInfos(
    currentInfo.map((item: any) => {
      return {
        ...item,
        statusDate: item.updateDt,
        location: "locationlocation",
        statusDetails: "statusDetailsstatusDetails"
      };
    })
  );
  const fakeProps: any = {
    order: { deliverInfos: currentInfo, deliverNoInfo: getDeliverNoInfo(currentInfo) }
  };
  return <DeliverSatus {...fakeProps} />;
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
              <img src={UPSICON} alt="" />
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
                <img src={UPSICON} alt="" />
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
function getDeliverNoInfo(info: any[]) {
  const deliverNoInfo: any = {};
  if (info && info.length) {
    deliverNoInfo.trackingNumber = info[0].trackingNumber;
    deliverNoInfo.carrier = info[0].carrier;
  }
  return deliverNoInfo;
}
