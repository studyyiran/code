import {IProgressType, IShippingAddress} from "@/containers/order/interface/order.inerface";
import * as moment from "moment-timezone";

export function getReactNodeConfig (status: any) {
  const ReactNodeConfig = {
    deliver: false,
    inspected: false,
    orderSummary: true, // false 表示订单一览折叠， true 表示展开
    isToBeReturn: false,
    productDispatch: false,
    listedForSale: false,
    orderComplete: false
  };
  // 是否展示物流(已发货未收货，已收货未质检)
  if (
    status === IProgressType.TO_BE_RECEIVED ||
    status === IProgressType.TO_BE_INSPECTED
  ) {
    ReactNodeConfig.deliver = true;
    ReactNodeConfig.orderSummary = false;
  }
  // 是否展示质检模块
  if (
    status === IProgressType.DIFFERENCE_INSPECTED
  ) {
    ReactNodeConfig.inspected = true;
    ReactNodeConfig.orderSummary = false;
  }
  // 是否展示退货模块
  if (status === IProgressType.TO_BE_RETURNED) {
    ReactNodeConfig.isToBeReturn = true;
    ReactNodeConfig.orderSummary = false;
  }
  // 是否退货发货
  if (
    status === IProgressType.TRANSACTION_FAILED
  ) {
    ReactNodeConfig.productDispatch = true;
    ReactNodeConfig.orderSummary = false;
  }

  // 展示拍卖模块
  if (status === IProgressType.LISTED_FOR_SALE) {
    ReactNodeConfig.listedForSale = true;
    ReactNodeConfig.orderSummary = false;
  }
  // 展示订单完成模块
  if (
    status === IProgressType.TRANSACTION_SUCCEED
  ) {
    ReactNodeConfig.orderComplete = true;
    ReactNodeConfig.orderSummary = false;
  }
  return ReactNodeConfig
}

export function packageDate(b: string | undefined) {
  if (b) {
    const date = moment.tz(b, "America/Chicago");
    return date.format("MMM DD");
  }
  return b;
}

export function getDeliverInfos(trackingInfo: any[]) {
  const infos: IShippingAddress[] = [];
  if (trackingInfo) {
    trackingInfo.map(t => {
      // time
      const time = moment.tz(t.statusDate, "America/Chicago");
      const now = new Date();
      let dateStr = time.format("MMM DD");
      if (time.year() !== now.getFullYear()) {
        dateStr = time.format("MMM DD, YYYY");
      }

      let locationCtiy = "";
      let locationCountry = "";
      if (t.location) {
        const matchCity = t.location.match(
          /(\[|\,\s)city=([^\,\s]*)(\,\s|\])/
        );
        const matchCountry = t.location.match(
          /(\[|\,\s)country=([^\,\s]*)(\,\s|\])/
        );
        locationCtiy = matchCity ? matchCity[2] : "";
        locationCountry = matchCountry ? matchCountry[2] : "";
      }
      const obj = infos.findIndex(v => v.date === dateStr);
      if (obj > -1) {
        infos[obj].listData.push({
          time: time.format("h:mm A"),
          listData: [
            t.statusDetails,
            locationCtiy && locationCountry
              ? locationCtiy + "," + locationCountry
              : ""
          ]
        });
      } else {
        infos.push({
          date: dateStr,
          listData: [
            {
              time: time.format("h:mm A"),
              listData: [
                t.statusDetails,
                locationCtiy && locationCountry
                  ? locationCtiy + "," + locationCountry
                  : ""
              ]
            }
          ]
        });
      }
      return true;
    });
  } else {
    // 判断是否为退货
    // if (this.orderDetail.status === IProgressType.TRANSACTION_FAILED) {
    //   let timeStr = this.orderDetail.updatedDt;
    //   const timeforreturn = this.orderDetail.orderRecords.find(
    //     z =>
    //       z.beforeStatus === IProgressType.DIFFERENCE_INSPECTED &&
    //       z.afterStatus === IProgressType.TO_BE_RETURNED
    //   );
    //   if (timeforreturn) {
    //     timeStr = timeforreturn.createdDt;
    //   }
    //   const time = moment.tz(timeStr, "America/Chicago");
    //   const now = new Date();
    //   let dateStr = time.format("MMM DD");
    //   if (time.year() !== now.getFullYear()) {
    //     dateStr = time.format("MMM DD, YYYY");
    //   }
    //   infos.push({
    //     date: dateStr,
    //     listData: [
    //       {
    //         time: time.format("h:mm A"),
    //         listData: ["Shipment order placed"]
    //       },
    //       {
    //         time: time.format("h:mm A"),
    //         listData: ["Package is picked up"]
    //       }
    //     ]
    //   });
    // }
  }
  return infos;
}

export function getDeliverNoInfo(info: any[]) {
  const deliverNoInfo: any = {};
  if (info && info.length) {
    deliverNoInfo.trackingNumber = info[0].trackingNumber;
    deliverNoInfo.carrier = info[0].carrier;
  }
  return deliverNoInfo;
}