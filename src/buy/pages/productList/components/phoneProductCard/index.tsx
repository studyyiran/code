import {
  currencyTrans,
  staticContentConfig
} from "../../../../common/utils/util";
import React, { useContext } from "react";
import "./index.less";
import {
  IProductDetailContext,
  ProductDetailContext
} from "../../../../pages/detail/context";
import { getDescArr, useGetProductImg } from "../../../../pages/detail/util";
import { InnerDivImage } from "../../../../pages/detail/components/innerDivImage";
import { locationHref } from "../../../../common/utils/routerHistory";

function isSoldOut(status: string) {
  return (
    status === staticContentConfig.SOLDOUT ||
    status === staticContentConfig.INTRANSACTION
  );
}

export default function PhoneProductCard(props: any) {
  const productDetailContext = useContext(ProductDetailContext);
  const { setProductId } = productDetailContext as IProductDetailContext;
  const {
    buyProductImgPc,
    buyProductName,
    buyProductCode,
    buyProductPrice,
    buyProductLevel,
    buyProductId,
    buyProductBQV,
    buyProductStatus
  } = props;
  const imgUrl = require("buy/common/static/pic.png");
  const [lineOne, lineTwo] = getDescArr(buyProductBQV, buyProductName);
  // const productImg = useGetProductImg(props);
  const productImg = props ? props.buyProductImgM : ""
  return (
    <section
      data-disabled={isSoldOut(buyProductStatus) ? "true" : "false"}
      className="phone-product-card"
      onClick={() => {
        if (!isSoldOut(buyProductStatus)) {
          locationHref(`/detail/${buyProductId}`);
        }
      }}
    >
      {isSoldOut(buyProductStatus) ? (
        <img src={require("./res/sold.svg")} />
      ) : null}
      {isSoldOut(buyProductStatus) ? (
        <InnerDivImage imgUrl={productImg}>
          <div className="modal"></div>
        </InnerDivImage>
      ) : (
        <InnerDivImage imgUrl={productImg} />
      )}

      <div className="content-container">
        {lineOne ? <h2>{lineOne}</h2> : null}
        {lineTwo ? <span className="attr">{lineTwo}</span> : null}
        <span className="condition">Condition {buyProductLevel}</span>
        <span className="id">ID：{buyProductCode}</span>
        <span className="price">{currencyTrans(buyProductPrice)}</span>
      </div>
    </section>
  );
}
