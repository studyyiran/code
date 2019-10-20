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

export default function OrderList(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const {
    orderInfoContextValue,
    orderInfoContextDispatch
  } = orderInfoContext as IOrderInfoContext;
  const { subOrders, phoneDetailList, taxInfo } = orderInfoContextValue;
  const {
    totalProductPrice,
    totalProtections,
    calcTotalPrice,
    getShippingPrice
  } = useGetTotalPrice();
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
                {phoneDetailList.length} item
                {phoneDetailList.length > 1 ? "s" : ""}
              </span>
            </div>
          }
        />
        <div className="padding-layout">
          {phoneDetailList.map(item => {
            const subOrderInfo: any = subOrders.find(item => {
              return String(item.productId) === String(item.productId);
            });
            return (
              <PhoneInfo
                key={subOrderInfo.productId}
                needProtection={subOrderInfo.needProtection}
                {...item}
                subOrderInfo={subOrderInfo}
                setNeedProtection={(value: boolean) => {
                  orderInfoContextDispatch({
                    type: orderInfoReducerTypes.setSubOrders,
                    value: (item: userPhoneOrder) => {
                      if (String(item.productId) === String(item.productId)) {
                        return {
                          productId: item.productId,
                          needProtection: value
                        };
                      } else {
                        return item;
                      }
                    }
                  });
                }}
              />
            );
          })}
        </div>
        <div className="padding-layout price-detail">
          <ul>
            <li>
              <label>Subtotal</label>
              <span>{currencyTrans(totalProductPrice())}</span>
            </li>
            {Number(totalProtections()) ? (
              <li>
                <label>Protection</label>
                <span>{currencyTrans(totalProtections())}</span>
              </li>
            ) : null}

            {taxInfo.totalTax ? (
              <li>
                <label>Sales tax</label>
                <span>{currencyTrans(taxInfo.totalTax)}</span>
              </li>
            ) : null}

            {Number(getShippingPrice()) ? (
              <li>
                <label>Shipping</label>
                <span>{currencyTrans(getShippingPrice())}</span>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="padding-layout total">
          <ul>
            <li>
              <label>Total</label>
              <span>{currencyTrans(calcTotalPrice())}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
