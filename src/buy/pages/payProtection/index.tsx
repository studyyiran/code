import React, { useContext, useEffect, useMemo, useState } from "react";
import "./index.less";
import { getUrlAllParams } from "../../common/utils/util";
import { payProtectionServer } from "./server";
import { PayPaylButton } from "./components/paypalButton";

export default function PayProtectionPage() {
  const [orderInfo, setOrderInfo] = useState({});
  // 获取url参数
  const urlParams = getUrlAllParams();
  console.log(urlParams);
  const { token, email, order } = urlParams || ({} as any);

  function finishPayHandler(id: any) {
    console.log(id);
    // createOrder({
    //   payInfo: {
    //     paymentType: "PAYPAL",
    //     creditCardInfo: {},
    //     paypalOrderId: id
    //   },
    //   invoiceSameAddr: invoiceSameAddr
    // });
  }

  useEffect(() => {
    if (token && email && order) {
      payProtectionServer
        .tokenToUrl({
          groupOrderNo: order,
          userEmail: email
        })
        .then(res => {
          setOrderInfo(res);
        });
    }
  }, [token, order, email]);

  const payInfo = useMemo(() => {
    console.log("orderInfo");
    console.log(orderInfo);
    return {
      payInfo: {},
      amount: 123
    };
  }, [orderInfo]);

  const id = "paypal-button-protection";
  return (
    <div className="test-page">
      <PayPaylButton
        id={id}
        finishPayCallBack={finishPayHandler}
        {...payInfo}
      />
    </div>
  );
}
