import Axios, { AxiosResponse } from 'axios';
import { message } from 'antd';
import { Base64 } from 'js-base64';
import { MessageType } from 'antd/lib/message';
import createBrowserHistory from 'history/createBrowserHistory';
import { IRequestRes, IOpts } from '@/utils/request.interface';

// 基础路径
const basePath: string = '/up-trade-it/api';

// 默认的参数
const defaultopts = {
  timeout: 30000,
};


interface IOAuthData {
  casLoginUrl?: string,
  appSecurityUrl?: string,
  appRedirectParameter?: string,
  casServiceParameter?: string,
}


// 添加一个响应拦截器 用来处理oauth 鉴权  1.2 版本
Axios.interceptors.response.use((res: AxiosResponse<IRequestRes<IOAuthData>>) => {
  const data = res.data;
  switch (data.code) {
    case 401:
      return res;
      break;
    case 403:
      createBrowserHistory().push('/noauthorize');
      return res;
      break;
    case 441:
      window.location.reload();
      break;
  }
  return res;
});


const Request = <T>(opts: IOpts, code?: number[]): Promise<T> => {
  // 代理名
  let defaultProxyName: string = '/up-api';
  if (opts.isMock) {
    defaultProxyName = '/mock'
  }
  console.log(opts)
  // headers 增加slug
  opts.headers = {
    ...opts.headers,
  };
  // debugger
  // 默认method
  opts.method = (opts.method || 'GET').toLocaleUpperCase();


  // url 增加代理名
  opts.url = defaultProxyName + basePath + opts.url;
  // 合并默认参数和业务参数
  opts.whitecode = code || null;
  opts = { ...defaultopts, ...opts };
  // 如果是post 请求 则 delete 掉 params key值 赋值给data
  if (opts.method !== 'GET') {
    opts.data = opts.params;
    delete opts.params;
  }

  let hide: MessageType;
  if (opts.loading) {
    hide = message.loading('loading...', 0);
  }
  console.log(opts.url);
  // 返回一个promise 用来 await调用
  return new Promise((resolve, reject) => {
    Axios(opts).then((res: AxiosResponse<IRequestRes<T>>) => {
      setTimeout(hide, 0);

      // 如果业务层有错误码过来
      if (code && code.indexOf(res.data.code) !== -1) {
        reject(res.data);
        return;
      }
      // code 不为0
      if (res.data.code !== 0 && res.data.code !== 200) {

        if (res.data.code === 401) {
          if (window['__history__'].location.pathname === '/login') {
            reject(res);
            return;
          }
          window['__history__'].replace('/login?url=' + Base64.encode(window['__history__'].location.pathname));
          // 回到登录页 -- 这里最好配置一下，防止每个渠道不一样
          reject(res);
          return;
        }

        if (code && code.length === 0) {
          reject(res.data);
          return;
        }

        if (res.data.message || res.data.resultMessage) {
          message.error(res.data.message || res.data.resultMessage);
          reject(res.data);
          return;
        }

        message.error("server error");
        reject(res);
        return;

      }


      if (opts.getAll) {
        const allData: T = JSON.parse(JSON.stringify(res.data)) as T;
        resolve(allData);
        return;
      }
      resolve(res.data.data);

    }).catch((err) => {
      setTimeout(hide, 0);
      // 默认直接弹框报错
      message.error('network error');
      reject(err);
    });
  });

}


export default Request;