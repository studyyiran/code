/*
getInitialProps是一个异步方法.
是服务器拉取ssr数据用的.
当ssr下掉的时候,client也可以通过调用该方法完成数据回补.


传入参数(页面url信息)
 */

import { serverProductList } from "./server";
import {
  ATTROF,
  StoreProductList
} from "./context";
import { getProductListPath } from "../../common/utils/util";
import { ISsrFileStore } from "../../common/interface/index.interface";
import { getAnswers } from "./context/useGetAction";

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
  const userSelectData: any = await serverProductList.stringToUserSelect(json);
  if (userSelectData) {
    const { brandIds, productIds, skuAttrIds } = userSelectData;
    addIntoSelect(brandIds, (id: any) => ({ id: `Manufacture-${id}` }));
    addIntoSelect(productIds, (productInfo: any) => {
      const { id, name } = productInfo;
      // 顺带着 回补数据(这个回补不用考虑brand.因为这个url必带brand)
      store.storeData.modelList.push({
        id: id,
        displayName: name
      });
      return { id: `Model-${id}` };
    });

    // 为了 ssr 设置下model值.(这块因为考虑ssr效果,所以强行做一下.)
    const res: any = await serverProductList.getModelList(2);
    (res || []).forEach(({ productDisplayName, productId, brandId }: any) => {
      store.storeData.modelList.push({
        id: productId,
        displayName: productDisplayName,
        brandId
      });
    });

    // 调用接口获取attr列表.进行匹配
    const baseAttrRes: any = await serverProductList.getBaseAttr();
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
  const manufactureList: any = await serverProductList.getManufactureList();
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
  const { modelList, staticFilterList } = store.storeData;
  // 目前线上商品数为500 其中苹果在售140条 苹果机型420条
  // .因此我个人建议取70%就可以  或者200条就足够了. 实际上160条 apple + 运营商 就可以拉出全部机型(甚至包括全部的sold out机型)
  const maxValue = 200
  const test = getAnswers(
    {
      modelList,
      manufactureList: store.storeData.manufactureList,
      staticFilterList
    },
    store.storeData.currentFilterSelect,
    { pageSize: maxValue }
  );
  const productList = await serverProductList.getProductList(test);
  store.storeData.productList = productList;

  ssrRes.storeList.push(store);
  return ssrRes;
};
