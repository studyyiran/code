import React, { useContext, useEffect, useState } from "react";
import "./index.less";
import { Affix, Carousel, Checkbox } from "antd";
// @ts-ignore
import TestCarousel, { Modal, ModalGateway } from "react-images";
import { IProductDetailContext, ProductDetailContext } from "./context";
import Svg from "../../components/svg";
import TipsIcon from "../../components/tipsIcon";
import getSellPath, {
  currencyTrans,
  getProductListPath,
  isServer,
  safeEqual,
  staticContentConfig,
  urlRmSpaceAndToLower
} from "../../common/utils/util";
import { RenderByCondition } from "../../components/RenderByCondition";
import CommonCollapse from "../../components/commonCollapse";
import MyModal from "../../components/modal";
import PhoneProductCard from "../productList/components/phoneProductCard";
import PhoneInfo from "./components/phoneInfo";
import {
  IOrderInfoContext,
  OrderInfoContext,
  orderInfoReducerTypes
} from "../order/context";
import { protectPrice } from "../../common/config/staticConst";
import { locationHref } from "../../common/utils/routerHistory";
import VideoComponent from "../../components/video";
import EditorResolver from "./components/editorResolver";
import RouterLink from "../../components/routerLink";
import PayCardImages from "./components/payCardImages";
import { getDescArr, useGetProductImg } from "./util";
import { TipsAllPass, TipsProtection } from "./context/staticData";
import { InnerDivImage } from "./components/innerDivImage";
import { detailSsrRule } from "./ssr";
import {
  IProductListContext,
  ProductListContext
} from "../productList/context";
import {
  callBackWhenPassAllFunc,
  useIsCurrentPage,
  useWhenUrlChange
} from "./context/test";
import Button from "../../components/button";

function Swiper(props: any) {
  const { buyProductImgPc, buyProductImgM, buyProductVideo } = props;
  const maxNumber = 3;
  const [showImageModal, setShowImgModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <div className="swiper">
      <RenderByCondition
        ComponentMb={(() => {
          let dom = buyProductImgM.map((item: string, index: number) => {
            return (
              <InnerDivImage imgUrl={item} key={index} dataIndex={index} />
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
  const [needProtection, setNeedProtection] = useState(false);
  const productDetailContext = useContext(ProductDetailContext);
  const {
    setProductId,
    productDetailContextValue,
    useClientRepair
  } = productDetailContext as IProductDetailContext;

  const productListContext = useContext(ProductListContext);
  const { setSearchInfo } = productListContext as IProductListContext;

  const {
    productDetail,
    similiarPhoneList,
    productId
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
    bpvDisplayName,
    buyProductId,
    buyProductImgPc,
    buyProductImgM,
    buyProductVideo,
    productDescription,
    buyProductHistoryPdf,
    buyProductStatus,
    buyProductBQV
  } = productDetail;
  // 依赖 采用基于依赖的写法,这行代码写在哪里就一点都不重要了.因为页面和刷新只不过是一种依赖条件而已.
  const id = useWhenUrlChange("productId");
  const isPage = useIsCurrentPage("/detail");

  useEffect(() => {
    // 1.id 有值
    // 2.正确的页面
    callBackWhenPassAllFunc([() => id, () => isPage], () => {
      if (true) {
        // 调用常规的接口
        setProductId(id);
      }
    });
  }, [id, isPage, setProductId]);

  useEffect(() => {
    return () => {
      // 离开的时候清空
      setProductId(null);
    };
  }, [setProductId]);

  function viewAllClickHandler() {
    window.location.href = urlRmSpaceAndToLower(
      getProductListPath() +
        "/" +
        productDetail.brandDisplayName +
        "/" +
        productDisplayName
    );
  }

  function renderHeaderPart() {
    return (
      <RenderByCondition
        ComponentMb={
          <div className="price-part-mb">
            <div className="top">
              <ProductInfo {...productDetail} />
            </div>
            <div className="bottom">
              <div className="price">
                <span className="buy-price">{currencyTrans(buyPrice)}</span>
                {skuPrice ? (
                  <div className="sku-price">
                    <label>Retail</label>
                    <span>{currencyTrans(skuPrice)}</span>
                  </div>
                ) : null}
              </div>
              <span className="product-id">
                <span>Product ID {buyProductCode}</span>
              </span>
            </div>
          </div>
        }
        ComponentPc={
          <div className="price-part-pc">
            <div className="left">
              <ProductInfo {...productDetail} />
              <span>Product ID {buyProductCode}</span>
            </div>
            <div className="right">
              <div className="price-and-button">
                <div className="price">
                  <span className="buy-price">{currencyTrans(buyPrice)}</span>
                  <div className="sku-price">
                    <label>Retail</label>
                    <span>{currencyTrans(skuPrice)}</span>
                  </div>
                </div>
                <StartBuyButton
                  onClick={() => setShowModal(true)}
                  buyProductStatus={buyProductStatus}
                />
              </div>
              <CheckBoxProtection
                needProtectionState={[needProtection, setNeedProtection]}
              />
            </div>
          </div>
        }
      />
    );
  }

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
  const productImg = useGetProductImg(productDetail);
  if (buyProductId) {
    return (
      <div className="product-detail-page">
        <Swiper
          buyProductVideo={buyProductVideo}
          buyProductImgPc={buyProductImgPc}
          buyProductImgM={buyProductImgM}
        />
        <div className="page">
          <div className="header-part">{renderHeaderPart()}</div>
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
              <h3>14 Days Return</h3>
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
                  <CheckBoxProtection
                    needProtectionState={[needProtection, setNeedProtection]}
                  />
                  <StartBuyButton
                    onClick={() => setShowModal(true)}
                    buyProductStatus={buyProductStatus}
                  />
                </div>
              </Affix>
            }
            ComponentPc={null}
          />

          <RenderTradeIn
            phoneImg={productImg}
            buyPrice={buyPrice}
            productDisplayName={productDisplayName}
          />
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
        </div>
        <MyModal
          needDefaultScroll={true}
          className="cart-modal"
          visible={showModal}
          maskClosable={false}
          title="Your cart"
          width={410}
          onCancel={() => setShowModal(false)}
          footer={null}
        >
          <div>
            <PhoneInfo
              {...productDetail}
              needProtection={needProtection}
              setNeedProtection={(value: any) => {
                setNeedProtection(value);
              }}
            />
            <ul className="price-list">
              <li>
                <label>Subtotal: </label>
                <span>{currencyTrans(buyPrice)}</span>
              </li>
              {needProtection ? (
                <li>
                  <label>Protection: </label>
                  <span>{currencyTrans(protectPrice)}</span>
                </li>
              ) : null}
              <li className="protect">
                <label>Total:</label>
                <span>
                  {currencyTrans(
                    needProtection ? buyPrice + protectPrice : buyPrice
                  )}
                </span>
              </li>
            </ul>
            <CheckOutButton
              productId={productId}
              needProtection={needProtection}
              onClick={() => {
                setShowModal(false);
              }}
            />
            <PayCardImages />
          </div>
        </MyModal>
      </div>
    );
  } else {
    return null;
  }
}

function StartBuyButton(props: any) {
  const { onClick, buyProductStatus } = props;
  return (
    <Button disabled={buyProductStatus === "INTRANSACTION"} onClick={onClick}>
      {buyProductStatus === "INTRANSACTION"
        ? "SOLD OUT"
        : "Start Your Purchase"}
    </Button>
  );
}

function CheckOutButton(props: any) {
  const { productId, needProtection } = props;
  const orderInfoContext = useContext(OrderInfoContext);
  const { orderInfoContextDispatch } = orderInfoContext as IOrderInfoContext;
  return (
    <button
      className="common-button"
      onClick={() => {
        // 1 他会xx
        orderInfoContextDispatch({
          type: orderInfoReducerTypes.addSubOrder,
          value: {
            productId,
            needProtection
          }
        });
        if (props.onClick) {
          props.onClick();
        }
        // 2 短暂delay
        window.setTimeout(() => {
          locationHref("/order/info");
        }, 100);
      }}
    >
      Checkout
    </button>
  );
}

function RenderTradeIn(props: any) {
  const { buyPrice, productDisplayName, phoneImg } = props;
  const [currentPrice, setCurrentPrice] = useState("");
  const [showResult, setShowResult] = useState("");
  var reg = new RegExp("^[0-9]*$");
  function checkNumber(e: any) {
    const content = e.target.value;
    if (reg.test(content)) {
      setCurrentPrice(content);
    }
  }
  return (
    <section className="trade-in">
      <h2>Save more with a trade-in</h2>
      <p>
        Calculate your out of pocket cost if you were to trade-in your old
        phone.
      </p>
      <div className="title">
        <span>Net trade-in</span>
        <TipsIcon>
          <p>
            UpTrade can help you sell your old phone. See{" "}
            <a
              onClick={() => locationHref(getSellPath())}
              style={{
                color: "rgba(26, 180, 231, 1)",
                textDecoration: "underline"
              }}
            >
              how much your phone is worth
            </a>
            &nbsp;to get started.
          </p>
        </TipsIcon>
      </div>
      <div className="input-container">
        <input
          placeholder="i.e $500"
          value={currentPrice}
          onChange={checkNumber}
        />
        <button
          className="common-button"
          onClick={() => {
            setShowResult(currentPrice);
          }}
        >
          Calculate
        </button>
      </div>
      {showResult ? (
        <div className="result-container">
          <InnerDivImage imgUrl={phoneImg} />
          <ul className="common-card">
            <li>
              <span>{productDisplayName}</span>
              <span>{currencyTrans(buyPrice)}</span>
            </li>
            <li>
              <span>Net trade-in</span>
              <span>-{currencyTrans(showResult)}</span>
            </li>
            <li>
              <span>Out of pocket cash</span>
              <span>
                {currencyTrans(
                  Number(buyPrice) - Number(showResult) > 0
                    ? Number(buyPrice) - Number(showResult)
                    : 0
                )}
              </span>
            </li>
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function CheckBoxProtection(props: any) {
  if (props && props.needProtectionState) {
    const [needProtection, setNeedProtection] = props.needProtectionState;
    return (
      <div className="checkbox-protection">
        <Checkbox
          checked={needProtection}
          onChange={() => {
            setNeedProtection((current: any) => {
              return !current;
            });
          }}
        >
          <span>
            Add UpTrade Protection for {currencyTrans(protectPrice)}
            {staticContentConfig.perMonth}
          </span>
        </Checkbox>
        <TipsIcon>{TipsProtection}</TipsIcon>
      </div>
    );
  } else {
    return null;
  }
}

function ProductInfo(props: any) {
  const { productDisplayName, buyLevel, buyProductBQV } = props;
  const [lineOne, lineTwo] = getDescArr(buyProductBQV, productDisplayName);
  return (
    <section className="product-info">
      <div className="info-part">
        <h2>{lineOne ? ` ${lineOne}` : ""}</h2>
        <span className="attr">{lineTwo ? lineTwo : ""}</span>
        <span className="condition">Condition {buyLevel}</span>
      </div>
      <img className="check-icon" src={require("./res/uptrade-check.svg")} />
    </section>
  );
}
