import { IProgressDot, IProgressType } from "../interface/order.inerface";
const OrderPlacedIcon = require("../static/orderPlaced.png"); // 1
const PackageSentIcon = require("../static/packageSent.png"); // 2
const PackageReceivedIcon = require("../static/packageReceived.png"); // 3 货物完成
const InspectionCompleteIcon = require("../static/inspectionComplete.png"); // ?
const ListSaleIcon = require("../static/listForSale.png"); // ?
const OrderCompleteIcon = require("../static/orderComplete.png"); // 总之完成了
const ReturnRequestIcon = require("../static/returnRequest.png"); // 要求退货
const { packageDate } = require("./index");

const NUMBER9_RETURN_COMPLETE = "NUMBER9_RETURN_COMPLETE";

function statusToRoadMap(currentStatus: string): any[] {
  // 做出区分
  if (currentStatus === "TRANSACTION_SUCCEED") {
    if (false) {
      currentStatus = "NUMBER9_RETURN_COMPLETE";
    }
  }
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
          name: "Order Cancelled",
          img: OrderCompleteIcon
        }
      ];
      break;
    default:
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
          name: "name",
          img: OrderPlacedIcon,
          date: "date"
        };
      } else {
        return roadMapInfo;
      }
    });
  }

  // 确认当前的
  if (orderStatusHistories && orderStatusHistories.length) {
    currentIndex = orderStatusHistories.findIndex((order: any) => {
      return order.status === subOrderStatus;
    });
  }

  return {
    currentIndex,
    dataList
  };
}

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
    case "TO_BE_SHIPPED": {
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
