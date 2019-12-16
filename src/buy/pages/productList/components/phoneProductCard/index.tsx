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
import {
  GlobalSettingContext,
  IGlobalSettingContext
} from "../../../../context";
import { RenderByIsFive } from "../../../../components/RenderByIsFive";
import { FivePrice } from "../../../detail/components/fivePrice";
import { FiveCountDown } from "../../../detail/components/fiveCountdown";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import RouterLink from "../../../../common-modules/components/routerLink";

function isSoldOut(status: string) {
  return (
    status === staticContentConfig.SOLDOUT ||
    status === staticContentConfig.INTRANSACTION
  );
}

export default function PhoneProductCard(props: any) {
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
  const productImg = props ? props.buyProductImgM : "";

  function renderTagBySoldOutStatus(status: string) {
    if (isSoldOut(status)) {
      return (
        <span data-status={status} className="status-tag">
          Sold
        </span>
      );
    } else {
      return null;
    }
    // if (status === staticContentConfig.SOLDOUT) {
    //   return (
    //     <span data-status={status} className="status-tag">
    //       Sold
    //     </span>
    //   );
    // } else if (status === staticContentConfig.INTRANSACTION) {
    //   return (
    //     <span data-status={status} className="status-tag">
    //       Sale Pending
    //     </span>
    //   );
    // } else {
    //   return null;
    // }
  }

  return (
    <RouterLink
      to={`/detail/${buyProductId}`}
      className="phone-product-card"
      data-disabled={isSoldOut(buyProductStatus) ? "true" : "false"}
    >
      {renderTagBySoldOutStatus(buyProductStatus)}
      {isSoldOut(buyProductStatus) ? (
        <InnerDivImage imgUrl={productImg}>
          <div className="modal"></div>
        </InnerDivImage>
      ) : (
        <RenderByCondition
          ComponentMb={<InnerDivImage imgUrl={productImg} />}
          ComponentPc={
            <div className="img-scale-container">
              <InnerDivImage imgUrl={productImg} />
            </div>
          }
        />
      )}
      <div className="content-container">
        {lineOne ? <h2>{lineOne}</h2> : null}
        {lineTwo ? <span className="attr">{lineTwo}</span> : null}
        <span className="condition">Condition {buyProductLevel}</span>
        <span className="id">ID：{buyProductCode}</span>
        <RenderByIsFive
          renderFive={() => (
            <div className="five-wrapper">
              <FivePrice price={buyProductPrice} />
              <FiveCountDown />
            </div>
          )}
          ComponentNormal={
            <span className="price">{currencyTrans(buyProductPrice)}</span>
          }
        />
      </div>
    </RouterLink>
  );
}
