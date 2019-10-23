import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import OrderLayout from "./components/orderLayout";
// 业务模块级less
import "./common.less";
import ButtonGroup from "./components/buttonGroup";
import { locationHref } from "../../common/utils/routerHistory";
import { routerConfig } from "./routerConfig";
import { IOrderInfoContext, OrderInfoContext } from "./context";
import hocDocumentTitle from "../../components/documentTitle";

export default function OrderRouter(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const { orderInfoContextValue } = orderInfoContext as IOrderInfoContext;
  const { subOrders, pendingStatus } = orderInfoContextValue;
  const { path, url } = props.match;
  function handleNext(currentPath: string) {
    const findTarget = routerConfig.findIndex(({ relativePath }) => {
      return relativePath === currentPath;
    });
    if (findTarget !== routerConfig.length - 1) {
      const nextRelativePath = routerConfig[findTarget + 1].relativePath;
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
