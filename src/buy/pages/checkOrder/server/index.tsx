import ajax from "../../../common/utils/ajax";
import { checkForOrdermock, checkForOrdermockOld } from "./mock";
import { IOrderParam } from "../context";

/**
 * 首页相关
 * */
export const CHECK_FOR_ORDER = "/buy/order/checkfororder";
export const CANCEL_ORDER = "/buy/order/cancel";
export const APPLY_RETURN = "/buy/order/applyreturn";
export const GET_SHIPPO =
  "https://classic.uptradeit.com/up-api/up-trade-it/api/shippo/track";

export async function serverCheckOrderDetail(data: IOrderParam) {
  const res: any = await ajax.post(CHECK_FOR_ORDER, data);
  if (res && res.payment && res.paymentAccount) {
    res.paymentInfo = {
      paymentType: res.payment,
      creditCardInfo: res.paymentAccount
    };
  }
  return res;
}

export function serverCancelOrder(data: IOrderParam) {
  return ajax.post(CANCEL_ORDER, data);
}

export function serverApplyReturn(data: IOrderParam) {
  return ajax.post(APPLY_RETURN, data);
}

export function getTranshipping(carrier: string, trackingNumber: string) {
  return ajax.get(GET_SHIPPO, {
    carrier,
    trackingNumber
  });
}
