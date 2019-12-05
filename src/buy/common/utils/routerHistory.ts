import { createBrowserHistory, createMemoryHistory } from "history";
import { isServer } from "./util";
import { routerConfigWithoutComponent } from "../../share/routerConfigWithoutComponent";
import { matchPath } from "react-router-dom";

export const routerHistory = isServer()
  ? createMemoryHistory()
  : createBrowserHistory();

export const locationHref = (url: string, params?: string) => {
  // 没有路由就跳转出去
  const findInBuyRouter = routerConfigWithoutComponent.find((route: any) => {
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

export const checkIsBuyUrl = (url: string) => {
  const findInBuyRouter = routerConfigWithoutComponent.find((route: any) => {
    return !!matchPath(url, route);
  });
  return findInBuyRouter;
};
