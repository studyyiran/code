import React from "react";
import RouterLink from "../../../components/routerLink";

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
    title: "Lost & Stolen - ",
    content: "Clear"
  },
  {
    title: "Fully Reset - ",
    content: "Clear"
  },
  {
    title: "No Spamware - ",
    content: "Clear"
  },
  {
    title: "Blacklisted - ",
    content: "Clear"
  },
  {
    title: "Fully Sanitized - ",
    content: "Clear"
  },
  {
    title: "Financed - ",
    content: "Clear"
  }
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
    <RouterLink to={"/uptrade/protect"}><span style={{color: "#1ab4e7", fontWeight:"bolder"}}>UpTrade Protect</span></RouterLink> gives you the ultimate protection.
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
