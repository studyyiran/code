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
  const { storeShoppingCartContextValue } = storeShoppingCartContext;
  const { shoppingCartList } = storeShoppingCartContextValue;
  const [listLength, setListLength] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  console.log(listLength);
  // 这块没折腾明白
  useEffect(() => {
    // 初始化
    if (shoppingCartList && shoppingCartList.list) {
      console.log("enter");
      if (listLength === -1) {
        // 初始化
        setListLength(shoppingCartList.totalCount);
      } else {
        // 更新
        if (shoppingCartList.totalCount > listLength) {
          // 弹框
          if (!showModal) {
            setShowModal(true);
            // setTimeout(() => {
            //   setShowModal(false);
            // }, 5000);
          }
          // 检测到变化后的更新.
          setListLength(shoppingCartList.totalCount);
        }
      }
    }
  }, [listLength, shoppingCartList, showModal]);

  const detailList = shoppingCartList && shoppingCartList.list;

  return (
    <span
      className="cart-icon-container"
      onClick={() => {
        // if (listLength > 0) {
        //   setShowModal(true);
        // }
        locationHref(getLocationUrl("shoppingcart"));
      }}
    >
      <img src={require("./res/cart_icon.svg")} />
      <RenderByCondition ComponentPc={<span>Cart</span>} ComponentMb={null} />
      {listLength > 0 ? <span className="point">{listLength}</span> : null}
      <Modal
        visible={showModal}
        title={""}
        className="add-cart-modal"
        maskClosable={true}
        footer={false}
        needDefaultScroll={true}
        closable={true}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <h1 className="title">Your cart</h1>
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
            setShowModal(false);
            locationHref(getLocationUrl("shoppingcart"));
          }}
        >
          View cart
        </div>
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
    buyTags
  } = props;
  console.log(props);
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
              <OnSaleTag tag={buyTags} />
            </h2>
          </div>
        ) : null}
        {lineTwo ? <span className="attr">{lineTwo}</span> : null}
        <span className="condition">Condition {buyProductLevel}</span>
        <span className="id">ID：{buyProductCode}</span>
      </div>
    </div>
  );
};
