import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { AccountInfoContext, IAccountInfoContext } from "../../../../context";
import * as moment from "moment-timezone";
import RouterLink from "../../../../../../common-modules/components/routerLink";
import { InnerDivImage } from "../../../../../detail/components/innerDivImage";
import Svg from "../../../../../../components/svg";
import Button from "../../../../../../components/button";

export function UserOrderList(props: any) {
  const { userInfo } = props;
  const accountInfoContext = useContext(AccountInfoContext);
  const {
    accountInfoContextValue,
    getUserOrderList
  } = accountInfoContext as IAccountInfoContext;
  const { userOrderList } = accountInfoContextValue;
  const [currentShowLength, setCurrentShowLength] = useState(1);
  useEffect(() => {
    // 首次渲染可能会没有token
    window.setTimeout(() => {
      getUserOrderList();
    }, 100);
  }, []);

  function keyToView(key: string) {
    /*
    TO_BE_SHIPPED(1, "Order Placed"),
    TO_BE_RECEIVED(2, "Package Sent"),
    TO_BE_INSPECTED(3, "Package Received"),
    DIFFERENCE_INSPECTED(4, "Difference Inspected"),
    TO_BE_RETURNED(5, "Return Requested"),
    TRANSACTION_FAILED(6, "Transaction Failed"),
    LISTED_FOR_SALE(7, "Listed for Sale"),
    TRANSACTION_SUCCEED(8, "Device Sold"),
    TO_BE_LISTED(9, "Inspection Completed"),
     */
    const arr = [
      {
        backendKeyA: "TO_BE_INSPECTED",
        backendKeyB: "Package Received",
        frontendKey: "Package Received"
      },
      {
        backendKeyA: "DIFFERENCE_INSPECTED",
        backendKeyB: "Difference Inspected",
        frontendKey: "Difference Inspected"
      },
      {
        backendKeyA: "LISTED_FOR_SALE",
        backendKeyB: "Listed For Sale",
        frontendKey: "Listed For Sale"
      },
      {
        backendKeyA: "TO_BE_LISTED",
        backendKeyB: "Inspection Completed",
        frontendKey: "Inspection Completed"
      },
      {
        backendKeyA: "TO_BE_SHIPPED",
        backendKeyB: "To Be Shipped",
        frontendKey: "Order Placed"
      },
      {
        backendKeyA: "TO_BE_RECEIVED",
        backendKeyB: "To Be Delivered",
        frontendKey: "Package Sent"
      },
      {
        backendKeyA: "TO_BE_COMFIRMED",
        backendKeyB: "To Be Confirmed",
        frontendKey: "Package Delivered"
      },
      {
        backendKeyA: "TO_BE_RETURNED",
        backendKeyB: "To Be Returned",
        frontendKey: "Return Requested"
      },
      {
        backendKeyA: "TO_BE_PLATFORM_RECEIVED",
        backendKeyB: "To Be Received",
        frontendKey: "To Be Received"
      },
      {
        backendKeyA: "RETURN_FAILED",
        backendKeyB: "Transaction Succeed",
        frontendKey: "Return Failed"
      },
      {
        backendKeyA: "TRANSACTION_FAILED",
        backendKeyB: "Transaction Failed",
        frontendKey: "Transaction Failed"
      },
      {
        backendKeyA: "TRANSACTION_SUCCEED",
        backendKeyB: "Transaction Success",
        frontendKey: "Transaction Success"
      }
    ];
    const findTarget = arr.find(item => item.backendKeyA === key);
    return findTarget ? findTarget.frontendKey : key;
  }

  function renderList() {
    if (userOrderList && userOrderList.length) {
      let arr = userOrderList.map(item => {
        const { groupOrderNo, createdDt, suborderList, userEmail } = item;
        console.log(moment.tz(createdDt, "America/Chicago").format("LL"));
        return (
          <div className="user-order-item">
            <header>
              <span className="ordername">Order # {groupOrderNo}</span>
              <span className="date">
                {moment.tz(createdDt, "America/Chicago").format("LL")}
              </span>
            </header>
            <ul className="sub-order-list">
              {suborderList &&
                suborderList.length &&
                suborderList.map(orderInfo => {
                  const { img, productName, status } = orderInfo;
                  return (
                    <li className="sub-order-item">
                      <InnerDivImage imgUrl={img} />
                      <div className="content-container">
                        <h3>{productName}</h3>
                        <h3>{keyToView(status)}</h3>
                      </div>
                    </li>
                  );
                })}
            </ul>
            <div className="link-container">
              <RouterLink
                to={`/check-order?orderId=${groupOrderNo}&email=${userEmail}`}
              >
                Check order details
                <Svg icon={"arrow-right"} />
              </RouterLink>
            </div>
          </div>
        );
      });
      // 如果还有更多的内容
      if (userOrderList.length > currentShowLength) {
        arr = arr.slice(0, currentShowLength);
        arr = arr.concat([
          <div key="more" className="load-more-container">
            <span
              className="load-more"
              onClick={() => {
                setCurrentShowLength(length => length + 10);
              }}
            >
              Load More
            </span>
          </div>
        ]);
      }
      return arr;
    } else if (userOrderList) {
      return (
        <div className="empty">
          <h2>No order</h2>
          <Button>
            <RouterLink to={"/buy-phone"}>Buy a device</RouterLink>
          </Button>
          <Button>
            <RouterLink to={"/sell-phone"}>Sell a device</RouterLink>
          </Button>
        </div>
      );
    } else {
      return null;
    }
  }
  return <div className="user-order-list">{renderList()}</div>;
}
