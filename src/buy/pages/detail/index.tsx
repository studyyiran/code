import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { Affix, Carousel } from "antd";

import { IProductDetailContext, ProductDetailContext } from "./context";
import { getUrlAllParams, isServer, safeEqual } from "../../common/utils/util";
import { RenderByCondition } from "../../components/RenderByCondition";
import PhoneProductCard from "../productList/components/phoneProductCard";
import { detailSsrRule } from "./ssr";

import { dataReport } from "../../common/dataReport";
import { useWhenUrlChange } from "../../common/useHook";

import LoadingMask from "../productList/components/loading";
import { HeaderProductPart } from "./components/headerProductPart";
import { StartBuyButton } from "./components/startBuyButton";
import { InspectionReport } from "./components/inspectionReport";
import { TopSwiper } from "./components/TopSwiper";
import { MoreInfo } from "./components/moreInfo";
import { getDescArr, viewAllClickHandler } from "./util";
import { ReviewListPart } from "./components/revirePart";
import { LastLineComponent } from "./components/lastLineComponent";
import { RenderSimilar } from "./components/renderSimilar";
import { DetailLoading } from "./components/loading";

export default function ProductDetail(props: any) {
  const [showModal, setShowModal] = useState(false);
  const productDetailContext = useContext(ProductDetailContext);
  const {
    productDetailContextValue,
    useClientRepair,
    getProductDetail,
    resetProductInfo,
    getSimiliarPhoneList,
    getReviewScore,
    getProductDetailByCode,
    getSimiliarByCode
  } = productDetailContext as IProductDetailContext;

  const {
    productDetail,
    similiarPhoneList,
    partsInfo,
    reviewListInfo,
    productDetailByCode,
    similiarPhoneListByCode
  } = productDetailContextValue;

  // 执行ssr
  useClientRepair(detailSsrRule);
  const {
    buyProductRemark,
    backGroundCheck,
    buyProductCode,
    productDisplayName,
    buyProductId,
    buyProductImgPc,
    buyProductImgM,
    buyProductVideo,
    productDescription,
    userInfo,
    buyProductStatus
  } = productDetail;

  const modelName = useWhenUrlChange("modelName");
  const { variant } = getUrlAllParams();
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerTopPos, setContainerTopPos] = useState(0);
  // 用code拉取xxx
  useEffect(() => {
    if (buyProductCode) {
      getSimiliarByCode(buyProductCode);
    }
  }, [buyProductCode, getSimiliarByCode]);

  const pId =
    productDetailByCode &&
    productDetailByCode.detail &&
    productDetailByCode.detail.buyProductId;
  useEffect(() => {
    if (buyProductCode) {
      getSimiliarPhoneList(buyProductCode);
    }
  }, [getSimiliarPhoneList, buyProductCode]);

  // url -> id -> getDetail
  // useEffect(() => {
  //   // getProductDetail(id);
  //   // 要规避
  //   if (
  //     (!productDetail || !productDetail.buyProductCode) &&
  //     (!productDetailByCode ||
  //       !productDetailByCode.detail ||
  //       !productDetailByCode.detail.buyProductCode)
  //   ) {
  //     getProductDetailByCode({
  //       buyProductCode: variant,
  //       modelDisplayName: ""
  //     });
  //   }
  //   return () => {
  //     if (!isServer()) {
  //       if (window.location.href.indexOf("testbuy") === -1) {
  //         resetProductInfo();
  //       }
  //     }
  //   };
  // }, [
  //   getProductDetailByCode,
  //   productDetail,
  //   productDetailByCode,
  //   resetProductInfo,
  //   variant
  // ]);

  useEffect(() => {
    if (variant) {
      getProductDetailByCode({
        buyProductCode: variant,
        modelDisplayName: ""
      });
    } else {
      if (modelName) {
        getProductDetailByCode({
          buyProductCode: "",
          modelDisplayName: modelName
        });
      }
    }

    return () => {
      resetProductInfo();
    };
  }, [modelName, variant]);

  // 设置title
  useEffect(() => {
    if (productDetail && productDetail.skuId) {
      const {
        brandDisplayName,
        buyProductBQV,
        productDisplayName
      } = productDetail;
      const [lineOne, lineTwo] = getDescArr(buyProductBQV, productDisplayName);
      document.title = `${lineOne} ${lineTwo
        .replace("(", "- ")
        .replace(")", "")} For Sale | UpTradeit.com`;
    }
  }, [productDetail]);

  // -> review
  useEffect(() => {
    getReviewScore();
  }, [getReviewScore]);

  useEffect(() => {
    // 只有有商品属性 并且有页面id的时候.并且相等.才进行上报操作
    if (productDetail) {
      const {
        buyProductId,
        buyLevel,
        brandDisplayName,
        buyPrice,
        productDisplayName,
        buyProductBQV,
        skuId
      } = productDetail;
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
  }, [productDetail]);

  const renderSimilar = () => {
    // 哪怕有ts,也不能相信他一定有值.
    if (similiarPhoneList && similiarPhoneList.length) {
      return (
        <section className="similar">
          <header className="title-with-border">
            <h2 className="sub-title-size-main">Similar Phones</h2>
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
              <Carousel className="mb-carousel" dots={true}>
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
    } else {
      return null;
    }
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
  function renderHeaderProductPart() {
    return (
      <HeaderProductPart
        topPos={containerTopPos}
        similiarPhoneListByCode={similiarPhoneListByCode}
        productDetailByCode={productDetailByCode}
        showModal={showModal}
        setShowModal={setShowModal}
        productDetail={productDetail}
        partsInfo={partsInfo}
        userInfo={userInfo}
        buyProductRemark={buyProductRemark}
      />
    );
  }

  if (buyProductId) {
    return (
      <div
        className="product-detail-page"
      >
        <div className="top-part" ref={(element: any) => {
          if (element && element.clientWidth) {
            setContainerWidth(element.clientWidth);
            setContainerTopPos(element.offsetTop);
          }
        }}>
          <div className="product-detail">
            <TopSwiper
              productId={buyProductCode}
              containerWidth={containerWidth}
              buyProductVideo={buyProductVideo}
              buyProductImgPc={buyProductImgPc}
              buyProductImgM={buyProductImgM}
            />
            <RenderByCondition
              ComponentPc={null}
              ComponentMb={renderHeaderProductPart()}
            />
            <InspectionReport
              productDescription={productDescription}
              backGroundCheck={backGroundCheck}
            />
            <MoreInfo />
          </div>
          <RenderByCondition
            ComponentPc={
              <div className="fixed-wrapper" style={{height: `calc(100vh - ${containerTopPos}px)`}}>
                <Affix offsetBottom={0}>{renderHeaderProductPart()}</Affix>
              </div>
            }
            ComponentMb={null}
          />
        </div>
        <>
          <ReviewListPart reviewListInfo={reviewListInfo} />
          <RenderSimilar
            similiarPhoneList={similiarPhoneList}
            productDetail={productDetail}
            history={props.history}
          />
          <LastLineComponent />
        </>
        <RenderByCondition
          ComponentMb={(() => {
            return buyProductImgPc.map((item: string) => {
              return <img style={{ display: "none" }} src={item} key={item} />;
            });
          })()}
          ComponentPc={(() => {
            return buyProductImgPc.map((item: string) => {
              return <img style={{ display: "none" }} src={item} key={item} />;
            });
          })()}
        />
      </div>
    );
  } else {
    return <DetailLoading />;
  }
}
