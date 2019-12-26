import React, { useState } from "react";

interface IAddToCard {
  cartChangeCallBack: (haveAddIntoCart: boolean) => any;
  value?: boolean;
}
/*
添加到购物车功能键
 */
export function AddToCart(props: IAddToCard) {
  const { cartChangeCallBack, value } = props;
  const [haveAdd, setHaveAdd] = useState(false);

  function getState() {
    if (value !== undefined) {
      return value;
    } else {
      return haveAdd;
    }
  }

  function cartChangeHandler() {
    const next = !getState();
    (document as any).querySelector(".cart-modal").scroll(0, 1000);
    cartChangeCallBack(next);
    setHaveAdd(next);
  }
  return (
    <div
      className="add-to-cart-button"
      data-status={getState()}
      onClick={cartChangeHandler}
    >
      {getState() ? <span>Remove</span> : <span>Add to cart</span>}
    </div>
  );
}
