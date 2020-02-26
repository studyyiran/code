import { productListMock, similiarMock } from "./mock";
import ajax from "../../../common/utils/ajax";
import { backgroundCheckList } from "../context/staticData";
import { constProductType } from "../../../common/constValue";
import { ICodeAndId, ICodeDetail } from "../context";

export function detailFormat(res: any) {
  if (res) {
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
  } else {
    return null;
  }
}

export async function getProductDetail(id: string) {
  const res: any = await ajax.post(`/buy/product/detail`, {
    id
  });
  return detailFormat(res);
}

export async function getProductDetailByCode(data: ICodeDetail) {
  const res: any = await ajax.post(`/buy/product/detail/bycodeormodel`, data);
  if (res && res.detail) {
    res.detail = detailFormat(res.detail);
  }

  return res;
}

export async function getProductDetailByIdAndCondition(data: ICodeAndId) {
  const res: any = await ajax.post(
    `/buy/product/detail/byskuorcondition`,
    data
  );
  if (res && res.detail) {
    res.detail = detailFormat(res.detail);
  }
  return res;
}

export async function getSimiliarByCode(buyProductCode: string) {
  const res: any = await ajax.get(
    `/buy/product/detail/similar/bycode?buyProductCode=${buyProductCode}`
  );
  return res.map((item: any) => detailFormat(item));
}

export async function getSimiliar(buyProductCode: string) {
  // 当get 被catch的时候 await后续的流程都会终止掉.
  const res = await ajax.get(
    `/buy/product/similiar?buyProductCode=${buyProductCode}`
  );
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
const skureleatedUrl = "/product/skureleated/list";
export async function getPartsBySkuId(skuId: string) {
  const res = await ajax.get(skureleatedUrl, { skuId });
  return res;
  return productListMock
    .map(item => detailFormat(item))
    .map(item => ({ ...item, productType: constProductType.ACCESSORY }));
  // 当get 被catch的时候 await后续的流程都会终止掉.
  // const res = await ajax.post(`/buy/product/detail/preview`, {
  //   token: token
  // });
  // return res;
}

const getReviewScoreUrl = `https://api.reviews.io/merchant/reviews`;
export async function getReviewScore() {
  const res = await ajax.get(getReviewScoreUrl, {
    page: 0,
    per_page: 1000,
    order: "desc",
    store: "uptradeit-com"
  });
  return res;
}

export async function getProductHistory(list: any[]) {
  const getProductHistoryUrl = "/buy/product/browsing/history";
  const res = await ajax.post(getProductHistoryUrl, list);
  return res;
}
