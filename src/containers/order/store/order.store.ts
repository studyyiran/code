import {
  IOrderStore,
  IOrderDetail,
  IProgressType,
  IShippingAddress,
  IInspectionData,
  ITrackingModel,
  IProgressDot,
  IOrderRecord
} from "@/containers/order/interface/order.inerface";
import { computed, action, observable } from "mobx";
import * as OrderApi from "../api/order.api";
import OrderPlacedIcon from "@/images/order/orderPlaced.png";
import PackageSentIcon from "@/images/order/packageSent.png";
import PackageReceivedIcon from "@/images/order/packageReceived.png";
import InspectionCompleteIcon from "@/images/order/inspectionComplete.png";
import ListSaleIcon from "@/images/order/listForSale.png";
import OrderCompleteIcon from "@/images/order/orderComplete.png";
import ReturnRequestIcon from "@/images/order/returnRequest.png";
import * as moment from "moment-timezone";
import { noteUserModal } from '@/containers/aboutphone/pageValidate';
import { DEFAULT } from 'config';
moment.locale("en");

class Store implements IOrderStore {
  // 订单编号
  @observable public orderNo = "";
  // 订单email
  @observable public email = "";
  // 订单详情
  @observable public orderDetail = {} as IOrderDetail;
  // 订单物流
  @observable public trackingInfo: ITrackingModel | null = null;

  // 用户信息
  @computed get userInformation() {
    const shippingAddress: string[] = [];
    const telAndEmail: string[] = [];
    const paymentMethod: string[] = [];
    if (this.orderDetail.orderNo) {
      // 缺少物流目的地
      const addressInfo = this.orderDetail.addressInfo;
      shippingAddress.push(addressInfo.firstName + " " + addressInfo.lastName);
      shippingAddress.push(addressInfo.addressLine);
      if (
        addressInfo.addressLineOptional &&
        addressInfo.addressLineOptional !== ""
      ) {
        shippingAddress.push(addressInfo.addressLineOptional);
      }
      shippingAddress.push(addressInfo.city + "," + addressInfo.state);
      shippingAddress.push(addressInfo.zipCode);
      // 电话和email
      telAndEmail.push(addressInfo.mobile);
      telAndEmail.push(this.orderDetail.userEmail);
      if (this.orderDetail.payment === "PAYPAL") {
        paymentMethod.push("PayPal");
        paymentMethod.push(this.orderDetail.paypalInfo.email);
      }
      if (this.orderDetail.payment === "CHECK") {
        paymentMethod.push("eCheck");
        paymentMethod.push(this.orderDetail.checkInfo.email);
      }
    }
    return {
      shippingAddress,
      telAndEmail,
      paymentMethod,
      orderNumber: this.orderDetail.orderNo || "",
      orderDate: moment
        .tz(this.orderDetail.createdDt, "America/Chicago")
        .format("MMMM Do, YYYY")
    };
  }

  // 机型信息
  @computed get machineInfo() {
    let model = "";
    let carrier = "";
    let condition = "";
    let guaranteedPrice = "";
    if (this.orderDetail.orderNo) {
      const orderItem = this.orderDetail.orderItem;
      if (orderItem.product && !orderItem.product.isTBD) {
        model = orderItem.product.name;
        carrier = this.referenceEnumToCarrier(orderItem.carrier);
        condition = orderItem.pricePropertyValues.map(t => t.value).join(",");
        guaranteedPrice = `$${orderItem.amountDollar}`;
      } else {
        // TBD
        model = "Other Phone";
        guaranteedPrice = "TBD";
      }
    }
    return {
      model,
      carrier,
      condition,
      guaranteedPrice
    };
  }
  // 物流信息
  @computed get deliverInfos() {
    const infos: IShippingAddress[] = [];
    if (this.trackingInfo) {
      this.trackingInfo.trackingHistory.map(t => {
        const time = moment.tz(
          t.objectUpdated || t.objectCreated,
          "America/Chicago"
        );
        const now = new Date();
        let dateStr = time.format("MMM DD");
        if (time.year() !== now.getFullYear()) {
          dateStr = time.format("YYYY MMM DD");
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
      if (this.orderDetail.status === IProgressType.TRANSACTION_FAILED) {
        let timeStr = this.orderDetail.updatedDt;
        const timeforreturn = this.orderDetail.orderRecords.find(
          z =>
            z.beforeStatus === IProgressType.DIFFERENCE_INSPECTED &&
            z.afterStatus === IProgressType.TO_BE_RETURNED
        );
        if (timeforreturn) {
          timeStr = timeforreturn.createdDt;
        }
        const time = moment.tz(timeStr, "America/Chicago");
        const now = new Date();
        let dateStr = time.format("MMM DD");
        if (time.year() !== now.getFullYear()) {
          dateStr = time.format("YYYY MMM DD");
        }
        infos.push({
          date: dateStr,
          listData: [
            {
              time: time.format("h:mm A"),
              listData: ["Shipment order placed"]
            },
            {
              time: time.format("h:mm A"),
              listData: ["Package is picked up"]
            }
          ]
        });
      }
    }
    return infos;
  }
  // 物流单号
  @computed get deliverNoInfo() {
    let carrier = null;
    let trackingNumber = null;
    if (this.orderDetail.orderNo) {
      if (this.orderDetail.shippoTransaction) {
        carrier = this.orderDetail.shippoTransaction.carrier;
        trackingNumber = this.orderDetail.shippoTransaction.trackingNumber;
      }
      // 是否为物品退还
      if (
        this.orderDetail.status === IProgressType.TO_BE_RETURNED ||
        this.orderDetail.status === IProgressType.TRANSACTION_FAILED
      ) {
        carrier = this.orderDetail.ext.returnExpressInfo.carrier;
        trackingNumber = this.orderDetail.ext.returnExpressInfo.trackingNumber;
      }
    }
    return {
      carrier,
      trackingNumber
    };
  }
  // 质检结果
  @computed get inspectionInfo() {
    const data: IInspectionData = {
      diffStatus: "success",
      productName: "",
      differenceText: "Matched",
      amount: 0,
      revisedPrice: 0,
      differentCondition: []
    };
    const orderDetail = this.orderDetail;
    if (orderDetail.orderNo) {
      const orderItem = orderDetail.orderItem;
      data.revisedPrice = orderItem.actualAmountDollar;
      data.amount = orderItem.amountDollar;
      if (
        orderItem.inspectResult &&
        orderItem.inspectResult.result !== "MATCHED"
      ) {
        data.diffStatus = "fail";
        data.differenceText =
          orderItem.inspectResult.result === "WRONG_CONDITION"
            ? "Wrong Condition"
            : "Wrong Product";
        orderItem.inspectResult.diffs.map(v => {
          if (!v.matched) {
            data.differentCondition.push(v.actualValueName);
          }
        });
        if (orderItem.inspectResult.result === "WRONG_PRODUCT") {
          data.productName = orderItem.actualProductName;
        }
      }
    }
    return data;
  }
  @computed get paymentInfo() {
    const payment = {
      finalSalePrice: 0,
      priceGuarantee: 0,
      priceGuaranteeStatus: false, // 支付状态
      bonus: 0,
      bonusStatus: false
    };
    const orderPaymentBills = this.orderDetail.orderPaymentBills;
    if (orderPaymentBills.length > 0) {
      orderPaymentBills.map(t => {
        if (t.payFor === "RESERVE_PRICE") {
          payment.priceGuarantee = t.amountDollar || 0;
          if (t.status === "SUCCESS") {
            payment.priceGuaranteeStatus = true;
          }
        }
        if (t.payFor === "HAMMER_ADDITIONAL") {
          payment.bonus = t.amountDollar || 0;
          if (t.status === "SUCCESS") {
            payment.priceGuaranteeStatus = true;
            payment.bonusStatus = true;
          }
        }
      });
    }
    // 如果保底金为0，表示没有待支付订单，取质检价格作为保底金
    payment.priceGuarantee = this.orderDetail.orderItem.actualAmountDollar;
    payment.finalSalePrice = payment.priceGuarantee + payment.bonus;
    return payment;
  }
  // 构建进度条需要的数据
  @computed get progressType() {
    let currentIndex = 0;
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
        name: "Order Completed",
        img: OrderCompleteIcon
      }
    ];
    const orderRecords = this.orderDetail.orderRecords;
    if (orderRecords && orderRecords.length > 0) {
      dataList = [
        {
          name: "Order Placed",
          img: OrderPlacedIcon,
          date: this.packageDate(this.orderDetail.createdDt)
        },
        {
          name: "Package Sent",
          img: PackageSentIcon,
          date: this.packageDate(this.findDate(IProgressType.TO_BE_SHIPPED))
        },
        {
          name: "Package Received",
          img: PackageReceivedIcon,
          date: this.packageDate(this.findDate(IProgressType.TO_BE_RECEIVED))
        },
        {
          name: "Inspection Completed",
          img: InspectionCompleteIcon,
          date: this.packageDate(this.findDate(IProgressType.TO_BE_INSPECTED))
        },
        {
          name: "Listed For Sale",
          img: ListSaleIcon,
          date: this.packageDate(
            this.findDate(
              IProgressType.LISTED_FOR_SALE,
              IProgressType.LISTED_FOR_SALE
            )
          )
        },
        {
          name: "Order Completed",
          img: OrderCompleteIcon,
          date: this.packageDate(
            this.findDate(
              IProgressType.LISTED_FOR_SALE,
              IProgressType.TRANSACTION_SUCCEED
            )
          )
        }
      ];
    }
    // 退货
    if (
      this.orderDetail.status === IProgressType.TO_BE_RETURNED ||
      this.orderDetail.status === IProgressType.TRANSACTION_FAILED
    ) {
      dataList[4] = {
        name: "Return Requested",
        img: ReturnRequestIcon,
        date: this.packageDate(
          this.findDate(IProgressType.DIFFERENCE_INSPECTED)
        )
      };
      dataList[5] = {
        name: "Product Dispatched",
        img: PackageReceivedIcon,
        date: this.packageDate(this.findDate(IProgressType.TO_BE_RETURNED))
      };
    }
    switch (this.orderDetail.status) {
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
  @action public getOrderDetail = async (email: string, orderNo: string) => {
    try {
      const res = await OrderApi.getOrderDetail<IOrderDetail>(email, orderNo);
      // 存储orderNo,email
      this.orderNo = orderNo;
      this.email = email;
      // 查看是否需要获取物流信息
      if (res.shippoTransaction) {
        if (
          res.status === IProgressType.TO_BE_INSPECTED ||
          res.status === IProgressType.TO_BE_RECEIVED
        ) {
          const shippoTransaction = res.shippoTransaction;
          const trans = await OrderApi.getTranshipping<ITrackingModel>(
            shippoTransaction.carrier,
            shippoTransaction.trackingNumber
          );
          if (trans.trackingNumber) {
            this.trackingInfo = trans;
          }
        }
      }
      return res;
    } catch (e) {
      console.error(e);
      return {} as IOrderDetail;
    }
  };
  // 采用一次性token兑换订单详情
  @action public getOrderDetailByToken = async (token: string) => {
    try {
      const res = await OrderApi.getOrderDetailByToken<IOrderDetail>(token);
      // 保存订单详情
      this.setOrderDetail(res);
      // 存储orderNo,email
      this.orderNo = res.orderNo;
      this.email = res.userEmail;
      // 查看是否需要获取物流信息
      if (res.shippoTransaction) {
        if (
          res.status === IProgressType.TO_BE_INSPECTED ||
          res.status === IProgressType.TO_BE_RECEIVED
        ) {
          const shippoTransaction = res.shippoTransaction;
          const trans = await OrderApi.getTranshipping<ITrackingModel>(
            shippoTransaction.carrier,
            shippoTransaction.trackingNumber
          );
          if (trans.trackingNumber) {
            this.trackingInfo = trans;
          }
        }
      }
      // 保存登陆信息
      this.autoSaveLoginMes();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  // 保存登陆信息
  @action public autoSaveLoginMes = () => {
    window.sessionStorage.setItem("bmb-us-email", this.email);
    window.sessionStorage.setItem("bmb-us-orderNo", this.orderNo);
  };
  // 自动登陆
  @action public autoLogin = async () => {
    const email = window.sessionStorage.getItem("bmb-us-email");
    const orderNo = window.sessionStorage.getItem("bmb-us-orderNo");
    if (email && orderNo) {
      const bOrder = await this.getOrderDetail(email, orderNo);
      this.setOrderDetail(bOrder);
      // 自动登陆失败
      if (!bOrder.orderNo) {
        return false;
      }
      return true;
    } else {
      // 没有自动登录用户
      return false;
    }
  };
  // 保存订单详情
  @action public setOrderDetail = (b: IOrderDetail) => {
    // 检测是否为空对象的兼容数据
    if (b.orderNo) {
      this.orderDetail = b;
    }
  };
  @action public approveRevisedPrice = async () => {
    try {
      const res = await OrderApi.approveRevisedPrice<IOrderDetail>(
        this.email,
        this.orderNo
      );
      // 更新订单详情
      this.orderDetail = res;
      return true;
    } catch (e) {
      console.error(e);
      this.tellUserToReportError(e);
      return false;
    }
  };
  @action public returnProduct = async () => {
    try {
      const res = await OrderApi.returnProduct<IOrderDetail>(
        this.email,
        this.orderNo
      );
      // 更新订单详情
      this.orderDetail = res;
      return true;
    } catch (e) {
      console.error(e);
      this.tellUserToReportError(e);
      return false;
    }
  };
  @action public tellUserToReportError = (error: any) => {
    noteUserModal({
      content: error['resultMessage'],
      type: 'confirm',
      okText: 'OK',
      hasCountDown: false,
      onOk: () => {
        const aDOM = document.createElement('a');
        aDOM.style.display = 'none';
        aDOM.id = 'AFOREMAIL';
        aDOM.setAttribute('href', `mailto:${DEFAULT.supportEmail}`);
        document.body.appendChild(aDOM);

        const adom = document.getElementById('AFOREMAIL');
        if (adom) {
          adom.click();
          document.body.removeChild(adom);
        }
      }
    });
  }
  private packageDate(b: string | undefined) {
    if (b) {
      const date = moment.tz(b, "America/Chicago");
      return date.format("MMM DD");
    }
    return b;
  }
  private findDate(status: IProgressType, afterStatus?: IProgressType) {
    const orderRecords = this.orderDetail.orderRecords;
    let target: IOrderRecord | null;
    if (afterStatus) {
      target = this.findFirstEleFromTarget(
        orderRecords,
        t => t.beforeStatus === status && t.afterStatus === afterStatus
      );
    } else {
      target = this.findFirstEleFromTarget(
        orderRecords,
        t => t.beforeStatus === status
      );
    }
    return (target && target.createdDt) || undefined;
  }
  private findFirstEleFromTarget<T>(b: T[] = [], f: (c: T) => boolean) {
    const vArray = b.filter(f);
    if (vArray.length > 0) {
      return vArray[0];
    }
    return null;
  }
  private referenceEnumToCarrier(carrer: string) {
    enum data {
      ATT = "AT&T",
      UNLOCKED = "Unlocked",
      TMOBILE = "T-Mobile",
      SPRINT = "Sprint",
      OTHERS = "Others",
      VERIZON = "Verizon"
    }
    return data[carrer];
  }
}

export default new Store();
