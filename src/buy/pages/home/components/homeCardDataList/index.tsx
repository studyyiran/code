import React, {useEffect, useState} from "react";
import "./index.less";
import {
  ajax,
  GET_HOME_PAGE_BUY_BRANDS,
  GET_HOME_PAGE_BUY_PRODUCTS,
  GET_HOME_PAGE_SELL_BRANDS,
  GET_HOME_PAGE_SELL_PRODUCTS
} from "../../../../api/api";
import RouterLink from "../../../../components/routerLink";
import {sellPageGoTo} from "../constant";

export function HomeCardDataList(props: any) {
  const {type} = props
  const title = type === "buy"
    ? "Browse Newly Listed Phones"
    : "We Help Sell Your Phone"; // 根据类型设置title
  const banner = type === "buy" ? 'url(' + require("buy/pages/home/img/buyBanner.jpeg") + ')' : 'url(' + require("buy/pages/home/img/sellBanner.jpeg") + ')';

  const productText = type === "buy" ? "As low as / " : "Cash up to / ";


  const gotoPage = () => {
    type === 'buy' ? sellPageGoTo("/productlist", true) : sellPageGoTo("/sell-phone", false)
  };

  //state
  const [tabNameList, setTabNameList] = useState([]); // tab list
  const [tab, setTab] = useState('Apple'); //tab的值
  const [dataList, setDataList] = useState([]);

  //useEffect 组件初始化就加载方法, 并且监听tab，tab变动会重新执行callback
  useEffect(() => {
    let url = type === 'buy' ? GET_HOME_PAGE_BUY_BRANDS : GET_HOME_PAGE_SELL_BRANDS
    ajax.get(url).then(res => {
      setTabNameList(res.data.data)
      setTab(res.data.data[0].brandId)
      changeTab(res.data.data[0])
    });
  }, [type]);

  function changeTab(tabData: any) {
    let url = type === 'buy' ? GET_HOME_PAGE_BUY_PRODUCTS : GET_HOME_PAGE_SELL_PRODUCTS
    ajax.get(url, {
      params: {brandId: tabData.brandId, seq: tabData.seqNo}
    }).then(res => {
      setTab(tabData.brandId)
      setDataList(res.data.data)
    });
  }

  return (
    <div className="home-card-content-wrapper">
      <div className="content-detail-home-width">
        <div className="banner" style={{backgroundImage: banner}}
             onClick={gotoPage}>
          <span className="text">{title}</span>
        </div>

        <div className="tab-bar-wrapper">
          {tabNameList.map((item: any) => {
            return (
              <span
                key={item.brandId}
                className={`tab-bar-item ${tab === item.brandId ? "active" : ""}`}
                onClick={() => changeTab(item)}>{item.brandDisplayName}</span>
            );
          })}
        </div>
        <div className="data-list-wrapper">
          {
            dataList.map((item: any, index: any) => {
              return (
                <div className="data-item-wrapper" key={index}>
                  <div className="data-item">
                    <div className="data-img-wrapper">
                      <img src={item.productImg} className="data-img"/>
                    </div>
                    <div className="data-bottom">
                      <div className="left">{item.productDisplayName}</div>
                      <div className="right">
                        <span>{productText}</span>
                        <span className="price">$ {item.productPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="button-wrapper">
          <button className="common-home-button view-all-button" onClick={gotoPage}>
            View All
          </button>
        </div>
      </div>
    </div>
  );
}