import React from "react";
import {IProductDetail} from "../../../../context/interface";
import {PartsProductCard} from "../../../partsProductCard";
import {safeEqual} from "../../../../../../common/utils/util";
import {AddToCart} from "../addToCart";
import {WithTitle} from "../withTitle";
import {IOtherProduct} from "../../index";

/*
渲染其他商品配件
 */

export function RenderOtherProduct(props: {
  partsInfo: IProductDetail[];
  otherProductList: IOtherProduct[];
  setOtherProductList: any;
  needTitle: boolean;
  needAddButton: boolean;
}): any {
  const {
    partsInfo,
    otherProductList,
    setOtherProductList,
    needTitle,
    needAddButton
  } = props;

  let dom;
  if (needAddButton) {
    dom = partsInfo.map(item => {
      const { buyProductId, productType, buyPrice } = item;
      return (
        <PartsProductCard productInfo={item}>
          <div className="last-line-flex-container peijian">
            <AddToCart
              value={otherProductList.some(item =>
                safeEqual(item.productId, buyProductId)
              )}
              cartChangeCallBack={value => {
                setOtherProductList((arr: IOtherProduct[]) => {
                  // 根据选中状态来操作列表
                  if (value) {
                    return arr.concat([
                      {
                        productId: buyProductId,
                        productType,
                        buyPrice
                      }
                    ]);
                  } else {
                    return arr.filter(
                      item => !safeEqual(item.productId, buyProductId)
                    );
                  }
                });
              }}
            />
          </div>
        </PartsProductCard>
      );
    });
  } else {
    dom = otherProductList.map(item => {
      const target = partsInfo.find(itemOriginData => {
        return safeEqual(itemOriginData.buyProductId, item.productId);
      });
      if (target) {
        return <PartsProductCard productInfo={target} />;
      } else {
        return null;
      }
    });
  }
  if (dom && dom.length) {
    if (needTitle) {
      return <WithTitle title="Recommended accessories">{dom}</WithTitle>;
    } else {
      return dom;
    }
  } else {
    return null;
  }
}