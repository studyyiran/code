import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */

export const TestAjaxUrl = "/auth/website/login";

export async function userLogin(authInfo: any) {
  const res: any = await ajax.post(TestAjaxUrl, authInfo);
  return res;
}
