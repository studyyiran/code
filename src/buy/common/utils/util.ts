import { locationHref } from "./routerHistory";
import { matchPath } from "react-router-dom";
import { routerConfig } from "../../share/routerConfig";

export function requestWrapper(obj: any, all?: boolean) {
  let fixUrl = "";
  switch (process.env.REACT_APP_SERVER_ENV) {
    case "DEV":
      // fixUrl = "http://10.180.22.252:9001/api";
      // fixUrl = "https://api-gateway.uptradeit.com/api";
      fixUrl = "http://demo-gateway-1613913116.us-east-2.elb.amazonaws.com/api";
      break;
    case "UAT":
      fixUrl = "http://demo-gateway-1613913116.us-east-2.elb.amazonaws.com/api";
      break;
    case "PUB":
      fixUrl = "https://api-gateway.uptradeit.com/api";
      break;
  }
  return {
    ...obj,
    // url: all ? obj.url : "" + obj.url,
    url: all ? obj.url : fixUrl + obj.url,
    isFullUrl: true
  };
}

export function requestGetResponse(promise: any) {
  return new Promise((resolve, reject) => {
    promise.then((res: any) => {
      if (res && res.data) {
        resolve(res.data);
      } else {
        reject(res);
      }
    });
  });
}

export function safeEqual(a: any, b: any) {
  return String(a) === String(b);
}
export function currencyTrans(value: any, whenFree?: any) {
  let fixValue = "";
  if (String(value).indexOf(".") !== -1) {
    fixValue += Number(value).toFixed(2);
  } else {
    if (value || String(value) === "0") {
      fixValue += value;
    } else {
      fixValue = "";
    }
  }
  if (whenFree && Number(fixValue) === 0) {
    return whenFree ? parseFloat(whenFree).toLocaleString() : whenFree;
  } else {
    return fixValue ? staticContentConfig.priceUnit + parseFloat(fixValue).toLocaleString() : fixValue;
  }
}

export const staticContentConfig = {
  priceUnit: "$",
  perMonth: "/mo",
  SOLDOUT: "SOLDOUT",
  INTRANSACTION: "INTRANSACTION",
};

export function isServer() {
  if (typeof window === "undefined") {
    return true;
  } else {
    if (typeof (window as any).AHSENV !== "undefined") {
      return true;
    } else {
      return false;
    }
  }
}

export function saveToCache(key: string, storeState: any, needKey: any[]) {
  const cache: any = {};
  needKey.forEach(item => {
    cache[item] = storeState[item];
  });
  setSession(key, cache);
}

export function getFromCacheStore(key: string) {
  let cacheStore = {};
  // 1 先从ssr缓存拉取
  // 2 从session拉取
  // TODO 当这两个出现矛盾的时候 如何解决.
  cacheStore = { ...getFromSession(key) };
  return cacheStore;
}

// 检测
export function getFromSession(key: string) {
  try {
    if (isServer()) {
      return null;
    } else {
      const data = window.sessionStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      } else {
        return null;
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export function setSession(key: string, obj: any) {
  try {
    if (!isServer()) {
      window.sessionStorage.setItem(key, JSON.stringify(obj));
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default function getSellPath() {
  return "/sell-phone";
}

export function promisify(func: any) {
  return function(...args: any[]) {
    return Promise.resolve(func(...args));
  };
}

export function scrollTop() {
  window.scrollTo(0, 0);
}

export function debounce(callback: any, timer: any) {
  let currentId: number;
  const newFunc = (...arg: any[]) => {
    if (currentId) {
      window.clearInterval(currentId);
    }
    currentId = window.setTimeout(() => {
      callback(...arg);
    }, timer);
  };
  return newFunc;
}


export function getProductListPath() {
  return '/buy-phone'
}

//用于sell跳转以及buy的spa路由跳转
export const sellPageGoTo = function(url: any, isBuy?: boolean) {
  locationHref(url);
};

// 用于将url里空格去掉，并转换成小写 ===> 跳转到商品列表可以使用
export function urlRmSpaceAndToLower(url: any) {
  url = url.replace(/\s+/g, "");
  url = url.toLowerCase();
  return url;
}