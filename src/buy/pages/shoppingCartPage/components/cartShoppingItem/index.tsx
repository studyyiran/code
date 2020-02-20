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
  const [otherProductList, setOtherProductList] = useState(
    [] as IOtherProduct[]
  );
  const {
    buyProductId,
    buyPrice,
    productDisplayName,
    skuId,
    buyProductImgPc,
    buyProductCode
  } = productDetail;
  const otherProductSubTotal = otherProductList
    .map(({ buyPrice }) => Number(buyPrice))
    .reduce((count: number, a: number) => count + a, 0);

  function renderSubTotal() {
    return <div>Subtotal (tax and shipping calculated at checkout)</div>;
  }

  function renderButton() {
    return (
      <CheckOutButton
        buyProductId={buyProductId}
        otherProductList={otherProductList}
        needProtection={needProtection}
        onClick={() => {}}
      >
        Buy Now
      </CheckOutButton>
    );
  }

  function renderCartShoppingItem() {
    // 渲染
    return (
      <div className="test-page">
        <RenderProtection
          needAddButton={true}
          needTitle={false}
          setShowModal={() => {}}
          needProtection={needProtection}
          setNeedProtection={setNeedProtection}
        />
        {/*其他子商品*/}
        <RenderOtherProduct
          otherProductList={otherProductList}
          setOtherProductList={setOtherProductList}
          partsInfo={partsInfo}
          needTitle={false}
          needAddButton={true}
        />
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
