/*
getInitialProps是一个异步方法.
是服务器拉取ssr数据用的.
当ssr下掉的时候,client也可以通过调用该方法完成数据回补.


传入参数(页面url信息)
 */

import { getProductList } from "./server";
import { StoreProductList } from "./context";

export const productListSsrRule = async (url: string) => {
  // 0 判定过滤.
  // 0 解析参数
  // 1 请求1
  // 2 请求2
  const userSelectInfo = {
    productKey: [],
    buyLevel: [],
    filterBQVS: [],
    filterProductId: [],
    brandId: ["1"],
    price: [],
    pageNum: 1,
    pageSize: 20
  };
  const productList = await getProductList(userSelectInfo);
  // 3 返回值
  return {
    storeName: StoreProductList,
    storeData: {
      productList: productList
    }
  };
};
