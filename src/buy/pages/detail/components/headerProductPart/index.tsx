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
import { OnSaleTag } from "../onSaleTag";
import { InspectPersonInfo } from "../inspectPersonInfo";
import { ProductIdAndPrice } from "./components/price";
import { AttrSelector } from "./components/attrSelector";

export function HeaderProductPart(props: {
  productDetail: IProductDetail;
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
    userInfo
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
      <div className="price-part-pc">
        <ProductInfo {...productDetail} />
        <ProductIdAndPrice
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
        <AttrSelector />
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

function ProductInfo(props: any) {
  const { productDisplayName, buyLevel, buyProductBQV } = props;
  const [lineOne, lineTwo] = getDescArr(buyProductBQV, productDisplayName);
  const titleList = [
    {
      title: "NEW",
      content: "Phone has no scratches",
      color: "#43c0e3"
    },
    {
      title: "BEST",
      content: "Phone has no scratches",
      color: "rgba(109, 210, 48, 1)"
    },
    {
      title: "BETTER",
      content: "Phone has light scratches",
      color: "#e72349"
    },
    {
      title: "GOOD",
      content: "Phone has scratches",
      color: "#efc31b"
    },
    {
      title: "FAIR",
      content: "Phone has deep scratches",
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
    const dom = titleList.slice(1).map(({ title, content, color }, index) => {
      return (
        <div className="condition-list-item" key={index}>
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
      </div>
    </section>
  );
}
