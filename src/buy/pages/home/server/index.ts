import ajax from "../../../common/utils/ajax";

/**
 * 首页相关
 * */

export const GET_HOME_PAGE_SELL_BRANDS = "/home/sell/brand";
export const GET_HOME_PAGE_BUY_BRANDS = "/home/buy/brand";
export const GET_HOME_PAGE_BUY_PRODUCTS = "/home/buy/product";
export const GET_HOME_PAGE_SELL_PRODUCTS = "/home/sell/product";

// title
export async function getSellBrand() {
  return await ajax.get(GET_HOME_PAGE_SELL_BRANDS);
}

// title
export async function getBuyBrand() {
  return await ajax.get(GET_HOME_PAGE_BUY_BRANDS);
}


// 内容
export async function getBuyProductList(data: any) {
  return await ajax.get(GET_HOME_PAGE_BUY_PRODUCTS + "?brandId=" + data.brandId + "&&seq=" + data.seq);
}

export async function getSellProductList(data: any) {
  return await ajax.get(GET_HOME_PAGE_SELL_PRODUCTS + "?brandId=" + data.brandId + "&&seq=" + data.seq);
}
