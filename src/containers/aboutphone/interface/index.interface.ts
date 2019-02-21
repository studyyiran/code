import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';
import * as H from 'history';
import { IUserStoreNew } from '@/store/interface/user.interface';

export interface IYourPhoneStore {
  carriers: ICarrier[];
  brands: IBrands[];
  products: IProductModel[];
  products4Search: IProductModel[],
  productPPVNS: IProductPPVN[];
  inquiryDetail: IInquiryDetail | null;
  orderDetail: any;
  addressInfo: IAddressInfo;
  inquiryKey: string;
  payment: string; // 选择的支付方式
  paypal: {
    email: string;
  }
  echeck: {
    firstName: string;
    lastName: string;
    email: string;
  }
  activeBrandsId: number;
  activeBrandsName: string;
  activeCarrierName: string;
  activeProductId: number;
  activeProductName: string;
  activeModelId: number;
  activeModelName: string;
  activeConditions: object;
  americaStates: IAmericaState;
  isTBD: boolean; // 选中的品牌是否为other
  isAllConditionSelected: boolean; // computed
  isAddressValuesAndDisabled: boolean;
  getBrandsByCid: (categoryId?: number) => Promise<boolean>;
  getCarrier: () => Promise<boolean>;
  getProductsList: (keyword?: string) => Promise<boolean>;
  getProductDetail: (id: number) => Promise<boolean>;
  getProductPPVN: () => Promise<boolean>;
  createInquiry: () => Promise<boolean>;
  getInquiryDetail: () => Promise<boolean>;
  getAmericaState: (zipCode: number) => Promise<boolean>;
  createOrder: () => Promise<boolean>;
}

export interface ILayOutProps {
  nextPath?: string;
  hideBottom?: boolean;
  nextCb?: () => void;
  progress?: number;
  disabled?: boolean
}

export interface IBrandLayoutProps {
  history: H.History;
  route: { [key: string]: any };
}

export interface IBrandsProps {
  history: H.History;
  yourphone: IYourPhoneStore;
  user: IUserStoreNew;
  hideLayout?: boolean; // 用于隐藏布局标题头和导航脚，用于在done页面当modal的组件
  // ref?: React.RefObject<React.Component<IShippingProps | IPaymentProps | IConditionsProps>>;
  onRef?: (child: React.Component) => void;
}

export interface IModelsProps extends IBrandsProps {
  onModelItemClick(): void;
}

export type IConditionsProps = IBrandsProps;

export type IShippingProps = IBrandsProps & FormComponentProps

export type IPaymentProps = IBrandsProps & FormComponentProps;

export type IDoneProps = IBrandsProps;

export type ICheckOutProps = IBrandsProps & { user: IUserStoreNew };

export interface IPaymentStates {
  isLeftOnEdit: boolean;
  isRightOnEdit: boolean;
  activeSide: string;
}
export interface IDoneStates {
  isChecked: boolean;
  showEditModal: boolean;
  pageType: 'shipping' | 'payment' | 'condition' | '';
}

export interface ICheckOutStates {
  brand: number;
  payment: string;
  brandText: string[];
  payText: object;
}

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
  ppvs: ISkuPricePropertyNames[];
  price: number; // 询价价格--美分
  priceDollar: number; // 询价价格--美元
  product: IProductDetail;
}

export interface IProductDetail {
  brandId: number;
  categoryId: number;
  id: number;
  name: string;
  skuPricePropertyValues: ISkuPricePropertyNames;
}

export interface ISkuPricePropertyNames {
  id: number;
  // name: string;
  value: string;
  pricePropertyValues: ISubSkuPricePropertyValues[];
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
  isInCheckOrder?: boolean;
}

export interface IQueryParams {
  agentCode: string;
  priceUnits: number[];
  productId: number;
}

export interface IProductModel {
  brandId: number;
  categoryId: number;
  id: number;
  imageUrl: string;
  name: string;
  skuPricePropertyNames: ISkuPricePropertyNames[];
  activeModelId: number;
  activeProductId: number;
  onModelItemClick(productId: number, productName: string, skuId: number, skuName: string): void;
}

export interface IProductPPVN {
  id: number; // 项的id
  name: string;
  illustrationContent: {
    propertyIllustrationContentText: string;
  }
  pricePropertyValues: ISubSkuPricePropertyValues[];
  isSkuProperty: boolean;
}

export interface ISubSkuPricePropertyValues {
  value: string;
  id: number;
}

export interface IAddressInfo {
  [k: string]: string;
  addressLine: string;
  addressLineOptional: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  mobile: string;
  state: string;
  zipCode: string;
}

export interface IChangeModalProps {
  type: 'shipping' | 'payment' | 'condition' | '';
  onSave: () => void;
}

export enum EChangeType {
  SHIPPING = 'shipping',
  PAYMENT = 'payment',
  CONDITION = 'condition'
}

export enum EBrandType {
  IPHONE = 0,
  ANDROID = 1
}

export enum EPayType {
  PAYPAL = 'PAYPAL',
  ECHECK = 'CHECK'
}

export interface IBreadCrumb {
  style: object;
  brandName: string;
  carrierName: string;
  modelName: string;
}