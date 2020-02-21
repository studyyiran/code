import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreShoppingCartContext, StoreShoppingCartContext } from "./context";
import { CartShoppingItem } from "./components/cartShoppingItem";
import { RenderSimilar } from "../detail/components/renderSimilar";
import {locationHref} from "../../common/utils/routerHistory";

interface IProps {
  history?: any
}

export const ShoppingCartPage: React.FC<IProps> = props => {
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

  // 渲染
  function renderList() {
    return shoppingCartList.list.map(({ skuReleated, product }) => {
      return (
        <CartShoppingItem
          partsInfo={skuReleated}
          productDetail={product}
          compareList={compareList}
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
        <div className="title-container">
          <h1>Shopping Cart</h1>
        </div>
        <div className="content">
          <div className="button-container">
            <button>Compare ({compareList.length}) </button>
          </div>
          <div className="list-container">{renderList()}</div>
          <RenderSimilar
            similiarPhoneList={
              shoppingCartList && shoppingCartList.list
                ? shoppingCartList.list.map(i => i.product)
                : []
            }
            history={props.history}
          >
            <h2 className="sub-title">Browsing History</h2>
          </RenderSimilar>
        </div>
        <div className="go-back-button" onClick={() => {locationHref('', 'back')}}>
          <img src={require("./res/arrow_left.svg")} />
          <span>Go Back</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
