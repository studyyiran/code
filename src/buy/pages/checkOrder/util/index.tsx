import {
  IProgressType,
  IShippingAddress,
  IProgressDot
} from "../interface/order.inerface";
import * as moment from "moment-timezone";
import { getFromSession, setSession } from "buy/common/utils/util";

export function getReactNodeConfig(status: any, showReturnShipping?: string) {
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
    status === IProgressType.DIFFERENCE_INSPECTED ||
    status === IProgressType.TO_BE_LISTED
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
  if (showReturnShipping) {
    ReactNodeConfig.deliver = true;
    ReactNodeConfig.productDispatch = true;
    ReactNodeConfig.orderSummary = false;
  }

  // 展示拍卖模块
  if (status === IProgressType.LISTED_FOR_SALE) {
    ReactNodeConfig.listedForSale = true;
    ReactNodeConfig.orderSummary = false;
  }
  // 展示订单完成模块
  if (status === IProgressType.TRANSACTION_SUCCEED) {
    ReactNodeConfig.orderComplete = true;
    ReactNodeConfig.orderSummary = false;
  }
  return ReactNodeConfig;
}

export function getDeliverNoInfo(info: any[]) {
  const deliverNoInfo: any = {};
  if (info && info.length) {
    deliverNoInfo.trackingNumber = info[0].trackingNumber;
    deliverNoInfo.carrier = info[0].carrier;
  }
  return deliverNoInfo;
}

export function getDeliverInfos(trackingInfo: any) {
  const infos: IShippingAddress[] = [];
  if (trackingInfo) {
    trackingInfo.trackingHistory.map((t: any) => {
      const time = moment.tz(t.statusDate, "America/Chicago");
      const now = new Date();
      let dateStr = time.format("MMM DD");
      if (time.year() !== now.getFullYear()) {
        dateStr = time.format("MMM DD, YYYY");
      }

      let locationCtiy = "";
      let locationCountry = "";
      if (t.location) {
        const matchCity = t.location.match(/(\[|\,\s)city=([^\,\s]*)(\,\s|\])/);
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
  }
  return infos;
}

// 自家用的数据。
export function getInfo({
  userInfo,
  paymentInfo,
  groupOrderNo,
  orderCreateDate
}: any) {
  // 1
  const shippingAddress: string[] = [];
  shippingAddress.push(userInfo.firstName + " " + userInfo.lastName);
  const optionalAddress = userInfo.street;
  let addressString = userInfo.apartment;
  if (optionalAddress && optionalAddress !== "") {
    addressString = addressString + "," + optionalAddress;
  }
  shippingAddress.push(addressString);
  shippingAddress.push(
    `${userInfo.city},${userInfo.state} ${userInfo.zipCode}`
  );
  // 2电话和email
  const telAndEmail: string[] = [];
  telAndEmail.push(userInfo.userPhone);
  telAndEmail.push(userInfo.userEmail);

  // 3pay信息
  const paymentMethod: string[] = [];
  // paymentMethod.push("CREDIT_CARD");
  paymentMethod.push(paymentInfo.creditCardInfo);

  return {
    shippingAddress,
    telAndEmail,
    paymentMethod,
    orderNumber: groupOrderNo || "",
    orderDate: moment
      .tz(orderCreateDate, "America/Chicago")
      .format("MMM DD, YYYY")
  };
}

export function setOrderCache({ email, orderId }: any) {
  if (email && orderId) {
    const orderCache = {
      email,
      orderId
    };
    return setSession("orderCache", orderCache);
  } else {
    return false;
  }
}

export function getOrderCache() {
  return getFromSession("orderCache");
}
