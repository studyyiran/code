/*
当url变化的时候,返回给我们监听的ual
 */
import { useRouteMatch } from "react-router-dom";
import {UseGetParams} from "../../common-modules/commonUseHook";

// 每当url变化的时候.我们都更新最新的url参数返回去
export function useWhenUrlChange(paramKey: string) {
  try {
    const params: any = UseGetParams();
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