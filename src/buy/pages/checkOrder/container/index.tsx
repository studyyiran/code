import React, { useContext, useEffect, useState } from "react";

import {
  ITotalOrderInfoContext,
  TotalOrderInfoContext,
  totalOrderInfoReducerActionTypes
} from "./context";

import "./index.less";
import "./common.less";

import { getReactNodeConfig, getInfo } from "../util/index";
import { getProgressType, statusToRenderConfig } from "../util/progress";
import MachineInfo from "../components/machineInfo";
import DeliverSatus from "../components/deliverSatus";
import ProgressBar from "./components/progressBar";
import UserInfo from "./components/userInfo";

import { HeaderTitle } from "buy/components/headerTitle";
import CollapsePanelList from "./components/collapsePanelList";

export function OrderList(props: any) {
  const informationKey = "informaion";
  const [currentPageKey, setCurrentPageKey] = useState("");
  // 监听
  const totalOrderInfoContext = useContext(TotalOrderInfoContext);
  // 获取
  const {
    totalOrderInfoContextValue,
    totalOrderInfoContextDispatch,
    reloadOrderFromCache,
    checkForOrder
  } = totalOrderInfoContext as ITotalOrderInfoContext;
  console.log(totalOrderInfoContextValue);
  // 获取
  const { totalOrderInfo, currentSubOrderNo } = totalOrderInfoContextValue;

  useEffect(() => {
    checkForOrder("123" as any, "456" as any);
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
  // part1
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
  // part2
  list = list.concat(
    (totalOrderInfo.subOrders || []).map(order => {
      const {
        subOrderNo,
        subOrderStatusDisplayName,
        subOrderStatus,
        showReturnShipping,
        orderStatusHistories,
        productInfo
      } = order;
      console.log(subOrderStatus);
      const reactNodeConfig = statusToRenderConfig(subOrderStatus);
      const needShowName = productInfo.productDisplayName;
      console.log(reactNodeConfig);
      return {
        header: `${needShowName}-${subOrderStatusDisplayName}`,
        key: subOrderNo,
        children: (
          <div>
            <MachineInfo
              key={subOrderNo}
              guaranteedPrice={order.subTotal}
              productInfo={productInfo}
              {...order}
            />
            <ProgressBar
              data={getProgressType({
                orderStatusHistories: orderStatusHistories,
                orderCreateDate: totalOrderInfo.orderCreateDate,
                subOrderStatus,
                subOrderStatusDisplayName
              })}
            />
            {reactNodeConfig.showDeliverStatus ? (
              <DeliverSatus {...order} />
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
