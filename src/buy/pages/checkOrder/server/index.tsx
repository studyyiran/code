import ajax from "../../../common/utils/ajax";
import { checkForOrdermock, checkForOrdermockOld } from "./mock";

/**
 * 首页相关
 * */
export const CHECK_FOR_ORDER = "/buy/order/checkfororder";
export const CANCEL_ORDER = "/buy/order/cancel";
export const APPLY_RETURN = "/buy/order/applyreturn";
export const GET_SHIPPO = "https://classic.uptradeit.com/up-api/up-trade-it/api/shippo/track";

interface IHAHA {
  groupOrderNo: string;
  userEmail: string;
}

export function serverCheckOrderDetail(data: IHAHA) {
  return checkForOrdermock;
  return ajax.post(CHECK_FOR_ORDER, data);
}

export function serverCancelOrder(data: IHAHA) {
  return ajax.post(CANCEL_ORDER, data);
}

export function serverApplyReturn(data: IHAHA) {
  return ajax.post(APPLY_RETURN, data);
}

export function getTranshipping(carrier: string, trackingNumber: string) {
  return ajax.get(GET_SHIPPO, {
    carrier,
    trackingNumber
  });
}
