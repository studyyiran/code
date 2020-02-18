import React, { useContext, useEffect } from "react";
import "./index.less";
import { ProductDetailContext } from "../../context";
import { safeEqual } from "../../../../common/utils/util";
import Svg from "../../../../components/svg";

interface IProps {}

export function AddToCartButton(props: IProps) {
  // 引入context
  const productDetailContext = useContext(ProductDetailContext);
  const {
    productDetailContextValue,
    productDetailContextDispatch,
    addIntoCartList
  } = productDetailContext;
  // 从context中获取值
  let haveAdd = false;
  let buyProductCode = ""
  const { cartList, productDetailByCode } = productDetailContextValue;
  if (productDetailByCode) {
    const { detail } = productDetailByCode;
    if (detail) {
      buyProductCode = detail.buyProductCode;
      haveAdd = Boolean(cartList.find(item => safeEqual(item, buyProductCode)));
    }
  }
  if (haveAdd) {
    return (
      <div className="long-button add-to-cart-button added">
        <div className='reset-css'>
          <Svg />
          <span>Added</span>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => {
          addIntoCartList(buyProductCode);
        }}
        className="long-button add-to-cart-button"
      >
        Add to cart
      </div>
    );
  }

  // 渲染
}
