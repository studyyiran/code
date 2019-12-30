import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import "./index.less";
import { Affix, Carousel } from "antd";
// @ts-ignore
import TestCarousel, { Modal, ModalGateway } from "react-images";
import { IProductDetailContext, ProductDetailContext } from "./context";
import Svg from "../../components/svg";
import TipsIcon from "../../components/tipsIcon";
import {
  getProductListPath,
  isServer,
  safeEqual,
  urlRmSpaceAndToLower
} from "../../common/utils/util";
import { RenderByCondition } from "../../components/RenderByCondition";
import CommonCollapse from "../../components/commonCollapse";
import PhoneProductCard from "../productList/components/phoneProductCard";
import VideoComponent from "../../components/video";
import EditorResolver from "./components/editorResolver";
import { useGetProductImg } from "./util";
import { TipsAllPass } from "./context/staticData";
import { InnerDivImage } from "./components/innerDivImage";
import { detailSsrRule } from "./ssr";

import { dataReport } from "../../common/dataReport";
import { useWhenUrlChange } from "../../common/useHook";
import { constValue } from "../../common/constValue";
// @ts-ignore
import WxImageViewer from "react-wx-images-viewer";
import { ModalView } from "../../components/ModalView";
import LoadingMask from "../productList/components/loading";
import {HeaderProductPart} from "./components/headerProductPart";
import {StartBuyButton} from "./components/startBuyButton";

function Swiper(props: any) {
  const {
    buyProductImgPc,
    buyProductImgM,
    buyProductVideo,
    setCurrentImageIndex,
    setShowImgModal,
    currentImageIndex,
    showImageModal
  } = props;
  const maxNumber = 3;
  return (
    <div className="swiper">
      <RenderByCondition
        ComponentMb={(() => {
          let dom = buyProductImgM.map((item: string, index: number) => {
            return (
              <InnerDivImage
                imgUrl={item}
                key={index}
                dataIndex={index}
                onClick={(e: any) => {
                  setCurrentImageIndex(index);
                  setShowImgModal(true);
                }}
              />
            );
          });

          if (buyProductVideo) {
            dom.unshift(
              <VideoComponent className="innerdiv" src={buyProductVideo} />
            );
          }
          return <Carousel className="swiper-mb">{dom}</Carousel>;
        })()}
        ComponentPc={(() => {
          let dom = buyProductImgPc.map((item: string, index: number) => {
            return (
              <InnerDivImage imgUrl={item} key={index} dataIndex={index} />
            );
          });
          if (buyProductVideo) {
            dom.unshift(
              <VideoComponent className="innerdiv" src={buyProductVideo} />
            );
          }
          dom = dom.filter((item: any, index: any) => {
            return index < maxNumber;
          });
          return (
            <div>
              <div
                className="swiper-pc"
                onClick={(e: any) => {
                  if (
                    e &&
                    e.target &&
                    e.target.dataset &&
                    e.target.dataset.index
                  ) {
                    setCurrentImageIndex(e.target.dataset.index);
                    setShowImgModal(true);
                  }
                }}
              >
                {dom}
              </div>
              {isServer() ? null : (
                <ModalGateway>
                  {showImageModal ? (
                    <Modal
                      onClose={() => {
                        setShowImgModal(false);
                      }}
                    >
                      <TestCarousel
                        currentIndex={Number(currentImageIndex)}
                        views={buyProductImgPc.map((item: any) => ({
                          src: item
                        }))}
                      >
                        {dom}
                      </TestCarousel>
                    </Modal>
                  ) : null}
                </ModalGateway>
              )}
            </div>
          );
        })()}
      />
    </div>
  );
}

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
    buyPrice,
    skuPrice,
    buyProductCode,
    buyProductId,
    buyProductImgPc,
    buyProductImgM,
    buyProductVideo,
    productDescription,
    buyProductHistoryPdf,
    buyProductStatus,
    skuId
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

  function renderReport() {
    return (
      <ul className="report">
        <li>
          <header>
            <img src={require("./res/inspection-notes.svg")} />
            <h3>Inspection Notes</h3>
          </header>
          <p>{buyProductRemark}</p>
        </li>
        <li>
          <header>
            <img src={require("./res/background-check.svg")} />
            <h3>Background Check</h3>
          </header>
          <div>
            <ul>
              {backGroundCheck.map(({ content, title }, index) => {
                if (content) {
                  return (
                    <li className="bg-check" key={index}>
                      <label>{title}</label>
                      <span>{content}</span>
                      {index > 1 ? <Svg /> : null}
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
          </div>
        </li>
        <li>
          <header>
            <img src={require("./res/test.svg")} />
            <h3>Functional Test</h3>
          </header>
          <div>
            <ul>
              <li className="fixtag">
                All Pass <TipsIcon>{TipsAllPass}</TipsIcon>
              </li>
              <li>
                <a
                  target="_blank"
                  className="report-link"
                  href={buyProductHistoryPdf}
                >
                  View full phone history report
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    );
  }
  const [showImageModal, setShowImgModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const testUseMemoDom = useMemo(() => {
    console.log("render");
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
  }, [props.history, similiarPhoneList, viewAllClickHandler]);
  if (buyProductId) {
    return (
      <div className="product-detail-page">
        <ModalView visible={showImageModal}>
          <WxImageViewer
            zIndex={9999}
            urls={buyProductImgPc}
            index={currentImageIndex}
            onClose={() => {
              setShowImgModal(false);
            }}
          />
        </ModalView>
        <Swiper
          showImageModal={showImageModal}
          setShowImgModal={setShowImgModal}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          buyProductVideo={buyProductVideo}
          buyProductImgPc={buyProductImgPc}
          buyProductImgM={buyProductImgM}
        />
        <div className="page">
          <div className="header-part">
            <HeaderProductPart
              showModal={showModal}
              setShowModal={setShowModal}
              productDetail={productDetail}
              partsInfo={partsInfo}
            />
          </div>
          <CommonCollapse header="Inspection Report" isActiveKey={true}>
            {renderReport()}
          </CommonCollapse>
          {productDescription ? (
            <CommonCollapse header="Phone Model Details">
              <EditorResolver editorContent={productDescription} />
            </CommonCollapse>
          ) : null}

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
          {testUseMemoDom}
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
