export function requestWrapper(obj: any, all?: boolean) {
  return {
    ...obj,
    // url: all ? obj.url : "http://10.180.22.252:9001/api" + obj.url,
    url: all ? obj.url : "http://prod-gateway-outside-1337850983.us-east-2.elb.amazonaws.com/api" + obj.url,
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
