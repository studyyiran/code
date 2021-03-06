import React from "react";
import {getLocationUrl, getProductListPath} from "../common/utils/util";
import {ShoppingCartPage} from "../pages/shoppingCartPage";

export const routerConfigWithoutComponent = [
  {
    path: getProductListPath(),
  },
  {
    path: "/buy/:modalName",
  },
  {
    path: "/detail-preview/:token",
  },
  {
    path: "/uptrade/protect",
  },
  {
    path: "/return-policy",
  },
  {
    path: "/buy-checkorder/checkorder",
  },
  {
    path: "/buy-checkout",
  },
  {
    path: "/buy",
  },
  {
    path: "/",
    exact: true,
  },
  {
    path: getLocationUrl("shoppingcart"),
    exact: true,
  },
  {
    path: getLocationUrl('login'),
    exact: true,
  },
  {
    path: getLocationUrl("comparepage"),
    exact: true,
  },
  {
    path: "/account/management",
    exact: true,
  },
  {
    path: "/account/create",
    exact: true,
  },
  {
    path: "/account/create/:token/:email",
    exact: true,
  },
  {
    path: "/account/forget-password",
    exact: true,
  },
  {
    path: "/account/reset-password/:token",
    exact: true,
  },
  {
    path: "/protectionsubscribe/payment",
    exact: true,
  },
  {
    path: "/jobs",
    exact: true,
  },
  {
    path: "/jobs/head-of-operations",
    exact: true,
  },
  {
    path: "/jobs/operation-intern",
    exact: true,
  },
];
