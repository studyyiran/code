import React, { useContext } from "react";
import {
  IOrderInfoContext,
  OrderInfoContext,
  orderInfoReducerTypes,
  userPhoneOrder
} from "../../context";
import PhoneInfo from "../../../detail/components/phoneInfo";
import "./index.less";
import { currencyTrans } from "../../../../common/utils/util";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import useGetTotalPrice from "../orderLayout/useHook";

export default function ConfirmOrderLayout(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const {
    orderInfoContextValue,
    orderInfoContextDispatch
  } = orderInfoContext as IOrderInfoContext;
  const { checkOrderInfo } = orderInfoContextValue;
  const {
    orderList,
    subTotal,
    protection,
    tax,
    expressFee,
    total
  } = checkOrderInfo;
  if (!orderList || !orderList.length) {
    return null;
  }
  return (
    <div className="order-list-container">
      <RenderByCondition
        ComponentMb={null}
        ComponentPc={<h2 className="order-common-less-title">Order summary</h2>}
      />
      {props.renderChangeUserInputList ? (
        <div className="user-input-container" data-page={props.relativePath}>
          {props.renderChangeUserInputList}
        </div>
      ) : null}

      <div className="content-card">
        <RenderByCondition
          ComponentMb={null}
          ComponentPc={
            <div className="padding-layout title">
              <h3>Your products</h3>
              <span>
                {orderList.length} item
                {orderList.length > 1 ? "s" : ""}
              </span>
            </div>
          }
        />
        <div className="padding-layout">
          {orderList.map(({ productInfo }: any) => {
            if (productInfo) {
              return (
                <PhoneInfo
                  key={productInfo.productId}
                  {...productInfo}
                  subOrderInfo={productInfo}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="padding-layout price-detail">
          <ul>
            <li>
              <label>Subtotal</label>
              <span>{currencyTrans(subTotal)}</span>
            </li>
            {Number(protection) ? (
              <li>
                <label>Protection</label>
                <span>{currencyTrans(protection)}</span>
              </li>
            ) : null}

            {Number(tax) ? (
              <li>
                <label>Sales tax</label>
                <span>{currencyTrans(tax)}</span>
              </li>
            ) : null}

            {Number(expressFee) ? (
              <li>
                <label>Shipping</label>
                <span>{currencyTrans(expressFee)}</span>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="padding-layout total">
          <ul>
            <li>
              <label>Total</label>
              <span>{currencyTrans(total)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
