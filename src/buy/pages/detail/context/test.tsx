import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";

/*
当url变化的时候,返回给我们监听的ual
 */
export function useWhenUrlChange(paramKey: string) {
  const params = useParams();
  return params[paramKey];
}

export function useIsCurrentPage(pagePath: string) {
  const match = useRouteMatch(pagePath);
  return !!match;
}

export async function callBackWhenPassAllFunc(arr: any[], callBack: any) {
  let promiseArr = [] as any;
  let normalArr = [] as any;
  arr.forEach(condition => {
    if (condition instanceof Promise) {
      promiseArr.push(condition);
    } else {
      normalArr.push(condition);
    }
  });
  const result1 = await Promise.all(promiseArr);
  const result2 = normalArr.every((normalCondition: any) => {
    return normalCondition();
  });
  if (result1 && result2) {
    callBack();
  }
}
