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
            productDisplayName
          } = productDetail as IProductDetail;
          const [lineOne, lineTwo] = getDescArr(
            buyProductBQV,
            productDisplayName
          );
          // 设置路径
          ssrRes.ssrConfig.ssrTitle = `Used ${lineOne} ${lineTwo
            .replace("(", "- ")
            .replace(")", "")} For Sale | UpTradeit.com`;

          ssrRes.ssrConfig.metaDesc = `${lineOne} ${lineTwo
            .replace("(", " ")
            .replace(")", "")}`;
          try {
            const json = {
              "@context": "https://schema.org/",

              "@type": "Product",

              name: "iPhone 7 256GB Black - Verizon",

              image:
                "https://d3c745jesl5pj3.cloudfront.net/buy/web/IMG_9632_241b86b0cdfc4d019220119547a700c9.JPG, https://d3c745jesl5pj3.cloudfront.net/buy/web/IMG_9634_9664a55d6308449c89fd5ec6727df35a.JPG, https://d3c745jesl5pj3.cloudfront.net/buy/web/IMG_9636_9481bf8e81404f31bbbfde22a6669608.JPG",

              description:
                "This used refurbished certified iPhone X 256GB Silver AT&T for sale has passed a rigorous inspection process by UpTrade. View real actual phone photos and inspection report. This phone comes with a 30 day free return policy.",

              brand: "Apple",

              sku: "15807483CR",

              offers: {
                "@type": "Offer",

                url: "https://uptradeit.com/detail/2193",

                priceCurrency: "USD",

                price: "183",

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
