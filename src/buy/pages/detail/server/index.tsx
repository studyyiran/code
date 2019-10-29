import { productListMock, similiarMock } from "./mock";
import ajax from "../../../common/utils/ajax";
import { backgroundCheckList } from "../context/staticData";

function detailFormat(res: any) {
  let returenRes = { ...res };
  if (returenRes) {
    if (returenRes.buyProductBQV) {
      try {
        returenRes.buyProductBQV = JSON.parse(returenRes.buyProductBQV);
      } catch (e) {
        console.error(e);
      }
    } else {
      returenRes.buyProductBQV = {};
    }
    returenRes.buyProductImgPc = returenRes.buyProductImgPc.split(",");
    returenRes.buyProductImgM = returenRes.buyProductImgM.split(",");

    returenRes.backGroundCheck = backgroundCheckList.map((item, index) => {
      let newItem = { ...item };
      if (index === 0 && returenRes.buyProductDate) {
        newItem.content = returenRes.buyProductDate;
      } else if (index === 1 && returenRes.buyProductBatteryLife) {
        newItem.content = returenRes.buyProductBatteryLife;
      }
      return newItem;
    });
  }
  return returenRes;
}

export async function getProductDetail(id: string) {
  const res: any = await ajax.post(`/buy/product/detail`, {
    id
  });
  return detailFormat(res);
}

export async function getSimiliar(data: any) {
  // 当get 被catch的时候 await后续的流程都会终止掉.
  const res = await ajax.post(`/buy/product/similiar`, data);
  return res;
}

/*
crm端页面跳转调用
 */
export async function getProductDetailByToken(token: string) {
  // 当get 被catch的时候 await后续的流程都会终止掉.
  const res = await ajax.post(`/buy/product/detail/preview`, {
    token: token
  });
  return detailFormat(res);
}
