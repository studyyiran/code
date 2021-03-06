import { Request } from "utils";
import { IOpts } from "utils/request.interface";
import { requestGetResponse, requestWrapper } from "utils/util";

// 新的获取订单详情
export function checkForOrder<T>(userEmail: string, groupOrderNo: string) {
  const opts: IOpts = {
    method: "POST",
    url: `/group_order/checkfororder`,
    params: {
      userEmail,
      groupOrderNo
    },
    loading: false
  };
  return requestGetResponse(Request<T>(requestWrapper(opts)));
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

// 发送意见邮件
export function createforinspect<T>(postData: any) {
  const opts: IOpts = {
    method: "POST",
    url: `/message_books/createforinspect`,
    params: postData,
    loading: false
  };
  return requestGetResponse(Request<T>(requestWrapper(opts)));
}

// 接受质检报价
export function revisedPriceConfirm<T>(params: any) {
  const opts: IOpts = {
    url: `/sub_order/confirm`,
    params,
    loading: false
  };
  return requestGetResponse(Request<T>(requestWrapper(opts)));
}

// 不接受质检报价
export function revisedPriceReject<T>(params: any) {
  const opts: IOpts = {
    url: `/sub_order/applyreturn`,
    params,
    loading: false
  };
  return requestGetResponse(Request<T>(requestWrapper(opts)));
}


export function buyCheckOrder<T>(postData: any) {
  const opts: IOpts = {
    method: "POST",
    url: `/buy/order/checkfororder`,
    params: postData,
    loading: false
  };
  return requestGetResponse(Request<T>(requestWrapper(opts)));
}

/*________________________________________________________*/

// 采用一次性token获取订单详情
export function getOrderDetailByToken<T>(token: string): Promise<T> {
  const opts: IOpts = {
    method: "GET",
    url: `/orders/token/${token}`,
    loading: false
  };
  return Request<T>(opts, [201]); // 201表示token已经被使用过了
}

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
  return Request<T>(opts, []);
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

  return Request<T>(opts, []);
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

  return Request<T>(opts, []);
}
