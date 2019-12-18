import {
  currencyTrans,
} from "../../../../common/utils/util";
import React from "react";
import "./index.less";
import { getDescArr, useGetProductImg } from "../../util";
import { InnerDivImage } from "../innerDivImage";
/*
这是显示商品价格信息的组件。
他可以显示三种 机子 配件 甚至还有保险的渲染
 */
export default function PhoneInfo(props: {
  productDisplayName: string;
  buyProductBQV: string;
  buyPrice: any;
  bpvDisplayName: string;
  buyLevel: string; }) {const {
    productDisplayName,
    buyProductBQV,
    buyPrice,
    bpvDisplayName,
    buyLevel,
  } = props;
  const [lineOne, lineTwo] = getDescArr(buyProductBQV, productDisplayName);
  const productImg = useGetProductImg(props);
  return (
    <ProductInfoCard
      productImage={productImg}
      productName={lineOne}
      price={buyPrice}
    >
      <li className="bpv-name">{lineTwo}</li>
      <li className="bpv-name">{bpvDisplayName}</li>
      <li className="level">Condition {buyLevel}</li>
    </ProductInfoCard>
  );
}

export function ProductInfoCard(props: {
  productName: string;
  productImage: string;
  price: number;
  children: any;
}) {
  const { productName, productImage, price, children } = props;
  return (
    <div className="phone-info">
      <InnerDivImage imgUrl={productImage} lazyload={false} />
      <ul className="info-list">
        <li className="price-container">
          <h3>{productName}</h3>
          <span>{currencyTrans(price)}</span>
        </li>
        {children}
      </ul>
    </div>
  );
}
