import React from "react";
import { getUrlAllParams } from "../../common/utils/util";
import { payProtectionServer } from "./server";
import { locationHref } from "../../common/utils/routerHistory";
import { Message } from "../../components/message";
import { PayPaylButton } from "./components/paypalButton";
import { ProtectionPage } from "./components/protection";

export function PaySubscribePage() {
  const urlParams = getUrlAllParams();
  console.log(urlParams);
  const { planid: planId, token } = urlParams || ({} as any);

  // 支付成功回调
  function finishPayHandler(data: any) {
    const { orderID, subscriptionID } = data;
    payProtectionServer
      .orderPaySubscribe({
        paypalOrderId: orderID,
        subscribeId: subscriptionID,
        token,
        planId
      })
      .then(() => {
        Message.success("Succeed to pay for the protection.");
        locationHref("/");
      });
  }

  const paypalDomId = "paypal-button-protection";
  return (
    <ProtectionPage
      render={(payInfo: any) => {
        return (
          <PayPaylButton
            id={paypalDomId}
            finishPayCallBack={finishPayHandler}
            {...payInfo}
            planId={planId}
          />
        );
      }}
    />
  );
}

export function PayProtectionPage() {
  // 获取url参数
  const urlParams = getUrlAllParams();
  const { token } = urlParams || ({} as any);

  // 支付成功回调
  function finishPayHandler(id: any) {
    console.log(id);
    payProtectionServer
      .orderPayProtection({
        paypalOrderId: id,
        token
      })
      .then(() => {
        Message.success("Succeed to pay for the monthly protection.");
        locationHref("/");
      });
  }

  const paypalDomId = "paypal-button-protection";
  return (
    <ProtectionPage
      render={(payInfo: any) => {
        return (
          <PayPaylButton
            id={paypalDomId}
            finishPayCallBack={finishPayHandler}
            {...payInfo}
          />
        );
      }}
    />
  );
}
