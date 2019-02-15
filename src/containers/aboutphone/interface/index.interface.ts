import * as H from 'history';
import { IUserStoreNew } from '@/store/interface/user.interface';

export interface IYourPhoneStore {
  carriers: ICarrier[];
  brands: IBrands[];
  products: IProductModel[];
  productPPVNS: IProductPPVN[];
  inquiryDetail: IInquiryDetail | null;
  inquiryKey: string;
  activeBrandsId: number;
  activeCarrierName: string;
  activeProductId: number;
  activeModelId: number;
  americaStates: IAmericaState;
  getBrandsByCid: (categoryId?: number) => Promise<boolean>;
  getCarrier: () => Promise<boolean>;
  getProductsList: () => Promise<boolean>;
  getProductDetail: (id: number) => Promise<boolean>;
  getProductPPVN: () => Promise<boolean>;
  createInquiry: (inquiry: IQueryParams) => Promise<boolean>;
  getInquiryDetail: () => Promise<boolean>;
  getAmericaState: (zipCode: number) => Promise<boolean>;
}

export interface ILayOutProps {
  nextPath?: string;
  hideBottom?: boolean;
}

export interface IBrandLayoutProps {
  history: H.History;
  route: { [key: string]: any };
}

export interface IBrandsProps {
  history: H.History;
  yourphone: IYourPhoneStore;
  user: IUserStoreNew;
}

export interface IModelsProps extends IBrandsProps {
  onModelItemClick(): void;
}

export type IDoneProps = IBrandsProps;

export interface ICarrier {
  description: string;
  name: string;
}

export interface IBrands {
  iconUrl: string;
  id: number;
  name: string;
  active?: boolean;
  order?: number;
}

export interface IBrandsItemProps {
  brand: IBrands;
  onBrandClick: (brand: IBrands) => void;
  activeBrandsId: number;
}

export interface ICarrierItemProps {
  carrier: ICarrier;
  onCarrierClick: (carrier: ICarrier) => void;
  activeCarrierName: string;
}

export interface IBrandListProps {
  history: H.History;
  yourphone: IYourPhoneStore;
}

export interface IInquiryDetail {
  key: string; // 询价key
  ppvs: ISkuPricePropertyValues[];
  price: number; // 询价价格
  product: IProductDetail;
}

export interface IProductDetail {
  brandId: number;
  categoryId: number;
  id: number;
  name: string;
  skuPricePropertyValues: ISkuPricePropertyValues;
}

export interface ISkuPricePropertyValues {
  id: number;
  name: string;
}

export interface IAmericaState {
  city: string;
  state: string;
}

export interface INavigatorObj {
  step: number; // 侧边的
  mainText: string;
  subText: string;
  hasSearch: boolean;
  progress: number; // 底部导航, 值为-1表示不需要展示
}

export interface IQueryParams {
  agencyId: number;
  agentId: number;
  priceUnits: number[];
  productId: number;
}

export interface IProductModel {
  brandId: number;
  categoryId: number;
  id: number;
  image: string;
  name: string;
  activeModelId: number;
  activeProductId: number;
  skuPricePropertyValues: ISkuPricePropertyValues[];
}

export interface IProductPPVN {
  id: number; // 项的id
  name: string;
  illustrationContent: {
    propertyIllustrationContentText: string;
  }
  pricePropertyValues: {
    value: string;
    id: number; // 项中选中的属性的id
  }
}