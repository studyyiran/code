import getSellPath, {getProductListPath} from "../utils/util";

const footerInfo = [
  {
    title: "Buy",
    className: "",
    arr: [
      {
        subTitle: "Buy Now",
        href: getProductListPath()
      },
      {
        subTitle: "Buy Home",
        href: "/"
      },

    ]
  },
  {
    title: "Sell",
    className: "",
    arr: [
      {
        subTitle: "How To Sell",
        href: "/how-to-sell-my-home"
      },
      {
        subTitle: "Sell Now",
        href: getSellPath()
      },
      {
        subTitle: "Sell Home",
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
        subTitle: "Check My Order",
        href: "/check-order"
      }
    ]
  }
];

export default footerInfo;
