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
  needRenderTagaByServer?: any;
}) {
  const { isBuy, onClick, to, needRenderTagaByServer, ...other } = props;
  function renderRenderA() {
    return (
      <a
        href={`${to}`}
        onClick={() => {
          if (!needRenderTagaByServer) {
            clickUrlHandler();
          }
          onClick && onClick();
        }}
        {...other}
      />
    );
  }

  function renderRenderLink() {
    return <Link onClick={onClick} {...other} to={to} />;
  }
  if (isServer() || needRenderTagaByServer) {
    return renderRenderA();
  } else {
    const { LOCATIONENV } = window as any;
    if (LOCATIONENV === "buy" && checkIsBuyUrl(to)) {
      return renderRenderLink();
    }
    if (LOCATIONENV === "sell" && !checkIsBuyUrl(to)) {
      return renderRenderLink();
    }
    return renderRenderA();
  }
}

function clickUrlHandler() {
  if (!isServer()) {
    window.scroll(0, 0);
  }
}
