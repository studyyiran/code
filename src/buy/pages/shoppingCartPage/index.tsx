import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreShoppingCartContext, StoreShoppingCartContext } from "./context";
import { CartShoppingItem } from "./components";
import { RenderByCondition } from "../../components/RenderByCondition";
import Svg from "../../components/svg";
import Button from "../../components/button";
import { InnerDivImage } from "../detail/components/innerDivImage";
import { safeEqual } from "../../common/utils/util";

export function ShoppingCartPage() {
  // 引入context
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const {
    storeShoppingCartContextValue,
    getShoppingCart,
    addCompareList
  } = storeShoppingCartContext as IStoreShoppingCartContext;
  // 从context中获取值
  const { shoppingCartList, compareList } = storeShoppingCartContextValue;
  // local发起请求
  useEffect(() => {
    getShoppingCart();
  }, [getShoppingCart]);
  console.log(shoppingCartList);
  function renderSubTotal() {
    return <div>Subtotal (tax and shipping calculated at checkout)</div>;
  }

  function renderButton() {
    return <Button>Buy Now</Button>;
  }
  // 渲染
  function renderList() {
    return shoppingCartList.list.map(({ product, skuReleated }) => {
      const { buyProductImgPc, buyProductCode } = product;
      return (
        <RenderByCondition
          ComponentPc={
            <li className="list-item">
              <AddToComparePart
                buyProductCode={buyProductCode}
                addCompareList={addCompareList}
                haveAdded={Boolean(
                  compareList.find(i => safeEqual(i, buyProductCode))
                )}
                imgUrl={
                  buyProductImgPc && buyProductImgPc.length && buyProductImgPc
                }
              />
              <ProductInfoLine />
              <CartShoppingItem
                productDetail={product}
                partsInfo={skuReleated}
              />
              {renderSubTotal()}
              {renderButton()}
            </li>
          }
          ComponentMb={
            <li className="list-item">
              <div>
                <AddToComparePart
                  buyProductCode={buyProductCode}
                  addCompareList={addCompareList}
                  haveAdded={Boolean(
                    compareList.find(i => safeEqual(i, buyProductCode))
                  )}
                  imgUrl={
                    buyProductImgPc && buyProductImgPc.length && buyProductImgPc
                  }
                />
                <ProductInfoLine />
              </div>
              <CartShoppingItem
                productDetail={product}
                partsInfo={skuReleated}
              />
              {renderSubTotal()}
              {renderButton()}
            </li>
          }
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
      <div className="shopping-cart-page">
        <div>
          <h1>Shopping Cart</h1>
        </div>
        <div>
          <div>Compare ({123})</div>
        </div>
        <ul className="list">{renderList()}</ul>
      </div>
    );
  } else {
    return null;
  }
}

const AddToComparePart = (props: {
  haveAdded: boolean;
  imgUrl: string;
  addCompareList: any;
  buyProductCode: string;
}) => {
  const { haveAdded, imgUrl, addCompareList, buyProductCode } = props;
  return (
    <div className="add-to-compare-part">
      <InnerDivImage imgUrl={imgUrl} />
      <div>
        <span>
          <Svg />
        </span>
        {haveAdded ? (
          "Added"
        ) : (
          <span
            onClick={() => {
              addCompareList(buyProductCode);
            }}
          >
            Add to compare
          </span>
        )}
      </div>
    </div>
  );
};

const ProductInfoLine = () => {
  return (
    <RenderByCondition
      ComponentPc={
        <ul className="">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      }
      ComponentMb={
        <ul>
          <li>
            <div>1</div>
            <div>3</div>
          </li>
          <li>2</li>
        </ul>
      }
    />
  );
};
