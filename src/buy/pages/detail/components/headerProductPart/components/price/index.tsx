import React from "react";
import { currencyTrans } from "../../../../../../common/utils/util";
import "./index.less";

interface IProps {
  buyProductCode: string;
  skuPrice: string;
  buyPrice: string;
}

export const ProductIdAndPrice: React.FC<IProps> = ({
  buyProductCode,
  buyPrice,
  skuPrice,
  children
}) => {
  return (
    <div className="productid-and-price">
      <span className="product-id">Product ID {buyProductCode}</span>
      <div>
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
