import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { ProductDetailContext } from "../../../../pages/detail/context";
import { FilterList } from "../../../../pages/productList/components/filsterList";
import Modal from "../../../modal";

export function AddCart() {
  const productDetailContext = useContext(ProductDetailContext);
  const { productDetailContextValue } = productDetailContext;
  const { cartList } = productDetailContextValue;
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
          if (!showModal) {
            setShowModal(true);
            setTimeout(() => {
              setShowModal(false);
            }, 5000);
          }
          // 检测到变化后的更新.
          setListLength(cartList.length);
        }
      }
    }
  }, [cartList, listLength]);
  return (
    <span className="cart-icon-container" onClick={() => {
      setShowModal(true);
    }}>
      <img src={require("./res/cart_icon.png")} />
      <span>Cart</span>
      {listLength > 0 ? <span className="point">{listLength}</span> : null}
      <Modal
        visible={showModal}
        title={""}
        className="add-cart-modal"
        maskClosable={true}
        footer={false}
        needDefaultScroll={true}
        closable={false}
        onCancel={() => {
          setShowModal(false)
        }}
      >
        <h1>123123</h1>
      </Modal>
    </span>
  );
}
