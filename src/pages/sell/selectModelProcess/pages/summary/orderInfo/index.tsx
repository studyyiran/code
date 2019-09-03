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
    const { productName, bpvIds, inquiryKey, subTotal } = props;
    return (
      <ul key={inquiryKey} className="one-order">
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
    );
  }
  if (resultList && resultList.length) {
    const renderProductList = [...resultList];
    const firstOrderInfo = renderProductList.shift();
    if (renderProductList.length) {
      return (
        <Collapse>
          <Panel key={1} header={<RenderOneProductOrder {...firstOrderInfo} />}>
            {renderProductList.map(orderInfo => (
              <RenderOneProductOrder {...orderInfo} />
            ))}
            <ul>
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
                {priceUnit}
                    {expressOption.fee}
              </span>
                </li>
              ) : null}
              {needInsurance ? (
                <li>
                  <h3>shippingInsurance</h3>
                  <span>
                {priceUnit}
                    {shippingInsurance}
              </span>
                </li>
              ) : null}
            </ul>
            <div>
              <h3>New Payout</h3>
              <span>{}</span>
            </div>
          </Panel>
        </Collapse>
      );
    } else {
      return <RenderOneProductOrder {...firstOrderInfo} />;
    }
  } else {
    return null;
  }
}

// com-order-info
