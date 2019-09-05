import React, { useContext, useEffect } from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
import { ITotalOrderInfoContext, TotalOrderInfoContext } from "./context";
import Svg from "@/components/svg";
import OrderSummary from "@/containers/order/components/orderSummary";
import { IOrderStore } from "../interface/order.inerface";
import { inject, observer } from "mobx-react";
import UserInfo from "@/containers/order/components/userInfo";
import ArrowToTop from "@/images/order/arrowToTop.png";
import * as moment from "moment-timezone";
import MachineInfo from "@/containers/order/components/machineInfo";
import DeliverSatus from "@/containers/order/components/deliverSatus";

function CollapseWithPanelList(props: {
  onChange: (s: string) => void;
  defaultActiveKey?: string;
  list: any[];
}) {
  const { onChange, defaultActiveKey, list } = props;
  return (
    <div className="comp-collapse-panel-list">
      <Collapse
        expandIconPosition="right"
        expandIcon={panelProps => {
          return (
            <div className="circle-tag">
              {panelProps.isActive ? <Svg icon="jian" /> : <Svg icon="jia" />}
            </div>
          );
        }}
        accordion={true}
        onChange={onChange}
        defaultActiveKey={defaultActiveKey}
      >
        {list.map((item: any) => {
          const { header, children, key } = item;
          return (
            <Panel header={header} key={key}>
              {children}
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}

@inject("order")
@observer
export default class OrderListContainer extends React.Component<any, any> {
  // public async componentDidMount() {
  //   const order = this.props.order;
  //   if (order.orderNo === "") {
  //     // 自动登陆
  //     const isLogined = await order.autoLogin();
  //     // 登录失败
  //     if (!isLogined) {
  //       this.props.history.replace("/check-order");
  //     }
  //   }
  //   this.props.order.test = "test done";
  // }
  public render() {
    return <OrderList order={this.props.order} />;
  }
}

function OrderList(props: { order: IOrderStore }) {
  // 监听
  const totalOrderInfoContext = useContext(TotalOrderInfoContext);
  // 获取
  const {
    totalOrderInfoContextValue,
    getAjax
  } = totalOrderInfoContext as ITotalOrderInfoContext;
  // 获取
  const { totalOrderInfo, currentSubOrderNo } = totalOrderInfoContextValue;

  // effect请求
  useEffect(() => {
    getAjax();
  }, []);
  // 赋值
  // useEffect(() => {
  //   if (totalOrderInfo) {
  //     // props.order.setOrderDetail(totalOrderInfo)
  //   }
  // }, [currentSubOrderNo, totalOrderInfo]);

  const currentModel = (totalOrderInfo.subOrders || []).find(subOrder => {
    return subOrder.subOrderNo === currentSubOrderNo;
  });
  // 方法
  function selectHandler(key: string) {
    // 当前有选择
    // const currentTarget = userProductList.find((item: any) => {
    //   return item.inquiryKey === id;
    // });
    // if (id) {
    //   selectModelContextDispatch({
    //     type: "changeModelCache",
    //     value: currentTarget
    //   });
    // } else {
    //   selectModelContextDispatch({ type: "changeModelCache", value: "reset" });
    // }
  }

  const list = [
    {
      header: "Your Information",
      key: "Your Information",
      children:
        totalOrderInfo && totalOrderInfo.groupOrderNo ? (
          <UserInfo {...test(totalOrderInfo)} />
        ) : (
          ""
        )
    }
  ];
  if (currentModel) {
    list.push({
      header: "Your Information2",
      key: "Your Information2",
      children: (
        <div>
          <MachineInfo
            productName={currentModel.productDisplayName}
            {...currentModel}
            guaranteedPrice={currentModel.subTotal}
            carrier={currentModel.inquiryInfo.submitted.productPns[1].name}
          />
          <DeliverSatus {...currentModel} />
        </div>
      )
    });
  }
  return (
    <CollapseWithPanelList
      onChange={selectHandler}
      list={list}
      defaultActiveKey={""}
    />
  );
  // 渲染
}

// 自家用的数据。
function test({ userInfo, paymentInfo, groupOrderNo, orderCreateDate }: any) {
  // 1
  const shippingAddress: string[] = [];
  shippingAddress.push(userInfo.firstName + " " + userInfo.lastName);
  shippingAddress.push(userInfo.street);
  const optionalAddress = userInfo.apartment;
  if (optionalAddress && optionalAddress !== "") {
    shippingAddress.push(optionalAddress);
  }
  shippingAddress.push(userInfo.city + "," + userInfo.state);
  shippingAddress.push(userInfo.zipCode);
  // 2电话和email
  const telAndEmail: string[] = [];
  telAndEmail.push(userInfo.userPhone);
  telAndEmail.push(userInfo.userEmail);

  // 3
  const paymentMethod: string[] = [];
  if (paymentInfo.payment === "PAYPAL") {
    paymentMethod.push("PayPal");
    paymentMethod.push(paymentInfo.payPalInfo.email);
  }
  if (paymentInfo.payment === "CHECK") {
    paymentMethod.push("eCheck");
    paymentMethod.push(paymentInfo.checkInfo.email);
  }
  return {
    shippingAddress,
    telAndEmail,
    paymentMethod,
    orderNumber: groupOrderNo || "",
    orderDate: moment
      .tz(orderCreateDate, "America/Chicago")
      .format("MMM DD, YYYY")
  };
}
