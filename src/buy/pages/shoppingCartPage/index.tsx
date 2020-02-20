import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreShoppingCartContext, StoreShoppingCartContext } from "./context";
import {CartShoppingItem} from "./components";

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
  function renderList() {
    return shoppingCartList.list.map(({product, skuReleated}) => {
      return <CartShoppingItem productDetail={product} partsInfo={skuReleated} />
    })
  }
  if (shoppingCartList && shoppingCartList.list && shoppingCartList.list.length) {
    return <div className="test-page">{renderList()}</div>;
  } else {
    return null
  }
  
}
