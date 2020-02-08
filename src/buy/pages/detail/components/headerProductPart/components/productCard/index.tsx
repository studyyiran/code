import React from "react";
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
    width: "75%",
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
        <div>
          <span>Sort</span>
        </div>
      </div>
      {arr.map(info => {
        return <ProductCard info={info} />;
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
    buyProductImgPc,
    buyProductRemark,
    userInfo,
    buyTags
  } = info;
  console.log(info);
  return (
    <div className="product-card">
      <InnerDivImage imgUrl={buyProductImgPc[0]} lazyload={false} />
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
          <button className="common-button long-button">View Phone</button>
        </div>
      </div>
    </div>
  );
};
