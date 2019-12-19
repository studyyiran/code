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
import {
  IStoreCheckOrderContext,
  StoreCheckOrderContext,
  storeCheckOrderReducerTypes
} from "../context";
import Button from "../../../components/button";
import RouterLink from "../../../common-modules/components/routerLink";
import Svg from "../../../components/svg";
import {
  callBackWhenPassAllFunc,
  currencyTrans,
  getLocationUrl,
  safeEqual
} from "../../../common/utils/util";
import { getRootApi } from "../../../api/api";
import { locationHref } from "../../../common/utils/routerHistory";
import Modal from "../../../components/modal";
import PhoneInfo from "../../detail/components/phoneInfo";
import { constProductType } from "../../../common/constValue";
import { nameToContent } from "../../order/util";
import { Checkbox } from "antd";
import { PartsProductCard } from "../../detail/components/partsProductCard";
import OrderPartsInfo from "../components/orderPartsInfo/machineInfo";

export function OrderList(props: any) {
  const informationKey = "informaion";
  const [currentPageKey, setCurrentPageKey] = useState("");
  const [returnModal, setReturnModal] = useState(false);
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

  function serverRequestReturnHandler() {
    setReturnModal(true);
  }

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

  // 这块应该剥离
  function WithInput(props: {
    checked: boolean;
    onChange: () => any;
    children: any;
  }) {
    const { checked, onChange, children } = props;
    return (
      <div className="with-input-container">
        <Checkbox checked={checked} onChange={onChange}>
          {children}
        </Checkbox>
      </div>
    );
  }

  function ReturnModal() {
    const [productList, setProductList] = useState([] as any[]);
    function onChangeHandler(value?: any, e?: any) {
      const checked = e.target.checked;
      if (value) {
        // 如果新增
        setProductList(list => {
          if (checked) {
            return list.concat([value as any]);
          } else {
            return list.filter(item => {
              return !safeEqual(item, value);
            });
          }
        });
      } else {
      }
    }
    const list = (checkOrderDetail.subOrders || []).map(order => {
      function isChecked() {
        return productList.some(item => safeEqual(item, subOrderNo));
      }
      const { subOrderNo, productInfo, productType } = order;
      if (productType === constProductType.PRODUCT) {
        // 手机商品
        if (productList && !productList.length) {
          setProductList([subOrderNo]);
        }
        // 传递subOrderNo为了可以绑定点击id,不传递是因为需求不允许变更
        return (
          <WithInput
            checked={isChecked()}
            onChange={onChangeHandler.bind({}, "")}
          >
            <PhoneInfo {...productInfo} />
          </WithInput>
        );
      } else if (productType && productInfo) {
        return (
          <WithInput
            checked={isChecked()}
            onChange={onChangeHandler.bind({}, subOrderNo)}
          >
            <PartsProductCard productInfo={productInfo} />
          </WithInput>
        );
      } else {
        return null;
      }
    });

    return (
      <Modal
        className="check-order-return-modal"
        visible={returnModal}
        width={"90%"}
        title={null}
        footer={null}
        onCancel={() => {
          setReturnModal(false);
        }}
        maskClosable={false}
      >
        <div className="custom-content">
          <h2>Please select the items you would like to return</h2>
          {list}
          <Button
            className="button-centered common-button"
            isLoading={isLoading && isLoading.serverRequestReturn}
            onClick={() => {
              serverRequestReturn(productList).then(() => {
                setReturnModal(false);
              });
            }}
          >
            Submit
          </Button>
        </div>
      </Modal>
    );
  }

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
  let needCancelButton = false;
  // 当且仅当 全部为状态时 才显示单一按钮
  let needReturnButton = checkOrderDetail.subOrders && (checkOrderDetail.subOrders || []).every(order => {
    return order && order.subOrderStatus && order.subOrderStatus === "TO_BE_COMFIRMED";
  });
  // 先去检查状态  只要有,就显示按钮
  let printLabelInfo = (checkOrderDetail.subOrders || []).find(order => {
    return order && order.subOrderStatus && (order.subOrderStatus === "TO_BE_RETURNED" || order.subOrderStatus === "TO_BE_PLATFORM_RECEIVED");
  });
  let printLabelCode = printLabelInfo
    ? printLabelInfo.returnShippoLabelCode
    : "";
  // part2
  list = list.concat(
    (checkOrderDetail.subOrders || []).map(order => {
      const {
        subOrderNo,
        subOrderStatusDisplayName,
        productInfo,
        returnShippoLabelCode,
        refund,
        productType
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
      // subOrderStatus = "TO_BE_COMFIRMED";
      const reactNodeConfig = statusToRenderConfig(subOrderStatus);
      if (reactNodeConfig.cancelButton) {
        needCancelButton = true;
      }

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
        header: `${needShowName} - ${displayStatus}`,
        key: subOrderNo,
        children: (
          <div>
            {productType === constProductType.PRODUCT ? (
              <MachineInfo
                key={subOrderNo}
                guaranteedPrice={order.subTotal}
                productInfo={productInfo}
                {...order}
              />
            ) : (
              <OrderPartsInfo
                key={subOrderNo}
                guaranteedPrice={order.subTotal}
                productInfo={productInfo}
                {...order}
              />
            )}

            <ProgressBar data={progressInfo} />
            {reactNodeConfig.showDeliverStatus ? (
              <DeliverSatus {...order} />
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
              </div>
            ) : null}
            {refund && subOrderStatus !== "TRANSACTION_FAILED" ? (
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
      {needCancelButton ? (
        <Button
          isLoading={isLoading && isLoading.serverCancelOrder}
          className="button-centered disabled-status button-container button-with-hover"
          onClick={serverCancelOrder}
        >
          Cancel Order
        </Button>
      ) : null}
      {needReturnButton ? (
        <Button
          className="button-centered disabled-status button-container button-with-hover"
          onClick={serverRequestReturnHandler}
        >
          Request Return
        </Button>
      ) : null}
      {printLabelCode ? (
        <Button className="button-centered button-container">
          <RouterLink
            target="_blank"
            to={getRootApi(
              `/api/buy/shippo/downloadlabel?shippolablecode=${printLabelCode}`
            )}
          >
            Print Label
          </RouterLink>
        </Button>
      ) : null}
      {ReturnModal()}
    </div>
  );
  // 渲染
}
