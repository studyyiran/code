import React, { useState } from "react";
import "./index.less";
import { ProductIdAndPrice } from "../price";
import Modal from "../../../../../../components/modal";
import { InspectPersonInfo } from "../../../inspectPersonInfo";
import { InnerDivImage } from "../../../innerDivImage";
import { OnSaleTag } from "../../../onSaleTag";
import { ProductInfo } from "../../../productInfo";

export const showProductCardModal = (arr: any[], productDetail: any) => {
  (Modal as any).confirm({
    className: "similar-modal",
    needDefaultScroll: true,
    width: "55%",
    closable: true,
    title: null,
    footer: null,
    // maskClosable: true,
    children: <ProductCardModal arr={arr} productDetail={productDetail} />
  });
};

interface IProps {
  arr: any[];
  productDetail: any;
}

const ProductCardModal: React.FC<IProps> = ({ arr, productDetail }) => {
  const [fromLowToHigh, setFromLowToHigh] = useState(true);
  const config = [
    {
      title: "Carrier",
      content: "Verizon"
    },
    {
      title: "Condition",
      content: "Fair"
    },
    {
      title: "Storage",
      content: "64GB"
    },
    {
      title: "Color",
      content: "Prism Blue"
    }
  ];
  return (
    <div className="product-card-modal">
      <ProductInfo {...productDetail} />
      <div className="second-line">
        <ul className="selector-container">
          {config.map(({ title, content }) => {
            return (
              <li className="selector">
                {title}: {content}
              </li>
            );
          })}
        </ul>
        <div className="sort-container">
          <img
            onClick={() => {
              setFromLowToHigh(a => !a);
            }}
            src={require("./res/sort.svg")}
          />
        </div>
      </div>
      {arr
        .sort((a, b) => {
          if (fromLowToHigh) {
            return a.buyPrice - b.buyPrice;
          } else {
            return b.buyPrice - a.buyPrice;
          }
        })
        .map(info => {
          return <ProductCard info={info} key={info.buyProductCode} />;
        })}
    </div>
  );
};

const ProductCard = ({ info }: any) => {
  const {
    productDisplayName,
    buyPrice,
    skuPrice,
    buyProductCode,
    buyProductImgM,
    buyProductRemark,
    userInfo,
    buyTags
  } = info;
  console.log(info);
  return (
    <div className="product-card">
      <InnerDivImage imgUrl={buyProductImgM[0]} lazyload={false} />
      <div className="content-container">
        <div>
          <OnSaleTag tag={buyTags} />
          <ProductIdAndPrice
            productDetail={info}
            buyProductCode={buyProductCode}
            skuPrice={skuPrice}
            buyPrice={buyPrice}
          />
          <InspectPersonInfo
            hideImg={true}
            buyProductRemark={buyProductRemark}
            userInfo={userInfo}
          />
        </div>
        <button className="common-button long-button">View Phone</button>
      </div>
    </div>
  );
};
