import {
  IProductDetail,
  IProductDetailGetWithCode
} from "../../context/interface";
import { CartPop } from "../cartPop";
import { dataReport } from "../../../../common/dataReport";
import React, { useContext, useEffect, useState } from "react";
import { StartBuyButton } from "../startBuyButton";
import { TopIconList } from "../topIconList";
import "./index.less";
import { OnSaleTag } from "../onSaleTag";
import { InspectPersonInfo } from "../inspectPersonInfo";
import { ProductIdAndPrice } from "./components/price";
import { AttrSelector } from "./components/attrSelector";
import { ProductInfo } from "../productInfo";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import {
  GlobalSettingContext,
  IGlobalSettingContext
} from "../../../../context";
import { JoinWaitList } from "../joinWaitList";
import { AddToCart } from "../cartPop/components/addToCart";
import { AddToCartButton } from "../addToCartButton";

export function HeaderProductPart(props: {
  productDetail: IProductDetail;
  productDetailByCode: IProductDetailGetWithCode;
  partsInfo: any;
  showModal: any;
  setShowModal: any;
  buyProductRemark: any;
  similiarPhoneListByCode: any[];
  userInfo?: any;
  topPos?: number;
}) {
  const {
    productDetail,
    partsInfo,
    showModal,
    setShowModal,
    buyProductRemark,
    userInfo,
    productDetailByCode,
    similiarPhoneListByCode,
    topPos
  } = props;
  const {
    productDisplayName,
    buyPrice,
    skuPrice,
    buyProductCode,
    buyProductStatus,
    skuId,
    buyTags,
    brandDisplayName
  } = productDetail;
  const globalSettingContext = useContext(GlobalSettingContext);
  const {
    globalSettingContextValue
  } = globalSettingContext as IGlobalSettingContext;
  const { isMobile } = globalSettingContextValue;
  const [showMaxTips, setShowMaxTips] = useState(false);
  return (
    <div
      className="header-part"
      style={isMobile ? {} : { height: `calc(100vh - ${topPos}px)` }}
    >
      <CartPop
        entry={"productpage"}
        showModal={showModal}
        setShowModal={setShowModal}
        productDetail={productDetail}
        partsInfo={partsInfo}
      />
      <div className="price-part-out-container">
        <ProductInfo {...productDetail}>{productDisplayName}</ProductInfo>
        <ProductIdAndPrice
          productDetailByCode={productDetailByCode}
          productDetail={productDetail}
          hahaNumberArr={similiarPhoneListByCode}
          buyProductCode={buyProductCode}
          skuPrice={skuPrice}
          buyPrice={buyPrice}
        >
          <OnSaleTag tag={buyTags} />
        </ProductIdAndPrice>
        <RenderByCondition
          ComponentPc={<TopIconList />}
          ComponentMb={<TopIconList />}
        />
        <AttrSelector productDetailByCode={productDetailByCode} />
        <InspectPersonInfo
          buyProductRemark={buyProductRemark}
          userInfo={userInfo}
        />
        <div className="start-button-container">
          {productDetail.buyProductStatus === "INTRANSACTION" ? (
            <JoinWaitList buyProductCode={buyProductCode} />
          ) : (
            <AddToCartButton
              onClickCallBack={() => {
                setShowMaxTips(true);
              }}
            />
          )}
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
        {showMaxTips ? (
          <div className="max-count-tips">
            Cart limit reached. Please clear your cart.
          </div>
        ) : null}
        {/*<RenderByCondition ComponentPc={<TopIconList />} ComponentMb={null}/>*/}
      </div>
    </div>
  );
}
