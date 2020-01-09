import ajax from "../../../common/utils/ajax";

const validaddressUrl = "/buy/order/validaddress";

export async function validaddress(info: any) {
  const res = await ajax.post(validaddressUrl, info);
  return res;
}

async function getOrderTax(info: any) {
  const res = await ajax.post(`/buy/order/getordertax`, info);
  return res;
}

async function getExpress(addressInfo: any) {
  const res = await ajax.post(`/buy/order/getexpress`, addressInfo);
  return res;
}

async function createOrder(orderInfo: any) {
  const res = await ajax.post(`/buy/order/create`, orderInfo);
  return res;
}

async function zipCodeToAddressInfo(zipCode: any) {
  const res = await ajax.get(
    `https://classic.uptradeit.com/up-api/up-trade-it/api/USPS/state/${zipCode}`
  );
  return res;
}

async function orderIdToCheckOrderInfo(groupOrderNo: any) {
  const res = await ajax.post(`/buy/order/detail`, {
    groupOrderNo
  });
  return res;
}

async function orderProcessRecord(orderInfo: any, haveCreated = false) {
  const res = await ajax.post(
    `/buy/order/temp/info/record/${haveCreated}`,
    orderInfo
  );
  return res;
}

export const orderInfoServer = {
  validaddress,
  getOrderTax,
  getExpress,
  createOrder,
  zipCodeToAddressInfo,
  orderIdToCheckOrderInfo,
  orderProcessRecord
};
