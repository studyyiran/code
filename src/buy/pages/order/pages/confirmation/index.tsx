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
  const { orderInfoContextValue } = orderInfoContext as IOrderInfoContext;
  const { orderInfo, checkOrderInfo } = orderInfoContextValue;
  const [orderNo, setOrderNo] = useState("");
  const handler = useResetProductList();
  useEffect(() => {
    if (
      props &&
      props.match &&
      props.match.params &&
      props.match.params.orderNo
    ) {
      setOrderNo(props.match.params.orderNo);
    }
  }, [props.match]);
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
          <div className={"button-wrapper"}>
            <button className="common-button continue-shopping">
              Continue shopping
            </button>
          </div>
        </Link>

        <div
          className={"sell-your-order-phone canclick"}
          onClick={() => sellPageGoTo("/sell-phone")}
        >
          Sell your old phone >
        </div>

        <LoginWrapper
          renderNotLogin={({ url, createUrl }: any) => (
            <div>
              <div className={"or"}>OR</div>
              <div className={"button-wrapper create-account"}>
                <button className="common-button">
                  <RouterLink to={createUrl}>Create an account</RouterLink>
                </button>
              </div>
              <PostDataImg />
            </div>
          )}
        />
      </div>
    </div>
  );
}
