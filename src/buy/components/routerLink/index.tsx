import React from "react";
import { Link } from "react-router-dom";
import { isServer } from "../../common/utils/util";
export default function RouterLink(props: any) {
  if (props.href || isServer()) {
    return (
      <a
        href={`https://${props.href}`}
        onClick={props.onClick}
        {...props}
        target="_blank"
      />
    );
  } else {
    return <Link onClick={props.onClick} {...props} />;
  }
}
