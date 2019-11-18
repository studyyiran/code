// 这是公用代码
import { OriginDataContextProvider } from "../context/originData";
import { OrderInfoContextProvider } from "../pages/order/context";
import { ProductDetailContextProvider } from "../pages/detail/context";
import { GlobalSettingContextProvider } from "../context";
import { ProductListContextProvider } from "../pages/productList/context";
import React from "react";
import { OurHomeContextProvider } from "../pages/home/context";
import { StoreCheckOrderContextProvider } from "../pages/checkOrder/context";
import { TotalOrderInfoProvider } from "../pages/checkOrder/container/context";
import { StoreAuthContextProvider } from "../common-modules/context/authToken/context";
import {AccountInfoContextProvider} from "../pages/personal/context";

export function RenderWithOriginData(props: any) {
  return (
    // ssr
    <OriginDataContextProvider originData={props.originData}>
      {/*全局鉴权*/}
      <StoreAuthContextProvider>
        {/*全局业务上层*/}
        <GlobalSettingContextProvider>
          {/*用户登录信息*/}
          <AccountInfoContextProvider>
            {/*订单*/}
            <TotalOrderInfoProvider>
              <StoreCheckOrderContextProvider>
                <OurHomeContextProvider>
                  <OrderInfoContextProvider>
                    <ProductDetailContextProvider>
                      <ProductListContextProvider>
                        {props.children}
                      </ProductListContextProvider>
                    </ProductDetailContextProvider>
                  </OrderInfoContextProvider>
                </OurHomeContextProvider>
              </StoreCheckOrderContextProvider>
            </TotalOrderInfoProvider>
          </AccountInfoContextProvider>
        </GlobalSettingContextProvider>
      </StoreAuthContextProvider>
    </OriginDataContextProvider>
  );
}
