import React, {useContext, useEffect} from "react";
import "./index.less";
import { IStoreTestNameContext, StoreTestNameContext } from "./context";

export default function Name() {
  const storeTestNameContext = useContext(StoreTestNameContext);
  const {
    storeTestNameContextValue,
    getTestAjaxValue
  } = storeTestNameContext as IStoreTestNameContext;
  useEffect(() => {
    getTestAjaxValue()
  }, [])
  const { testValue } = storeTestNameContextValue;
  return <div className="test-page">{testValue}</div>;
}
