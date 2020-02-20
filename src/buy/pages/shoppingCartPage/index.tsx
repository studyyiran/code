import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreShoppingCartContext, StoreShoppingCartContext } from "./context";
import { CartShoppingItem } from "./components";
import { RenderByCondition } from "../../components/RenderByCondition";
import Svg from "../../components/svg";
import Button from "../../components/button";
import { InnerDivImage } from "../detail/components/innerDivImage";
import { currencyTrans, safeEqual } from "../../common/utils/util";
import { OnSaleTag } from "../detail/components/onSaleTag";
import { getDescArr } from "../detail/util";

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
              <div className="two-line-flex">
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
                <div className="content-part">
                  <ProductInfoLine info={product} />
                  <CartShoppingItem
                    productDetail={product}
                    partsInfo={skuReleated}
                  />
                </div>
              </div>
              {renderSubTotal()}
              {renderButton()}
            </li>
          }
          ComponentMb={
            <li className="list-item">
              <div className="two-line-flex">
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
                <ProductInfoLine info={product} />
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
          <div>Compare ({compareList.length})</div>
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

const ProductInfoLine = (props: { info: any }) => {
  const { info } = props;
  const {
    buyProductImgM,
    buyProductName,
    buyProductCode,
    buyProductPrice,
    buyProductLevel,
    buyProductId,
    buyProductBQV,
    buyProductStatus,
    buyTags
  } = info;
  function renderInfoLine() {
    const [lineOne, lineTwo] = getDescArr(buyProductBQV, buyProductName);
    return (
      <div className="content-container">
        {lineOne ? (
          <div className="price-container">
            <h2>{lineOne}</h2>
          </div>
        ) : null}
        {lineTwo ? <span className="attr">{lineTwo}</span> : null}
        <span className="condition">Condition {buyProductLevel}</span>
        <span className="id">Product ID: #{buyProductCode}</span>
      </div>
    );
  }

  function renderRemove() {
    return <div>Remove</div>;
  }
  return (
    <ul className="product-info-line">
      <RenderByCondition
        ComponentPc={
          <>
            <li className="info">{renderInfoLine()}</li>
            {/*<li>{renderRemove()}</li>*/}
            <li>
              <h2 className="price">
                {currencyTrans(buyProductPrice)}
                <OnSaleTag tag={buyTags} />
              </h2>
            </li>
          </>
        }
        ComponentMb={
          <>
            <li>
              <li>{renderInfoLine()}</li>
              <div>
                <h2 className="price">
                  {currencyTrans(buyProductPrice)}
                  <OnSaleTag tag={buyTags} />
                </h2>
              </div>
            </li>
            {/*<li>{renderRemove()}</li>*/}
          </>
        }
      />
    </ul>
  );
};
