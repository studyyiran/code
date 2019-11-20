import getSellPath, {
  getLocationUrl,
  getProductListPath
} from "../../common/utils/util";
import { LoginButton, LoginWrapper } from "../components/loginButton";
import RouterLink from "../components/routerLink";
import React from "react";

const footerInfo = [
  {
    title: "Buy",
    className: "",
    arr: [
      {
        subTitle: "Buy Home",
        href: "/buy"
      },
      {
        subTitle: "Buy Now",
        href: getProductListPath()
      }
    ]
  },
  {
    title: "Sell",
    className: "",
    arr: [
      {
        subTitle: "Sell Home",
        href: "/sell"
      },
      {
        subTitle: "How To Sell",
        href: "/how-to-sell-my-home"
      },
      {
        subTitle: "Sell Now",
        href: getSellPath()
      }
    ]
  },
  {
    title: "Resources",
    className: "",
    arr: [
      {
        subTitle: "Contact Us",
        href: "/contact"
      },
      {
        subTitle: "Blog",
        href: "/blog"
      },
      {
        subTitle: "FAQs",
        href: "/faq"
      },
      {
        subTitle: "Return and Exchange Policy",
        href: "/return-policy"
      }
    ]
  },
  {
    title: "About Us",
    className: "",
    arr: [
      {
        subTitle: "Who We Are",
        href: "/who-we-are"
      }
    ]
  },
  {
    title: "Account",
    className: "",
    arr: [
      {
        Component: () => {
          return (
            <LoginWrapper
              renderNotLogin={() => (
                <RouterLink to={getLocationUrl("login")}>My Account</RouterLink>
              )}
              renderWhenHaveLogin={() => (
                <RouterLink to={"/account/management"}>My Account</RouterLink>
              )}
            />
          );
        }
      },
      {
        subTitle: "Check My Order",
        href: "/check-order"
      },
      {
        Component: LoginButton
      }
    ]
  }
];

export default footerInfo;
