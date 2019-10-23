import { UserInformation } from "../pages/information";
import { IOrderInfoState } from "./index";
import Shipping from "../pages/shipping";
import Payment from "../pages/payment";
import Confirmation from "../pages/confirmation";
import React from "react";
import { nameToContent } from "../util";


export const expressOptionConfig: { tokenId: string; title: string }[] = [
  {
    tokenId: "usps_parcel_select",
    title: "5-8 Business Days Free Shipping"
  },
  {
    tokenId: "usps_priority",
    title: "3-4 Business Days Express Shipping"
  }
];
