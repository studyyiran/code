import React from "react";
import { Link } from "react-router-dom";

export default function RouterLink(props: any) {
  return <Link onClick={props.onClick} {...props} />;
}
