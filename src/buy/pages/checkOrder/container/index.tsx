import React, { useContext, useEffect, useState } from "react";

import "./index.less";
import "./common.less";

import { getInfo } from "../util/index";
import {
  getProgressType,
  packageDate,
  statusToRenderConfig
} from "../util/progress";
import MachineInfo from "../components/machineInfo";
import DeliverSatus from "../components/deliverSatus";
import ProgressBar from "./components/progressBar";
import UserInfo from "./components/userInfo";

import { HeaderTitle } from "buy/components/headerTitle";
import CollapsePanelList from "./components/collapsePanelList";
import { callBackWhenPassAllFunc } from "../../detail/context/test";
import {
  IStoreCheckOrderContext,
  StoreCheckOrderContext,
  storeCheckOrderReducerTypes
} from "../context";
import Button from "../../../components/button";
import RouterLink from "../../../components/routerLink";
import Svg from "../../../components/svg";
import { currencyTrans } from "../../../common/utils/util";

export function OrderList(props: any) {
  const informationKey = "informaion";
  const [currentPageKey, setCurrentPageKey] = useState("");
  // 监听
  const totalOrderInfoContext = useContext(StoreCheckOrderContext);
  // 获取
  const {
    storeCheckOrderContextDispatch,
    reloadOrderFromCache,
    serverRequestReturn,
    storeCheckOrderContextValue
  } = totalOrderInfoContext as IStoreCheckOrderContext;

  // 获取
  const {
    checkOrderDetail,
    currentSubOrderNo,
    isLoading
  } = storeCheckOrderContextValue;
  console.log(checkOrderDetail);
  useEffect(() => {
    // 当没有的时候.从缓存中获取.获取失败应该跳转
    callBackWhenPassAllFunc(
      [() => !checkOrderDetail || !checkOrderDetail.groupOrderNo],
      reloadOrderFromCache
    );
  }, [checkOrderDetail, reloadOrderFromCache]);

  const currentModel = (checkOrderDetail.subOrders || []).find(subOrder => {
    return subOrder.subOrderNo === currentSubOrderNo;
  });

  // 方法
  function selectHandler(key: string) {
    if (key === informationKey) {
      setCurrentPageKey(key);
      storeCheckOrderContextDispatch({
        type: storeCheckOrderReducerTypes.setCurrentSubOrderNo,
        value: ""
      });
    } else {
      setCurrentPageKey("false");
      storeCheckOrderContextDispatch({
        type: storeCheckOrderReducerTypes.setCurrentSubOrderNo,
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
        checkOrderDetail && checkOrderDetail.groupOrderNo ? (
          <UserInfo {...getInfo(checkOrderDetail)} />
        ) : (
          ""
        )
    }
  ];
  // part2
  list = list.concat(
    (checkOrderDetail.subOrders || []).map(order => {
      const {
        subOrderNo,
        subOrderStatusDisplayName,
        subOrderStatus,
        orderStatusHistories,
        productInfo,
        returnShippoLabelCode
      } = order;
      console.log(order);
      /*
TO_BE_SHIPPED(1, "To Be Shipped", "Order Placed"),
TO_BE_RECEIVED(2, "To Be Delivered", "Package Sent"),
TO_BE_COMFIRMED(3, "To Be Confirmed", "Package Delivered"),
TO_BE_RETURNED(4, "To Be Returned", "Return Requested"),
TO_BE_PLATFORM_RECEIVED(5, "To Be Received", "To Be Received"),
RETURN_FAILED(6, "Transaction Succeed", "Return Failed"),
TRANSACTION_FAILED(7, "Transaction Failed", "Transaction Failed"),
TRANSACTION_SUCCEED(8, "Transaction Success", "Transaction Success")
 */
      const reactNodeConfig = statusToRenderConfig(subOrderStatus);
      const needShowName = productInfo.productDisplayName;
      console.log(reactNodeConfig);
      return {
        header: `${needShowName}-${subOrderStatus}`,
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
                orderCreateDate: checkOrderDetail.orderCreateDate,
                subOrderStatus,
                subOrderStatusDisplayName
              })}
            />
            {reactNodeConfig.showDeliverStatus ? (
              <DeliverSatus {...order} />
            ) : null}
            {reactNodeConfig.returnButton ? (
              <Button
                isLoading={isLoading && isLoading.serverRequestReturn}
                className="button-centered"
                onClick={serverRequestReturn}
              >
                Request Return
              </Button>
            ) : null}
            {reactNodeConfig.cancelButton ? (
              <Button
                isLoading={isLoading && isLoading.serverRequestReturn}
                className="button-centered"
                onClick={serverRequestReturn}
              >
                Cancel Order
              </Button>
            ) : null}
            {reactNodeConfig.printLabelbutton ? (
              <div className="return-label-tips">
                <ul>
                  <li>
                    <h3>Step 1 - Prepare to ship </h3>
                    <p>
                      Factory reset the device and make sure that the product
                      and all of its included contents are exactly in the same
                      condition you received it.
                    </p>
                  </li>
                  <li>
                    <h3>Step 2 - Print Label</h3>
                    <p>
                      Use your own box and ship by Tuesday,{" "}
                      {packageDate(checkOrderDetail.autoConfirmDeadLine)} or you
                      will be charged for the full price of the product
                    </p>
                  </li>
                </ul>
                <Button className="button-centered">
                  <RouterLink
                    to={`/api/buy/shippo/downloadlabel?shippolablecode=${returnShippoLabelCode}`}
                  >
                    Print Label
                  </RouterLink>
                </Button>
              </div>
            ) : null}
            {false ? (
              <div className="have-refund">
                <h3>Refund Issued {currencyTrans(123)}</h3>
                <Svg />
              </div>
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
      {checkOrderDetail && checkOrderDetail.groupOrderNo ? (
        <h2>Order Number - {checkOrderDetail.groupOrderNo}</h2>
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
