import {
  SelectModelContext,
  ISelectModelContext
} from "../../../../selectModelProcess/context";
import React, { useContext, useState } from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
import "./index.less";
import Svg from "components/svg";
import { isServer } from "../../../../../../utils/util";

const priceUnit = "$";

export default function OrderInfo() {
  const [open, setOpen] = useState(0);
  const selectModelContext = useContext(SelectModelContext);
  const { selectModelContextValue } = selectModelContext as ISelectModelContext;
  const { priceInfo, needInsurance, expressOption } = selectModelContextValue;
  const { resultList, guaranteedPayout, shippingInsurance } = priceInfo;
  // 数据上报
  if (!isServer()) {
    (window as any).netPayout =
      guaranteedPayout -
      ((expressOption && expressOption.fee) || 0) -
      ((needInsurance && shippingInsurance) || 0);
  }
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
        <Collapse activeKey={open}>
          <Panel
            showArrow={false}
            key={1}
            header={
              <div className="one-order">
                <RenderOneProductOrder {...firstOrderInfo} />
              </div>
            }
          >
            {renderProductList.map(orderInfo => (
              <RenderOneProductOrder {...orderInfo} />
            ))}
            <ul className="last-order-info">
              <li>
                <h3>Guaranteed Payout</h3>
                <span>
                  {priceUnit}
                  {guaranteedPayout}
                </span>
              </li>
              {expressOption ? (
                <li>
                  <h3>Slow Shipping</h3>
                  <span className="unit-space">
                    -{priceUnit}
                    {expressOption.fee}
                  </span>
                </li>
              ) : null}
              {needInsurance ? (
                <li>
                  <h3>Shipping Insurance</h3>
                  <span className="unit-space">
                    -{priceUnit}
                    {shippingInsurance}
                  </span>
                </li>
              ) : null}
            </ul>
          </Panel>
        </Collapse>
        <ul className="new-payout">
          <li>
            <h3>Net Payout</h3>
            <span>
              $
              {guaranteedPayout -
                ((expressOption && expressOption.fee) || 0) -
                ((needInsurance && shippingInsurance) || 0)}
            </span>
          </li>
        </ul>
        <div
          data-open={open ? "true" : "false"}
          className="open"
          onClick={() => {
            setOpen((current: any) => {
              if (current) {
                return 0;
              } else {
                return 1;
              }
            });
          }}
        >
          <Svg icon={"arrow_down"} />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

// com-order-info
