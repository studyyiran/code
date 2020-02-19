import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { ProductDetailContext } from "../../../../pages/detail/context";
import { FilterList } from "../../../../pages/productList/components/filsterList";
import Modal from "../../../modal";
import { getDescArr } from "../../../../pages/detail/util";
import { RenderByIsFive } from "../../../RenderByIsFive";
import { FivePrice } from "../../../../pages/detail/components/fivePrice";
import { FiveCountDown } from "../../../../pages/detail/components/fiveCountdown";
import { currencyTrans } from "../../../../common/utils/util";
import { OnSaleTag } from "../../../../pages/detail/components/onSaleTag";
import { InnerDivImage } from "../../../../pages/detail/components/innerDivImage";
import { RenderByCondition } from "../../../RenderByCondition";

export function AddCart() {
  const productDetailContext = useContext(ProductDetailContext);
  const { productDetailContextValue } = productDetailContext;
  const { cartList, productDetail } = productDetailContextValue;
  const [listLength, setListLength] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  console.log(listLength);
  // 这块没折腾明白
  useEffect(() => {
    // 初始化
    if (cartList) {
      console.log("enter");
      if (listLength === -1) {
        // 初始化
        setListLength(cartList.length);
      } else {
        // 更新
        console.log(cartList.length);
        console.log(listLength);
        if (cartList.length > listLength) {
          // 弹框
          // if (!showModal) {
          //   setShowModal(true);
          //   setTimeout(() => {
          //     setShowModal(false);
          //   }, 5000);
          // }
          // 检测到变化后的更新.
          setListLength(cartList.length);
        }
      }
    }
  }, [cartList, listLength, showModal]);
  
  const detailList = listLength > 0 ? (new Array(listLength)).fill(productDetail) : []
  
  return (
    <span
      className="cart-icon-container"
      onClick={() => {
        // if (listLength > 0) {
        //   setShowModal(true);
        // }
      }}
    >
      <img src={require("./res/cart_icon.png")} />
      <RenderByCondition ComponentPc={<span>Cart</span>} ComponentMb={null}/>
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
        <div className="product-item-container">{detailList.map((item) => {
          return <Line {...item} />
        }) }</div>
        
        <div className="total-container">
          <div>{listLength} items</div>
          <div>
            <h1>Total: {currencyTrans(detailList.reduce((a, b) => {
              return a + b.buyPrice
            }, 0))}</h1>
          </div>
        </div>
        <div className="long-button">View cart</div>
        
      </Modal>
    </span>
  );
}

const Line = (props: any) => {
  const {
    buyProductImgM,
    productDisplayName,
    buyProductCode,
    buyPrice,
    buyLevel,
    buyProductId,
    buyProductBQV,
    buyProductStatus,
    buyTags
  } = props;
  console.log(buyProductBQV);
  console.log(productDisplayName);
  const [lineOne, lineTwo] = getDescArr(buyProductBQV, productDisplayName);
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
          <InnerDivImage
            lazyload={false}
            imgUrl={buyProductImgM && buyProductImgM[0]}
          />
        }
        ComponentPc={
          <InnerDivImage
            lazyload={false}
            imgUrl={buyProductImgM && buyProductImgM[0]}
          />
        }
      />
      <div className="content-container">
        {lineOne ? (
          <div className="price-container">
            <h2>{lineOne}</h2>
            <h2 className="price">
              {currencyTrans(buyPrice)}
              <OnSaleTag tag={buyTags} />
            </h2>
          </div>
        ) : null}
        {lineTwo ? <span className="attr">{lineTwo}</span> : null}
        <span className="condition">Condition {buyLevel}</span>
        <span className="id">ID：{buyProductCode}</span>
      </div>
    </div>
  );
};
