import React, {useContext, useEffect, useState} from "react";
import "./index.less";
import { RenderProtection } from "../../detail/components/cartPop/components/renderProtection";
import { RenderOtherProduct } from "../../detail/components/cartPop/components/renderOtherProtection";
import {IOtherProduct} from "../../detail/components/cartPop";
import {IProductDetail} from "../../detail/context/interface";

interface IProps {
  productDetail: IProductDetail,
  partsInfo: IProductDetail[],
}

export function CartShoppingItem(props: IProps) {
  const { productDetail, partsInfo } = props;
  const [needProtection, setNeedProtection] = useState(false);
  const [otherProductList, setOtherProductList] = useState(
    [] as IOtherProduct[]
  );
  const { buyProductId, buyPrice, productDisplayName, skuId } = productDetail;
  const otherProductSubTotal = otherProductList
    .map(({ buyPrice }) => Number(buyPrice))
    .reduce((count: number, a: number) => count + a, 0);

  // 渲染
  return (
    <div className="test-page">
      <RenderProtection
        needAddButton={true}
        needTitle={false}
        setShowModal={() => {
          
        }}
        needProtection={needProtection}
        setNeedProtection={setNeedProtection}
      />
      {/*其他子商品*/}
      <RenderOtherProduct
        otherProductList={otherProductList}
        setOtherProductList={setOtherProductList}
        partsInfo={partsInfo}
        needTitle={false}
        needAddButton={true}
      />
    </div>
  );
}
