import { Request } from "utils";
import { IOpts } from '@/utils/request.interface';

// 获取订单详情
export function getOrderDetail<T>(orderNo: string): Promise<T> {
    const opts: IOpts = {
        method: "POST",
        url: `/orders/check`,
        params: {
            orderNo
        },
        loading: true,
        isMock: true
    };

    return Request<T>(opts);
}

// 接受质检报价
export function approveRevisedPrice<T>(orderNo: string): Promise<T> {
    console.error("接受质检报价的接口暂未提供");
    const opts: IOpts = {
        method: "POST",
        url: `/orders/check`,
        params: {
            orderNo
        },
        loading: true,
        isMock: true
    };

    return Request<T>(opts);
}

// 退回商品
export function returnProduct<T>(orderNo: string): Promise<T> {
    console.error("商品退货的接口暂未提供");
    const opts: IOpts = {
        method: "POST",
        url: `/orders/check`,
        params: {
            orderNo
        },
        loading: true,
        isMock: true
    };

    return Request<T>(opts);
}