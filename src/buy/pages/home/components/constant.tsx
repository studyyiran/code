import {constValue} from "../../../common/constValue";

export const brands = [
  {
    iconName: "Apple",
    iconUrl: require(`buy/pages/home/components/brandLogo/res/Apple.svg`),
    id: 1
  },
  {
    iconName: "Samsung",
    iconUrl: "https://d3c745jesl5pj3.cloudfront.net/sell/Samsung%20home_bf2005eceda6409ca2eeea2bd7a6a96e.png",
    id: 2
  },
  {
    iconName: "Google",
    iconUrl: require("./brandLogo/res/Google.svg"),
    id: 3
  },
  {
    iconName: "LG",
    iconUrl: require(`buy/pages/home/components/brandLogo/res/LG.svg`),
    id: 4
  },
  {
    iconName: "OnePlus",
    iconUrl: require(`buy/pages/home/components/brandLogo/res/OnePlus.svg`),
    id: 5
  },
  {
    iconName: "Others",
    iconUrl: "",
    id: "others"
  }
];

export const buyCardInfo = [
  {
    img: require("buy/pages/home/img/highQuality.png"),
    title: "High Quality Phones",
    text: `Only the best fully functional<br/> phones are sold here. ${constValue.REFUNDTIME} day<br/> hassle free returns.`,
    index: 1
  },
  {
    img: require("buy/pages/home/img/photo.png"),
    title: "Authentic Photos",
    text: "No shortcuts taken. What you<br/> see is what you get.",
    index: 2
  },
  {
    img: require("buy/pages/home/img/certified.png"),
    title: "UpTrade Certified",
    text:
      "All phones are inspected and<br/> certified. Includes full phone<br/> history report.",
    index: 3
  }
];

export const sellCardInfo = [
  {
    img: require("buy/pages/home/img/priceGuarantee.png"),
    title: "Price Guarantee",
    text:
      "Get a minimum guaranteed<br/> price based on the market<br/> value of your phone. ",
    index: 1
  },
  {
    img: require("buy/pages/home/img/fast.png"),
    title: "Fast and Easy",
    text:
      "Get started in minutes and<br/> get cash payment within 1-2<br/> business days.",
    index: 2
  },
  {
    img: require("buy/pages/home/img/zeroRisk.png"),
    title: "Zero Risk",
    text:
      "Ship your phone to us for free.<br/> If you change your mind, we<br/> ship it back to you for free.",
    index: 3
  }
];
