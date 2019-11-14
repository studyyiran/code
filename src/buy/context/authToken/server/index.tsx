import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */

export const userLoginUrl = "/auth/website/login";
export const userRegisterUrl = "/auth/website/user/register";
export const userActiveUrl = "/auth/website/user/active";
export const userActiveEmailResendUrl = "/auth/website/user/active/email/resend";

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


