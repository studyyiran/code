import ajax from "../../../common/utils/ajax";

export async function getHomePageBuyBrands() {
  return await ajax.get("/home/buy/brand");
}
export async function getHomePageSellBrands() {
  return await ajax.get("/home/sell/brand");
}

export async function getHomePageBuyProducts() {
  return await ajax.get("/home/buy/product");
}
export async function getHomePageSellProducts() {
  return await ajax.get("/home/sell/product");
}

export async function noticeBuyOrderLastest() {
  return await ajax.post("/buy/order/lastest");
}
