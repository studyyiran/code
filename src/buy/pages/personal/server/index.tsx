import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
export const currentUserInfoUrl = "/authorized/auth/website/current/user/info";

export async function currentUserInfo() {
  const res: any = await ajax.get(currentUserInfoUrl);
  return res;
}
