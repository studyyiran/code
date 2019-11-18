import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
export const userEditProfileUrl = "/authorized/auth/website/user/edit/profile";

export async function userEditProfile(data: any) {
  const res: any = await ajax.put(userEditProfileUrl, data);
  return res;
}
