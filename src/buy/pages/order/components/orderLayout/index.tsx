import OrderList from "../orderList";
import React, { useContext, useEffect } from "react";
import "./index.less";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import CommonCollapse from "../../../../components/commonCollapse";
import Svg from "../../../../components/svg";
import { routerConfig } from "../../routerConfig";
import {
  currencyTrans,
  getProductListPath,
  isServer,
  scrollTop
} from "../../../../common/utils/util";
import { IOrderInfoContext, OrderInfoContext } from "../../context";
import ChangeUserInput from "../changeUserInput";
import useGetTotalPrice from "./useHook";
import Button from "../../../../components/button";
import ConfirmOrderLayout from "../orderList/confirmPageUse";
import { locationHref } from "../../../../common/utils/routerHistory";

function isConfirmPage(props: any) {
  return props.relativePath === "confirmation";
}

function useRenderChangeUserInputList(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const { orderInfoContextValue } = orderInfoContext as IOrderInfoContext;
  const { pendingStatus } = orderInfoContextValue;
  const currentIndex = routerConfig.findIndex(({ relativePath }) => {
    return String(relativePath) === props.relativePath;
  });
  return routerConfig
    .filter((item, index) => {
      return index < currentIndex;
    })
    .map(({ Component, name, renderDisplayContent }) => {
      return (
        <ChangeUserInput
          key={name}
          tag={name}
          hideChange={props && props.relativePath && isConfirmPage(props)}
          displayContent={renderDisplayContent(orderInfoContextValue)}
          renderInnerContent={(closeModal: any) => {
            return (
              <Component
                renderButton={(handleNext: any) => {
                  return (
                    <Button
                      isLoading={pendingStatus}
                      className="button-centered user-input-submit-button"
                      onClick={() => {
                        // 这块有重复 需要有修改
                        const result = handleNext();
                        if (typeof result === "boolean") {
                          if (result) {
                            closeModal();
                          }
                        } else if (result instanceof Promise) {
                          result.then(() => {
                            closeModal();
                          });
                        }
                      }}
                    >
                      Submit
                    </Button>
                  );
                }}
              />
            );
          }}
        />
      );
    });
}

export default function OrderLayout(props: any) {
  const { calcTotalPrice } = useGetTotalPrice();
  const { path, url } = props.match;
  const renderValue = useRenderChangeUserInputList(props);
  // 这块需要注意一下.hoc进不来.日后解决
  useEffect(() => {
    if (!isServer() && props.title) {
      document.title = props.title;
    }
  }, []);
  const orderInfoContext = useContext(OrderInfoContext);
  const { orderInfoContextValue } = orderInfoContext as IOrderInfoContext;
  const { checkOrderInfo } = orderInfoContextValue;
  useEffect(() => {
    scrollTop();
  }, [url]);
  useEffect(() => {
    // if (!isConfirmPage(props)) {
    //   if (!subOrders || !subOrders.length) {
    //     locationHref(getProductListPath());
    //   }
    // }
  }, []);
  return (
    <div className="order-layout">
      <header>
        <div className="img-container">
          <img src={require("./src/logo.svg")} />
        </div>
        <RenderByCondition
          ComponentMb={null}
          ComponentPc={
            <ul className="step-container">
              {routerConfig.map(({ name, relativePath }, index) => {
                return (
                  <li
                    key={name}
                    data-current={path.indexOf(relativePath) !== -1}
                  >
                    {`${index + 1}.${name}`}
                  </li>
                );
              })}
            </ul>
          }
        />
      </header>
      <RenderByCondition
        ComponentMb={
          <div className="main">
            <CommonCollapse
              renderHeader={(title: string) => {
                return (
                  <div className="mb-collapse-title-container">
                    <span className="mb-collapse-title">
                      {title}
                      <Svg icon="arrow_down" />
                    </span>
                    {!isConfirmPage(props) && Number(calcTotalPrice()) ? (
                      <span>{currencyTrans(calcTotalPrice())}</span>
                    ) : null}
                    {isConfirmPage(props) && checkOrderInfo && checkOrderInfo.total ? (
                      <span>{currencyTrans(checkOrderInfo.total)}</span>
                    ) : null}
                  </div>
                );
              }}
              header="Order summary"
              hideArrow={true}
            >
              {isConfirmPage(props) ? (
                <ConfirmOrderLayout />
              ) : (
                <OrderList {...props} />
              )}
            </CommonCollapse>

            <div className="main-content">
              <div className="mb-input-layout" data-page={props.relativePath}>
                {renderValue}
              </div>
              {props.children}
            </div>
          </div>
        }
        ComponentPc={
          <div className="main">
            <div className="main-content">{props.children}</div>
            {isConfirmPage(props) ? (
              <ConfirmOrderLayout
                {...props}
                renderChangeUserInputList={renderValue}
              />
            ) : (
              <OrderList {...props} renderChangeUserInputList={renderValue} />
            )}
          </div>
        }
      />
    </div>
  );
}
