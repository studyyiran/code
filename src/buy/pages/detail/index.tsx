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
import { MoreInfo } from "./components/moreInfo";
import { getDescArr, viewAllClickHandler } from "./util";
import { ReviewListPart } from "./components/revirePart";
import { LastLineComponent } from "./components/lastLineComponent";
import { IProductDetail } from "./context/interface";

export default function ProductDetail(props: any) {
  const [showModal, setShowModal] = useState(false);
  const productDetailContext = useContext(ProductDetailContext);
  const {
    productDetailContextValue,
    useClientRepair,
    getProductDetail,
    resetProductInfo,
    getSimiliarPhoneList,
    getReviewScore
  } = productDetailContext as IProductDetailContext;

  const {
    productDetail,
    similiarPhoneList,
    partsInfo,
    reviewList
  } = productDetailContextValue;
  useEffect(() => {
    if (productDetail && productDetail.skuId) {
      const {
        brandDisplayName,
        buyProductBQV,
        productDisplayName
      } = productDetail as IProductDetail;
      const [lineOne, lineTwo] = getDescArr(buyProductBQV, productDisplayName);
      document.title = `Buy ${brandDisplayName} ${lineOne} ${lineTwo} | UpTradeit.com`;
    }
  }, [productDetail]);

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
    userInfo,
    buyProductStatus
  } = productDetail;
  // 依赖 采用基于依赖的写法,这行代码写在哪里就一点都不重要了.因为页面和刷新只不过是一种依赖条件而已.
  const id = useWhenUrlChange("productId");
  console.log(reviewList);
  useEffect(() => {
    getProductDetail(id);
    getSimiliarPhoneList(id);
    return () => {
      resetProductInfo();
    };
  }, [getProductDetail, getSimiliarPhoneList, id, resetProductInfo]);

  useEffect(() => {
    getReviewScore();
  }, [getReviewScore]);

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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderSimilar = () => {
    return (
      <section className="similar">
        <header>
          <h2>Similar Phones</h2>
          <a>
            <span
              className={"view-all-text"}
              onClick={viewAllClickHandler.bind({}, productDetail)}
            >
              VIEW ALL
            </span>
          </a>
        </header>
        <RenderByCondition
          ComponentMb={
            <Carousel className="mb-carousel" dots={false}>
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
                  productDetail={productDetail}
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
        <div className="product-detail">
          <HeaderProductPart
            showModal={showModal}
            setShowModal={setShowModal}
            productDetail={productDetail}
            partsInfo={partsInfo}
          />
          <InspectionReport
            userInfo={userInfo}
            productDescription={productDescription}
            buyProductRemark={buyProductRemark}
            backGroundCheck={backGroundCheck}
          />
          {renderMobileStartButton()}
          <ReviewListPart reviewList={reviewList} />
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
