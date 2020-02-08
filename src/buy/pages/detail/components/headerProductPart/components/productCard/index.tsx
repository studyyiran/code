import React from "react";
import "./index.less";
import { ProductIdAndPrice } from "../price";
import Modal from "../../../../../../components/modal";
import { InspectPersonInfo } from "../../../inspectPersonInfo";
import {InnerDivImage} from "../../../innerDivImage";
import {OnSaleTag} from "../../../onSaleTag";

export const showProductCardModal = (arr: any[]) => {
  (Modal as any).confirm({
    width: "70%",
    closable: true,
    title: null,
    footer: null,
    // maskClosable: true,
    children: <ProductCardModal arr={arr} />
  });
};

interface IProps {
  arr: any[];
}

const ProductCardModal: React.FC<IProps> = ({ arr }) => {
  return (
    <div className="product-card-modal">
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
