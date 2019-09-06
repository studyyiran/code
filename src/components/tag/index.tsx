import * as React from "react";
import "./index.less";

export default function Tag(props: any) {
  return (
    <span
      className={
        "comp-tag " +
        (props.isDifferent ? "fail" : "success") +
        " " +
        props.className
      }
    >
      {props.differentReason}
    </span>
  );
}
