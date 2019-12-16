export interface IAnswer {
  productId?: string;
  productKey?: string[];
  buyLevel: string[];
  filterBQVS: {
    bpId: string;
    bpName: string;
    list: { bpvId: string; bpvName: string }[];
  }[];
  filterProductId: string[];
  brandId: string[];
  price: { lowPrice: string; highPrice: string }[];
  pageNum: number;
  pageSize: number;
}