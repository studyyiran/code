import Axios, { AxiosResponse } from 'axios';
// import Toast from '@/components/Toast';
// import Loading from '@/components/Loading';
import { Base64 } from 'js-base64';
// import { Cookie } from 'utils'
// request 请求header需要添加ahs-agent和Access-Token
import { Oauth } from 'utils';

import { IRequestRes, IOpts, ERequestCode } from '@/utils/request.interface';

// 默认的参数
const defaultopts = {
  timeout: 8000,
};

const Request = <T>(opts: IOpts, code?: number[]): Promise<T> => {
  // 代理名
  let proxyName: string = '/bmb-server';
  const baseName: string = '/api-gateway';
  if (opts.isMock) {
    proxyName = '/mock';
  }
  // 默认method
  opts.method = (opts.method || 'GET').toLocaleUpperCase();
  // url 增加代理名
  opts.url = proxyName + (opts.noBase ? '' : baseName) + opts.url;
  // 合并默认参数和业务参数
  opts.whitecode = code || null;
  // 将相关信息添加到header
  opts.headers = Object.assign(Oauth.getHeader(), opts.headers);
  opts = { ...defaultopts, ...opts };
  // 如果是post 请求 则 delete 掉 params key值 赋值给data
  if (opts.method === 'POST') {
    opts.data = opts.params;
    delete opts.params;
  }

  if (opts.loading) {
    // Loading.open();
  }
  // 返回一个promise 用来 await调用
  return new Promise((resolve, reject) => {
    Axios(opts).then((res: AxiosResponse<IRequestRes<T>>) => {
      if (opts.loading) {
        // Loading.close();
      }

      if (res.data.resultMessage) {
        res.data.resultMessage = res.data.resultMessage.replace('爱回收', '');
      }
      // 如果业务层有错误码过来
      if (code && code.indexOf(res.data.code) !== -1) {
        reject(res.data);
        return;
      }
      // 重置access_token
      // if (res.headers['access-token']) {
      //   Oauth.accessToken = res.headers['access-token'];
      //   Oauth.accessTokenExpire = res.headers['access_token_expire_second'];
      //   Cookie.set(Oauth.ahsAgent + '_accessToken', Oauth.accessToken, Oauth.accessTokenExpire * 1000);
      // }

      // code 不为200
      if (res.data.code !== ERequestCode.Success) {
        if (code && code.length === 0) {
          reject(res.data);
          return;
        }

        if (res.data.code === ERequestCode.Unauthorized) {
          if (window['__history__'].location.pathname === '/account/login') {
            reject(res);
            return;
          }
          window['__history__'].replace('/account/login?url=' + Base64.encode(window['__history__'].location.pathname));
          // 回到登录页 -- 这里最好配置一下，防止每个渠道不一样
          reject(res);
          return;
        }

        if (res.data.message || res.data.resultMessage) {
          // Toast(res.data.message || res.data.resultMessage, 'error');
          reject(res.data);
          return;
        }

        // Toast("服务器开小差了，请稍后再试", 'error');
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
      if (opts.loading) {
        // Loading.close();
      }
      // 默认直接弹框报错
      // Toast('网络繁忙，请稍后再试！', 'error');
      reject(err);
    });
  });

}


export default Request;