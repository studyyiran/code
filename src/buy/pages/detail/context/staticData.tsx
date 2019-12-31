import React from "react";
import { locationHref } from "../../../common/utils/routerHistory";

export interface IBackgroundCheckList {
  title: string;
  content?: string;
  img?: string;
}

export const backgroundCheckList: IBackgroundCheckList[] = [
  {
    title: "Manufacture Date: ",
    content: "",
    img: '13.png',
  },
  {
    title: "Battery Health: ",
    content: "",
    img: '1.png',
  },
  {
    title: "Phone recognizes a charger",
    img: "2.png"
  },
  {
    title: "Vibration mechanism functional",
    img: "3.png"
  },
  {
    title: "Screen is bright",
    img: "4.png"
  },
  {
    title: "Speakers work",
    img: "5.png"
  },
  {
    title: "Fingerprint/Face ID is functional",
    img: "6.png"
  },
  {
    title: "Phone recognizes cellular service",
    img: "7.png"
  },
  {
    title: "Microphone is functional",
    img: "8.png"
  },
  {
    title: "Proximity sensor works",
    img: "9.png"
  },
  {
    title: "Touchscreen works in all areas",
    img: "10.png"
  },
  {
    title: "Front camera is functional",
    img: "11.png"
  },
  {
    title: "Wi-Fi is functional",
    img: "12.png"
  },
  {
    title: "Passes CheckMD report",
    img: "13.png"
  },
  {
    title: "Rear camera is functional",
    img: "14.png"
  },
  {
    title: "Home button is functional",
    img: "15.png"
  },
  {
    title: "Previous internet accounts removed",
    img: "16.png"
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
    <a
      onClick={() => locationHref("/uptrade/protect")}
      style={{ color: "rgba(26, 180, 231, 1)", textDecoration: "underline" }}
    >
      UpTrade Protect
    </a>{" "}
    gives you the ultimate protection.
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
