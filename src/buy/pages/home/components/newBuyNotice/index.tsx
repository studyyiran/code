import React, { useCallback, useEffect, useState } from "react";
import "./index.less";
import Svg from "../../../../components/svg";
import { ajax, BUY_ORDER_LASTEST, BUY_ORDER_SELL_LASTEST } from "../../../../api/api";
import { InnerDivImage } from "../../../detail/components/innerDivImage";

export function NewBuyNotice(props: any): any {
  const [chooseData, setChooseData] = useState({
    customer: "",
    productName: "",
    city: "",
    orderTime: "",
    productPicPC: "",
    productPicM: "",
    content: ""
  });
  let dataIndex = 0;
  let dataList: any = [];
  async function getTopData() {
    let list1 = [];
    let list2 = [];
    const res = await ajax.post(BUY_ORDER_LASTEST);
    list1 =
      res && res.data && res.data.data
        ? res.data.data
            .map((d: any) => {
              d.productPicPC = d.productPicPC
                ? d.productPicPC
                : require("../../img/certified.png");
              d.productPicM = d.productPicM
                ? d.productPicM
                : require("../../img/certified.png");
              d.content = `${d.customer} placed an order for ${d.productName}`;
              return d;
            })
            .filter((item: any, index: number) => {
              return index < 5;
            })
        : [];
    if (props && props.both) {
      const res2 = await ajax.post(BUY_ORDER_SELL_LASTEST);
      if (res && res2.data && res2.data.data && res2.data.data.length) {
        list2 = res2.data.data
          .filter((item: any, index: number) => {
            return index < 5;
          })
          .map((item: any) => {
            return {
              content: item.orderInfo,
              city: item.city,
              orderTime: item.orderTime,
              productPicPC: item.productPic,
              productPicM: item.productPic
            };
          });
        for (let i = 0; i < list1.length + list2.length; i++) {
          if (list1 && list1[i]) {
            dataList.push(list1[i])
          }
          if (list2 && list2[i]) {
            dataList.push(list2[i])
          }
        }
      }
    }
    console.log(dataList);
    if (dataList && dataList.length) {
      setChooseData(dataList[dataIndex]);
    } else {
      setChooseData({
        customer: "",
        productName: "",
        city: "",
        orderTime: "",
        productPicPC: "",
        productPicM: "",
        content: ""
      });
    }
  }

  const intervalInit = useCallback(() => {
    getTopData();

    window.setInterval(() => {
      if (dataList && dataList.length) {
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
          content: "",
          productPicM: ""
        });
      }
    }, 5000);

    // 1小时调用一次，获取12个最新买的机器和买家
    window.setInterval(() => {
      getTopData();
    }, 60 * 60 * 1000);
  }, []);

  useEffect(() => {
    intervalInit();
  }, [intervalInit]);
  return chooseData && chooseData.content ? (
    <div className="notice-container">
      <div className="comp-new-buy-notice">
        <InnerDivImage imgUrl={chooseData.productPicM} />
        <section>
          <h1>{chooseData.content}</h1>
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
