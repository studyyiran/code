import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { ProductDetailContext } from "../../../../pages/detail/context";
import Modal from "../../../modal";
import { getDescArr } from "../../../../pages/detail/util";
import { currencyTrans, getLocationUrl } from "../../../../common/utils/util";
import { OnSaleTag } from "../../../../pages/detail/components/onSaleTag";
import { InnerDivImage } from "../../../../pages/detail/components/innerDivImage";
import { RenderByCondition } from "../../../RenderByCondition";
import { locationHref } from "../../../../common/utils/routerHistory";
import { StoreShoppingCartContext } from "../../../../pages/shoppingCartPage/context";

export function AddCart() {
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const {
    storeShoppingCartContextValue,
    setShowCartModal
  } = storeShoppingCartContext;
  const {
    isCookieOpen,
    shoppingCartList,
    showCartModal
  } = storeShoppingCartContextValue;
  // 这块没折腾明白
  const listLength =
    shoppingCartList && shoppingCartList.list && shoppingCartList.list.length;
  const detailList = shoppingCartList && shoppingCartList.list;

  const onGoCart = () => {
    locationHref(getLocationUrl("shoppingcart"));
  };
  return (
    <span className="cart-icon-container">
      <img src={require("./res/cart_icon.svg")} onClick={onGoCart} />
      <RenderByCondition
        ComponentPc={<span onClick={onGoCart}>Cart</span>}
        ComponentMb={null}
      />
      {listLength > 0 ? (
        <span className="point" onClick={onGoCart}>
          {listLength}
        </span>
      ) : null}
      <Modal
        visible={showCartModal}
        title={""}
        className="add-cart-modal"
        maskClosable={false}
        footer={false}
        needDefaultScroll={true}
        closable={true}
        onCancel={() => {
          setShowCartModal(false);
        }}
      >
        <h1 className="title">Your cart</h1>
        {isCookieOpen ? (
          <>
            <div
              className="product-item-container"
              style={
                detailList && detailList.length > 2
                  ? { overflowY: "scroll" }
                  : { overflowY: "auto" }
              }
            >
              {(detailList || []).map(item => {
                if (item && item.product) {
                  return <Line {...item.product} />;
                } else {
                  return null;
                }
              })}
            </div>

            <div className="total-container">
              <div>
                <h1>{listLength} items</h1>
              </div>
              <div>
                <h1>
                  Total:{" "}
                  {currencyTrans(
                    shoppingCartList && shoppingCartList.cartTotalPrice
                  )}
                </h1>
              </div>
            </div>
            <div
              className="long-button canclick"
              onClick={() => {
                setShowCartModal(false);
                window.setTimeout(() => {
                  locationHref(getLocationUrl("shoppingcart"));
                }, 0);
              }}
            >
              View cart
            </div>
          </>
        ) : (
          <div className="not-cookie-container">
            <img className="empty-img" src={require("./res/notcookie.svg")} />
            <p className="tips">
              Please enable cookies to use the shopping cart.
            </p>
          </div>
        )}
      </Modal>
    </span>
  );
}

const Line = (props: any) => {
  const {
    buyProductImgPc,
    buyProductName,
    buyProductCode,
    buyProductPrice,
    buyProductLevel,
    buyProductBQV,
    buyTags,
    buyProductStatus
  } = props;
  const [lineOne, lineTwo] = getDescArr(buyProductBQV, buyProductName);
  return (
    <div className="product-item">
      {/*{isSoldOut(buyProductStatus) ? (*/}
      {/*  <InnerDivImage imgUrl={buyProductImgM && buyProductImgM[0]}>*/}
      {/*    <div className="modal"></div>*/}
      {/*  </InnerDivImage>*/}
      {/*) : (*/}
      {/*  <RenderByCondition*/}
      {/*    ComponentMb={<InnerDivImage imgUrl={buyProductImgM && buyProductImgM[0]} />}*/}
      {/*    ComponentPc={*/}
      {/*      <div className="img-scale-container">*/}
      {/*        <InnerDivImage imgUrl={buyProductImgM && buyProductImgM[0]} />*/}
      {/*      </div>*/}
      {/*    }*/}
      {/*  />*/}
      {/*)}*/}
      {buyProductStatus === "INTRANSACTION" ? (
        <div className="sold-out-tag">Sold out</div>
      ) : null}
      <RenderByCondition
        ComponentMb={
          <InnerDivImage lazyload={false} imgUrl={buyProductImgPc} />
        }
        ComponentPc={
          <InnerDivImage lazyload={false} imgUrl={buyProductImgPc} />
        }
      />
      <div className="content-container">
        {lineOne ? (
          <div className="price-container">
            <h2>{lineOne}</h2>
            <h2 className="price">
              {currencyTrans(buyProductPrice)}
            </h2>
          </div>
        ) : null}
        {lineTwo ? <span className="attr">{lineTwo}</span> : null}
        <span className="condition">Condition {buyProductLevel}</span>
        <span className="id">ID: {buyProductCode}</span>
      </div>
    </div>
  );
};
