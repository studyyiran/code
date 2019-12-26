import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
export const TestAjaxUrl = "/reviewPart/getReviewList";

export async function getTestAjaxResult() {
  const res: any = await ajax.get(TestAjaxUrl);
  return getTestAjaxResultMock;
  return res;
}
