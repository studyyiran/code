import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { ProductDetailContext } from "../../../../pages/detail/context";

export function AddCart() {
  const productDetailContext = useContext(ProductDetailContext);
  const { productDetailContextValue } = productDetailContext;
  const { cartList } = productDetailContextValue;
  const [listLength, setListLength] = useState(-1);
  console.log(listLength)
  useEffect(() => {
    // 初始化
    if (cartList && cartList.length) {
      console.log('enter')
      if (listLength === -1) {
        // 初始化
        setListLength(cartList.length);
      } else {
        // 更新
        if (cartList.length > listLength) {
          debugger
          // 弹框
          // 检测到变化后的更新.
          setListLength(cartList.length);
        }
      }
    }
  }, [cartList, listLength]);
  return (
    <span className="cart-icon-container">
      <img src={require("./res/cart_icon.png")} />
      <span>Cart</span>
      {listLength > 0 ? <span className="point">{listLength}</span> : null}
    </span>
  );
}
