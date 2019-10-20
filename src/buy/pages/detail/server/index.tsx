import { productListMock, similiarMock } from "./mock";
import ajax from "../../../common/utils/ajax";
import {backgroundCheckList} from "../context/staticData";

export async function getProductDetail(id: string) {
  const res: any = await ajax.post(`/buy/product/detail`, {
    id
  });
  if (res) {
    if (res.buyProductBQV) {
      try {
        res.buyProductBQV = JSON.parse(res.buyProductBQV);
      } catch (e) {
        console.log(e);
      }
    } else {
      res.buyProductBQV = {};
    }
    if (res.buyProductImgPc) {
      res.buyProductImgPc = res.buyProductImgPc.split(",");
    }
    if (res.buyProductImgM) {
      res.buyProductImgM = res.buyProductImgM.split(",");
    }

    res.backGroundCheck = backgroundCheckList.map((item, index) => {
      let newItem = { ...item };
      if (index === 0 && res.buyProductDate) {
        newItem.content = res.buyProductDate;
      } else if (index === 1 && res.buyProductBatteryLife) {
        newItem.content = res.buyProductBatteryLife;
      }
      return newItem;
    });
  }
  return res;
}

export async function getSimiliar(data: any) {
  // 当get 被catch的时候 await后续的流程都会终止掉.
  const res = await ajax.post(`/buy/product/similiar`, data);
  return res;
}
