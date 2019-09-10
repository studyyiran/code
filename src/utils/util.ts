export function requestWrapper(obj: any, all?: boolean) {
  return {
    ...obj,
    url: all ? obj.url : "http://112.124.128.55/api" + obj.url,
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
