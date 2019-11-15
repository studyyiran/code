import getSellPath, {getProductListPath} from "../utils/util";
import RouterLink from "../../components/routerLink";
import {LoginButton} from "../../pages/personal/components/loginButton";

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
        Component: LoginButton,
      },
      {
        subTitle: "Check My Order",
        href: "/check-order"
      }
    ]
  }
];

export default footerInfo;
