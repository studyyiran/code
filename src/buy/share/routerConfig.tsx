import BuyHome from "../pages/home/buy-home";
import OrderRouter from "../pages/order/orderRouter";
import ProductList from "../pages/productList";
import { productListSsrRule } from "../pages/productList/ssr";
import ProductDetail from "../pages/detail";
import UptradeProtect from "../pages/statics/uptrade-protect";
import UptradePolicy from "../pages/statics/policy";
import Home from "../pages/home";
import React from "react";
import { getLocationUrl, getProductListPath } from "../common/utils/util";
import { detailSsrRule } from "../pages/detail/ssr";
import { ourHomeSsrRule } from "../pages/home/ssr";
import BuyCheckOrder from "../pages/checkOrder/routers";
import DetailPreviewWrapper from "../pages/detail/detailPreviewWrapper";
import PersonalLogin from "../pages/personal/pages/login";
import AccountPage from "../pages/personal/pages/account";
import UserRegister from "../pages/personal/pages/register";
import UserRegisterEmail from "../pages/personal/pages/registerEmail";
import UserForgetPassword from "../pages/personal/pages/userForgetPassword";
import UserResetPassword from "../pages/personal/pages/userResetPassword";
import { PayProtectionPage, PaySubscribePage } from "../pages/payProtection";
import { JobsPage } from "../pages/statics/job/pages/jobs";
import { JobsHeadOf } from "../pages/statics/job/pages/josbHeadOf";
import { JobsIntern } from "../pages/statics/job/pages/josbIntern";

export const routerConfig = [
  {
    path: "/buy",
    exact: true,
    title: "Buy Used Cell Phones | UpTradeit.com",
    Component: BuyHome,
    getInitialProps: ourHomeSsrRule
  },
  {
    path: getProductListPath(),
    title: "",
    Component: ProductList,
    getInitialProps: productListSsrRule
  },
  {
    path: "/testbuy/:modelName",
    exact: true,
    title: "",
    // title: "Buy Used Phones | Sell My Phone | UpTradeit.com", // 为了测试ssr准确性
    Component: ProductDetail,
    getInitialProps: detailSsrRule
  },
  {
    path: "/detail-preview/:token",
    exact: true,
    title: "Buy Used Phones | Sell My Phone | UpTradeit.com",
    Component: DetailPreviewWrapper
  },
  {
    path: "/uptrade/protect",
    title: "UpTrade Protect - Extended Warranty | UpTradeit.com",
    meta: {
      desc: "这是静态页面，meta参数可以删除，这里只是备注一下"
    },
    Component: UptradeProtect
  },
  {
    path: "/return-policy",
    title: "Return & Exchange Policy | Uptradeit.com",
    Component: UptradePolicy
  },
  {
    path: "/buy/checkorder",
    title: "",
    Component: BuyCheckOrder
  },
  {
    path: "/buy",
    title: "Check out - Information | Uptradeit.com",
    Component: OrderRouter,
    header: "hide"
  },
  {
    path: "/",
    title: "Buy Used Phones | Sell My Phone | UpTradeit.com",
    exact: true,
    Component: Home,
    getInitialProps: ourHomeSsrRule
  },
  {
    path: getLocationUrl("login"),
    title: "Log in | UpTradeit.com",
    exact: true,
    Component: PersonalLogin
  },
  {
    path: "/account/management",
    title: "My Account | UpTradeit.com",
    exact: true,
    Component: AccountPage
  },
  {
    path: "/account/create",
    title: "Create an Account | UpTradeit.com",
    exact: true,
    Component: UserRegister
  },
  {
    path: "/account/create/:token/:email",
    title: "Create an Account | UpTradeit.com",
    exact: true,
    Component: UserRegisterEmail
  },
  {
    path: "/account/forget-password",
    title: "Forget Password | UpTradeit.com",
    exact: true,
    Component: UserForgetPassword
  },
  {
    path: "/account/reset-password/:token",
    title: "Reset Password | UpTradeit.com",
    exact: true,
    Component: UserResetPassword
  },
  {
    path: "/protection/payment",
    title: "Protection payment  | UpTradeit.com",
    exact: true,
    Component: PayProtectionPage
  },
  {
    path: "/protectionsubscribe/payment",
    title: "Protection subscribe  | UpTradeit.com",
    exact: true,
    Component: PaySubscribePage
  },
  {
    path: "/jobs",
    title: " Jobs at UpTrade | UpTradeit.com",
    exact: true,
    Component: JobsPage
  },
  {
    path: "/jobs/head-of-operations",
    title: "Jobs at UpTrade - Head of Operations | UpTradeit.com",
    exact: true,
    Component: JobsHeadOf
  },
  {
    path: "/jobs/operation-intern",
    title: "Jobs at UpTrade - Operation Intern | UpTradeit.com",
    exact: true,
    Component: JobsIntern
  }
  // {
  //   title: "404 | UpTradeit.com",
  //   Component: () => <div>404</div>
  // }
];
