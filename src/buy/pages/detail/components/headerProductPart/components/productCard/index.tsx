import React, { useState } from "react";
import "./index.less";
import { ProductIdAndPrice } from "../price";
import Modal from "../../../../../../components/modal";
import { InspectPersonInfo } from "../../../inspectPersonInfo";
import { InnerDivImage } from "../../../innerDivImage";
import { OnSaleTag } from "../../../onSaleTag";
import { ProductInfo } from "../../../productInfo";
import { IProductDetailGetWithCode } from "../../../../context/interface";
import { getArrBySort } from "../util";
import { getBuyDetailPath } from "../../../../../../common/utils/util";

export const showProductCardModal = (
  arr: any[],
  productDetail: any,
  productDetailByCode?: IProductDetailGetWithCode
) => {
  (Modal as any).confirm({
    className: "similar-modal",
    needDefaultScroll: true,
    width: "55%",
    closable: true,
    title: null,
    footer: null,
    // maskClosable: true,
    children: (
      <ProductCardModal
        arr={arr}
        productDetail={productDetail}
        productDetailByCode={productDetailByCode}
      />
    )
  });
};

interface IProps {
  arr: any[];
  productDetail: any;
  productDetailByCode?: IProductDetailGetWithCode;
}

const ProductCardModal: React.FC<IProps> = ({
  arr,
  productDetail,
  productDetailByCode
}) => {
  const [fromLowToHigh, setFromLowToHigh] = useState(true);
  const config = getArrBySort(
    productDetailByCode as IProductDetailGetWithCode
  ).map(item => {
    return {
      title: item.name,
      content: (item.values.find(item2 => {
        return item2.choose;
      }) as any).name
    };
  });
  return (
    <div className="product-card-modal">
      <ProductInfo {...productDetail}>
        {productDetail.brandDisplayName + ' ' + productDetail.productDisplayName}
      </ProductInfo>
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
        <div
          onClick={() => {
            setFromLowToHigh(a => !a);
          }}
          className="sort-container"
        >
          <img src={require("./res/sort.svg")} />
          Sort
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
  return (
    <div className="product-card">
      <InnerDivImage imgUrl={buyProductImgM[0]} lazyload={false} />
      <div className="content-container">
        <div>
          <ProductIdAndPrice
            productDetail={info}
            buyProductCode={buyProductCode}
            skuPrice={skuPrice}
            buyPrice={buyPrice}
            children2={<OnSaleTag tag={buyTags} />}
          />
          <InspectPersonInfo
            hideImg={true}
            buyProductRemark={buyProductRemark}
            userInfo={userInfo}
          />
        </div>
        <button
          className="common-button long-button"
          onClick={() => {
            window.location.href = getBuyDetailPath(
              productDisplayName,
              buyProductCode
            );
            // locationHref()
          }}
        >
          View Phone
        </button>
      </div>
    </div>
  );
};
