import React, { useContext } from "react";
import "./index.less";
import { IStoreTestNameContext, StoreTestNameContext } from "./context";

export default function Name() {
  const storeTestNameContext = useContext(StoreTestNameContext);
  const {
    storeTestNameContextValue
  } = storeTestNameContext as IStoreTestNameContext;
  const { testValue } = storeTestNameContextValue;
  return <div className="test-page">{testValue}</div>;
}
