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
import { getRootApi } from "../../../api/api";
import { locationHref } from "../../../common/utils/routerHistory";

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
    storeCheckOrderContextValue,
    serverCancelOrder
  } = totalOrderInfoContext as IStoreCheckOrderContext;

  // 获取
  const {
    checkOrderDetail,
    currentSubOrderNo,
    isLoading
  } = storeCheckOrderContextValue;
  useEffect(() => {
    // 当没有的时候.从缓存中获取.获取失败应该跳转
    callBackWhenPassAllFunc(
      [() => !checkOrderDetail || !checkOrderDetail.groupOrderNo],
      () => {
        reloadOrderFromCache().catch(() => {
          locationHref("/check-order");
        });
      }
    );
  }, [checkOrderDetail, reloadOrderFromCache]);

  useEffect(() => {
    if (
      checkOrderDetail &&
      checkOrderDetail.subOrders &&
      checkOrderDetail.subOrders[0] &&
      checkOrderDetail.subOrders[0].subOrderNo
    ) {
      storeCheckOrderContextDispatch({
        type: storeCheckOrderReducerTypes.setCurrentSubOrderNo,
        value: checkOrderDetail.subOrders[0].subOrderNo
      });
    }
  }, [checkOrderDetail]);

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
        productInfo,
        returnShippoLabelCode,
        refund
      } = order;
      let subOrderStatus = order.subOrderStatus;
      let orderStatusHistories = order.orderStatusHistories;
      const NUMBER9_RETURN_COMPLETE = "NUMBER9_RETURN_COMPLETE";

      // TODO 已经习惯的1
      const deleteStatus1 = "TRANSACTION_SUCCEED";
      // if (subOrderStatus === deleteStatus1) {
      //   subOrderStatus = "TRANSACTION_SUCCEED";
      // }
      const findDeleteStatus1 = orderStatusHistories.findIndex(
        (item: any) => item.orderStatus === deleteStatus1
      );
      if (findDeleteStatus1 !== -1) {
        orderStatusHistories = [
          ...order.orderStatusHistories.slice(0, findDeleteStatus1 - 1),
          ...order.orderStatusHistories.slice(findDeleteStatus1)
        ];
      }

      // TODO 已经习惯的2
      const deleteStatus = "TO_BE_PLATFORM_RECEIVED";
      if (subOrderStatus === deleteStatus) {
        subOrderStatus = "TO_BE_RETURNED";
      }
      const findDeleteStatus = orderStatusHistories.findIndex(
        (item: any) => item.orderStatus === deleteStatus
      );
      if (findDeleteStatus !== -1) {
        orderStatusHistories = [
          ...order.orderStatusHistories.slice(0, findDeleteStatus),
          ...order.orderStatusHistories.slice(findDeleteStatus + 1)
        ];
      }
      // TODO 超级恶心3
      if (subOrderStatus === "TRANSACTION_FAILED") {
        // 如果状态7并且xxx
        if (returnShippoLabelCode) {
          subOrderStatus = NUMBER9_RETURN_COMPLETE;
        }
      }
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
      const progressInfo = getProgressType({
        orderStatusHistories: orderStatusHistories,
        orderCreateDate: checkOrderDetail.orderCreateDate,
        subOrderStatus,
        subOrderStatusDisplayName
      });
      let displayStatus = "";
      if (progressInfo && orderStatusHistories && orderStatusHistories.length) {
        displayStatus = progressInfo.dataList[progressInfo.currentIndex]
          ? progressInfo.dataList[progressInfo.currentIndex].name
          : "";
      }

      return {
        header: `${needShowName}-${displayStatus}`,
        key: subOrderNo,
        children: (
          <div>
            <MachineInfo
              key={subOrderNo}
              guaranteedPrice={order.subTotal}
              productInfo={productInfo}
              {...order}
            />
            <ProgressBar data={progressInfo} />
            {reactNodeConfig.showDeliverStatus ? (
              <DeliverSatus {...order} />
            ) : null}
            {reactNodeConfig.returnButton ? (
              <Button
                isLoading={isLoading && isLoading.serverRequestReturn}
                className="button-centered disabled-status"
                onClick={serverRequestReturn}
              >
                Request Return
              </Button>
            ) : null}
            {reactNodeConfig.cancelButton ? (
              <Button
                isLoading={isLoading && isLoading.serverRequestReturn}
                className="button-centered disabled-status"
                onClick={serverCancelOrder}
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
                    target="_blank"
                    to={getRootApi(
                      `/api/buy/shippo/downloadlabel?shippolablecode=${returnShippoLabelCode}`
                    )}
                  >
                    Print Label
                  </RouterLink>
                </Button>
              </div>
            ) : null}
            {refund ? (
              <div className="have-refund">
                <h3>Refund Issued {currencyTrans(refund)}</h3>
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
