import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
export const getBlackFiveTimeUrl = "/auth/countdown/time";

export async function getBlackFiveTime() {
  const res: any = await ajax.get(getBlackFiveTimeUrl);
  // return 1036859578;
  // return 1 * 60 * 60 * 1000  + 1000 * 60;
  // return 10 * 1000;
  return res;
}
