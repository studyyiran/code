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
    title: "USPS Parcel Select 2-8 days"
  },
  {
    tokenId: "usps_priority",
    title: "USPS Priority 1-3 days"
  }
];
