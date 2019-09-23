export function requestWrapper(obj: any, all?: boolean) {
  let fixUrl = "";
  switch (process.env.REACT_APP_SERVER_ENV) {
    case "DEV":
      // fixUrl = "http://10.180.22.252:9001/api";
      fixUrl = "https://api-gateway.uptradeit.com/api";
      // fixUrl = "http://demo-gateway-1613913116.us-east-2.elb.amazonaws.com/api";
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
export function currencyTrans(value: any) {
  let fixValue = staticContentConfig.priceUnit;
  if (String(value).includes(".")) {
    fixValue += value.toFixed(2);
  } else {
    if (value || String(value) === "0") {
      fixValue += value;
    } else {
      fixValue = "";
    }
  }
  return fixValue;
}

export const staticContentConfig = {
  priceUnit: "$"
};

export function isServer() {
  return typeof window === "undefined"
}

// 检测
export function getFromSession(key: string) {
  try {
    if (isServer()) {
      return null;
    } else {
      const data = sessionStorage.getItem(key);
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
