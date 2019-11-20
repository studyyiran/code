import ajax from "../../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */

export const userLoginUrl = "/auth/website/login";
export const userRegisterUrl = "/auth/website/user/register";
export const userActiveUrl = "/auth/website/user/active";
export const userActiveEmailResendUrl = "/auth/website/user/active/email/resend";
export const currentUserInfoUrl = "/authorized/auth/website/current/user/info";
export const userEmailChangeUrl = "/auth/website/user/email/change"; //激活用户的修改邮箱
export const forgetPasswordEmailUrl = "/auth/website/user/forget/password/email"; //用户忘记密码,发起邮箱
export const changePasswordByTokenUrl = "/auth/website/user/chang/password/by/email"; // 忘记密码页面,重新设置新密码
export const userTokenValidUrl = "/auth/website/user/token/valid"; // 检验token是否有效

export const userEmailExistUrl = "/authorized/auth/website/user/email/exist";


export async function userLogin(authInfo: any) {
  const res: any = await ajax.post(userLoginUrl, authInfo);
  return res;
}

export async function userRegister(authInfo: any) {
  const res: any = await ajax.post(userRegisterUrl, authInfo);
  return res;
}

export async function userActive(token: any) {
  const res: any = await ajax.get(userActiveUrl, {token});
  return res;
}

export async function userActiveEmailResend(token: any) {
  const res: any = await ajax.get(userActiveEmailResendUrl, {token});
  return res;
}

export async function currentUserInfo() {
  const res: any = await ajax.get(currentUserInfoUrl);
  return res;
}

export async function forgetPasswordEmail(data: any) {
  const res: any = await ajax.post(forgetPasswordEmailUrl, data);
  return res;
}

export async function changePasswordByToken(data: any) {
  const res: any = await ajax.put(changePasswordByTokenUrl, data);
  return res;
}

export async function userTokenValid(data: any) {
  const res: any = await ajax.get(userTokenValidUrl, data);
  return res;
}

export async function userEmailChange(data: any) {
  const res: any = await ajax.put(userEmailChangeUrl, data);
  return res;
}

// 验证邮箱合法性
export async function userEmailExist(data: any) {
  const res: any = await ajax.get(userEmailExistUrl, data);
  return res;
}