import ajax from "../../../common/utils/ajax";
import { IPostData } from "../context/interface";

/**
 * 首页相关
 * */
export const TOKEN_TO_ORDER_URL = "/buy/order/checkfororder";

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

export const payProtectionServer = {
  tokenToUrl
};
