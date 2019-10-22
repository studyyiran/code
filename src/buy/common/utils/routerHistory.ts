import { createBrowserHistory, createMemoryHistory } from "history";
import { isServer } from "./util";
import { routerConfig } from "../../share/routerConfig";
import { matchPath } from "react-router";

export const routerHistory = isServer()
  ? createMemoryHistory()
  : createBrowserHistory();

export const locationHref = (url: string, params?: string) => {
  // 没有路由就跳转出去
  const findInBuyRouter = routerConfig.find((route: any) => {
    return !!matchPath(url, route);
  });
  if (!findInBuyRouter) {
    window.location.href = url;
    return;
  }
  switch (params) {
    case "back":
      routerHistory.goBack();
      break;
    case "replace":
      routerHistory.replace(url);
      break;
    default:
      routerHistory.push(url);
  }
};
