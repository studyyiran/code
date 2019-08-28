import * as React from "react";

export default function Svg(props: any) {
  const { icon = "duigou" } = props;
  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={`#uptrade_${icon}`} />
    </svg>
  );
}
