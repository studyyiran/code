import React, { useContext, useEffect } from "react";
import "./index.less";
import { IStoreShoppingCartContext, StoreShoppingCartContext } from "./context";
import { CartShoppingItem } from "./components/cartShoppingItem";
import { RenderSimilar } from "../detail/components/renderSimilar";
import { locationHref } from "../../common/utils/routerHistory";
import { getLocationUrl } from "../../common/utils/util";
import { ProductDetailContext } from "../detail/context";
import RouterLink from "../../common-modules/components/routerLink";
import LoadingMask from "../productList/components/loading";
import {useIsCurrentPage} from "../../common/useHook";

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
    deleteSoldShoppingCart
  } = storeShoppingCartContext as IStoreShoppingCartContext;
  // 从context中获取值
  const { shoppingCartList, isLoading, isCookieOpen } = storeShoppingCartContextValue;
  const isCurrentPage = useIsCurrentPage('/cart')
  if (isCurrentPage && !isCookieOpen) {
    locationHref("/buy-phone")
    // locationHref('', 'back')
  }
  // local发起请求
  useEffect(() => {
    getShoppingCart();
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
            {list1.map(({ skuReleated, product, isCompare }) => {
              return (
                <CartShoppingItem
                  isCompare={isCompare}
                  partsInfo={skuReleated}
                  productDetail={product}
                />
              );
            })}
          </div>
          {list2 && list2.length ? (
            <div
              className="remove-button remove-button-line"
              onClick={() => {
                deleteSoldShoppingCart();
              }}
            >
              <img src={require("./res/trash.svg")} />
              <span>Remove all sold</span>
            </div>
          ) : null}
          <div>
            {list2.map(({ skuReleated, product, isCompare }) => {
              return (
                <CartShoppingItem
                  partsInfo={skuReleated}
                  isCompare={isCompare}
                  productDetail={product}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="empty">
          <img className="empty-img" src={require("./res/empty.svg")} />
          <p className="tips">Your shopping cart is empty</p>
          <RouterLink to={"buy-phone"}>Continue browsing ></RouterLink>
        </div>
      );
    }
  }
  if (shoppingCartList && shoppingCartList.list) {
    return (
      <div className="shopping-cart-page">
        <div className="title-container">
          <h1>Shopping Cart</h1>
        </div>
        <LoadingMask visible={isLoading.deleteShoppingCart || isLoading.deleteSoldShoppingCart} style={{color: 'white'}} />
        <div className="content">
          {shoppingCartList &&
          shoppingCartList.list &&
          shoppingCartList.list.length ? (
            <div className="button-container">
              <button
                onClick={() => {
                  locationHref(getLocationUrl("comparepage"));
                }}
              >
                Compare (
                {shoppingCartList.list.reduce((sum, a) => {
                  if (a.isCompare) {
                    return Number(sum) + 1;
                  } else {
                    return sum;
                  }
                }, 0)}
                ){" "}
              </button>
            </div>
          ) : null}
          <div className="list-container">{renderList()}</div>
          <RenderSimilar
            similiarPhoneList={productHistoryList}
            history={props.history}
          >
            <h2 className="sub-title">Browsing History</h2>
          </RenderSimilar>
        </div>
        <div className="go-back-button-container">
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
      </div>
    );
  } else {
    return null;
  }
};
