import { createBrowserHistory, createMemoryHistory } from "history";
import { isServer } from "./util";

export const routerHistory = isServer()
  ? createMemoryHistory()
  : createBrowserHistory();

export const locationHref = (url: string, params?: string) => {
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
