import React from "react";
import { Link } from "react-router-dom";

export default function RouterLink(props: any) {
  const { isBuy, to, onClick, ...other } = props;
  if (isBuy) {
    return <a href={to} {...other} />;
  }
  return <Link to={to} {...other} />;
}
