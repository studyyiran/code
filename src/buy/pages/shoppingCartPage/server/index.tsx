import ajax from "../../../common/utils/ajax";
import { getShoppingCartMock } from "./mock";

/**
 * 首页相关
 * */
export const getShoppingCartUrl = "/buy/order/shoppingcart/get";

async function getShoppingCart() {
  return getShoppingCartMock;
  const res: any = await ajax.post(getShoppingCartUrl, {
    cookieId: 123
  });
  return res;
}

export const storeShoppingCartServer = {
  getShoppingCart
};
