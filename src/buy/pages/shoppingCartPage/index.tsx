import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreShoppingCartContext, StoreShoppingCartContext } from "./context";
import { CartShoppingItem } from "./components/cartShoppingItem";
import { RenderSimilar } from "../detail/components/renderSimilar";
import { locationHref } from "../../common/utils/routerHistory";
import { getLocationUrl } from "../../common/utils/util";
import { ProductDetailContext } from "../detail/context";

interface IProps {
  history?: any;
}

export const ShoppingCartPage: React.FC<IProps> = props => {
  // 引入context
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const productDetailContext = useContext(ProductDetailContext);
  const { getProductHistory, productDetailContextValue } = productDetailContext;
  const { productHistoryList } = productDetailContextValue;
  const {
    storeShoppingCartContextValue,
    getShoppingCart,
    addCompareList
  } = storeShoppingCartContext as IStoreShoppingCartContext;
  // 从context中获取值
  const { shoppingCartList } = storeShoppingCartContextValue;
  const compareList = [] as any[];
  // local发起请求
  useEffect(() => {
    // getShoppingCart();
  }, [getShoppingCart]);

  useEffect(() => {
    getProductHistory();
  }, [getProductHistory]);

  // 渲染
  function renderList() {
    if (
      shoppingCartList &&
      shoppingCartList.list &&
      shoppingCartList.list.length
    ) {
      const list1: any[] = [];
      const list2: any[] = [];
      shoppingCartList.list.forEach(item => {
        if (item.product.buyProductStatus === "INTRANSACTION") {
          list2.push(item);
        } else {
          list1.push(item);
        }
      });
      return (
        <div>
          <div>
            {list1.map(({ skuReleated, product }) => {
              return (
                <CartShoppingItem
                  partsInfo={skuReleated}
                  productDetail={product}
                  compareList={compareList}
                />
              );
            })}
          </div>
          <div>Remove all sold</div>
          <div>
            {list2.map(({ skuReleated, product }) => {
              return (
                <CartShoppingItem
                  partsInfo={skuReleated}
                  productDetail={product}
                  compareList={compareList}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return <img src={require("./res/empty.svg")} />
    }
  }
  return (
    <div className="shopping-cart-page">
      <div className="title-container">
        <h1>Shopping Cart</h1>
      </div>
      <div className="content">
        <div className="button-container">
          <button
            onClick={() => {
              locationHref(getLocationUrl("comparepage"));
            }}
          >
            Compare ({compareList.length}){" "}
          </button>
        </div>
        <div className="list-container">{renderList()}</div>
        <RenderSimilar
          similiarPhoneList={productHistoryList}
          history={props.history}
        >
          <h2 className="sub-title">Browsing History</h2>
        </RenderSimilar>
      </div>
      <div
        className="go-back-button"
        onClick={() => {
          locationHref("", "back");
        }}
      >
        <img src={require("./res/arrow_left.svg")} />
        <span>Go Back</span>
      </div>
    </div>
  );
};
