import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreTestNameContext, StoreTestNameContext } from "./context";

export function TestName() {
  // 引入context
  const storeTestNameContext = useContext(StoreTestNameContext);
  const {
    storeTestNameContextValue,
    getTestAjaxValue
  } = storeTestNameContext as IStoreTestNameContext;
  // 从context中获取值
  const { testValue } = storeTestNameContextValue;
  // local发起请求
  useEffect(() => {
    getTestAjaxValue();
  }, [getTestAjaxValue]);
  // 渲染
  return <div className="test-page">{testValue}</div>;
}
