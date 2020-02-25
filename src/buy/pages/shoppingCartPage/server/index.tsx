import ajax from "../../../common/utils/ajax";
import { getShoppingCartMock } from "./mock";
import {getSetCurrentCookie} from "../../../common/utils/util";

/**
 * 首页相关
 * */
const getShoppingCartUrl = "/buy/order/shoppingcart/get";
const addShoppingCartUrl = "/buy/order/shoppingcart/add";

async function getShoppingCart() {
  // return getShoppingCartMock;
  const cookieInfo = getSetCurrentCookie();
  const res: any = await ajax.post(getShoppingCartUrl, cookieInfo);
  return res;
}

async function addShoppingCart(productCode: any) {
  // return getShoppingCartMock;
  const cookieInfo = getSetCurrentCookie();
  const res: any = await ajax.post(addShoppingCartUrl, {productCode, cookieInfo});
  return res;
}

export const storeShoppingCartServer = {
  addShoppingCart,
  getShoppingCart,
};
