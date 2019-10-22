import React, {useContext, useEffect, useState} from "react";
import "./index.less";
import {
  getProductListPath,
  sellPageGoTo,
  currencyTrans
} from "../../../../common/utils/util";
import {IProductListContext, ProductListContext} from "../../../productList/context";

export function HomeCardDataList(props: any) {
  const productListContext = useContext(ProductListContext);
  const {
    setSearchInfo
  } = productListContext as IProductListContext;

  const { titleList, type, onClickHandler, productList } = props;
  console.log(productList);
  //state
  const [tab, setTab] = useState("Apple"); //tab的值
  useEffect(() => {
    if (titleList && titleList.length) {
      setTab(titleList[0].id);
    }
  }, [titleList]);

  const title =
    type === "buy" ? "Browse Newly Listed Phones" : "We Help Sell Your Phone"; // 根据类型设置title
  const banner =
    type === "buy"
      ? "url(" + require("buy/pages/home/img/buyBanner.jpeg") + ")"
      : "url(" + require("buy/pages/home/img/sellBanner.jpeg") + ")";

  const productText = type === "buy" ? "As low as / " : "Cash up to / ";

  const gotoPage = () => {
    type === "buy"
      ? sellPageGoTo(getProductListPath(), true)
      : sellPageGoTo("/sell-phone", false);
  };

  function goProductListPage (item: any) {
    setSearchInfo({
      productId: item.productId,
      productKey: item.productDisplayName
    });
    sellPageGoTo(getProductListPath(), true)
  }

  const dataItemGotoPage = (item: any) => {
    type === "buy"
      ? goProductListPage(item)
      : sellPageGoTo("/sell-phone/" + tab, false);
  };

  function changeTab(tabData: any) {
    setTab(tabData.id);
    onClickHandler({ brandId: tabData.id, seq: tabData.seqNo });
  }

  return (
    <div className="home-card-content-wrapper">
      <div className="content-detail-home-width">
        <div
          className="banner"
          style={{ backgroundImage: banner }}
          onClick={gotoPage}
        >
          <span className="text">{title}</span>
        </div>

        <div className="tab-bar-wrapper">
          {titleList.map((item: any) => {
            return (
              <span
                key={item.id}
                className={`tab-bar-item ${tab === item.id ? "active" : ""}`}
                onClick={() => changeTab(item)}
              >
                {item.displayName}
              </span>
            );
          })}
        </div>
        <div className="data-list-wrapper">
          {productList.map((item: any, index: any) => {
            return (
              <div className="data-item-wrapper" key={index}>
                <div className="data-item" onClick={() => dataItemGotoPage(item)}>
                  <div className="data-img-wrapper">
                    <img src={item.productImg} className="data-img" />
                  </div>
                  <div className="data-bottom">
                    <div className="left">{item.productDisplayName}</div>
                    <div className="right">
                      <span>{productText}</span>
                      <span className="price">{currencyTrans(item.productPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="button-wrapper">
          <button
            className="common-home-button view-all-button"
            onClick={gotoPage}
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
}
