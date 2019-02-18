import { Request } from "utils";
import { IOpts } from '@/utils/request.interface';

// 获取订单详情
export function getOrderDetail<T>(email: string, orderNo: string): Promise<T> {
    const opts: IOpts = {
        method: "POST",
        url: `/orders/check`,
        params: {
            email,
            orderNo
        },
        loading: true,
        isMock: true
    };

    return Request<T>(opts);
}

// 获取物流
export function getTranshipping<T>(carrier: string, trackingNumber: string): Promise<T> {
    const opts: IOpts = {
        url: `/shippo/track`,
        params: {
            carrier,
            trackingNumber
        },
        loading: true,
        isMock: true
    };

    return Request<T>(opts);
}

// 接受质检报价
export function approveRevisedPrice<T>(orderNo: string): Promise<T> {
    const opts: IOpts = {
        method: "POST",
        url: `/orders/confirm`,
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
    const opts: IOpts = {
        method: "POST",
        url: `/orders/applyReturn`,
        params: {
            orderNo
        },
        loading: true,
        isMock: true
    };

    return Request<T>(opts);
}