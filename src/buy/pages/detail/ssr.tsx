import { StoreDetail } from "./context";
import { getProductDetailByCode } from "./server";
import { getDescArr } from "./util";
import { ISsrFileStore } from "../../common/interface/index.interface";
import { IProductDetail, IProductDetailGetWithCode } from "./context/interface";
import { getUrlAllParams } from "../../common/utils/util";

export const detailSsrRule = async (url: string, href: string) => {
  console.log(href);
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
  const param = getUrlAllParams(href);
  if (arr && arr.length) {
    const modalName = String(arr[arr.length - 1]);
    if (modalName) {
      {
        let codeInfo;
        if (param && param.variant) {
          codeInfo = {
            modelDisplayName: "",
            buyProductCode: param.variant
          };
        } else {
          codeInfo = {
            modelDisplayName: modalName,
            buyProductCode: ""
          };
        }
        // 调用常规的接口
        const productDetailByCode: IProductDetailGetWithCode = await getProductDetailByCode(
          codeInfo
        );
        if (productDetailByCode) {
          // store.storeData.productId = String(productId);
          // @ts-ignore
          store.storeData.productDetailByCode = productDetailByCode;
          const { detail } = productDetailByCode;
          if (detail) {
            const {
              brandDisplayName,
              buyProductBQV,
              productDisplayName,
              skuId,
              buyPrice,
              buyProductImgPc
            } = detail;
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
                name: `${lineOne} ${lineTwo
                  .replace("(", "- ")
                  .replace(")", "")}`,
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
      }
      // const similiarPhoneList: any = await getSimiliar("");
      // if (similiarPhoneList) {
      //   store.storeData.similiarPhoneList = similiarPhoneList;
      // }
    }
  }
  console.log(store);
  ssrRes.storeList.push(store);
  return ssrRes;
};
