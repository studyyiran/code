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
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(getShoppingCartUrl, {cookieId});
  return res;
}

async function addShoppingCart(productCode: any) {
  // return getShoppingCartMock;
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(addShoppingCartUrl, {productCode, cookieId});
  return res;
}

export const storeShoppingCartServer = {
  addShoppingCart,
  getShoppingCart,
};
