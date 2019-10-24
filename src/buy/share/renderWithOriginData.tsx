// 这是公用代码
import { OriginDataContextProvider } from "../context/originData";
import { OrderInfoContextProvider } from "../pages/order/context";
import { ProductDetailContextProvider } from "../pages/detail/context";
import { GlobalSettingContextProvider } from "../context";
import { ProductListContextProvider } from "../pages/productList/context";
import React from "react";
import { OurHomeContextProvider } from "../pages/home/context";

export function RenderWithOriginData(props: any) {
  return (
    <OriginDataContextProvider originData={props.originData}>
      <GlobalSettingContextProvider>
        <OurHomeContextProvider>
          <OrderInfoContextProvider>
            <ProductDetailContextProvider>
              <ProductListContextProvider>
                {props.children}
              </ProductListContextProvider>
            </ProductDetailContextProvider>
          </OrderInfoContextProvider>
        </OurHomeContextProvider>
      </GlobalSettingContextProvider>
    </OriginDataContextProvider>
  );
}
