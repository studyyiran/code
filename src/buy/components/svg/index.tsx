import * as React from "react";
import "./index.less";

export default function Svg(props: any) {
  const { icon = "correct" } = props;
  return (
    <svg
      onClick={props.onClick ? props.onClick : () => {}}
      className="svg-icon-set comp-svg"
      aria-hidden="true"
    >
      <use xlinkHref={`#uptrade_buy${icon}`} />
    </svg>
  );
}
