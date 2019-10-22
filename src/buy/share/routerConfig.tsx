import BuyHome from "../pages/home/buy-home";
import OrderRouter from "../pages/order/orderRouter";
import ProductList from "../pages/productList";
import { productListSsrRule } from "../pages/productList/ssr";
import ProductDetail from "../pages/detail";
import UptradeProtect from "../pages/statics/uptrade-protect";
import UptradePolicy from "../pages/statics/policy";
import Home from "../pages/home";
import React from "react";
import { getProductListPath } from "../common/utils/util";
import { detailSsrRule } from "../pages/detail/ssr";
import { ourHomeSsrRule } from "../pages/home/ssr";

export const routerConfig = [
  {
    path: "/buy",
    title: "Sell My Phone for More Cash | UpTradeit.com",
    Component: BuyHome
  },
  {
    path: "/order",
    title: "Sell My Phone for More Cash | UpTradeit.com",
    Component: OrderRouter,
    header: "hide"
  },
  {
    path: getProductListPath(),
    title: "Sell My Phone for More Cash | UpTradeit.com",
    Component: ProductList,
    getInitialProps: productListSsrRule
  },
  {
    path: "/detail/:productId",
    title: "detail | UpTradeit.com",
    Component: ProductDetail,
    getInitialProps: detailSsrRule
  },
  {
    path: "/uptrade/protect",
    title: "UptradeProtect | UpTradeit.com",
    meta: {
      desc: "这是静态页面，meta参数可以删除，这里只是备注一下"
    },
    Component: UptradeProtect
  },
  {
    path: "/uptrade/policy",
    title: "policy | UpTradeit.com",
    meta: {
      desc: "这是静态页面，meta参数可以删除，这里只是备注一下"
    },
    Component: UptradePolicy
  },
  {
    path: "/",
    title: "buy Phone for More Cash | UpTradeit.com",
    exact: true,
    Component: Home,
    getInitialProps: ourHomeSsrRule
  }
  // {
  //   title: "404 | UpTradeit.com",
  //   Component: () => <div>404</div>
  // }
];
