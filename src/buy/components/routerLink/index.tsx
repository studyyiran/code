import React from "react";
import { Link } from "react-router-dom";
import { isServer } from "../../common/utils/util";
import { checkIsBuyUrl } from "../../common/utils/routerHistory";
export default function RouterLink(props: {
  to: string;
  isBuy?: boolean;
  onClick?: any;
  children?: any;
}) {
  const { isBuy, onClick, to, ...other } = props;
  // 必然返回 或者是
  if (!isServer() && (isBuy || checkIsBuyUrl(to))) {
    return <Link onClick={onClick} {...props} />;
  }
  return (
    <a
      href={`${to}`}
      onClick={() => {
        clickUrlHandler();
        onClick();
      }}
      {...other}
    />
  );
}

function clickUrlHandler() {
  if (!isServer()) {
    window.scroll(0, 0);
  }
}
