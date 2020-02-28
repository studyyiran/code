import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { RenderProtection } from "../../../detail/components/cartPop/components/renderProtection";
import { RenderOtherProduct } from "../../../detail/components/cartPop/components/renderOtherProtection";
import { IOtherProduct } from "../../../detail/components/cartPop";
import { IProductDetail } from "../../../detail/context/interface";
import { CheckOutButton } from "../../../detail/components/cartPop/components/checkoutButton";
import {
  currencyTrans,
  getBuyDetailPath,
  getLocationUrl,
  safeEqual
} from "../../../../common/utils/util";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import { InnerDivImage } from "../../../detail/components/innerDivImage";
import Svg from "../../../../components/svg";
import { getDescArr } from "../../../detail/util";
import { OnSaleTag } from "../../../detail/components/onSaleTag";
import {
  IShoppingCartInfo,
  IStoreShoppingCartContext,
  StoreShoppingCartContext
} from "../../context";
import Button from "../../../../components/button";
import RouterLink from "../../../../common-modules/components/routerLink";
import { protectPrice } from "../../../../common/config/staticConst";
import { PartsProductCard } from "../../../detail/components/partsProductCard";
import { AddToCart } from "../../../detail/components/cartPop/components/addToCart";
import { locationHref } from "../../../../common/utils/routerHistory";

interface IProps {
  productDetail: IProductDetail;
  partsInfo: IProductDetail[];
  isCompare: boolean;
}

export function CartShoppingItem(props: IProps) {
  // 引入context
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const {
    storeShoppingCartContextValue,
    getShoppingCart,
    addCompareList,
    orderCompareAdd,
    deleteShoppingCart,
    deleteSoldShoppingCart
  } = storeShoppingCartContext as IStoreShoppingCartContext;

  const { productDetail, partsInfo, isCompare } = props;
  const [needProtection, setNeedProtection] = useState(false);
  const [otherProductList, setOtherProductList] = useState([] as any[]);
  const {
    buyProductId,
    buyProductPrice,
    buyProductName,
    buyProductImgM,
    buyProductCode,
    buyProductStatus,
  } = productDetail;
  const isSold = buyProductStatus === "INTRANSACTION";
  const otherProductSubTotal = otherProductList
    .map(({ buyPrice }) => Number(buyPrice))
    .reduce((count: number, a: number) => count + a, 0);

  function onClickHandler() {
    locationHref(getBuyDetailPath(buyProductName, buyProductCode));
  }

  return (
    <RenderByCondition
      ComponentPc={
        <div className="cart-shopping-item" data-sold={isSold}>
          {isSold ? <div className="sold-modal"></div> : null}
          <div className="two-line-flex">
            <div className="img-container">
              <AddToComparePartImage
                onClick={onClickHandler}
                imgUrl={
                  buyProductImgM && buyProductImgM.length && buyProductImgM[0]
                }
              />
              <AddToComparePartButton
                isSold={isSold}
                buyProductCode={buyProductCode}
                orderCompareAdd={orderCompareAdd}
                haveAdded={isCompare}
              />
            </div>
            <div className="content-part">
              <ProductInfoLine
                info={productDetail}
                onClickHandler={onClickHandler}
              />
              {renderCartShoppingItem()}
            </div>
          </div>
          {renderSubTotal()}
          {renderButtonContainer()}
        </div>
      }
      ComponentMb={
        <li className="cart-shopping-item" data-sold={isSold}>
          {isSold ? <div className="sold-modal"></div> : null}
          <div className="two-line-flex">
            <AddToComparePartImage
              onClick={onClickHandler}
              imgUrl={
                buyProductImgM && buyProductImgM.length && buyProductImgM[0]
              }
            />
            <ProductInfoLine info={productDetail} onClickHandler={onClickHandler} />
          </div>
          <AddToComparePartButton
            isSold={isSold}
            buyProductCode={buyProductCode}
            orderCompareAdd={orderCompareAdd}
            haveAdded={isCompare}
          />
          {renderCartShoppingItem()}
          {renderSubTotal()}
          {renderButtonContainer()}
        </li>
      }
    />
  );

  function renderSubTotal() {
    return (
      <div className="render-sub-total-container">
        <div className="render-sub-total">
          <div className="line-one">
            <span>Subtotal</span>
            <strong>
              {currencyTrans(
                Number(buyProductPrice) +
                  Number(otherProductSubTotal) +
                  (needProtection ? Number(protectPrice) : 0)
              )}
            </strong>
          </div>
          <div className="line-two">Tax and shipping calculated at checkout</div>
        </div>
      </div>
    );
  }

  function renderButtonContainer() {
    return (
      <div className="render-button-container">
        <div
          className="remove-button"
          onClick={() => {
            deleteShoppingCart(buyProductCode);
          }}
        >
          <img src={require("../../res/trash.svg")} />
          <span>Remove</span>
        </div>
        {isSold ? (
          <div className="common-button" data-sold={isSold}>
            SOLD
          </div>
        ) : (
          <CheckOutButton
            entry="cart"
            buyProductId={buyProductId}
            otherProductList={otherProductList}
            needProtection={needProtection}
            onClick={() => {}}
          >
            Check out
          </CheckOutButton>
        )}
      </div>
    );
  }

  function renderCartShoppingItem() {
    const dom = (partsInfo || []).map(item => {
      if (item) {
        const {
          buyProductId,
          productType,
          buyProductPrice,
          buyProductCode,
          buyProductName
        } = item;
        return (
          <ItemPriceLine
            isSold={isSold}
            name={<span>{buyProductName || buyProductCode}</span>}
            price={Number(buyProductPrice)}
            status={otherProductList.some(item =>
              safeEqual(item.productId, buyProductId)
            )}
            onClick={() => {
              setOtherProductList((arr: IOtherProduct[]) => {
                // 根据选中状态来操作列表
                const findTarget = otherProductList.find(item => {
                  return safeEqual(item.productId, buyProductId);
                });
                if (!findTarget) {
                  return arr.concat([
                    {
                      productId: buyProductId,
                      productType,
                      buyPrice: buyProductPrice
                    }
                  ]);
                } else {
                  return arr.filter(
                    item => !safeEqual(item.productId, buyProductId)
                  );
                }
              });
            }}
          />
        );
      } else {
        return null;
      }
    });
    // 渲染
    return (
      <div className="render-cart-shopping-item">
        <ItemPriceLine
          isSold={isSold}
          name="90 Days UpTrade Protect"
          secondLine={
            <RouterLink
              target={"_blank"}
              to={"/uptrade/protect"}
              onClick={() => {
                // 这块在跳转的时候 写死一个关闭行为 强行修改潜在的bug
                // setShowModal(false);
              }}
            >
              Learn more
            </RouterLink>
          }
          price={protectPrice}
          status={needProtection}
          onClick={() => {
            setNeedProtection(a => !a);
          }}
        />
        {dom}
      </div>
    );
  }
}

const AddToComparePartImage = (props: { imgUrl: string; onClick: any }) => {
  const { imgUrl, onClick } = props;
  return (
    <div className="add-to-compare-part-img" onClick={onClick}>
      <InnerDivImage imgUrl={imgUrl} />
    </div>
  );
};

const AddToComparePartButton = (props: {
  haveAdded: boolean;
  orderCompareAdd: any;
  buyProductCode: string;
  isSold: boolean;
}) => {
  const { haveAdded, orderCompareAdd, buyProductCode, isSold } = props;
  return (
    <div
      className="add-to-compare-part-button"
      data-haveadd={haveAdded ? "true" : "false"}
      onClick={() => {
        if (!haveAdded) {
          orderCompareAdd(buyProductCode);
        }
      }}
    >
      <span className="svg-container">
        <Svg />
      </span>
      {haveAdded ? "Added" : <span data-sold={isSold}>Add to compare</span>}
    </div>
  );
};

const ProductInfoLine = (props: { info: any; onClickHandler: any }) => {
  const { info, onClickHandler } = props;
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
        <span className="id">ID: {buyProductCode}</span>
      </div>
    );
  }

  return (
    <div
      className="product-info-line render-line canclick"
      onClick={onClickHandler}
    >
      <RenderByCondition
        ComponentPc={
          <>
            <div className="info">{renderInfoLine()}</div>
            <h2 className="price">{currencyTrans(buyProductPrice)}</h2>
          </>
        }
        ComponentMb={
          <>
            <div className="info">{renderInfoLine()}</div>
            <h2 className="price">{currencyTrans(buyProductPrice)}</h2>
          </>
        }
      />
    </div>
  );
};

const ItemPriceLine = ({
  name,
  secondLine,
  price,
  onClick,
  isSold,
  status
}: {
  name: any;
  secondLine?: any;
  status?: boolean;
  price: number;
  onClick: any;
  isSold: boolean;
}) => {
  function renderTitle() {
    return (
      <li className="render-title-container">
        <div className="render-title-name">
          <h2>{name}</h2>
          <span>{currencyTrans(price)}</span>
        </div>
        {secondLine ? <div className="second-line">{secondLine}</div> : ""}
      </li>
    );
  }

  function renderAddButton() {
    return (
      <li
        data-sold={isSold}
        data-select={status ? "true" : "false"}
        className="add-to-cart-button"
        onClick={onClick}
      >
        {status ? "Remove" : "Add to cart"}
      </li>
    );
  }

  function renderPrice() {
    return <li>{status ? currencyTrans(price) : currencyTrans(0)}</li>;
  }
  return (
    <RenderByCondition
      ComponentPc={
        <ul className="item-price-line render-line">
          {renderTitle()}
          {renderAddButton()}
          {renderPrice()}
        </ul>
      }
      ComponentMb={
        <div className="item-price-line render-line">
          <div className="mb-line-container">
            {renderTitle()}
            {renderPrice()}
          </div>
          {renderAddButton()}
        </div>
      }
    />
  );
};
