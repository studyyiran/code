import React, { useContext, useState } from "react";

import {
  ITotalOrderInfoContext,
  TotalOrderInfoContext,
  totalOrderInfoReducerActionTypes
} from "./context";
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
import { getReactNodeConfig, getProgressType, getInfo } from "../util/index";
import ListedForSale from "@/containers/order/components/listedForSale";
import Inspection from "@/containers/order/components/inspection";

import ProgressBar from "@/containers/order/components/progressBar";

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
    totalOrderInfoContextDispatch
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
      totalOrderInfoContextDispatch({
        type: totalOrderInfoReducerActionTypes.setCurrentSubOrderNo,
        value: ""
      });
    } else {
      setCurrentPageKey("false");
      totalOrderInfoContextDispatch({
        type: totalOrderInfoReducerActionTypes.setCurrentSubOrderNo,
        value: key
      });
    }
  }
  let list: any[] = [
    {
      header: "Your Information",
      key: informationKey,
      children:
        totalOrderInfo && totalOrderInfo.groupOrderNo ? (
          <UserInfo {...getInfo(totalOrderInfo)} />
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
        subOrderStatus,
        orderStatusHistories
      } = order;
      const reactNodeConfig = getReactNodeConfig(subOrderStatus);
      console.log(reactNodeConfig);
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
            <ProgressBar
              data={getProgressType({
                orderStatusHistories,
                orderCreateDate: totalOrderInfo.orderCreateDate,
                subOrderStatus
              })}
            />
            {reactNodeConfig.deliver && <DeliverSatus {...order} />}
            {reactNodeConfig.inspected && <Inspection {...order} />}
            {reactNodeConfig.listedForSale || reactNodeConfig.orderComplete ? (
              <ListedForSale {...order} />
            ) : null}
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
