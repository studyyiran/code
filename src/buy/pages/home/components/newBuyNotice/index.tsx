import React, { useEffect, useState } from "react";
import "./index.less";
import Svg from "../../../../components/svg";
import { ajax, BUY_ORDER_LASTEST } from "../../../../api/api";

export function NewBuyNotice(props: any): any {
  const [chooseData, setChooseData] = useState({
    customer: "",
    productName: "",
    city: "",
    orderTime: "",
    productPicPC: "",
    productPicM: ""
  });
  let dataIndex = 0;
  let dataList: any = [];

  function getTopData() {
    ajax.post(BUY_ORDER_LASTEST).then(res => {
      dataList = res.data.data.map((d: any) => {
        d.productPicPC = d.productPicPC
          ? d.productPicPC
          : require("../../img/certified.png");
        d.productPicM = d.productPicM
          ? d.productPicM
          : require("../../img/certified.png");
        return d;
      });
      if (dataList.length < 12) {
        setChooseData({
          customer: "",
          productName: "",
          city: "",
          orderTime: "",
          productPicPC: "",
          productPicM: ""
        });
      } else {
        setChooseData(dataList[dataIndex]);
      }
    });
  }

  function intervalInit() {
    getTopData();

    window.setInterval(() => {
      if (dataList && dataList.length >= 12) {
        dataIndex++;
        if (dataIndex >= dataList.length) {
          dataIndex = 0;
        }
        setChooseData(dataList[dataIndex]);
      } else {
        setChooseData({
          customer: "",
          productName: "",
          city: "",
          orderTime: "",
          productPicPC: "",
          productPicM: ""
        });
      }
    }, 5000);

    // 1小时调用一次，获取12个最新买的机器和买家
    window.setInterval(() => {
      getTopData();
    }, 60 * 60 * 1000);
  }

  useEffect(() => {
    intervalInit();
  }, []);
  return chooseData && chooseData.customer ? (
    <div className="buy-home-notice-wrapper">
      <div
        style={{
          backgroundImage: `url(${chooseData.productPicM})`,
          backgroundSize: "cover"
        }}
        className={"buy-home-notice-left-img"}
      />
      <div className={"buy-home-notice-right-wrapper"}>
        <div className={"buy-home-notice-right-title"}>
          {chooseData.customer} placed an order for {chooseData.productName}
        </div>
        <div className={"buy-home-notice-right-desc"}>
          <Svg />
          <span className={"time"}>{chooseData.orderTime}</span>
        </div>
      </div>
    </div>
  ) : (
    <div>&nbsp;</div>
  );
}
