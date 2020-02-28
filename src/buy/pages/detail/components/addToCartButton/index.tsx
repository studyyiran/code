import React, { useContext, useEffect } from "react";
import "./index.less";
import { ProductDetailContext } from "../../context";
import { safeEqual } from "../../../../common/utils/util";
import Svg from "../../../../components/svg";
import {
  GlobalSettingContext,
  IGlobalSettingContext
} from "../../../../context";
import { StoreShoppingCartContext } from "../../../shoppingCartPage/context";
import Button from "../../../../components/button";

interface IProps {
  onClickCallBack: any;
}

export function AddToCartButton(props: IProps) {
  const globalSettingContext = useContext(GlobalSettingContext);
  const {
    globalSettingContextValue
  } = globalSettingContext as IGlobalSettingContext;
  const { isMobile } = globalSettingContextValue;

  // 引入context
  const productDetailContext = useContext(ProductDetailContext);
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const {
    storeShoppingCartContextValue,
    addIntoCartList
  } = storeShoppingCartContext;
  const { shoppingCartList, isLoading } = storeShoppingCartContextValue;
  const {
    productDetailContextValue,
    productDetailContextDispatch
  } = productDetailContext;
  // 从context中获取值
  let haveAdd = false;
  let buyProductCode = "";
  const { productDetailByCode } = productDetailContextValue;
  if (productDetailByCode) {
    const { detail } = productDetailByCode;
    if (detail) {
      buyProductCode = detail.buyProductCode;
      haveAdd = Boolean(
        shoppingCartList &&
          shoppingCartList.list &&
          shoppingCartList.list.length &&
          shoppingCartList.list.find(item =>
            safeEqual(item.product.buyProductCode, buyProductCode)
          )
      );
    }
  }
  const isMaxReached =
    shoppingCartList &&
    shoppingCartList.list &&
    shoppingCartList.list.length &&
    shoppingCartList.list.length >= 20;
  if (haveAdd) {
    return (
      <div className="long-button add-to-cart-out-button added">
        <div className="reset-css">
          <Svg />
          <span>Added</span>
        </div>
      </div>
    );
  } else {
    return (
      <Button
        isLoading={isLoading && isLoading.addShoppingCart}
        onClick={() => {
          // 判断长度
          if (isMaxReached) {
            props.onClickCallBack();
          } else {
            addIntoCartList(buyProductCode);
            if (!isMobile) {
              window.scrollTo(0, 0);
            }
          }
        }}
        className="add-to-cart-out-button"
      >
        <span>Add to cart</span>
      </Button>
    );
  }

  // 渲染
}
