import ajax from "../../../common/utils/ajax";
import { getShoppingCartMock } from "./mock";
import { getSetCurrentCookie } from "../../../common/utils/util";
import { detailFormat } from "../../detail/server";

/**
 * 首页相关
 * */
const getShoppingCartUrl = "/buy/order/shoppingcart/get";
const addShoppingCartUrl = "/buy/order/shoppingcart/add";
const deleteShoppingCartUrl = "/buy/order/shoppingcart/delete";
const deleteSoldShoppingCartUrl = "/buy/order/shoppingcart/deletesold";
const mergeShoppingCartUrl = "/buy/order/shoppingcart/merge";

const orderCompareAddUrl = "/buy/order/compare/add";
const orderCompareDeleteUrl = "/buy/order/compare/delete";
const orderCompareGetUrl = "/buy/order/compare/get";

async function getShoppingCart() {
  // return getShoppingCartMock;
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(getShoppingCartUrl, { cookieId });
  return {
    ...res,
    list: res.list.map((item: any) => {
      return {
        ...item,
        product: detailFormat(item.product)
      };
    })
  };
}

async function addShoppingCart(productCode: any) {
  // return getShoppingCartMock;
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(addShoppingCartUrl, {
    productCode,
    cookieId
  });
  return res;
}

async function deleteShoppingCart(productCode: any) {
  // return getShoppingCartMock;
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(deleteShoppingCartUrl, {
    productCode,
    cookieId
  });
  return res;
}

async function deleteSoldShoppingCart() {
  // return getShoppingCartMock;
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(deleteSoldShoppingCartUrl, { cookieId });
  return res;
}

async function mergeShoppingCart() {
  // return getShoppingCartMock;
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(mergeShoppingCartUrl, { cookieId });
  return res;
}

async function orderCompareGet() {
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(orderCompareGetUrl, { cookieId });
  return res.map((item: any) => {
    return detailFormat(item);
  });
}

async function orderCompareAdd(productCode: any) {
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(orderCompareAddUrl, {
    cookieId,
    productCode
  });
  return res;
}

async function orderCompareDelete(productCode: any) {
  const cookieId = getSetCurrentCookie();
  const res: any = await ajax.post(orderCompareDeleteUrl, {
    cookieId,
    productCode
  });
  return res;
}

export const storeShoppingCartServer = {
  addShoppingCart,
  getShoppingCart,
  deleteShoppingCart,
  deleteSoldShoppingCart,
  mergeShoppingCart,
  orderCompareGet,
  orderCompareAdd,
  orderCompareDelete
};
