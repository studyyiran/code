import {
  getExpressMock,
  getOrderTaxMock,
  orderIdToProductInfoMock
} from "./mock";
import ajax from "../../../common/utils/ajax";

export async function getOrderTax(info: any) {
  const res = await ajax.post(`/buy/order/getordertax`, info);
  return res;
}

export async function getExpress(addressInfo: any) {
  const res = await ajax.post(`/buy/order/getexpress`, addressInfo);
  return res;
}

export async function createOrder(orderInfo: any) {
  const res = await ajax.post(`/buy/order/create`, orderInfo);
  return res;
}

export async function zipCodeToAddressInfo(zipCode: any) {
  const res = await ajax.get(
    `https://classic.uptradeit.com/up-api/up-trade-it/api/USPS/state/${zipCode}`
  );
  return res;
}

export async function orderIdToCheckOrderInfo(groupOrderNo: any) {
  const res = await ajax.post(`/buy/order/detail`, {
    groupOrderNo
  });
  return res;
}
