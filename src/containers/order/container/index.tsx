import React, { useContext, useEffect, useState } from "react";

import {ITotalOrderInfoContext, TotalOrderInfoContext, totalOrderInfoReducerActionTypes} from "./context";
import { IOrderStore } from "../interface/order.inerface";
import { inject, observer } from "mobx-react";
import UserInfo from "@/containers/order/components/userInfo";
import * as moment from "moment-timezone";
import MachineInfo from "@/containers/order/components/machineInfo";
import DeliverSatus from "@/containers/order/components/deliverSatus";
import { HeaderTitle } from "@/components/headerTitle";
import "./index.less";
import "./common.less";
import CollapsePanelList from "./components/collapsePanelList";
import { getReactNodeConfig } from "../util/index";

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
  const informationKey = "informaion";
  const [currentPageKey, setCurrentPageKey] = useState("");
  // 监听
  const totalOrderInfoContext = useContext(TotalOrderInfoContext);
  // 获取
  const {
    totalOrderInfoContextValue,
    getAjax,
    getTranshipping,
    totalOrderInfoContextDispatch,
  } = totalOrderInfoContext as ITotalOrderInfoContext;
  // 获取
  const { totalOrderInfo, currentSubOrderNo } = totalOrderInfoContextValue;

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
    if (key === informationKey) {
      setCurrentPageKey(key);
    } else {
      setCurrentPageKey("false");
      totalOrderInfoContextDispatch({type: totalOrderInfoReducerActionTypes.setCurrentSubOrderNo, value: key})
    }
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
  let list: any[] = [
    {
      header: "Your Information",
      key: informationKey,
      children:
        totalOrderInfo && totalOrderInfo.groupOrderNo ? (
          <UserInfo {...test(totalOrderInfo)} />
        ) : (
          ""
        )
    }
  ];
  list = list.concat(
    (totalOrderInfo.subOrders || []).map(order => {
      const {
        subOrderNo,
        productDisplayName,
        subOrderStatusDisplayName,
        subOrderStatus
      } = order;
      const reactNodeConfig = getReactNodeConfig(subOrderStatus);
      return {
        header: `${productDisplayName}-${subOrderStatusDisplayName}`,
        key: subOrderNo,
        children: (
          <div>
            <MachineInfo
              key={subOrderNo}
              productName={order.productDisplayName}
              guaranteedPrice={order.subTotal}
              carrier={order.inquiryInfo.submitted.productPns[1].name}
              {...order}
            />
            {!reactNodeConfig.deliver && <DeliverSatus {...order} />}
            {/*<ListedForSale {...currentModel} />*/}
          </div>
        )
      };
    })
  );
  if (list && list.length) {
    list = list.map(item => {
      return {
        ...item,
        header: <span className="panel-header-title">{item.header}</span>
      };
    });
  }
  return (
    <div className="order-information-page">
      <HeaderTitle title={"Check My Order"} />
      {totalOrderInfo && totalOrderInfo.groupOrderNo ? (
        <h2>Order Number - {totalOrderInfo.groupOrderNo}</h2>
      ) : null}
      <div className="order-container">
        <CollapsePanelList
          onChange={selectHandler}
          list={list}
          activeKey={currentSubOrderNo || currentPageKey}
        />
      </div>
    </div>
  );
  // 渲染
}

// 自家用的数据。
function test({ userInfo, paymentInfo, groupOrderNo, orderCreateDate }: any) {
  // 1
  const shippingAddress: string[] = [];
  shippingAddress.push(userInfo.firstName + " " + userInfo.lastName);
  const optionalAddress = userInfo.street;
  let addressString = userInfo.apartment;
  if (optionalAddress && optionalAddress !== "") {
    addressString = addressString + "," + optionalAddress;
  }
  shippingAddress.push(addressString);
  shippingAddress.push(
    `${userInfo.city},${userInfo.state} ${userInfo.zipCode}`
  );
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
