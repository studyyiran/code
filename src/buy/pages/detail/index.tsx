import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.less";
import { Affix } from "antd";

import { IProductDetailContext, ProductDetailContext } from "./context";
import { getUrlAllParams } from "../../common/utils/util";
import { RenderByCondition } from "../../components/RenderByCondition";
import { detailSsrRule } from "./ssr";

import { dataReport } from "../../common/dataReport";
import { useWhenUrlChange } from "../../common/useHook";

import { HeaderProductPart } from "./components/headerProductPart";
import { InspectionReport } from "./components/inspectionReport";
import { TopSwiper } from "./components/TopSwiper";
import { MoreInfo } from "./components/moreInfo";
import { getDescArr } from "./util";
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
    resetProductInfo,
    getSimiliarPhoneList,
    getReviewScore,
    getProductDetailByCode,
    getSimiliarByCode,
    addProductHistoryCodeList
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
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerTopPos, setContainerTopPos] = useState(0);

  useEffect(() => {
    if (buyProductCode) {
      addProductHistoryCodeList(buyProductCode);
    }
  }, [addProductHistoryCodeList, buyProductCode]);

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
    getProductDetailByCode(modelName);
    return () => {
      resetProductInfo();
    };
  }, [getProductDetailByCode, resetProductInfo, modelName]);

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

  const lastCode = useRef("");
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
      if (buyProductId) {
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
        if (
          !lastCode ||
          !lastCode.current ||
          lastCode.current !== buyProductId
        ) {
          lastCode.current = buyProductId;
          debugger;
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
    }
  }, [productDetail]);

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
      <div className="product-detail-page">
        <div
          className="top-part"
          ref={(element: any) => {
            if (element && element.clientWidth) {
              setContainerWidth(element.clientWidth);
              setContainerTopPos(element.offsetTop);
            }
          }}
        >
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
              <div
                className="fixed-wrapper"
                style={{ height: `calc(100vh - ${containerTopPos}px)` }}
              >
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
