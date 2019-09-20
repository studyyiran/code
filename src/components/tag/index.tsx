import * as React from "react";
import "./index.less";

export default function Tag(props: any) {
  return (
    <div className="comp-tag">
      <div className="flex-container">
        <span className={"content " + props.status + " " + props.className}>{props.children}</span>
      </div>
    </div>
  );
}
