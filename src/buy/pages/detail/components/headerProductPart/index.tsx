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
                            <span className="buy-price">
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
                        <span className="buy-price">
                          {currencyTrans(buyPrice)}
                        </span>
                        <div className="sku-price">
                          <label>Retail</label>
                          <span>{currencyTrans(skuPrice)}</span>
                        </div>
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
                          <span className="buy-price">
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
                    <span className="buy-price">{currencyTrans(buyPrice)}</span>
                    {skuPrice ? (
                      <div className="sku-price">
                        <label>Retail</label>
                        <span>{currencyTrans(skuPrice)}</span>
                      </div>
                    ) : null}
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
  return (
    <section className="product-info">
      <div className="info-part">
        <h2 className="sub-title">{lineOne ? ` ${lineOne}` : ""}</h2>
        <span className="attr">{lineTwo ? lineTwo : ""}</span>
        <span className="condition">Condition {buyLevel}</span>
      </div>
    </section>
  );
}
