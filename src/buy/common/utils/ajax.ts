import Axios from "axios";
interface IAjax {
  get: (url: string) => void;
  post: (url: string, data?: any) => void;
  put: (url: string, data?: any) => void;
  delete: (url: string, data?: any) => void;
  fetch: (config: any) => void;
}

const transUrl = (url: string) => {
  if (url.indexOf("http") !== -1) {
    return url;
  } else {
    return getRootApi("/api" + url);
  }
};

// 下面是所有api提取
const getRootApi = function(urlRoot: string) {
  let apiRoot = "http://qa-gateway-801477214.us-east-2.elb.amazonaws.com";
  switch (process.env.REACT_APP_SERVER_ENV) {
    case "QA":
      apiRoot = "http://qa-gateway-801477214.us-east-2.elb.amazonaws.com";
      break;
    case "DEMO":
      apiRoot = "http://demo-gateway-1613913116.us-east-2.elb.amazonaws.com";
      break;
    case "PROD":
      apiRoot = "https://api-gateway.uptradeit.com";
      break;
  }
  return apiRoot + urlRoot;
};

const ajax: IAjax = {} as any;
ajax.post = function(url, data) {
  return ajax.fetch({
    url: transUrl(url),
    method: "post",
    data
  });
};

ajax.put = function(url, data) {
  return ajax.fetch({
    url: transUrl(url),
    method: "put",
    data
  });
};

ajax.delete = function(url, data) {
  return ajax.fetch({
    url: transUrl(url),
    method: "DELETE",
    data
  });
};

ajax.get = function(url) {
  return ajax.fetch({
    url: transUrl(url),
    method: "GET"
  });
};

ajax.fetch = function(config) {
  return new Promise((resolve, reject) => {
    Axios(config)
      .then(res => {
        // 接收到
        if (res && res.data) {
          const { code, data, success, resultMessage } = res.data;
          if (Number(code) === 200 || success || Number(code) === 0) {
            resolve(res.data.data);
          } else {
            rejectError(config, reject, {
              code: code,
              resultMessage: resultMessage
            });
          }
        }
      })
      .catch(e => {
        // catch 404 500异常
        rejectError(config, reject, {});
      });
  });
};

function rejectError(config: any, reject: any, rejectInfo: any) {
  console.error("--ajax error--" + JSON.stringify(config));
  reject(rejectInfo);
}

export default ajax;
