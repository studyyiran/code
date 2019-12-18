import React, { useContext } from "react";
import { IOrderInfoContext, OrderInfoContext } from "../../context";
import PhoneInfo, {
  ProductInfoCard
} from "../../../detail/components/phoneInfo";
import "./index.less";
import { currencyTrans, safeEqual } from "../../../../common/utils/util";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import useGetTotalPrice from "../orderLayout/useHook";
import {
  IProductDetailContext,
  ProductDetailContext
} from "../../../detail/context";
import { constProductType } from "../../../../common/constValue";
import {
  protectionInfo,
  protectPrice
} from "../../../../common/config/staticConst";
import { getDescArr, useGetProductImg } from "../../../detail/util";

export default function OrderList(props: any) {
  const productDetailContext = useContext(ProductDetailContext);
  const {
    productDetailContextValue
  } = productDetailContext as IProductDetailContext;
  const { productDetail, partsInfo } = productDetailContextValue;
  const orderInfoContext = useContext(OrderInfoContext);
  const {
    orderInfoContextValue,
    orderInfoContextDispatch
  } = orderInfoContext as IOrderInfoContext;
  const { subOrders, taxInfo } = orderInfoContextValue;
  const {
    totalProductPrice,
    totalProtections,
    calcTotalPrice,
    getShippingPrice
  } = useGetTotalPrice();

  function renderList() {
    if (productDetail && productDetail.buyProductId) {
      return (
        <div className="content-card">
          <RenderByCondition
            ComponentMb={null}
            ComponentPc={
              <div className="padding-layout title">
                <h3>Your products</h3>
                <span>
                  {subOrders.length} item
                  {subOrders.length > 1 ? "s" : ""}
                </span>
              </div>
            }
          />
          <div className="padding-layout">
            {subOrders.map(subOrdersItem => {
              if (subOrdersItem.productType === constProductType.PRODUCT) {
                // 这是商品
                return (
                  <PhoneInfo
                    key={productDetail.buyProductId}
                    {...productDetail}
                  />
                );
              } else if (
                subOrdersItem.productType === constProductType.ACCESSORY
              ) {
                // 这是附件
                const target = partsInfo.find(item =>
                  safeEqual(item.buyProductId, subOrdersItem.productId)
                );
                if (partsInfo && target) {
                  const [lineOne, lineTwo] = getDescArr(
                    target.buyProductBQV,
                    target.productDisplayName
                  );
                  return (
                    <ProductInfoCard
                      productName={lineOne}
                      productImage={useGetProductImg(target)}
                      price={protectPrice}
                    >
                      <p className="bpv-name">{lineTwo}</p>
                    </ProductInfoCard>
                  );
                } else {
                  return null;
                }
              } else {
                return null;
              }
            })}
          </div>
          <div className="padding-layout price-detail">
            <ul>
              <li>
                <label>Subtotal</label>
                <span>{currencyTrans(totalProductPrice())}</span>
              </li>
              {Number(totalProtections()) ? (
                <li>
                  <label>Protection</label>
                  <span>{currencyTrans(totalProtections())}</span>
                </li>
              ) : null}

              {taxInfo.totalTax ? (
                <li>
                  <label>Sales tax</label>
                  <span>{currencyTrans(taxInfo.totalTax)}</span>
                </li>
              ) : null}

              {Number(getShippingPrice()) ? (
                <li>
                  <label>Shipping</label>
                  <span>{currencyTrans(getShippingPrice())}</span>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="padding-layout total">
            <ul>
              <li>
                <label>Total</label>
                <span>{currencyTrans(calcTotalPrice())}</span>
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
  return (
    <div className="order-list-container">
      <RenderByCondition
        ComponentMb={null}
        ComponentPc={<h2 className="order-common-less-title">Order summary</h2>}
      />
      {props.renderChangeUserInputList ? (
        <div className="user-input-container" data-page={props.relativePath}>
          {props.renderChangeUserInputList}
        </div>
      ) : null}
      {renderList()}
    </div>
  );
}
