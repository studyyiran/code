import {
  IProgressType,
  IShippingAddress,
  IProgressDot
} from "@/containers/order/interface/order.inerface";
import * as moment from "moment-timezone";
import OrderPlacedIcon from "@/images/order/orderPlaced.png";
import PackageSentIcon from "@/images/order/packageSent.png";
import PackageReceivedIcon from "@/images/order/packageReceived.png";
import InspectionCompleteIcon from "@/images/order/inspectionComplete.png";
import ListSaleIcon from "@/images/order/listForSale.png";
import OrderCompleteIcon from "@/images/order/orderComplete.png";
import ReturnRequestIcon from "@/images/order/returnRequest.png";

export function getReactNodeConfig(status: any) {
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
  if (status === IProgressType.TRANSACTION_FAILED) {
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

export function packageDate(b: string | undefined) {
  if (b) {
    const date = moment.tz(b, "America/Chicago");
    return date.format("MMM DD");
  }
  return b;
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

  // 3
  const paymentMethod: string[] = [];
  if (paymentInfo.payment === "PAYPAL") {
    paymentMethod.push("PayPal");
    paymentMethod.push(paymentInfo.payPalInfo.email);
  }
  if (paymentInfo.payment === "CHECK") {
    paymentMethod.push("eCheck");
    paymentMethod.push(paymentInfo.checkInfo.email);
  }
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

function findDate(status: IProgressType, orderStatusHistories: any) {
  // if (status === IProgressType.TO_BE_LISTED) {
  // debugger;
  // }
  function findFirstEleFromTarget(b: any, f: any) {
    const vArray = b.filter(f);
    if (vArray.length > 0) {
      return vArray[0];
    }
    return null;
  }
  const orderRecords: any = orderStatusHistories;
  const target = findFirstEleFromTarget(
    orderRecords,
    (t: any) => t.orderStatus === status
  );
  return (target && target.date) || undefined;
}

export function getProgressType({
  orderStatusHistories,
  orderCreateDate,
  subOrderStatus,
  subOrderStatusDisplayName
}: {
  orderStatusHistories: any;
  orderCreateDate: any;
  subOrderStatus: any;
  subOrderStatusDisplayName: any;
}) {
  let currentIndex = 0;
  let dataList: IProgressDot[] = [
    {
      name: "Order Placed",
      img: OrderPlacedIcon
      // date: packageDate(orderCreateDate)
    },
    {
      name: "Package Sent",
      img: PackageSentIcon
    },
    {
      name: "Package Received",
      img: PackageReceivedIcon
    },
    {
      name: "Payment Sent",
      img: InspectionCompleteIcon
    },
    {
      name: "Listed For Sale",
      img: ListSaleIcon
    },
    {
      name: "Device Sold",
      img: OrderCompleteIcon
    }
  ];
  if (orderStatusHistories && orderStatusHistories.length > 0) {
    dataList = [
      {
        name: "Order Placed",
        img: OrderPlacedIcon,
        date: packageDate(orderCreateDate)
      },
      {
        name: "Package Sent",
        img: PackageSentIcon,
        date: packageDate(
          findDate(IProgressType.TO_BE_RECEIVED, orderStatusHistories)
        )
      },
      {
        name: "Package Received",
        img: PackageReceivedIcon,
        date: packageDate(
          findDate(IProgressType.TO_BE_INSPECTED, orderStatusHistories)
        )
      },
      {
        name: "Payment Sent",
        img: InspectionCompleteIcon,
        date: packageDate(
          findDate(IProgressType.TO_BE_LISTED, orderStatusHistories)
        )
      },
      {
        name: "Listed For Sale",
        img: ListSaleIcon,
        date: packageDate(
          findDate(IProgressType.LISTED_FOR_SALE, orderStatusHistories)
        )
      },
      {
        name: "Device Sold",
        img: OrderCompleteIcon,
        date: packageDate(
          findDate(IProgressType.TRANSACTION_SUCCEED, orderStatusHistories)
        )
      }
    ];
  }
  // 退货
  if (
    subOrderStatus === IProgressType.TO_BE_RETURNED ||
    subOrderStatus === IProgressType.TRANSACTION_FAILED
  ) {
    dataList[3] = {
      name: "Difference Inspected",
      img: PackageReceivedIcon,
      date: packageDate(
        findDate(IProgressType.DIFFERENCE_INSPECTED, orderStatusHistories)
      )
    };
    dataList[4] = {
      name: "Return Requested",
      img: ReturnRequestIcon,
      date: packageDate(
        findDate(IProgressType.TO_BE_RETURNED, orderStatusHistories)
      )
    };
    dataList[5] = {
      name: IProgressType.TRANSACTION_FAILED === subOrderStatus ? subOrderStatusDisplayName : "Transaction Failed",
      img: PackageReceivedIcon,
      date: packageDate(
        findDate(IProgressType.TRANSACTION_FAILED, orderStatusHistories)
      )
    };
  }
  /*
  TO_BE_SHIPPED(1,"Order Placed"),
    TO_BE_RECEIVED(2,"Package Sent"),
    TO_BE_INSPECTED(3,"Package Received"),
    DIFFERENCE_INSPECTED(4,"Difference Inspected"),
    TO_BE_RETURNED(5,"Return Requested"),
    TRANSACTION_FAILED(6,"Transaction Failed"),
    LISTED_FOR_SALE(7,"Listed for Sale"),
    TRANSACTION_SUCCEED(8,"Device Sold"),
    TO_BE_LISTED(9,"Payment Sent"),
   */
  switch (subOrderStatus) {
    case IProgressType.TO_BE_SHIPPED:
      currentIndex = 0;
      break;
    case IProgressType.TO_BE_RECEIVED:
      currentIndex = 1;
      break;
    case IProgressType.TO_BE_INSPECTED:
      currentIndex = 2;
      break;
    case IProgressType.DIFFERENCE_INSPECTED:
      // DIFFERENCE_INSPECTED的情况下替换一下.
      dataList[3] = {
        name: "Difference Inspected",
        img: PackageReceivedIcon,
        date: packageDate(
          findDate(IProgressType.DIFFERENCE_INSPECTED, orderStatusHistories)
        )
      };
      currentIndex = 3;
      break;
    case IProgressType.TO_BE_LISTED:
      currentIndex = 3;
      break;
    case IProgressType.LISTED_FOR_SALE:
      currentIndex = 4;
      break;
    case IProgressType.TRANSACTION_SUCCEED:
      currentIndex = 5;
      break;
    // 退回商品
    case IProgressType.TO_BE_RETURNED:
      currentIndex = 4;
      break;
    case IProgressType.TRANSACTION_FAILED:
      currentIndex = 5;
      break;
  }
  return {
    currentIndex,
    dataList
  };
}

export function setOrderCache({ email, orderId }: any) {
  if (email && orderId) {
    const orderCache = {
      email,
      orderId
    };
    sessionStorage.setItem("orderCache", JSON.stringify(orderCache));
  }
}

export function getOrderCache() {
  const data: any = sessionStorage.getItem("orderCache");
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}
