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
    width: "70%",
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
  return (
    <div className="product-card-modal">
      <ProductInfo {...productDetail} />
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
  );
};
