import * as H from 'history';

export interface IYourPhoneStore {
  carriers: ICarrier[];
  brands: IBrands[];
  activeBrandsId: number;
  activeCarrierName: string;
  americaStates: IAmericaState[];
  getBrandsByCid: (categoryId?: number) => Promise<boolean>;
  getCarrier: () => Promise<boolean>;
  getAmericaState: () => Promise<boolean>;
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
}

export interface IModelsProps extends IBrandsProps {
  onModelItemClick(): void;
}

export type IDoneProps = IBrandsProps;

export interface ICarrier {
  description: string;
  name: string;
  iconUrl?: string;
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
  abbreviation: string; // 缩写
  name: string;
  ordinal: number; // 序数
}

export interface INavigatorObj {
  step: number; // 侧边的
  mainText: string;
  subText: string;
  hasSearch: boolean;
  progress: number; // 底部导航, 值为-1表示不需要展示
}