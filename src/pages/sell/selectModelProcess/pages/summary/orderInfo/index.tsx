import {
  SelectModelContext,
  ISelectModelContext
} from "../../../../selectModelProcess/context";
import React, { useContext } from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
import "./index.less";

const priceUnit = "$";

export default function OrderInfo() {
  const selectModelContext = useContext(SelectModelContext);
  const { selectModelContextValue } = selectModelContext as ISelectModelContext;
  const { priceInfo, needInsurance, expressOption } = selectModelContextValue;
  const { resultList, guaranteedPayout, shippingInsurance } = priceInfo;

  function RenderOneProductOrder(props: any) {
    const { productName, bpvIds, inquiryKey, subTotal, children } = props;
    return (
      <div className="com-order-info">
        <ul key={inquiryKey}>
          <li>
            <h3>Model</h3>
            <p>{productName + bpvIds[0].name}</p>
          </li>
          <li>
            <h3>Carrier</h3>
            <p>{bpvIds[1].name}</p>
          </li>
          <li>
            <h3>Subtotal</h3>
            <p>
              {priceUnit}
              {subTotal}
            </p>
          </li>
        </ul>
        {children}
      </div>
    );
  }
  if (resultList && resultList.length) {
    const renderProductList = [...resultList];
    const firstOrderInfo = renderProductList.shift();
    return (
      <div className="com-order-info">
        <Collapse>
          <Panel
            showArrow={false}
            key={1}
            header={
              <div className="one-order">
                <RenderOneProductOrder {...firstOrderInfo}>
                  <div className="open">Check Details</div>
                </RenderOneProductOrder>
              </div>
            }
          >
            {renderProductList.map(orderInfo => (
              <RenderOneProductOrder {...orderInfo} />
            ))}
            <ul className="last-order-info">
              <li>
                <h3>guaranteedPayout</h3>
                <span>
                  {priceUnit}
                  {guaranteedPayout}
                </span>
              </li>
              {expressOption ? (
                <li>
                  <h3>expressOption</h3>
                  <span>
                    -{priceUnit}
                    {expressOption.fee}
                  </span>
                </li>
              ) : null}
              {needInsurance ? (
                <li>
                  <h3>shippingInsurance</h3>
                  <span>
                    -{priceUnit}
                    {shippingInsurance}
                  </span>
                </li>
              ) : null}
            </ul>
          </Panel>
        </Collapse>
        <div className="new-payout">
          <h3>New Payout</h3>
          <span>${guaranteedPayout - ((expressOption && expressOption.fee) || 0) - (shippingInsurance || 0) }</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

// com-order-info
