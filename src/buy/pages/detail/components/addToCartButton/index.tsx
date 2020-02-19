import React, { useContext, useEffect } from "react";
import "./index.less";
import { ProductDetailContext } from "../../context";
import { safeEqual } from "../../../../common/utils/util";
import Svg from "../../../../components/svg";
import {GlobalSettingContext, IGlobalSettingContext} from "../../../../context";

interface IProps {}

export function AddToCartButton(props: IProps) {
  const globalSettingContext = useContext(GlobalSettingContext);
  const {
    globalSettingContextValue
  } = globalSettingContext as IGlobalSettingContext;
  const { isMobile } = globalSettingContextValue;
  
  
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
      <div className="long-button add-to-cart-out-button added">
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
          if (!isMobile) {
            window.scrollTo(0, 0);
          }
        }}
        className="long-button add-to-cart-out-button"
      >
        Add to cart
      </div>
    );
  }

  // 渲染
}
