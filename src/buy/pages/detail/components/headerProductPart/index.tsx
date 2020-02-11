import {IProductDetail, IProductDetailGetWithCode} from "../../context/interface";
import { CartPop } from "../cartPop";
import { dataReport } from "../../../../common/dataReport";
import React, { useEffect, useState } from "react";
import { StartBuyButton } from "../startBuyButton";
import { TopIconList } from "../topIconList";
import "./index.less";
import { OnSaleTag } from "../onSaleTag";
import { InspectPersonInfo } from "../inspectPersonInfo";
import { ProductIdAndPrice } from "./components/price";
import { AttrSelector } from "./components/attrSelector";
import {ProductInfo} from "../productInfo";

export function HeaderProductPart(props: {
  productDetail: IProductDetail;
  productDetailByCode: IProductDetailGetWithCode;
  partsInfo: any;
  showModal: any;
  setShowModal: any;
  buyProductRemark: any;
  userInfo?: any;
}) {
  const {
    productDetail,
    partsInfo,
    showModal,
    setShowModal,
    buyProductRemark,
    userInfo,
    productDetailByCode
  } = props;
  const {
    productDisplayName,
    buyPrice,
    skuPrice,
    buyProductCode,
    buyProductStatus,
    skuId,
    buyTags
  } = productDetail;
  return (
    <div className="header-part">
      <CartPop
        showModal={showModal}
        setShowModal={setShowModal}
        productDetail={productDetail}
        partsInfo={partsInfo}
      />
      <div className="price-part-out-container">
        <ProductInfo {...productDetail} />
        <ProductIdAndPrice
          productDetail={productDetail}
          hahaNumberArr={new Array(3).fill({
            userInfo,
            buyProductRemark,
            ...productDetail
          })}
          buyProductCode={buyProductCode}
          skuPrice={skuPrice}
          buyPrice={buyPrice}
        >
          <OnSaleTag tag={buyTags} />
        </ProductIdAndPrice>
        <TopIconList />
        <AttrSelector productDetailByCode={productDetailByCode} />
        <InspectPersonInfo
          buyProductRemark={buyProductRemark}
          userInfo={userInfo}
        />
        <StartBuyButton
          onClick={() => {
            dataReport({
              event: "EEaddToCart",
              ecommerce: {
                currencyCode: "USD",
                add: {
                  products: [
                    {
                      sku: String(skuId),
                      name: productDisplayName,
                      price: Number(buyPrice)
                    }
                  ]
                }
              }
            });
            setShowModal(true);
          }}
          buyProductStatus={buyProductStatus}
          productDetail={productDetail}
        />
      </div>
    </div>
  );
}

