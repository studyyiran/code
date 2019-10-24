/*
getInitialProps是一个异步方法.
是服务器拉取ssr数据用的.
当ssr下掉的时候,client也可以通过调用该方法完成数据回补.


传入参数(页面url信息)
 */

import {
  getBaseAttr,
  getProductList,
  stringToUserSelect,
  getManufactureList
} from "./server";
import {
  ATTROF,
  productListReducerActionTypes,
  StoreProductList
} from "./context";
import { getProductListPath } from "../../common/utils/util";
import { ISsrFileStore } from "../../common/interface/index.interface";

export const productListSsrRule = async (url: string) => {
  const ssrRes: ISsrFileStore = {
    ssrConfig: {
      ssrTitle: ""
    },
    storeList: []
  };
  const store: {
    ssrTitle: string;
    storeName: string;
    storeData: {
      currentFilterSelect: any[]; // 用户的一切选择
      staticFilterList: any[]; // 静态列表
      productList: any[]; // 最终渲染的商品列表
      modelList: any[]; // 用户可能点击more来显示.需要回补数据
      manufactureList: any[]; // 因为用户可能选中,造成渲染异常,所以必须.
    };
  } = {
    ssrTitle: "",
    storeName: StoreProductList,
    storeData: {
      currentFilterSelect: [], // 用户的一切选择
      staticFilterList: [], // 静态列表
      productList: [], // 最终渲染的商品列表
      modelList: [], // 用户可能点击more来显示.需要回补数据
      manufactureList: []
    }
  };
  const splitResult = url.split(getProductListPath());
  url = splitResult && splitResult[1] ? splitResult[1] : "";
  let paramsArr = url.split(/-|\//);
  if (paramsArr && paramsArr[0] === "") {
    paramsArr = paramsArr.slice(1);
  }
  const jsonArr = new Array(5)
    .fill("")
    .map((item, index) => {
      if (paramsArr && paramsArr[index]) {
        return paramsArr[index];
      } else {
        return "";
      }
    })
    .map((item: string) => {
      if (item.indexOf("all") === -1) {
        return item;
      } else {
        return "";
      }
    });
  // 分割后，应该最多有5个字符。
  const json = {
    brandName: jsonArr[0],
    productName: jsonArr[1],
    skuAttrNames: [jsonArr[2], jsonArr[3], jsonArr[4]]
  };
  // ssrTitle
  // 当有机型的时候
  const titleTemplete = `Buy used REPLACE | Uptradeit.com`;
  if (json.productName) {
    if (json.skuAttrNames && json.skuAttrNames[0]) {
      ssrRes.ssrConfig.ssrTitle = titleTemplete.replace(
        "REPLACE",
        `${json.productName.split(",")[0]} ${
          json.skuAttrNames[0].split(",")[0]
        }`
      );
    } else {
      ssrRes.ssrConfig.ssrTitle = titleTemplete.replace(
        "REPLACE",
        `${json.productName.split(",")[0]}`
      );
    }
  } else {
    if (json.brandName) {
      ssrRes.ssrConfig.ssrTitle = titleTemplete.replace(
        "REPLACE",
        `${json.brandName.split(",")[0]}`
      );
    }
  }
  function addIntoSelect(arr: any[], mapFunc: any) {
    store.storeData.currentFilterSelect = store.storeData.currentFilterSelect.concat(
      arr.map(mapFunc)
    );
  }
  // 发起请求，获取参数
  const userSelectData: any = await stringToUserSelect(json);
  if (userSelectData) {
    const { brandIds, productIds, skuAttrIds } = userSelectData;
    addIntoSelect(brandIds, (id: any) => ({ id: `Manufacture-${id}` }));
    addIntoSelect(productIds, (productInfo: any) => {
      const { id, name } = productInfo;
      // 顺带着 回补数据
      store.storeData.modelList.push({
        id: id,
        displayName: name
      });
      return { id: `Model-${id}` };
    });
    // 调用接口获取attr列表.进行匹配
    const baseAttrRes: any = await getBaseAttr();
    if (baseAttrRes && baseAttrRes.length) {
      store.storeData.staticFilterList = baseAttrRes;
      baseAttrRes.forEach((item: any, index: number) => {
        const { bpId } = item;
        (skuAttrIds[index] ? skuAttrIds[index] : []).forEach((id: any) => {
          store.storeData.currentFilterSelect = store.storeData.currentFilterSelect.concat(
            [{ id: `${ATTROF}${bpId}-${id}` }] as any
          );
        });
      });
    }
  }
  const userSelectInfo = {
    productKey: [],
    buyLevel: [],
    filterBQVS: [], //
    filterProductId: [], //
    brandId: [], //
    price: [],
    pageNum: 1,
    pageSize: 20
  };
  const productList = await getProductList(userSelectInfo);
  store.storeData.productList = productList;

  const manufactureList: any = await getManufactureList();
  if (manufactureList && manufactureList.length) {
    store.storeData.manufactureList = (manufactureList || []).map(
      ({ brandId, brandDisplayName }: any) => {
        return {
          id: brandId,
          displayName: brandDisplayName
        };
      }
    );
  }
  ssrRes.storeList.push(store);
  return ssrRes;
};
