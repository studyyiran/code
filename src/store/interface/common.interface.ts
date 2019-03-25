export interface ICommonStore {
  positionInfo: any;
  isMobile: boolean;
  staticOffice: IStaticOffice | null;
  reviews: IReviews | null;
  moduleOn: boolean;
  reviewsLoading: boolean;
  reviewsPagation: IReviewsPagation;
  filterReviews: () => void;
  initPosition: () => Promise<boolean>;
  onSubscribe: (email: string) => Promise<boolean>
  getStaticOffice: () => Promise<boolean>
  getReviews: (query: { [key: string]: string | number }) => Promise<boolean>,
  getModuleOn: () => Promise<boolean>,
}

export interface IReviewsPagation {
  page: number,
  list: IReview[],
  rating: string
}

export interface ICommonProps {
  common: ICommonStore
}

export interface IStaticOffice {
  city: string  // 城市,
  companyName: string  // 名称,
  country: string  // 国家,
  formattedAddress: string  // 格式化地址: {street}, {city} {state} {zipCode},
  phone: string  // 联系电话,
  receiver: string  // 收件人,
  state: string  // 州,
  street: string  // 详细地址,
  zipCode: string  // 邮编
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
  timeago: string, // 5 years ago
  comments: string, // 评论
  rating: string, // 评分
  reviewer: {
    first_name: string,
    last_name: string
  }
}