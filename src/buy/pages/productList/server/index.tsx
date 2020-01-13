import ajax from "../../../common/utils/ajax";
import { debounce } from "../../../common/utils/util";

async function getBaseAttr() {
  const res = await ajax.get("/buy/product/basicQuality?categoryId=1");
  return res;
}

const getProductList = debounce(async (data: any) => {
  const res: any = await ajax.post("/buy/product/filterSearch", data);
  return res && res.list ? res.list : [];
}, 10);

async function getModelList(pn: any) {
  const res: any = await ajax.get(
    `/buy/product/saleProduct?pageSize=5&pageNum=${pn}`
  );
  return res;
}

async function getManufactureList(pn?: any) {
  const res = await ajax.get(`/buy/product/brand?id=1`);
  return res;
}

async function getDropDownInfo(data: any) {
  const res = await ajax.post("/home/search/selection", {
    productKey: data
  });
  return res;
}

async function stringToUserSelect(data: any) {
  const res = await ajax.post("/home/buy/getinfoid", data);
  return res;
}

async function productIdToBrandId(productIds: any) {
  const res = await ajax.post("/home/buy/getbrandbyproductid", {
    productIds
  });
  return res;
}

export const serverProductList = {
  productIdToBrandId,
  stringToUserSelect,
  getDropDownInfo,
  getManufactureList,
  getModelList,
  getProductList,
  getBaseAttr
};
