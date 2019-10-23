import {
  productListMock,
  getModelListMock,
  getBaseAttrMock,
  getManufactureListMock
} from "./mock";
import ajax from "../../../common/utils/ajax";

export async function getBaseAttr() {
  const res = await ajax.get("/buy/product/basicQuality");
  return res;
  // return getBaseAttrMock();
}

export async function getProductList(data: any) {
  const res: any = await ajax.post("/buy/product/filterSearch", data);
  return res && res.list ? res.list : [];
}

export async function getModelList(pn: any) {
  const res: any = await ajax.get(
    `/buy/product/saleProduct?pageSize=5&pageNum=${pn}`
  );
  return res;
  // return res.map((item: any) => {
  //   if (item) {
  //     return {
  //       productId: item.brandId,
  //       productDisplayName: item.brandDisplayName
  //     };
  //   }
  // });
  // return getModelListMock().map((item: any) => {
  //   return { ...item, displayName: `pn is ${pn}${item.displayName}` };
  // });
}

export async function getManufactureList(pn?: any) {
  const res = await ajax.get(`/buy/product/brand`);
  return res;
  // return getManufactureListMock().map((item: any) => {
  //   return { ...item, displayName: `pn is ${pn}${item.displayName}` };
  // });
}

export async function getDropDownInfo(data: any) {
  const res = await ajax.post("/home/search/selection", {
    productKey: data
  });
  return res;
}

export async function stringToUserSelect(data: any) {
  const res = await ajax.post("/home/buy/getinfoid", data);
  return res;
}

export async function productIdToBrandId(productIds: any) {
  const res = await ajax.post("/home/buy/getbrandbyproductid", {
    productIds
  });
  return res;
}