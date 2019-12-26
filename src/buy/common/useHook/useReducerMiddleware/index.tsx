import { useCallback } from "react";

export default function useReducerMiddleware(...arg: any[]) {
  let finalReducer = (func: any) => {
    return func;
  };
  arg.forEach((currentReducer: any) => {
    finalReducer = finalReducer(currentReducer);
  });
  return useCallback(finalReducer, []);
}

/*
左边的先上?reducer真身在最右边.
每个函数都需要保证是 a,b => a,b的形式
function haha(a,b,c) {
  const asdf = (a, b) => {
    return c(b(a(a, b)))
  }
  const next = a(a,b)
  arr.forEach((func) => {
    next = func(next)
  })
  return next
  return (a, b) => {
    const result = asdf(a, b)
    return result
  }
}

// 不过我还没搞懂我的实现和redux的实现的差别.虽然,看起来我也能实现
 */

