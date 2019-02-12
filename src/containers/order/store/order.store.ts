import { IOrderStore } from '@/containers/order/interface/order.inerface';
import { computed, action } from 'mobx';
import { getOrderDetail } from '../api/order.api';

class Store implements IOrderStore {

    @computed get userInformation() {
        return {
            shippingAddress: [],
            telAndEmail: [],
            paymentMethod: [],
            orderNumber: "",
            orderDate: "",
        }
    }
    @computed get machineInfo() {
        return {
            model: " ",
            carrier: " ",
            condition: " ",
            guaranteedPrice: " ",
        }
    }
    @computed get progressType() {
        return {
            currentIndex: 1,
            dataList: []
        }
    }

    @action public getOrderDetail = async () => {
        const res = await getOrderDetail();
        console.log(res);
    }
}

export default new Store();