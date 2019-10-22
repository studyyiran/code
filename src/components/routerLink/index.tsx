import React from "react";
import { Link } from "react-router-dom";

export default function RouterLink(props: any) {
  const {isBuy, to} = props;
  if(isBuy) {
    return <a href={to}  {...props}/>;
  }
  return <Link onClick={props.onClick} {...props} />;
}
