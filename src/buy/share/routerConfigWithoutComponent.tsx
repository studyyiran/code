import React from "react";
import {getLocationUrl, getProductListPath} from "../common/utils/util";

export const routerConfigWithoutComponent = [
  {
    path: "/buy",
  },
  {
    path: getProductListPath(),
  },
  {
    path: "/detail/:productId",
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
    path: "/buy/checkorder",
  },
  {
    path: "/buy",
  },
  {
    path: "/",
    exact: true,
  },
  {
    path: getLocationUrl('login'),
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
];
