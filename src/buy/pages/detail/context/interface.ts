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
  userInfo: {
    userId: string;
    userName: string;
    userImg: string;
  }
}

export interface IReviews {
  page: number, // 当前页
  per_page: number, // x条一分页
  stats: {
    average_rating: string, // 评分
    total_reviews: string, // 总评论数
  },
  reviews: IReview[],
  store: string, // 公司
  total_pages: number // 总页数
}

export interface IReview {
  store_review_id: string, // 5 years ago
  timeago: string, // 5 years ago
  comments: string, // 评论
  rating: string, // 评分
  reviewer: {
    first_name: string,
    last_name: string
  }
}