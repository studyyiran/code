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
    title: "USPS Parcel 3 - 6 Business Days."
  },
  {
    tokenId: "usps_priority",
    title: "USPS Priority 2 - 4 Business Days."
  }
];
