import { ModalFuncProps } from 'antd/lib/modal';
import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';
import * as H from 'history';
import { RouteComponentProps } from 'react-router'
import { IUserStoreNew, IPreOrder } from '@/store/interface/user.interface';
import { ICommonStore } from '@/store/interface/common.interface';
import { IOrderDetail } from '@/containers/order/interface/order.inerface'

export interface IYourPhoneStore {
  carriers: ICarrier[];
  brands: IBrands[];
  products: IProductModel[];
  products4Search: IProductModel[],
  productPPVNS: IProductPPVN[];
  inquiryDetail: IInquiryDetail | null;
  orderDetail: IOrderDetail | null;
  allOrdersDetail: IOrderDetail[];
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
  oldActiveBrandsId: number;
  activeBrandsName: string;
  activeCarrierName: string;
  activeCarrierDescription: string,
  activeProductId: number;
  activeProductName: string;
  activeModelId: number;
  activeModelName: string;
  activeConditions: object;
  americaStates: IAmericaState | null;
  isTBD: boolean; // 选中的品牌是否为other
  isAllConditionSelected: boolean; // computed
  isAddressValuesAndDisabled: boolean;
  isDonePayment: boolean;
  isLeftOnEdit: boolean;
  isRightOnEdit: boolean;
  isPaymentFormFilled: boolean;
  tbdInfo: ITbdInfo;
  getBrandsByCid: (categoryId?: number) => Promise<boolean>;
  getCarrier: () => Promise<boolean>;
  getProductsList: (keyword?: string) => Promise<boolean>;
  getProductDetail: (id: number) => Promise<boolean>;
  getProductPPVN: () => Promise<boolean>;
  createInquiry: () => Promise<boolean>;
  getInquiryDetail: () => Promise<boolean>;
  getAmericaState: (zipCode: string) => Promise<boolean>;
  createOrder: () => Promise<boolean>;
  destory: () => void;
  destoryByAppendOrder: () => void;
  desoryUnmount: () => void;
  appendOrder: (preOrder: Partial<IPreOrder>) => Promise<boolean>;
  getAllOrders: (orderNo: string, userEmail: string) => Promise<boolean>;
  getOrderDetail: (orderNo: string, userEmail: string) => Promise<boolean>;
}

export interface ILayOutProps {
  nextPath?: string;
  hideBottom?: boolean;
  nextCb?: () => void;
  progress?: number;
  disabled?: boolean;
  userEmail?: string;
}

export interface IBrandLayoutProps {
  history: H.History;
  route: { [key: string]: any };
}

export interface IBrandsProps {
  history: H.History;
  yourphone: IYourPhoneStore;
  user: IUserStoreNew;
  common: ICommonStore;
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

export type ICheckOutProps = IBrandsProps & { user: IUserStoreNew } & RouteComponentProps<{ orderNo: string }>;

export interface IPaymentStates {
  // isLeftOnEdit: boolean;
  // isRightOnEdit: boolean;
  activeSide: string;
}
export interface IDoneStates {
  isChecked: boolean;
  showEditModal: boolean;
  pageType: 'shipping' | 'payment' | 'condition' | '';
  loadingComplete: boolean,
  loadingAppend: boolean
}

export interface ICheckOutStates {
  brandText: React.ReactNode;
  detailText: (label: React.ReactNode) => React.ReactNode;
  translateMore: boolean;
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
  imageUrl: string;
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
  showNext?: boolean; // 是否强制显示next 按钮（跳过step 和 progress 判断）
  showAppendOrder: boolean
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
  isTBD?: boolean
}

export interface IModleItemProps extends IProductModel {
  onModelItemClick(productId: number, productName: string, skuId: number, skuName: string, imageUrl: string, props?: IProductModel): void;
  onGoToTBD(): void
}

export interface IProductPPVN {
  id: number; // 项的id
  name: string;
  illustrationContent: {
    propertyIllustrationContentText: string;
  } | null
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

export interface IShippingState {
  help: string,
  validateStatus: string | undefined
}

export interface INoteUserModalProps extends ModalFuncProps {
  content: JSX.Element | string;
  update?: (seconds: number) => JSX.Element | string;
  type: 'success' | 'info' | 'error' | 'warn' | 'confirm' | 'warning'
  onOk?: () => void
  customerOk?: () => void
  title?: string;
  seconds?: number;
  hasCountDown?: boolean;
}

export interface IOtherProps extends FormComponentProps {
  history: H.History;
  yourphone: IYourPhoneStore
  user: IUserStoreNew
}

export interface ITbdInfo {
  modelName: string,
  properties: string[],
  storage: string,
  donate: boolean
}

export interface IAppendOrderParams {
  brandId: number,
  carrier: string,
  inquiryKey: string,
  tbdInfo?: ITbdInfo,
}