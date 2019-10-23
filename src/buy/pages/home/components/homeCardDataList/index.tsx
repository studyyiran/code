import React, {useEffect, useState} from "react";
import "./index.less";
import getSellPath, {currencyTrans, getProductListPath, urlRmSpaceAndToLower} from "../../../../common/utils/util";
import {locationHref} from "../../../../common/utils/routerHistory";

// buy只显示苹果和三星品牌，业务要求
function buyBrandFilter(titleList: any, type: any) {
  if (type === 'buy') {
    let names = ["Apple", "Samsung"];
    let ids = [1, 2];
    return titleList.filter((brand: any) => names.indexOf(brand.displayName) > -1 || ids.indexOf(brand.id) > -1)
  } else {
    return titleList
  }
}

export function HomeCardDataList(props: any) {
  const { titleList, type, onClickHandler, productList } = props;

  let tabList = buyBrandFilter(titleList, type);

  //state
  const [tab, setTab] = useState({id: 1, displayName: ""}); //tab的值
  useEffect(() => {
    if (titleList && titleList.length) {
      setTab(titleList[0]);
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
      ? locationHref(getProductListPath())
      : locationHref(getSellPath());
  };

  const dataItemGotoPage = (item: any) => {
    type === "buy"
      ? window.location.href = urlRmSpaceAndToLower(getProductListPath() + "/" + tab.displayName + "/" + item.productDisplayName)
      : locationHref(getSellPath() + "/" + tab.id);
  };

  function changeTab(tabData: any) {
    setTab(tabData);
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
          {tabList.map((item: any) => {
            return (
              <span
                key={item.id}
                className={`tab-bar-item ${tab.id === item.id ? "active" : ""}`}
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
