import React, { useEffect, useState } from "react";
import "./index.less";
import Svg from "../../../../components/svg";
import { ajax, BUY_ORDER_LASTEST } from "../../../../api/api";
import { InnerDivImage } from "../../../detail/components/innerDivImage";

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
    ajax.post('/api/sub_order/lastest', {}).then(res => {
    // ajax.post('https://qa-gateway.uptradeit.com/api/sub_order/lastest', {}).then(res => {
      console.log(res)
    })
    ajax.post(BUY_ORDER_LASTEST).then(res => {
      dataList =
        res && res.data && res.data.data
          ? res.data.data.map((d: any) => {
              d.productPicPC = d.productPicPC
                ? d.productPicPC
                : require("../../img/certified.png");
              d.productPicM = d.productPicM
                ? d.productPicM
                : require("../../img/certified.png");
              return d;
            })
          : [];
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
    <div className="notice-container">
      <div className="comp-new-buy-notice">
        <InnerDivImage imgUrl={chooseData.productPicM} />
        <section>
          <h1>
            {chooseData.customer} placed an order for {chooseData.productName}
          </h1>
          <div className="date-container">
            <Svg />
            <span>{chooseData.orderTime}</span>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div>&nbsp;</div>
  );
}
