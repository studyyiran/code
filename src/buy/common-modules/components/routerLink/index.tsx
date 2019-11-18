import React from "react";
import { Link } from "react-router-dom";
import { isServer } from "../../../common/utils/util";
import { checkIsBuyUrl } from "../../../common/utils/routerHistory";
export default function RouterLink(props: {
  to: string;
  isBuy?: boolean;
  onClick?: any;
  children?: any;
  target?: any;
  className?: any;
}) {
  const { isBuy, onClick, to, ...other } = props;
  function RenderA() {
    return (
      <a
        href={`${to}`}
        onClick={() => {
          clickUrlHandler();
          onClick && onClick();
        }}
        {...other}
      />
    );
  }
  
  function RenderLink() {
    return <Link onClick={onClick} {...other} to={to} />;
  }
  if (isServer()) {
    return <RenderA />
  } else {
    const {LOCATIONENV} = window as any
    if (LOCATIONENV === 'buy' && checkIsBuyUrl(to)) {
      return <RenderLink />
    }
    if (LOCATIONENV === 'sell' && !checkIsBuyUrl(to)) {
      return <RenderLink />
    }
    return <RenderA />
  }
}

function clickUrlHandler() {
  if (!isServer()) {
    window.scroll(0, 0);
  }
}
