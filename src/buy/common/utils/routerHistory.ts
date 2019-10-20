import { createBrowserHistory, createMemoryHistory } from "history";
import { isServer } from "./util";

export const routerHistory = isServer()
  ? createMemoryHistory()
  : createBrowserHistory();

export const locationHref = (url: string, params?: string) => {
  switch (params) {
    case "back":
      routerHistory.goBack();
    default:
      routerHistory.push(url);
  }
};
