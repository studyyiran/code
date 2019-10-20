// 这是公用代码
import {OriginDataContextProvider} from "../context/originData";
import {OrderInfoContextProvider} from "../pages/order/context";
import {ProductDetailContextProvider} from "../pages/detail/context";
import {GlobalSettingContextProvider} from "../context";
import {ProductListContextProvider} from "../pages/productList/context";
import React from "react";

export function RenderWithOriginData(props: any) {
  return (
    <OriginDataContextProvider originData={props.originData}>
      <OrderInfoContextProvider>
        <ProductDetailContextProvider>
          <GlobalSettingContextProvider>
            <ProductListContextProvider>
              {props.children}
            </ProductListContextProvider>
          </GlobalSettingContextProvider>
        </ProductDetailContextProvider>
      </OrderInfoContextProvider>
    </OriginDataContextProvider>
  );
}