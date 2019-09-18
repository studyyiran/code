import React, { useContext, useEffect, useState } from "react";

import {
  ITotalOrderInfoContext,
  TotalOrderInfoContext,
  totalOrderInfoReducerActionTypes
} from "./context";
import {
  ISelectModelContext,
  SelectModelContext
} from "../../../pages/sell/selectModelProcess/context";
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
import {
  getReactNodeConfig,
  getProgressType,
  getInfo,
  setOrderCache,
  getOrderCache
} from "../util/index";
import ListedForSale from "@/containers/order/components/listedForSale";
import Inspection from "@/containers/order/components/inspection";

import ProgressBar from "@/containers/order/components/progressBar";

@inject("order")
@observer
export default class OrderListContainer extends React.Component<any, any> {
  public async componentDidMount() {
    // const order = this.props.order;
    // if (order.orderNo === "") {
    //   // 自动登陆
    //   const isLogined = await order.autoLogin();
    //   // 登录失败
    //   if (!isLogined) {
    //     this.props.history.replace("/check-order");
    //   }
    // }
  }
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
    postEmailForm,
    totalOrderInfoContextValue,
    totalOrderInfoContextDispatch,
    revisedPriceConfirm,
    revisedPriceReject,
    reloadOrderFromCache,
    checkForOrder
  } = totalOrderInfoContext as ITotalOrderInfoContext;
  // 获取
  const { totalOrderInfo, currentSubOrderNo } = totalOrderInfoContextValue;

  const selectModelContext = useContext(SelectModelContext);
  const { selectModelContextValue } = selectModelContext as ISelectModelContext;
  const { qualityList: phoneConditionQuestion } = selectModelContextValue;
  // 赋值
  // useEffect(() => {
  //   if (totalOrderInfo) {
  //     // props.order.setOrderDetail(totalOrderInfo)
  //   }
  // }, [currentSubOrderNo, totalOrderInfo]);

  const currentModel = (totalOrderInfo.subOrders || []).find(subOrder => {
    return subOrder.subOrderNo === currentSubOrderNo;
  });

  useEffect(() => {
    // 1 查看session登录
    if (!totalOrderInfo || !totalOrderInfo.groupOrderNo) {
      reloadOrderFromCache();
    }
  }, [totalOrderInfo]);
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
        orderStatusHistories,
        inquiryInfo
      } = order;
      const reactNodeConfig = getReactNodeConfig(subOrderStatus);
      const needShowName = inquiryInfo.submitted.productName;
      return {
        header: `${needShowName}-${subOrderStatusDisplayName}`,
        key: subOrderNo,
        children: (
          <div>
            <MachineInfo
              key={subOrderNo}
              guaranteedPrice={order.subTotal}
              submitted={inquiryInfo.submitted}
              {...order}
            />
            <ProgressBar
              data={getProgressType({
                orderStatusHistories: orderStatusHistories,
                orderCreateDate: totalOrderInfo.orderCreateDate,
                subOrderStatus
              })}
            />
            <DeliverSatus {...order} />
            {reactNodeConfig.deliver && <DeliverSatus {...order} />}
            <Inspection
              {...order}
              phoneConditionQuestion={phoneConditionQuestion}
              postEmailForm={postEmailForm}
              revisedPriceConfirm={revisedPriceConfirm}
              revisedPriceReject={revisedPriceReject}
              subOrderStatus={subOrderStatus}
            />
            {reactNodeConfig.inspected && (
              <Inspection
                {...order}
                phoneConditionQuestion={phoneConditionQuestion}
                postEmailForm={postEmailForm}
                revisedPriceConfirm={revisedPriceConfirm}
                revisedPriceReject={revisedPriceReject}
                subOrderStatus={subOrderStatus}
              />
            )}

            {reactNodeConfig.listedForSale || reactNodeConfig.orderComplete ? (
              <ListedForSale
                {...order}
                phoneConditionQuestion={phoneConditionQuestion}
              />
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
