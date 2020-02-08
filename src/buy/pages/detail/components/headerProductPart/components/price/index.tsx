import React from "react";
import { currencyTrans } from "../../../../../../common/utils/util";
import "./index.less";
import { showProductCardModal } from "../productCard";
import {ProductInfo} from "../../../productInfo";

interface IProps {
  buyProductCode: string;
  skuPrice: string;
  buyPrice: string;
  productDetail: any;
  hahaNumberArr?: any[];
}

export const ProductIdAndPrice: React.FC<IProps> = ({
  buyProductCode,
  buyPrice,
  skuPrice,
  children,
  hahaNumberArr,
  productDetail
}) => {
  return (
    <div className="productid-and-price">
      <div className="productid-part">
        <span className="product-id">Product ID {buyProductCode}</span>
        {hahaNumberArr && hahaNumberArr.length ? (
          <span className="similar-number">
            <span
              onClick={() => {
                showProductCardModal(hahaNumberArr, productDetail);
              }}
              className="number"
            >
              {hahaNumberArr.length}
            </span>{" "}
            like this
          </span>
        ) : null}
      </div>
      <div className="price-part-container">
        <div className="price-part">
          <span className="buy-price sub-title-size-main">
            {currencyTrans(buyPrice)}
          </span>
          <div className="sku-price">
            {/*<label>Retail</label>*/}
            <span>{currencyTrans(skuPrice)}</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
