import * as React from "react";

export default function Svg(props: any) {
  const { icon = "uptrade_duigou" } = props;
  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={`#${icon}`} />
    </svg>
  );
}
