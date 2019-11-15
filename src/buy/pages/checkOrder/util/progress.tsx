import { IProgressDot, IProgressType } from "../interface/order.inerface";
import * as moment from "moment-timezone";
const OrderPlacedIcon = require("../static/orderPlaced.png"); // 1
const PackageSentIcon = require("../static/packageSent.png"); // 2
const PackageReceivedIcon = require("../static/packageReceived.png"); // 3 货物完成
const InspectionCompleteIcon = require("../static/inspectionComplete.png"); // ?
const ListSaleIcon = require("../static/listForSale.png"); // ?
const OrderCompleteIcon = require("../static/orderComplete.png"); // 总之完成了
const ReturnRequestIcon = require("../static/returnRequest.png"); // 要求退货

function statusToRoadMap(currentStatus: string): any[] {
  /*
TO_BE_SHIPPED(1, "To Be Shipped", "Order Placed"),
TO_BE_RECEIVED(2, "To Be Delivered", "Package Sent"),
TO_BE_COMFIRMED(3, "To Be Confirmed", "Package Delivered"),
TO_BE_RETURNED(4, "To Be Returned", "Return Requested"),
TO_BE_PLATFORM_RECEIVED(5, "To Be Received", "To Be Received"),
RETURN_FAILED(6, "Transaction Succeed", "Return Failed"),
TRANSACTION_FAILED(7, "Transaction Failed", "Transaction Failed"),
TRANSACTION_SUCCEED(8, "Transaction Success", "Transaction Success")
 */
  let dataList: IProgressDot[] = [
    {
      name: "Order Placed",
      img: OrderPlacedIcon
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
      name: "Inspection Completed",
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
  switch (currentStatus) {
    case "TO_BE_SHIPPED":
    case "TO_BE_RECEIVED":
    case "TO_BE_COMFIRMED":
    case "TRANSACTION_SUCCEED":
      // 普通状态
      dataList = [
        {
          name: "Order Placed",
          img: OrderPlacedIcon
        },
        {
          name: "Package Sent",
          img: PackageSentIcon
        },
        {
          name: "Package Delivered",
          img: OrderCompleteIcon
        }
      ];
      break;
    case "TRANSACTION_FAILED":
      // 2图标取消
      dataList = [
        {
          name: "Order Placed",
          img: OrderPlacedIcon
        },
        {
          name: "Order Refunded",
          img: OrderCompleteIcon
        }
      ];
      break;
    case "TO_BE_RETURNED":
    case "TO_BE_PLATFORM_RECEIVED":
    case `NUMBER9_RETURN_COMPLETE`:
      // 退货成功
      dataList = [
        {
          name: "Order Placed",
          img: OrderPlacedIcon
        },
        {
          name: "Package Sent",
          img: PackageSentIcon
        },
        {
          name: "Package Delivered",
          img: OrderCompleteIcon
        },
        {
          name: "Return Requested",
          img: ReturnRequestIcon
        },
        {
          name: "Return Complete",
          img: OrderCompleteIcon
        }
      ];
      break;
    case "RETURN_FAILED":
      // 退货失败
      dataList = [
        {
          name: "Order Placed",
          img: OrderPlacedIcon
        },
        {
          name: "Package Sent",
          img: PackageSentIcon
        },
        {
          name: "Package Delivered",
          img: OrderCompleteIcon
        },
        {
          name: "Return Requested",
          img: ReturnRequestIcon
        },
        {
          name: "Return Failed",
          img: OrderCompleteIcon
        }
      ];
      break;
    default:
    // 普通状态

    // 退货1
  }
  return dataList;
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
  let dataList = statusToRoadMap(subOrderStatus);
  if (orderStatusHistories && orderStatusHistories.length > 0) {
    dataList = dataList.map((roadMapInfo: any, index: number) => {
      if (orderStatusHistories[index]) {
        return {
          ...roadMapInfo,
          name: roadMapInfo.name,
          img: OrderPlacedIcon,
          date: packageDate(orderStatusHistories[index].date)
        };
      } else {
        return roadMapInfo;
      }
    });
  }

  // 确认当前的
  if (orderStatusHistories && orderStatusHistories.length) {
    currentIndex = orderStatusHistories.findIndex((order: any) => {
      // 如果是9
      if (subOrderStatus === "NUMBER9_RETURN_COMPLETE") {
        return order.orderStatus === "TRANSACTION_FAILED";
      } else {
        return order.orderStatus === subOrderStatus;
      }
    });
  }

  return {
    currentIndex,
    dataList
  };
}

export function statusToRenderConfig(currentStatus: string) {
  let config = {
    cancelButton: false,
    showDeliverStatus: false,
    returnButton: false,
    printLabelbutton: false,
    returnTips: false,
    showReturnPrice: false
  };
  switch (currentStatus) {
    // 可以取消
    case "TO_BE_SHIPPED": {
      config.cancelButton = true;
      break;
    }
    case "TO_BE_RECEIVED": {
      config.showDeliverStatus = true;
      break;
    }
    case "TO_BE_COMFIRMED": {
      config.returnButton = true;
      config.showDeliverStatus = true;
      break;
    }
    // 退货
    case "TO_BE_RETURNED": {
    }
    case "TO_BE_PLATFORM_RECEIVED": {
      config.printLabelbutton = true;
      config.returnTips = true;
      break;
    }
    case "RETURN_FAILED": {
      break;
    }
    case "TRANSACTION_FAILED": {
      break;
    }
    case "TRANSACTION_SUCCEED": {
      config.showDeliverStatus = true;
      break;
    }
    case "NUMBER9_RETURN_COMPLETE": {
      config.showReturnPrice = true;
    }
    default:
  }
  return config;
}

export function packageDate(b: string | undefined) {
  if (b) {
    const date = moment.tz(b, "America/Chicago");
    return date.format("MMM DD");
  }
  return b;
}
