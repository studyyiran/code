import getSellPath, {getProductListPath} from "../utils/util";

const footerInfo = [
  {
    title: "Buy",
    className: "",
    arr: [
      {
        isBuy: true,
        subTitle: "Buy Home",
        href: "/"
      },
      {
        isBuy: true, //用于判定是哪一个端的跳转
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
        isBuy: true,
        subTitle: "Check My Order",
        href: "/check-order"
      }
    ]
  }
];

export default footerInfo;
