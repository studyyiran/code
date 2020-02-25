import ajax from "../../../common/utils/ajax";
import { getShoppingCartMock } from "./mock";
import {getSetCurrentCookie} from "../../../common/utils/util";

/**
 * 首页相关
 * */
const getShoppingCartUrl = "/buy/order/shoppingcart/get";
const addShoppingCartUrl = "/buy/order/shoppingcart/add";
const deleteShoppingCartUrl = "/buy/order/shoppingcart/delete";
const deleteSoldShoppingCartUrl = "/buy/order/shoppingcart/deletesold";
const mergeShoppingCartUrl = "/buy/order/shoppingcart/merge";


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

async function deleteShoppingCart(productCode: any) {
  // return getShoppingCartMock;
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(deleteShoppingCartUrl, {productCode, cookieId});
  return res;
}

async function deleteSoldShoppingCart() {
  // return getShoppingCartMock;
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(deleteSoldShoppingCartUrl, {cookieId});
  return res;
}

async function mergeShoppingCart() {
  // return getShoppingCartMock;
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(mergeShoppingCartUrl, {cookieId});
  return res;
}



export const storeShoppingCartServer = {
  addShoppingCart,
  getShoppingCart,
  deleteShoppingCart,
  deleteSoldShoppingCart,
  mergeShoppingCart,
};
