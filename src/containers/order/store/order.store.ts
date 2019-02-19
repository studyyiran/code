import { IOrderStore, IOrderDetail, IProgressType, IShippingAddress, IInspectionData, ITrackingModel } from '@/containers/order/interface/order.inerface';
import { computed, action, observable } from 'mobx';
import * as OrderApi from '../api/order.api';
import { getMonthEn, getHourBy12 } from '@/utils/function';
import OrderPlacedIcon from '@/images/order/orderPlaced.png';
import PackageSentIcon from '@/images/order/packageSent.png';
import PackageReceivedIcon from '@/images/order/packageReceived.png';
import InspectionCompleteIcon from '@/images/order/inspectionComplete.png';
import ListSaleIcon from '@/images/order/listForSale.png';
import OrderCompleteIcon from '@/images/order/orderComplete.png';
import ReturnRequestIcon from '@/images/order/returnRequest.png';


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
            if (addressInfo.addressLineOptional && addressInfo.addressLineOptional !== "") {
                shippingAddress.push(addressInfo.addressLineOptional);
            }
            shippingAddress.push(addressInfo.addressLine);
            shippingAddress.push(addressInfo.city + "," + addressInfo.country);
            shippingAddress.push(addressInfo.zipCode);
            // 电话和email
            telAndEmail.push(addressInfo.mobile);
            telAndEmail.push(this.orderDetail.userEmail);
            if (this.orderDetail.payment === "PAYPAL") {
                paymentMethod.push("PayPal");
                paymentMethod.push(this.orderDetail.paypalInfo.email);
            }
            if (this.orderDetail.payment === "CHECK") {
                paymentMethod.push("Check");
                paymentMethod.push(this.orderDetail.checkInfo.card);
            }
        }
        return {
            shippingAddress,
            telAndEmail,
            paymentMethod,
            orderNumber: this.orderDetail.orderNo || "",
            orderDate: this.orderDetail.updatedDt || "",
        }
    }

    // 机型信息
    @computed get machineInfo() {
        let model = '';
        let carrier = '';
        let condition = '';
        let guaranteedPrice = '';
        if (this.orderDetail.orderNo) {
            const orderItem = this.orderDetail.orderItem;
            model = orderItem.productName;
            carrier = orderItem.carrier === "ATT" ? "ATT&T" : orderItem.carrier;
            condition = orderItem.submitItems.map(t => t.isSkuProperty === true && t.name).join(",");
            guaranteedPrice = (orderItem.amount / 100).toString();
        }
        return {
            model,
            carrier,
            condition,
            guaranteedPrice,
        }
    }
    // 物流信息
    @computed get deliverInfos() {
        const infos: IShippingAddress[] = [];
        if (this.trackingInfo) {
            this.trackingInfo.trackingHistory.map(t => {
                const time = new Date(t.objectUpdated || t.objectCreated);
                const now = new Date();
                let dateStr = "";
                if (time.getFullYear() !== now.getFullYear()) {
                    dateStr += time.getFullYear() + " ";
                }
                dateStr = dateStr + getMonthEn(time) + " " + time.getDate();
                const timeBy12 = getHourBy12(time);
                infos.push({
                    date: dateStr,
                    listData: [{
                        time: timeBy12.hour + " " + timeBy12.part,
                        listData: [t.statusDetails, t.location.city + "," + t.location.country]
                    }]
                });
                return true;
            });
        }
        return infos;
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
        }
        const orderDetail = this.orderDetail;
        if (orderDetail.orderNo) {
            const orderItem = orderDetail.orderItem;
            data.revisedPrice = orderItem.actualAmount;
            data.amount = orderItem.amount;
            if (orderItem.inspectResult && orderItem.inspectResult.result !== "MATCHED") {
                data.diffStatus = "fail";
                data.differenceText = orderItem.inspectResult.result === "WRONG_CONDITION" ? "Wrong Condition" : "Wrong Product";
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
    // 构建进度条需要的数据
    @computed get progressType() {
        let currentIndex = 0;
        const dataList = [{
            name: "Order Placed",
            img: OrderPlacedIcon
        }, {
            name: "Package Sent",
            img: PackageSentIcon
        }, {
            name: "Package Recived",
            img: PackageReceivedIcon
        }, {
            name: "Inspection Completed",
            img: InspectionCompleteIcon
        }, {
            name: "Listed For Sale",
            img: ListSaleIcon
        }, {
            name: "Order Completed",
            img: OrderCompleteIcon
        }];
        // 退货
        if (this.orderDetail.status === IProgressType.TO_BE_RETURNED || this.orderDetail.status === IProgressType.TRANSACTION_FAILED) {
            dataList[4] = {
                name: "Return Requested",
                img: ReturnRequestIcon
            };
            dataList[5] = {
                name: "Product Dispatched",
                img: PackageReceivedIcon
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
        }
    }
    @action public getOrderDetail = async (email: string, orderNo: string) => {
        try {
            const res = await OrderApi.getOrderDetail<IOrderDetail>(email, orderNo);
            // 存储orderNo,email
            this.orderNo = orderNo;
            this.email = email;
            // 查看是否需要获取物流信息
            if (res.shippoTransaction) {
                if (res.status === IProgressType.TO_BE_INSPECTED || res.status === IProgressType.TO_BE_RECEIVED) {
                    const shippoTransaction = res.shippoTransaction;
                    const trans = await OrderApi.getTranshipping<ITrackingModel>(shippoTransaction.carrier, shippoTransaction.trackingNumber);
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
    }
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
                if (res.status === IProgressType.TO_BE_INSPECTED || res.status === IProgressType.TO_BE_RECEIVED) {
                    const shippoTransaction = res.shippoTransaction;
                    const trans = await OrderApi.getTranshipping<ITrackingModel>(shippoTransaction.carrier, shippoTransaction.trackingNumber);
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
    }
    // 保存登陆信息
    @action public autoSaveLoginMes = () => {
        window.sessionStorage.setItem("bmb-us-email", this.email);
        window.sessionStorage.setItem("bmb-us-orderNo", this.orderNo);
    }
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
    }
    // 保存订单详情
    @action public setOrderDetail = (b: IOrderDetail) => {
        // 检测是否为空对象的兼容数据
        if (b.orderNo) {
            this.orderDetail = b;
        }
    }
    @action public approveRevisedPrice = async () => {
        try {
            const res = await OrderApi.approveRevisedPrice<IOrderDetail>(this.orderNo);
            // 更新订单详情
            this.orderDetail = res;
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    @action public returnProduct = async () => {
        try {
            const res = await OrderApi.returnProduct<IOrderDetail>(this.orderNo);
            // 更新订单详情
            this.orderDetail = res;
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}

export default new Store();