import ajax from "../../../common/utils/ajax";
import {IPostData, IProtectionOrder, IProtectionSubscribe} from "../context/interface";

/**
 * 首页相关
 * */
export const TOKEN_TO_ORDER_URL = "/buy/order/checkfororder";
export const PAY_PROTECTION_URL = "/buy/order/payprotection";
export const PAY_SUBSCRIBE_URL = "/buy/order/paysubscribe";

async function tokenToUrl(data: IPostData) {
  const res: any = await ajax.post(TOKEN_TO_ORDER_URL, data);
  if (res && res.payment && res.paymentAccount) {
    res.paymentInfo = {
      paymentType: res.payment,
      creditCardInfo: res.paymentAccount
    };
  }
  return res;
}

async function orderPayProtection(data: IProtectionOrder) {
  const res: any = await ajax.post(PAY_PROTECTION_URL, data);
  return res;
}

async function orderPaySubscribe(data: IProtectionSubscribe) {
  const res: any = await ajax.post(PAY_SUBSCRIBE_URL, data);
  return res;
}

export const payProtectionServer = {
  tokenToUrl,
  orderPayProtection,
  orderPaySubscribe
};
