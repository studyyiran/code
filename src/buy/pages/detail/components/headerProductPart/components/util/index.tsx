import {IProductDetailGetWithCode} from "../../../../context/interface";

export const getArrBySort = (productDetailByCode: IProductDetailGetWithCode) => {
  // 首先要排序.
  // 1 先找出quick
  const findQuickIndex = productDetailByCode.attributes.findIndex(item => {
    return item.tags === "QUICKFILTERBUY";
  });
  let after = [];
  if (findQuickIndex === -1) {
    after = [
      productDetailByCode.condition,
      ...productDetailByCode.attributes.sort((a, b) => {
        return a.sort - b.sort;
      })
    ];
  } else {
    after = [
      productDetailByCode.attributes[findQuickIndex],
      productDetailByCode.condition,
      ...productDetailByCode.attributes
        .filter((item, index) => {
          return item.tags !== "QUICKFILTERBUY";
        })
        .sort((a, b) => {
          return a.sort - b.sort;
        })
    ];
  }
  return after
}