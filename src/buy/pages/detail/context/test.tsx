import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { isServer } from "../../../common/utils/util";

/*
当url变化的时候,返回给我们监听的ual
 */
export function useWhenUrlChange(paramKey: string) {
  try {
    const params = useParams();
    return params[paramKey];
  } catch (e) {
    console.error(e);
  }
  return null
}

export function useIsCurrentPage(pagePath: string) {
  try {
    const match = useRouteMatch(pagePath);
    return !!match;
  } catch (e) {
    console.error(e);
  }
  return false
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
