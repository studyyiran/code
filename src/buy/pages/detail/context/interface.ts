export interface IProductDetail {
  brandDisplayName: any; // 品牌名
  buyProductStatus: string; // 状态明
  buyProductImgPc: any;
  buyProductImgM: any;
  buyProductVideo: string;
  buyProductHistoryPdf: string; // pdf文件
  productDescription: string; // 富文本
  buyProductBQV: any; // attr描述
  skuId: any;
  productDisplayName: string;
  buyProductDate: string;
  buyProductId: string;
  productId: string;
  buyProductBatteryLife: string;
  bpvDisplayName: string;
  buyProductCode: string; // productId
  buyLevel: string; // 商品等级
  buyPrice: string; // 销售价格签
  skuPrice: string; // 商品价格
  buyProductRemark: string; // 注释
  productType?: string; // 配件新增
  backGroundCheck: {
    content: string;
    title: string;
  }[]; // 新增用于描述checkList
}