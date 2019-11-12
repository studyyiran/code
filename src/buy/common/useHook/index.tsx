/*
当url变化的时候,返回给我们监听的ual
 */
import { useParams, useRouteMatch } from "react-router-dom";

export function useWhenUrlChange(paramKey: string) {
  try {
    const params: any = useParams();
    return params[paramKey];
  } catch (e) {
    console.error(e);
  }
  return null;
}

export function useIsCurrentPage(pagePath: string) {
  try {
    const match = useRouteMatch(pagePath);
    return !!match;
  } catch (e) {
    console.error(e);
  }
  return false;
}