import {locationHref} from "../../../common/utils/routerHistory";
import {matchPath} from "react-router-dom";
import {routerConfig} from "../../../share/routerConfig";

export const brands = [
  {
    iconName: "Apple",
    iconUrl: require(`buy/pages/home/components/brandLogo/res/Apple.svg`),
    id: 1
  },
  {
    iconName: "Samsung",
    iconUrl: require(`buy/pages/home/components/brandLogo/res/Samsung.svg`),
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
    text:
      "Only the best fully functional phones are sold here. 14 day hassle free returns.",
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
      "All phones are inspected and certified. Includes full phone history report.",
    index: 3
  }
];

export const sellCardInfo = [
  {
    img: require("buy/pages/home/img/priceGuarantee.png"),
    title: "Price Guarantee",
    text:
      "Get a minimum guaranteed price based on the market value of your phone. ",
    index: 1
  },
  {
    img: require("buy/pages/home/img/fast.png"),
    title: "Fast and Easy",
    text:
      "Get started in minutes and get cash payment within 1-2 business days.",
    index: 2
  },
  {
    img: require("buy/pages/home/img/zeroRisk.png"),
    title: "Zero Risk",
    text:
      "Ship your phone to us for free. If you change your mind, we ship it back to you for free.",
    index: 3
  }
];
