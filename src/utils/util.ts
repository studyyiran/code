export function requestWrapper(obj: any, all?: boolean) {
  return {
    ...obj,
    url: all ? obj.url : "/api" + obj.url,
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