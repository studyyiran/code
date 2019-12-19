import { IProductDetail } from "../../context/interface";
import { getDescArr, useGetProductImg } from "../../util";
import { ProductInfoCard } from "../phoneInfo";
import React from "react";

/*
这是用来描述配件的纯组件
 */
export function PartsProductCard(props: {
  children?: any;
  productInfo: IProductDetail;
}) {
  const { children, productInfo } = props;
  const {
    buyProductBQV,
    productDisplayName,
    buyPrice,
    buyProductId
  } = productInfo;
  const productImg = useGetProductImg(productInfo);
  let [lineOne, lineTwo, lineAttr] = getDescArr(
    buyProductBQV,
    productDisplayName
  );
  lineAttr = lineAttr || (productInfo as any).bpvDispalyName;
  return (
    <ProductInfoCard
      key={buyProductId}
      productName={productDisplayName}
      productImage={productImg}
      price={Number(buyPrice)}
    >
      {/*{lineAttr ? <p className="bpv-name">{lineAttr}</p> : null}*/}
      {children}
    </ProductInfoCard>
  );
}
