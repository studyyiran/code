import { IOrderStore, IOrderDetail, IProgressType } from '@/containers/order/interface/order.inerface';
import { computed, action, observable } from 'mobx';
import { getOrderDetail } from '../api/order.api';
import OrderPlacedIcon from '@/images/order/orderPlaced.png';
import PackageSentIcon from '@/images/order/packageSent.png';
import PackageReceivedIcon from '@/images/order/packageReceived.png';
import InspectionCompleteIcon from '@/images/order/inspectionComplete.png';
import ListSaleIcon from '@/images/order/listForSale.png';
import OrderCompleteIcon from '@/images/order/orderComplete.png';
import ReturnRequestIcon from '@/images/order/returnRequest.png';


class Store implements IOrderStore {
    @observable public orderDetail = {} as IOrderDetail;

    // 用户信息
    @computed get userInformation() {
        const shippingAddress: string[] = [];
        const telAndEmail: string[] = [];
        const paymentMethod: string[] = [];
        if (this.orderDetail.orderNo) {
            // 缺少物流目的地
            console.error("缺少物流目的地");
            telAndEmail.push(this.orderDetail.userEmail);
            // 缺少tel，请找后台
            console.error("缺少tel，请找后台");
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
            model = this.orderDetail.orderItem.productName;
            carrier = "缺少运营商字段";
            console.error("缺少运营商字段");
            condition = this.orderDetail.orderItem.submitItems.map(t => t.isSkuProperty === true && t.name).join(",");
            guaranteedPrice = (this.orderDetail.orderItem.amount / 100).toString();
        }
        return {
            model,
            carrier,
            condition,
            guaranteedPrice,
        }
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
    @action public getOrderDetail = async (orderNo: string) => {
        try {
            const res = await getOrderDetail<IOrderDetail>(orderNo);
            this.orderDetail = res;
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}

export default new Store();