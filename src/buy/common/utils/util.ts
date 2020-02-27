import { locationHref } from "./routerHistory";
import { matchPath } from "react-router-dom";
import { routerConfig } from "../../share/routerConfig";
import { constValue } from "../constValue";
import { Message } from "../../components/message";
export const staticContentConfig = {
  priceUnit: "$",
  perMonth: "/mo",
  SOLDOUT: "SOLDOUT",
  INTRANSACTION: "INTRANSACTION"
};

// 废弃
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
  function transNumber(number: any) {
    if (!isServer()) {
      try {
        return parseFloat(number).toLocaleString();
      } catch (e) {
        console.error(e);
      }
    }
    return number;
  }
  if (whenFree && Number(fixValue) === 0) {
    return whenFree;
  } else {
    if (!isServer()) {
      return fixValue ? constValue.priceUnit + transNumber(fixValue) : fixValue;
    } else {
      return fixValue
        ? constValue.priceUnit + " " + transNumber(fixValue)
        : fixValue;
    }
  }
}

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

export function saveToCache(key: string, storeState: any, needKey: any[], isLocalStorage?: boolean) {
  const cache: any = {};
  needKey.forEach(item => {
    cache[item] = storeState[item];
  });
  setSession(key, cache, isLocalStorage);
}

export function getFromCacheStore(key: string, isLocalStorage?: boolean) {
  let cacheStore = {};
  // 1 先从ssr缓存拉取
  // 2 从session拉取
  // TODO 当这两个出现矛盾的时候 如何解决.
  cacheStore = { ...getFromSession(key, isLocalStorage) };
  return cacheStore;
}

// 检测
export function getFromSession(key: string, isLocalStorage?: boolean) {
  try {
    if (isServer()) {
      return null;
    } else {
      let data;
      if (isLocalStorage) {
        data = window.localStorage.getItem(key);
      } else {
        data = window.sessionStorage.getItem(key);
      }
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

export function setSession(key: string, obj: any, isLocalStorage?: boolean) {
  try {
    if (!isServer()) {
      if (isLocalStorage) {
        window.localStorage.setItem(key, JSON.stringify(obj));
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(obj));
      }
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function getBuyDetailPath(modalName: string, buyProductCode: string) {
  return `/buy/${modalName
    .replace(/\s+/g, "-")
    .toLowerCase()}?variant=${buyProductCode}`;
  // if (modalName) {
  //   return `/testbuy/${modalName
  //     .replace(/\s+/g, "-")
  //     .toLowerCase()}?variant=${buyProductCode}`;
  // } else {
  //   return ""
  // }
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

export function getProductListPath() {
  return "/buy-phone";
}

export function getSetCurrentCookie() {
  const newGuid = () => {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
        guid += "-";
    }
    return guid;
  }
  const cookieWrapper = (cookie: any) => {
    return {
      cookieId: cookie
    };
  };
  // 1 设置cookie
  if (!isServer()) {
    // 确定是否有cookie
    let cookie = getFromCookie(constValue.SHOPPINGCART);
    if (cookie) {
      return cookie;
    } else {
      let exp = new Date();
      const cookieExpired = 30 * 24 * 60 * 60 * 1000;
      exp.setTime(exp.getTime() + Number(cookieExpired));
      const token = newGuid();
      if (token && cookieExpired) {
        document.cookie =
          constValue.SHOPPINGCART +
          "=" +
          escape(token) +
          ";expires=" +
          exp.toUTCString() +
          "; path=/;";
      }
      cookie = getFromCookie(constValue.SHOPPINGCART);
      return cookie;
    }
  } else {
    return null;
  }
}

export function getFromCookie(sKey: string) {
  if (!isServer()) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null
    );
  } else {
    return null;
  }
}

export function getLocationUrl(type: string) {
  switch (type) {
    case "comparepage": {
      return "/comparepage";
    }
    case "login": {
      return "/account/login";
    }
    case "buyhome": {
      return "/buy";
    }
    case "home": {
      return "/";
    }
    case "cart": {
      return "/cart";
    }
    default:
      return "";
  }
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

export function getUrlAllParams() {
  if (!isServer()) {
    let url = decodeURI(window.location.href);
    let res = {} as any;
    let url_data = url.split("?").length > 1 ? url.split("?")[1] : null;
    if (!url_data) return {};
    let params_arr = url_data.split("&");
    params_arr.forEach(function(item) {
      let key = item.split("=")[0];
      let value = item.split("=")[1];
      res[key] = decodeURIComponent(value);
    });
    return res;
  } else {
    return {};
  }
}

export function actionsWithCatchAndLoading({
  dispatch,
  loadingDispatchName,
  loadingObjectKey,
  promiseFunc,
  needError = true
}: {
  dispatch: any;
  loadingDispatchName: string;
  loadingObjectKey: string;
  promiseFunc: any;
  needError?: any;
}) {
  let dispatchJson: any = {};
  dispatchJson[loadingObjectKey] = true;
  dispatch({
    type: loadingDispatchName,
    value: dispatchJson
  });
  const res = promiseFunc();
  res.catch((e: any) => {
    if (needError) {
      Message.error(e);
    }

    dispatchJson[loadingObjectKey] = false;
    dispatch({
      type: loadingDispatchName,
      value: dispatchJson
    });
  });
  res.then(() => {
    dispatchJson[loadingObjectKey] = false;
    dispatch({
      type: loadingDispatchName,
      value: dispatchJson
    });
  });

  return res;
}

export function debounce(callback: any, timer: any) {
  let currentId: number;
  if (!isServer()) {
    const newFunc = (...arg: any[]) => {
      console.log("+++++++");
      let nextPromise: any;
      if (currentId) {
        window.clearInterval(currentId);
      }
      currentId = window.setTimeout(() => {
        console.log("!!!!!!");
        nextPromise(callback(...arg));
      }, timer);
      return new Promise((resolve, reject) => {
        nextPromise = resolve;
      });
    };
    return newFunc;
  } else {
    return callback;
  }
}
