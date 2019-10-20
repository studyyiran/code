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
  const productImg = useGetProductImg(props);
  return (
    <section
      data-disabled={buyProductStatus === staticContentConfig.SOLDOUT ? "true" : "false"}
      className="phone-product-card"
      onClick={() => {
        if (buyProductStatus !== staticContentConfig.SOLDOUT) {
          locationHref(`/detail/${buyProductId}`);
        }
      }}
    >
      {buyProductStatus === staticContentConfig.SOLDOUT ? (
        <img src={require("./res/sold.svg")} />
      ) : null}
      {buyProductStatus === staticContentConfig.SOLDOUT ? (
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
