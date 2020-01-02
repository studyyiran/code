import React, { useCallback, useContext, useEffect, useState } from "react";
import "./index.less";
import { Affix, Carousel } from "antd";

import { IProductDetailContext, ProductDetailContext } from "./context";
import {
  getProductListPath,
  safeEqual,
  urlRmSpaceAndToLower
} from "../../common/utils/util";
import { RenderByCondition } from "../../components/RenderByCondition";
import PhoneProductCard from "../productList/components/phoneProductCard";
import { detailSsrRule } from "./ssr";

import { dataReport } from "../../common/dataReport";
import { useWhenUrlChange } from "../../common/useHook";
import { constValue } from "../../common/constValue";

import LoadingMask from "../productList/components/loading";
import { HeaderProductPart } from "./components/headerProductPart";
import { StartBuyButton } from "./components/startBuyButton";
import { InspectionReport } from "./components/inspectionReport";
import { TopSwiper } from "./components/TopSwiper";
import {MoreInfo} from "./components/moreInfo";

export default function ProductDetail(props: any) {
  const [showModal, setShowModal] = useState(false);
  const productDetailContext = useContext(ProductDetailContext);
  const {
    productDetailContextValue,
    useClientRepair,
    getProductDetail,
    resetProductInfo,
    getSimiliarPhoneList
  } = productDetailContext as IProductDetailContext;

  const {
    productDetail,
    similiarPhoneList,
    partsInfo
  } = productDetailContextValue;
  // 执行ssr
  useClientRepair(detailSsrRule);
  const {
    buyProductRemark,
    backGroundCheck,
    productDisplayName,
    buyProductId,
    buyProductImgPc,
    buyProductImgM,
    buyProductVideo,
    productDescription,
    buyProductStatus
  } = productDetail;
  // 依赖 采用基于依赖的写法,这行代码写在哪里就一点都不重要了.因为页面和刷新只不过是一种依赖条件而已.
  const id = useWhenUrlChange("productId");

  useEffect(() => {
    getProductDetail(id);
    getSimiliarPhoneList(id);
    return () => {
      resetProductInfo();
    };
  }, [getProductDetail, getSimiliarPhoneList, id, resetProductInfo]);

  useEffect(() => {
    // 只有有商品属性 并且有页面id的时候.并且相等.才进行上报操作
    if (productDetail && id) {
      const {
        buyProductId,
        buyLevel,
        brandDisplayName,
        buyPrice,
        productDisplayName,
        buyProductBQV,
        skuId
      } = productDetail;
      if (safeEqual(id, productDetail.buyProductId)) {
        let bqvParams: any = {};
        if (buyProductBQV) {
          buyProductBQV.forEach((item: any) => {
            if (item && item.bpName) {
              if (item.bpName.toLowerCase() === "color") {
                bqvParams.colour = item.bpvName;
              } else {
                bqvParams[item.bpName.toLowerCase()] = item.bpvName;
              }
            }
          });
        }
        dataReport(
          Object.assign(bqvParams, {
            event: "productPageViewed",
            manufacturer: brandDisplayName, //update this
            model: productDisplayName, //update this
            condition: buyLevel, //update this
            productID: String(buyProductId), //update this
            price: Number(buyPrice), //update this
            protectionPlan: false, //update this
            ecommerce: {
              currencyCode: "USD",
              detail: {
                products: [
                  {
                    sku: String(skuId),
                    name: productDisplayName,
                    price: Number(buyPrice)
                  }
                ]
              }
            }
          })
        );
      }
    }
  }, [id, productDetail]);

  const viewAllClickHandler = useCallback(() => {
    window.location.href = urlRmSpaceAndToLower(
      getProductListPath() +
        "/" +
        productDetail.brandDisplayName +
        "/" +
        productDisplayName
    );
  }, [productDetail.brandDisplayName, productDisplayName]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderSimilar = () => {
    return (
      <section className="similar">
        <header>
          <h2>Similar Phones</h2>
          <a>
            <span className={"view-all-text"} onClick={viewAllClickHandler}>
              VIEW ALL
            </span>
          </a>
        </header>
        <RenderByCondition
          ComponentMb={
            <Carousel className="mb-carousel">
              {similiarPhoneList.map((item, index) => {
                return (
                  <PhoneProductCard
                    key={index}
                    {...item}
                    history={props.history}
                  />
                );
              })}
            </Carousel>
          }
          ComponentPc={
            <div className="list">
              {similiarPhoneList.map((item, index) => {
                return (
                  <PhoneProductCard
                    key={index}
                    {...item}
                    history={props.history}
                  />
                );
              })}
            </div>
          }
        />
      </section>
    );
  };

  function renderMobileStartButton() {
    return (
      <RenderByCondition
        ComponentMb={
          <Affix offsetBottom={0}>
            <div className="mb-buy-card">
              {showModal ? null : (
                <StartBuyButton
                  showModal={showModal}
                  onClick={() => setShowModal(true)}
                  buyProductStatus={buyProductStatus}
                />
              )}
            </div>
          </Affix>
        }
        ComponentPc={null}
      />
    );
  }

  if (buyProductId) {
    return (
      <div className="product-detail-page">
        <TopSwiper
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          buyProductVideo={buyProductVideo}
          buyProductImgPc={buyProductImgPc}
          buyProductImgM={buyProductImgM}
        />
        <div className="page">
          <HeaderProductPart
            showModal={showModal}
            setShowModal={setShowModal}
            productDetail={productDetail}
            partsInfo={partsInfo}
          />
          <InspectionReport
            productDescription={productDescription}
            buyProductRemark={buyProductRemark}
            backGroundCheck={backGroundCheck}
          />
          {renderMobileStartButton()}
          <ReviewPart />
          <MoreInfo />
          {renderSimilar()}
          <LastLineComponent />
        </div>
      </div>
    );
  } else {
    return (
      <div className="product-detail-page">
        <LoadingMask visible={true} />
        <div className="loading-mask-min-height"></div>
      </div>
    );
  }
}

function ReviewPart() {
  return (
    <div className="review-part">
      <header>
        <h2 className="sub-title">Customer Reviews</h2>
        <div>1</div>
      </header>
      <div>2</div>
    </div>
  );
}



function LastLineComponent() {
  return (
    <ul className="common-card icons-card">
      <li>
        <img src={require("./res/free-shipping.svg")} />
        <h3>Fast Shipping</h3>
      </li>
      <li>
        <img src={require("./res/return.svg")} />
        <h3>{constValue.REFUNDTIME} Days Return</h3>
      </li>
      <li>
        <img src={require("./res/secure-payment.svg")} />
        <h3>Secure Payment</h3>
      </li>
      <li>
        <img src={require("./res/customer-support.svg")} />
        <h3>Customer Support</h3>
      </li>
    </ul>
  );
}
