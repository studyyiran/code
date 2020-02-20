import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreShoppingCartContext, StoreShoppingCartContext } from "./context";
import { CartShoppingItem } from "./components";
import { RenderByCondition } from "../../components/RenderByCondition";
import Svg from "../../components/svg";
import Button from "../../components/button";

export function ShoppingCartPage() {
  // 引入context
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const {
    storeShoppingCartContextValue,
    getShoppingCart
  } = storeShoppingCartContext as IStoreShoppingCartContext;
  // 从context中获取值
  const { shoppingCartList } = storeShoppingCartContextValue;
  // local发起请求
  useEffect(() => {
    getShoppingCart();
  }, [getShoppingCart]);
  console.log(shoppingCartList);
  // 渲染
  function renderList() {
    return shoppingCartList.list.map(({ product, skuReleated }) => {
      const {buyProductImgPc} = product
      return (
        <RenderByCondition
          ComponentPc={
            <div>
              <AddToComparePart haveAdded={false} imgUrl={buyProductImgPc && buyProductImgPc.length && buyProductImgPc} />
              <ProductInfoLine />
              <CartShoppingItem productDetail={product} partsInfo={skuReleated} />
              <div>
                Subtotal (tax and shipping calculated at checkout)
              </div>
              <Button>Buy Now</Button>
            </div>
          }
          ComponentMb={null}
        />
      );
    });
  }
  if (
    shoppingCartList &&
    shoppingCartList.list &&
    shoppingCartList.list.length
  ) {
    return (
      <div className="test-page">
        <div>
          <h1>Shopping Cart</h1>
        </div>
        <div>
          <div>Compare ({123})</div>
        </div>
        <ul>{renderList()}</ul>
      </div>
    );
  } else {
    return null;
  }
}

const AddToComparePart = (props: {
  haveAdded: boolean;
  imgUrl: string;
}) => {
  const {haveAdded, imgUrl} = props
  return (
    <div>
      <img src={imgUrl} />
      <div>
        <span>
          <Svg />
        </span>
        {haveAdded ? "Added" : 'Add to compare'}
      </div>
    </div>
  );
};

const ProductInfoLine = () => {
  return <RenderByCondition ComponentPc={
    <ul className="">
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  } ComponentMb={
    <ul>
      <li>
        <div>1</div>
        <div>3</div>
      </li>
      <li>2</li>
    </ul>
  }/>
}