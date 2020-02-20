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

  function renderSubTotal() {
    return (
      <div>
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

  function renderButton() {
    function renderRemove() {
      return <div>Remove</div>;
    }
    return (
        <div>
          <div>{renderRemove()}</div>
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
              {buyProductName || buyProductCode}{" "}
              {currencyTrans(buyProductPrice)}
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
      <div className="list-item">
        <div>
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
        </div>
        {dom}
      </div>
    );
  }

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
              <ProductInfoLine info={productDetail} />
              {renderCartShoppingItem()}
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
            <ProductInfoLine info={productDetail} />
          </div>
          {renderCartShoppingItem()}
          {renderSubTotal()}
          {renderButton()}
        </li>
      }
    />
  );
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

  return (
    <ul className="product-info-line">
      <RenderByCondition
        ComponentPc={
          <>
            <li className="info">{renderInfoLine()}</li>
            <li>
              <h2 className="price">{currencyTrans(buyProductPrice)}</h2>
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
          </>
        }
      />
    </ul>
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

  function renderButton() {
    return <li onClick={onClick}>{status ? "Remove" : "Add to cart"}</li>;
  }

  function renderPrice() {
    return <li>{status ? currencyTrans(price) : currencyTrans(0)}</li>;
  }
  return (
    <ul>
      {renderTitle()}
      {renderButton()}
      {renderPrice()}
    </ul>
  );
};
