import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
export const getBlackFiveTimeUrl = "/auth/countdown/time";

export async function getBlackFiveTime() {
  const res: any = await ajax.get(getBlackFiveTimeUrl);
  // return 0;
  return res;
}
