import * as React from "react";
import "./index.less";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import RouterLink from "../../../../common-modules/components/routerLink";
import { IOrderInfoContext, OrderInfoContext } from "../../context";
import {
  getProductListPath,
  sellPageGoTo
} from "../../../../common/utils/util";
import useResetProductList from "../../../productList/useHook/useResetProductList";
import { LoginWrapper } from "../../../../common-modules/components/loginButton";

export default function Confirmation(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const { orderInfoContextValue, orderIdToCheckOrderInfo } = orderInfoContext as IOrderInfoContext;
  const { orderInfo, checkOrderInfo } = orderInfoContextValue;
  const handler = useResetProductList();
  
  // 根据order进行信息拉取
  useEffect(() => {
    orderIdToCheckOrderInfo();
  }, [orderIdToCheckOrderInfo]);
  function PostDataImg() {
    if (checkOrderInfo) {
      const { groupOrderNo, total } = checkOrderInfo as any;
      if (groupOrderNo) {
        return (
          <img
            src={`https://www.shareasale.com/sale.cfm?tracking=${groupOrderNo}&amount=${total}&merchantID=92948&transtype=sale&sscidmode=6&sscid=`}
            width="1"
            height="1"
          />
        );
      }
    }
    return null;
  }
  return (
    <div className={"order-confirmation-wrapper"}>
      <div className={"confirmation-wrapper"}>
        <div className="order-common-less-title">Thank you for your order!</div>
        <div className={"order-no"}>Your Order # {orderInfo}</div>
        <div className={"desc"}>
          We will send you an email confirmation to your email. Please let us
          know if you have any questions.
        </div>
        <Link
          to={getProductListPath()}
          onClick={() => {
            // 临时刷新列表页代码
            handler();
          }}
        >
          <button className="common-button continue-shopping">
            Continue shopping
          </button>
        </Link>
        <LoginWrapper
          renderNotLogin={({ url, createUrl }: any) => (
            <RouterLink className={"sell-your-order-phone"} to={createUrl}>
              Create an account >
            </RouterLink>
          )}
        />
        <div className={"or"}>OR</div>
        <button
          onClick={() => sellPageGoTo("/sell-phone")}
          className="common-button"
        >
          Sell your old phone
        </button>
      </div>
      <PostDataImg />
    </div>
  );
}
