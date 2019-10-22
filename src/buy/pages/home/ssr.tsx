import { getSellBrand, getBuyProductList, getSellProductList } from "./server";
import { OurHomeStoreName } from "./context";

export const ourHomeSsrRule = async (url: string) => {
  const store: {
    storeName: string;
    storeData: {
      sellListTitle: any[];
      buyProductList: any[];
      sellProductList: any[];
    };
  } = {
    storeName: OurHomeStoreName,
    storeData: {
      sellListTitle: [],
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
  const buyProductList: any = await getBuyProductList({});
  if (buyProductList && buyProductList.length) {
    store.storeData.buyProductList = buyProductList;
  }

  const sellProductList: any = await getSellProductList({});
  if (buyProductList && buyProductList.length) {
    store.storeData.sellProductList = sellProductList;
  }
  return store;
};
