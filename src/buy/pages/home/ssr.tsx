import {
  getSellBrand,
  getBuyProductList,
  getSellProductList,
  getBuyBrand
} from "./server";
import { OurHomeStoreName } from "./context";
import { ISsrFileStore } from "../../common/interface/index.interface";

export const ourHomeSsrRule = async (url: string) => {
  const ssrRes: ISsrFileStore = {
    ssrConfig: {
      ssrTitle: ""
    },
    storeList: []
  };
  const store: {
    storeName: string;
    storeData: {
      sellListTitle: any[];
      buyListTitle: any[];
      buyProductList: any[];
      sellProductList: any[];
    };
  } = {
    storeName: OurHomeStoreName,
    storeData: {
      sellListTitle: [],
      buyListTitle: [],
      buyProductList: [],
      sellProductList: []
    }
  };
  const sellListTitle: any = await getSellBrand();
  if (sellListTitle) {
    store.storeData.sellListTitle = (sellListTitle || []).map(
      ({ brandId, brandDisplayName, seqNo }: any) => {
        return {
          seqNo,
          id: brandId,
          displayName: brandDisplayName
        };
      }
    );
  }

  const buyListTitle: any = await getBuyBrand();
  if (buyListTitle) {
    store.storeData.buyListTitle = (buyListTitle || []).map(
      ({ brandId, brandDisplayName, seqNo }: any) => {
        return {
          seqNo,
          id: brandId,
          displayName: brandDisplayName
        };
      }
    );
  }

  const buyProductList: any = await getBuyProductList({
    seq: buyListTitle[0].seqNo,
    brandId: buyListTitle[0].brandId
  });
  if (buyProductList && buyProductList.length) {
    store.storeData.buyProductList = buyProductList;
  }

  const sellProductList: any = await getSellProductList({
    seq: sellListTitle[0].seqNo,
    brandId: sellListTitle[0].brandId
  });
  if (sellProductList && sellProductList.length) {
    store.storeData.sellProductList = sellProductList;
  }

  ssrRes.storeList.push(store);
  return ssrRes;
};
