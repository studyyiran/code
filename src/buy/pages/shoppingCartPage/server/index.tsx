import ajax from "../../../common/utils/ajax";
import { getShoppingCartMock } from "./mock";

/**
 * 首页相关
 * */
export const getShoppingCartUrl = "/api/buy/order/shoppingcart/get  ";

async function getShoppingCart() {
  const res: any = await ajax.get(getShoppingCartUrl);
  return getShoppingCartMock;
  return res;
}

export const storeShoppingCartServer = {
  getShoppingCart
}
