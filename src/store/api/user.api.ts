import { Request } from 'utils'
import { IOpts } from '@/utils/request.interface';
import { user } from '@/utils/requestPath';
import { ECaptchaErrCode } from '../interface/user.interface';
export const getSmsCode = <T>(mobile: string, imageCaptcha?: string): Promise<T> => {
  const opts: IOpts = {
    url: user('/login/login-captcha'),
    params: {
      mobile,
      imageCaptcha,
    },
    loading: true
  };
  return Request(opts, [ECaptchaErrCode.ImgCodeErr, ECaptchaErrCode.ShouldImage]);
};

export const onLoginByCaptcha = <T>(captcha: string, mobile: string, scene: string): Promise<T> => {
  const opts: IOpts = {
    url: user('/login/captcha-login'),
    method: 'POST',
    params: {
      captcha,
      mobile,
      scene,
    },
    loading: true,
  };
  return Request(opts);
}

export const getImgCode = <T>(): Promise<T> => {
  const opts: IOpts = {
    url: user('/login/image-captcha'),
    loading: true,
  };
  return Request(opts);
}

export const getWechatInfo = <T>(): Promise<T> => {
  const opts: IOpts = {
    url: user('/user-third-party/wechat/appid'),
  };
  return Request(opts);
}

export const getUserInfo = <T>(): Promise<T> => {
  const opts: IOpts = {
    url: user('/user/current'),
  };
  return Request(opts, []);
}

export const setToken = <T>(token: string): Promise<T> => {
  const opts: IOpts = {
    url: '/token',
    method: 'POST',
    params: {
      token,
    },
    noBase: true
  };
  return Request(opts, []);
}