import React from "react";
import {locationHref} from "../../../common/utils/routerHistory";

export interface IBackgroundCheckList {
  title: string;
  content: string;
}

export const backgroundCheckList: IBackgroundCheckList[] = [
  {
    title: "Manufacture Date: ",
    content: ""
  },
  {
    title: "Battery Health: ",
    content: ""
  },
  {
    title: "Battery Health: ",
    content: ""
  },
];

export const TipsAllPass = (
  <p>
    The following functional tests have been completed on this device.
    <br />
    -Phone recognizes a charger
    <br />
    -Phone recognizes cellular service
    <br />
    -Vibration mechanism functional
    <br />
    -Microphone is functional
    <br />
    -Screen is bright
    <br />
    -Proximity sensor works
    <br />
    -Speakers work
    <br />
    -Touchscreen works in all areas
    <br />
    -Fingerprint/Face ID is functional
    <br />
    -Front camera is functional
    <br />
    -Rear camera is functional
    <br />
    -Wi-Fi is functional
    <br />
    -Home button is functional
    <br />
    -Passes CheckMD report
    <br />
    -Previous internet accounts removed
  </p>
);

export const TipsProtection = (
  <p>
    <a onClick={() => locationHref("/uptrade/protect")} style={{ color: "rgba(26, 180, 231, 1)",textDecoration: "underline"}}>UpTrade Protect</a> gives you the ultimate protection.
    <br />
    -Extended hardware warranty
    <br />
    -Coverage against accidental damage
    <br />
    -Friendly, solution-oriented support
    <br />
    -Risk free - cancel any time
  </p>
);
