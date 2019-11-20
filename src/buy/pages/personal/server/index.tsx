import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
export const userEditProfileUrl = "/authorized/auth/website/user/edit/profile";
export const userEditPasswordUrl = "/authorized/auth/website/user/edit/password";
export const userEditAddressUrl = "/authorized/auth/website/user/edit/address";

export async function userEditProfile(data: any) {
  const res: any = await ajax.put(userEditProfileUrl, data);
  return res;
}

export async function userEditPassword(data: any) {
  const res: any = await ajax.put(userEditPasswordUrl, data);
  return res;
}

export async function userEditAddress(data: any) {
  const res: any = await ajax.put(userEditAddressUrl, data);
  return res;
}