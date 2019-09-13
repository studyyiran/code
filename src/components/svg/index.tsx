import * as React from "react";
import "./index.less";

export default function Svg(props: any) {
  const { icon = "correct" } = props;
  return (
    <svg className="svg-icon-set comp-svg" aria-hidden="true">
      <use xlinkHref={`#uptrade_${icon}`} />
    </svg>
  );
}
