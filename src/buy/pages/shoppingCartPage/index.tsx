import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreShoppingCartContext, StoreShoppingCartContext } from "./context";

export function ShoppingCartPage() {
  // 引入context
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const {
    storeShoppingCartContextValue,
    getShoppingCart
  } = storeShoppingCartContext as IStoreShoppingCartContext;
  // 从context中获取值
  const { shoppingCartList } = storeShoppingCartContextValue;
  // local发起请求
  useEffect(() => {
    getShoppingCart();
  }, [getShoppingCart]);
  // 渲染
  console.log(shoppingCartList)
  return <div className="test-page">{123444}</div>;
}
