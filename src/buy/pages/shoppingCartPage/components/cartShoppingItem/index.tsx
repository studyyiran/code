import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { RenderProtection } from "../../../detail/components/cartPop/components/renderProtection";
import { RenderOtherProduct } from "../../../detail/components/cartPop/components/renderOtherProtection";
import { IOtherProduct } from "../../../detail/components/cartPop";
import { IProductDetail } from "../../../detail/context/interface";
import { CheckOutButton } from "../../../detail/components/cartPop/components/checkoutButton";
import { currencyTrans, safeEqual } from "../../../../common/utils/util";
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

interface IProps {
  productDetail: IProductDetail;
  partsInfo: IProductDetail[];
  compareList: any[];
}

export function CartShoppingItem(props: IProps) {
  // 引入context
  const storeShoppingCartContext = useContext(StoreShoppingCartContext);
  const {
    storeShoppingCartContextValue,
    getShoppingCart,
    addCompareList
  } = storeShoppingCartContext as IStoreShoppingCartContext;

  const { productDetail, partsInfo, compareList } = props;
  const [needProtection, setNeedProtection] = useState(false);
  const [otherProductList, setOtherProductList] = useState([] as any[]);
  const {
    buyProductId,
    buyProductPrice,
    productDisplayName,
    skuId,
    buyProductImgPc,
    buyProductCode
  } = productDetail;
  console.log(productDetail);
  const otherProductSubTotal = otherProductList
    .map(({ buyPrice }) => Number(buyPrice))
    .reduce((count: number, a: number) => count + a, 0);

  return (
    <RenderByCondition
      ComponentPc={
        <div className="cart-shopping-item">
          <div className="two-line-flex">
            <div>
              <AddToComparePartImage
                imgUrl={
                  buyProductImgPc && buyProductImgPc.length && buyProductImgPc
                }
              />
              <AddToComparePartButton
                buyProductCode={buyProductCode}
                addCompareList={addCompareList}
                haveAdded={Boolean(
                  compareList.find(i => safeEqual(i, buyProductCode))
                )}
              />
            </div>
            <div className="content-part">
              <ProductInfoLine info={productDetail} />
              {renderCartShoppingItem()}
            </div>
          </div>
          {renderSubTotal()}
          {renderButtonContainer()}
        </div>
      }
      ComponentMb={
        <li className="cart-shopping-item">
          <div className="two-line-flex">
            <AddToComparePartImage
              imgUrl={
                buyProductImgPc && buyProductImgPc.length && buyProductImgPc
              }
            />
            <ProductInfoLine info={productDetail} />
          </div>
          <AddToComparePartButton
            buyProductCode={buyProductCode}
            addCompareList={addCompareList}
            haveAdded={Boolean(
              compareList.find(i => safeEqual(i, buyProductCode))
            )}
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
      <div className="render-sub-total">
        Subtotal (tax and shipping calculated at checkout)
        <span>
          {currencyTrans(
            Number(buyProductPrice) +
              Number(otherProductSubTotal) +
              (needProtection ? Number(protectPrice) : 0)
          )}
        </span>
      </div>
    );
  }

  function renderButtonContainer() {
    function renderRemove() {
      return <div className="remove-button">Remove</div>;
    }
    return (
      <div className="render-button-container">
        {renderRemove()}
        <CheckOutButton
          buyProductId={buyProductId}
          otherProductList={otherProductList}
          needProtection={needProtection}
          onClick={() => {}}
        >
          Buy Now
        </CheckOutButton>
      </div>
    );
  }

  function renderCartShoppingItem() {
    const dom = partsInfo.map(item => {
      const {
        buyProductId,
        productType,
        buyProductPrice,
        buyProductCode,
        buyProductName
      } = item;
      return (
        <ItemPriceLine
          name={
            <span>
              {buyProductName || buyProductCode}
            </span>
          }
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
    });
    // 渲染
    return (
      <div className="render-cart-shopping-item">
        <ItemPriceLine
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

const AddToComparePartImage = (props: { imgUrl: string }) => {
  const { imgUrl } = props;
  return (
    <div className="add-to-compare-part-img">
      <InnerDivImage imgUrl={imgUrl} />
    </div>
  );
};

const AddToComparePartButton = (props: {
  haveAdded: boolean;
  addCompareList: any;
  buyProductCode: string;
}) => {
  const { haveAdded, addCompareList, buyProductCode } = props;
  return (
    <div className="add-to-compare-part-button">
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

  return (
    <div className="product-info-line">
      <RenderByCondition
        ComponentPc={
          <>
            <div className="info">{renderInfoLine()}</div>
            <h2 className="price">{currencyTrans(buyProductPrice)}</h2>
          </>
        }
        ComponentMb={
          <>
            <div>
              <div className="info">{renderInfoLine()}</div>
              <h2 className="price">{currencyTrans(buyProductPrice)}</h2>
            </div>
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
  status
}: {
  name: any;
  secondLine?: any;
  status?: boolean;
  price: number;
  onClick: any;
}) => {
  function renderTitle() {
    return (
      <li>
        <div>
          <h2>{name}</h2>
          <span>{price}</span>
        </div>
        {secondLine ? secondLine : ""}
      </li>
    );
  }

  function renderAddButton() {
    return <li className="add-to-cart-button" onClick={onClick}>{status ? "Remove" : "Add to cart"}</li>;
  }

  function renderPrice() {
    return <li>{status ? currencyTrans(price) : currencyTrans(0)}</li>;
  }
  return (
    <ul className="item-price-line">
      {renderTitle()}
      {renderAddButton()}
      {renderPrice()}
    </ul>
  );
};
