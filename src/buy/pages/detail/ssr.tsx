import { StoreDetail } from "./context";
import { getProductDetail, getSimiliar } from "./server";
import { getDescArr } from "./util";
import { ISsrFileStore } from "../../common/interface/index.interface";
import { IProductDetail } from "./context/interface";

export const detailSsrRule = async (url: string) => {
  const ssrRes: ISsrFileStore = {
    ssrConfig: {
      ssrTitle: ""
    },
    storeList: []
  };
  const store = {
    storeName: StoreDetail,
    storeData: {
      productId: "",
      similiarPhoneList: [],
      productDetail: []
    }
  };
  const arr = url.split("/");
  if (arr && arr.length) {
    const productId = Number(arr[arr.length - 1]);
    if (productId !== NaN) {
      if (String(productId).indexOf("token") !== -1) {
        // 调用全新接口,获取数据,借用detail的渲染字段
      } else {
        // 调用常规的接口
        const productDetail: IProductDetail = await getProductDetail(
          String(productId)
        );
        if (productDetail) {
          store.storeData.productId = String(productId);
          // @ts-ignore
          store.storeData.productDetail = productDetail;
          const {
            brandDisplayName,
            buyProductBQV,
            productDisplayName,
            skuId,
            buyPrice,
            buyProductImgPc
          } = productDetail as IProductDetail;
          const [lineOne, lineTwo] = getDescArr(
            buyProductBQV,
            productDisplayName
          );
          // 设置路径
          ssrRes.ssrConfig.ssrTitle = `${lineOne} ${lineTwo
            .replace("(", "- ")
            .replace(")", "")} For Sale | UpTradeit.com`;

          // 设置描述
          const PHONEMODEL = `${lineOne} ${lineTwo
            .replace("(", " ")
            .replace(")", "")}`;
          ssrRes.ssrConfig.metaDesc = `This used refurbished certified ${PHONEMODEL} for sale has passed a rigorous inspection process by UpTrade. View real actual phone photos and inspection report. This phone comes with a 30 day free return policy.`;
          try {
            const json = {
              "@context": "https://schema.org/",
              "@type": "Product",
              name: `${lineOne} ${lineTwo.replace("(", "- ").replace(")", "")}`,
              image: buyProductImgPc,
              description: ssrRes.ssrConfig.metaDesc,
              brand: brandDisplayName,
              sku: skuId,
              offers: {
                "@type": "Offer",
                url: url,
                priceCurrency: "USD",
                price: buyPrice,
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/UsedCondition"
              }
            };
            // 制作json数据
            ssrRes.ssrConfig.jsonInfo = JSON.stringify(json);
          } catch (e) {}
        }
      }
      const similiarPhoneList: any = await getSimiliar({
        buyProductId: productId,
        pageNum: 1,
        pageSize: 4
      });
      if (similiarPhoneList) {
        store.storeData.similiarPhoneList = similiarPhoneList;
      }
    }
  }
  ssrRes.storeList.push(store);
  return ssrRes;
};
