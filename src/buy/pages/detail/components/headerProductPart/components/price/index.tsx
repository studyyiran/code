import React from "react";
import {currencyTrans, getLocationUrl} from "../../../../../../common/utils/util";
import "./index.less";
import Modal from "../../../../../../components/modal";
import {locationHref} from "../../../../../../common/utils/routerHistory";

interface IProps {
  buyProductCode: string;
  skuPrice: string;
  buyPrice: string;
  hahaNumberArr?: any[];
}

export const ProductIdAndPrice: React.FC<IProps> = ({
  buyProductCode,
  buyPrice,
  skuPrice,
  children,
  hahaNumberArr
}) => {
  return (
    <div className="productid-and-price">
      <div className="productid-part">
        <span className="product-id">Product ID {buyProductCode}</span>
        {hahaNumberArr && hahaNumberArr.length ? (
          <span className="similar-number">
            <span onClick={() => {
              console.log('get it');
              (Modal as any).confirm({
                width: "70%",
                closable: false,
                title: null,
                footer: "single",
                maskClosable: true,
                cancelText: "Got it",
                onCancel: () => {
                  locationHref(getLocationUrl("home"));
                },
                children: (
                  <div className="content">
                    123123
                  </div>
                )
              });
            }} className="number">
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
