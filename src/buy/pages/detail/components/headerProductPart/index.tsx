import { IProductDetail } from "../../context/interface";
import { CartPop } from "../cartPop";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import { RenderByIsFive } from "../../../../components/RenderByIsFive";
import { currencyTrans, isServer } from "../../../../common/utils/util";
import { FivePrice } from "../fivePrice";
import { FiveCalcPrice } from "../fiveCalcPrice";
import { FiveCountDown } from "../fiveCountdown";
import { dataReport } from "../../../../common/dataReport";
import React, { useEffect, useState } from "react";
import { getDescArr } from "../../util";
import { StartBuyButton } from "../startBuyButton";
import { TopIconList } from "../topIconList";
import "./index.less";
import TipsIcon from "../../../../components/tipsIcon";

export function HeaderProductPart(props: {
  productDetail: IProductDetail;
  partsInfo: any;
  showModal: any;
  setShowModal: any;
}) {
  const { productDetail, partsInfo, showModal, setShowModal } = props;
  const {
    productDisplayName,
    buyPrice,
    skuPrice,
    buyProductCode,
    buyProductStatus,
    skuId
  } = productDetail;
  return (
    <div className="header-part">
      <CartPop
        showModal={showModal}
        setShowModal={setShowModal}
        productDetail={productDetail}
        partsInfo={partsInfo}
      />
      <RenderByCondition
        ComponentPc={
          <>
            <TopIconList />
            <div className="price-part-pc">
              <div className="left">
                <ProductInfo {...productDetail} />
                <span className="product-id">Product ID {buyProductCode}</span>
              </div>
              <div className="right">
                <RenderByIsFive
                  renderFive={(blackHappyCountDown: any[]) => {
                    return (
                      <>
                        <div className="sku-price">
                          <label>Retail</label>
                          <span>{currencyTrans(skuPrice)}</span>
                        </div>
                        <div className="price-and-button">
                          <div className="price">
                            <span className="buy-price sub-title-size-main">
                              <FivePrice price={buyPrice} />
                              <FiveCalcPrice
                                buyPrice={buyPrice}
                                skuPrice={skuPrice}
                              />
                            </span>
                            <FiveCountDown timeArr={blackHappyCountDown} />
                          </div>
                        </div>
                      </>
                    );
                  }}
                  ComponentNormal={
                    <div className="price-and-button">
                      <div className="price">
                        <span className="buy-price sub-title-size-main">
                          {currencyTrans(buyPrice)}
                        </span>
                        <div className="sku-price">
                          <label>Retail</label>
                          <span>{currencyTrans(skuPrice)}</span>
                        </div>
                        <img className="sale-tag" src={require("./res/sale.svg")} />
                      </div>
                    </div>
                  }
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
          </>
        }
        ComponentMb={
          <div className="price-part-mb">
            <div className="top">
              <ProductInfo {...productDetail} />
            </div>
            <RenderByIsFive
              renderFive={(blackHappyCountDown: any[]) => {
                return (
                  <>
                    <div>
                      <div className="sku-price">
                        <label>Retail</label>
                        <span>{currencyTrans(skuPrice)}</span>
                      </div>
                      <div className="price-and-button">
                        <div className="price">
                          <span className="buy-price sub-title-size-main">
                            <FivePrice price={buyPrice} />
                            <FiveCalcPrice
                              buyPrice={buyPrice}
                              skuPrice={skuPrice}
                            />
                          </span>
                          <FiveCountDown timeArr={blackHappyCountDown} />
                        </div>
                      </div>
                      <span className="product-id">
                        Product ID {buyProductCode}
                      </span>
                    </div>
                  </>
                );
              }}
              ComponentNormal={
                <div className="bottom">
                  <div className="price">
                    <span className="buy-price sub-title-size-main">
                      {currencyTrans(buyPrice)}
                    </span>
                    {skuPrice ? (
                      <div className="sku-price">
                        <label>Retail</label>
                        <span>{currencyTrans(skuPrice)}</span>
                      </div>
                    ) : null}
                    <img className="sale-tag" src={require("./res/sale.svg")} />
                  </div>
                  <span className="product-id">
                    Product ID {buyProductCode}
                  </span>
                </div>
              }
            />
            <TopIconList />
          </div>
        }
      />
    </div>
  );
}

function ProductInfo(props: any) {
  const { productDisplayName, buyLevel, buyProductBQV } = props;
  const [lineOne, lineTwo] = getDescArr(buyProductBQV, productDisplayName);
  const titleList = [
    {
      title: "NEW",
      content: "The phone has no scratches",
      color: "#43c0e3"
    },
    {
      title: "BEST",
      content: "The phone has no scratches",
      color: "rgba(109, 210, 48, 1)"
    },
    {
      title: "BETTER",
      content: "The phone has no scratches",
      color: "#e72349"
    },
    {
      title: "GOOD",
      content: "The phone has no scratches",
      color: "#efc31b"
    },
    {
      title: "FAIR",
      content: "The phone has no scratches",
      color: "#888888"
    }
  ];
  function type2BgColor(type: string) {
    const target = titleList.find(item => {
      return item.title === type;
    });
    if (target) {
      return target.color;
    } else {
      return "";
    }
  }
  function renderList() {
    const dom = titleList.map(({ title, content, color }) => {
      return (
        <div className="condition-list-item">
          <h4 className="condition-buy-level" style={{ background: color }}>
            {title}
          </h4>
          <p>{content}</p>
        </div>
      );
    });
    return <div className="condition-list">{dom}</div>;
  }
  return (
    <section className="product-info">
      <div className="info-part">
        <h2 className="sub-title-size-main">{lineOne ? ` ${lineOne}` : ""}</h2>
        <span className="attr">{lineTwo ? lineTwo : ""}</span>
        <span className="condition">
          <span>Condition</span>
          <span
            className="condition-buy-level"
            style={{ background: type2BgColor(buyLevel) }}
          >
            {buyLevel}
          </span>
          <RenderByCondition
            ComponentMb={<TipsIcon>{renderList()}</TipsIcon>}
            ComponentPc={<TipsIcon placement="right">{renderList()}</TipsIcon>}
          />
        </span>
      </div>
    </section>
  );
}
