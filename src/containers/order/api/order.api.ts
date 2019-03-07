import { Request } from "utils";
import { IOpts } from "@/utils/request.interface";

// 获取订单详情
export function getOrderDetail<T>(
  userEmail: string,
  orderNo: string
): Promise<T> {
  const opts: IOpts = {
    method: "POST",
    url: `/orders/check`,
    params: {
      userEmail,
      orderNo
    },
    loading: false
  };
  return Request<T>(opts);
}

// 采用一次性token获取订单详情
export function getOrderDetailByToken<T>(token: string): Promise<T> {
  const opts: IOpts = {
    method: "GET",
    url: `/orders/token/${token}`,
    loading: false
  };
  return Request<T>(opts, [201]); // 201表示token已经被使用过了
}

// 获取物流
export function getTranshipping<T>(
  carrier: string,
  trackingNumber: string
): Promise<T> {
  const opts: IOpts = {
    url: `/shippo/track`,
    params: {
      carrier,
      trackingNumber
    },
    loading: false
  };

  return Request<T>(opts);
}

// 接受质检报价
export function approveRevisedPrice<T>(
  userEmail: string,
  orderNo: string
): Promise<T> {
  const opts: IOpts = {
    method: "POST",
    url: `/orders/confirm`,
    params: {
      orderNo,
      userEmail
    },
    loading: false
  };

  return Request<T>(opts);
}

// 退回商品
export function returnProduct<T>(
  userEmail: string,
  orderNo: string
): Promise<T> {
  const opts: IOpts = {
    method: "POST",
    url: `/orders/applyReturn`,
    params: {
      orderNo,
      userEmail
    },
    loading: false
  };

  return Request<T>(opts);
}
