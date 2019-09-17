export function requestWrapper(obj: any, all?: boolean) {
  let fixUrl = "";
  switch (process.env.REACT_APP_SERVER_ENV) {
    case "DEV":
      // fixUrl = "http://10.180.22.252:9001/api";
      fixUrl = "http://prod-gateway-outside-1337850983.us-east-2.elb.amazonaws.com/api";
      // fixUrl = "http://demo-gateway-1613913116.us-east-2.elb.amazonaws.com/api";
      break;
    case "UAT":
      fixUrl = "http://demo-gateway-1613913116.us-east-2.elb.amazonaws.com/api";
      break;
    case "PUB":
      fixUrl =
        "http://prod-gateway-outside-1337850983.us-east-2.elb.amazonaws.com/api";
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
      }
    });
  });
}

export function safeEqual(a: any, b: any) {
  return String(a) === String(b);
}

export const staticContentConfig = {
  priceUnit: "$"
};
