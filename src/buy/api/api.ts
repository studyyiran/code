// 废弃
import axios from "axios";

axios.interceptors.request.use(request => {
  //TODO 过滤请求以及权限等
  return request
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  //TODO 过滤请求以及权限等
  return response
}, err => {
  return Promise.reject(err)
})

export const ajax = axios;

// 下面是所有api提取
export const getRootApi = function (urlRoot: string) {
  let apiRoot = 'https://qa-gateway.uptradeit.com';
  switch (process.env.REACT_APP_SERVER_ENV) {
    case "QA":
      apiRoot = "https://qa-gateway.uptradeit.com";
      break;
    case "UAT":
      apiRoot = "https://demo-gateway.uptradeit.com";
      break;
    case "PUB":
      apiRoot = "https://api-gateway.uptradeit.com";
      break;
  }
  return apiRoot + urlRoot;
}

/**
 * 首页相关
 * */
export const GET_HOME_PAGE_BUY_BRANDS = getRootApi('/api/home/buy/brand');
export const GET_HOME_PAGE_SELL_BRANDS = getRootApi('/api/home/sell/brand');
export const GET_HOME_PAGE_BUY_PRODUCTS = getRootApi('/api/home/buy/product');
export const GET_HOME_PAGE_SELL_PRODUCTS = getRootApi('/api/home/sell/product');
export const BUY_ORDER_LASTEST = getRootApi('/api/buy/order/lastest');
export const BUY_ORDER_SELL_LASTEST = getRootApi('/api/sub_order/lastest');