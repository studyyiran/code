import React, { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import OrderLayout from "./components/orderLayout";
// 业务模块级less
import "./common.less";
import ButtonGroup from "./components/buttonGroup";
import { locationHref } from "../../common/utils/routerHistory";
import { routerConfig } from "./routerConfig";
import { IOrderInfoContext, OrderInfoContext } from "./context";
import { getProductListPath } from "../../common/utils/util";
import { IProductDetailContext, ProductDetailContext } from "../detail/context";
import { soldOutTips } from "../detail/components/soldOutTips";

export default function OrderRouter(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const productDetailContext = useContext(ProductDetailContext);
  const {
    productDetailContextValue
  } = productDetailContext as IProductDetailContext;
  const { productDetail } = productDetailContextValue;
  const {
    orderInfoContextValue,
    getInfoByOrderDetailId,
    getOrderTax,
    getExpress
  } = orderInfoContext as IOrderInfoContext;
  const { subOrders, pendingStatus } = orderInfoContextValue;
  const { path, url } = props.match;

  // [subOrders] ->
  useEffect(() => {
    getInfoByOrderDetailId();
  }, [getInfoByOrderDetailId]);

  // [zipCode, subOrder] ->
  useEffect(() => {
    getOrderTax();
  }, [getOrderTax]);

  // [userInfo, subOrder] ->
  useEffect(() => {
    getExpress();
  }, [getExpress]);

  // 没有suborder 出弹框
  useEffect(() => {
    if (
      props.location &&
      props.location.pathname &&
      props.location.pathname.includes("/buy-checkout/confirmation")
    ) {
      return () => {};
    }
    // 购物车为空.
    if (!subOrders || !subOrders.length) {
      const timerRef = window.setTimeout(() => {
        locationHref(getProductListPath());
      }, 100);
      return () => {
        window.clearInterval(timerRef);
      };
    }
    // 商品已经销售掉了
    if (
      productDetail &&
      productDetail.buyProductStatus &&
      productDetail.buyProductStatus === "INTRANSACTION"
    ) {
      // 弹框
      soldOutTips(productDetail);
    }
    return () => {};
  }, [path, productDetail, props.location, subOrders, url]);

  function handleNext(currentPath: string) {
    const findTarget = routerConfig.findIndex(({ relativePath }) => {
      return relativePath === currentPath;
    });
    if (findTarget !== routerConfig.length - 1) {
      const nextRelativePath = routerConfig[findTarget + 1].relativePath;
      // 触发一个主动的更新.
      getInfoByOrderDetailId();
      getOrderTax();
      getExpress();
      locationHref(`${path}/${nextRelativePath}`);
      return null;
    } else {
      return null;
    }
  }
  function handleBack(currentPath: string) {
    const findTarget = routerConfig.findIndex(({ relativePath }) => {
      return relativePath === currentPath;
    });
    if (findTarget !== 0) {
      const nextRelativePath = routerConfig[findTarget - 1].relativePath;
      locationHref(`${path}/${nextRelativePath}`);
    } else {
      // 搜索找到最后一个skuId,并且跳转
      let targetSkuId;
      if (subOrders && subOrders.length) {
        targetSkuId = subOrders[subOrders.length - 1].productId;
      }
      if (targetSkuId) {
        locationHref(`/detail/${targetSkuId}`);
      } else {
        locationHref("", "back");
      }
    }
  }
  return (
    <div id="order-common-less">
      <Switch>
        {routerConfig.map(
          ({ Component, relativePath, continueButton, backButton, title }) => {
            return (
              <Route
                key={`${path}/${relativePath}`}
                path={`${path}/${relativePath}`}
                render={routerProps => {
                  return (
                    <OrderLayout
                      {...routerProps}
                      relativePath={relativePath}
                      title={title}
                    >
                      <Component
                        {...routerProps}
                        renderButton={(pageNextClick: any) => {
                          return (
                            <ButtonGroup
                              isLoading={pendingStatus}
                              backContent={backButton}
                              handleNext={() => {
                                const result = pageNextClick();
                                if (typeof result === "boolean") {
                                  if (result) {
                                    handleNext(relativePath);
                                  }
                                } else if (result instanceof Promise) {
                                  result.then(() => {
                                    handleNext(relativePath);
                                  });
                                }
                              }}
                              handleBack={() => {
                                handleBack(relativePath);
                              }}
                            >
                              {continueButton}
                            </ButtonGroup>
                          );
                        }}
                      />
                    </OrderLayout>
                  );
                }}
              />
            );
          }
        )}
      </Switch>
    </div>
  );
}
