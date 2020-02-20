import React, {useContext} from "react";
import {IOrderInfoContext, OrderInfoContext, orderInfoReducerTypes} from "../../../../../order/context";
import {constProductType} from "../../../../../../common/constValue";
import {locationHref} from "../../../../../../common/utils/routerHistory";
import {IOtherProduct} from "../../index";

export function CheckOutButton(props: {
  buyProductId: string;
  needProtection: boolean;
  otherProductList: IOtherProduct[];
  onClick: any;
  children?: any;
}) {
  const { buyProductId, needProtection, otherProductList, children } = props;
  const orderInfoContext = useContext(OrderInfoContext);
  const { orderInfoContextDispatch } = orderInfoContext as IOrderInfoContext;
  return (
    <button
      className="common-button"
      onClick={() => {
        // 进行other的数据组织
        const otherProductInfo = otherProductList.map(item => {
          return {
            productId: item.productId,
            needProtection: false,
            productType: item.productType as string
          };
        });
        // 1 他会xx
        orderInfoContextDispatch({
          type: orderInfoReducerTypes.addSubOrder,
          value: [
            {
              productId: buyProductId,
              needProtection,
              productType: constProductType.PRODUCT
            }
          ].concat(otherProductInfo)
        });
        if (props.onClick) {
          props.onClick();
        }
        // 2 短暂delay
        window.setTimeout(() => {
          locationHref("/buy-checkout/info");
        }, 100);
      }}
    >
      {children ? children : "Checkout"}
    </button>
  );
}