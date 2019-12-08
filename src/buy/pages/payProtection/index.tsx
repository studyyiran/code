import React, { useContext, useEffect } from "react";
import "./index.less";
import { IPayProtectionContext, PayProtectionContext } from "./context";
import { getUrlAllParams } from "../../common/utils/util";
import { payProtectionServer } from "./server";

export default function Name() {
  const payProtectionContext = useContext(PayProtectionContext);
  const {
    payProtectionContextValue,
    tokenToUrl
  } = payProtectionContext as IPayProtectionContext;
  // 获取url参数
  const urlParams = getUrlAllParams();
  const { token, email, order } = getUrlAllParams();

  useEffect(() => {
    if (token) {
      payProtectionServer.tokenToUrl({
        order: "123",
        email: "345"
      });
    }
  }, []);
  const { orderInfo } = payProtectionContextValue;
  return <div className="test-page">{testValue}</div>;
}
