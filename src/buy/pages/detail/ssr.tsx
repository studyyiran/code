import { IProductDetail, StoreDetail } from "./context";
import { getProductDetail, getSimiliar } from "./server";
import { getDescArr } from "./util";

export const detailSsrRule = async (url: string) => {
  const store: {
    ssrTitle: string;
    storeName: string;
    storeData: {
      similiarPhoneList: any[];
      productDetail: any[];
    };
  } = {
    ssrTitle: "",
    storeName: StoreDetail,
    storeData: {
      similiarPhoneList: [],
      productDetail: []
    }
  };
  const arr = url.split("/");
  if (arr && arr.length) {
    const productId = Number(arr[arr.length - 1]);
    if (productId !== NaN) {
      const productDetail: IProductDetail = await getProductDetail(
        String(productId)
      );
      if (productDetail) {
        // @ts-ignore
        store.storeData.productDetail = productDetail;
        const {
          brandDisplayName,
          buyProductBQV,
          productDisplayName
        } = productDetail as IProductDetail;
        const [lineOne, lineTwo] = getDescArr(
          buyProductBQV,
          productDisplayName
        );
        // 设置路径
        store.ssrTitle = `Buy ${brandDisplayName} ${lineOne} ${lineTwo} | UpTradeit.com`;
        console.log(store.ssrTitle);
      }
      const similiarPhoneList: any = await getSimiliar({
        buyProductId: productId,
        pageNum: 1,
        pageSize: 4
      });
      if (similiarPhoneList) {
        store.storeData.similiarPhoneList = similiarPhoneList;
      }
      // 调用
    }
  }

  return store;
};
