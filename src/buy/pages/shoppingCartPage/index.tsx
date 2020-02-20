import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreShoppingCartContext, StoreShoppingCartContext } from "./context";
import { CartShoppingItem } from "./components/cartShoppingItem";

export function ShoppingCartPage() {
  // 引入context
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const {
    storeShoppingCartContextValue,
    getShoppingCart,
    addCompareList
  } = storeShoppingCartContext as IStoreShoppingCartContext;
  // 从context中获取值
  const { shoppingCartList, compareList } = storeShoppingCartContextValue;
  // local发起请求
  useEffect(() => {
    getShoppingCart();
  }, [getShoppingCart]);
  console.log(shoppingCartList);
 
  // 渲染
  function renderList() {
    return shoppingCartList.list.map(({skuReleated, product}) => {
      return <CartShoppingItem partsInfo={skuReleated} productDetail={product} compareList={compareList} />
    });
  }
  if (
    shoppingCartList &&
    shoppingCartList.list &&
    shoppingCartList.list.length
  ) {
    return (
      <div className="shopping-cart-page">
        <div className="title-container">
          <h1>Shopping Cart</h1>
        </div>
        <div className="content">
          <div className="button-container">
            <button>Compare ({compareList.length}) </button>
          </div>
          <div className="list-container">{renderList()}</div>
        </div>
        
      </div>
    );
  } else {
    return null;
  }
}

