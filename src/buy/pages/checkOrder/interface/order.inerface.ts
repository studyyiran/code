/**
 * 订单组件的Props
 * @property order 订单store
 */
export interface IOrderProps {
  order: IOrderStore;
}
/**
 * 订单summary组件的State
 * @property normal 订单summary不需要收起功能
 * @property isOpen 订单summary是否展开
 */
export interface IOrderSummaryState {
  isOpen: boolean;
  normal: boolean;
}
/**
 * 订单模块的Store
 * @property orderNo 订单编号
 * @property orderDetail 订单数据
 * @computed progressType 进度条数据
 * @computed machineInfo 机器基本属性
 * @computed userInformation 用户信息
 * @action getOrderDetail 获取订单数据
 * @action approveRevisedPrice 同意质检报价
 * @action returnProduct 不同意报价，退回手机
 * @action autoSaveLoginMes 保存登陆信息
 * @action autoLogin 自动查找信息登陆
 * @action setOrderDetail 保存订单详情
 */
export interface IOrderStore {
  email: string;
  orderNo: string;
  orderDetail: IOrderDetail;
  progressType: IProgressData;
  machineInfo: IMachineInfo;
  userInformation: IUserInformation;
  deliverInfos: IShippingAddress[];
  deliverNoInfo: {
    carrier: null | string;
    trackingNumber: null | string;
  };
  inspectionInfo: IInspectionData;
  trackingInfo: ITrackingModel | null;
  paymentInfo: IPayment;
  getOrderDetail: (email: string, orderNo: string) => Promise<IOrderDetail>;
  getOrderDetailByToken: (token: string) => Promise<boolean>;
  approveRevisedPrice: () => Promise<boolean>;
  returnProduct: () => Promise<boolean>;
  autoSaveLoginMes: () => void;
  autoLogin: () => Promise<boolean>;
  setOrderDetail: (d: IOrderDetail) => void;
  tellUserToReportError: (error: any) => void;
}

/**
 * 订单详情数据（原始版）
 * @property status 订单状态，枚举值
 * @property payment 支付方式 "PAYPAL" | "CHECK"
 * @property checkInfo 支票付款的信息
 * @property paypalInfo paypal付款信息
 * @property orderNo 订单号
 * @property orderItem 询价和质检内容
 * @property trackingNo 物流单号
 * @property createdDt 创建日期
 * @property updatedDt 更新日期
 * @property userEmail 用户邮箱
 * @property userName 用户名
 * @property addressInfo 邮寄目的地
 * @property shippoTransaction 快递信息
 * @property orderPaymentBills 支付信息
 * @property returnTrackingNo 退货物流单号
 */
export interface IOrderDetail {
  status: IProgressType;
  payment: "PAYPAL" | "CHECK";
  checkInfo: ICheckInfo;
  paypalInfo: IPaypalInfo;
  orderNo: string;
  orderItem: IOrderInspected;
  trackingNo: string;
  createdDt: string;
  updatedDt: string;
  userName: string;
  userEmail: string;
  addressInfo: IAddressInfo;
  shippoTransaction: IShippingTran;
  orderPaymentBills: IPaymentInfo[];
  orderRecords: IOrderRecord[];
  returnTrackingNo: string;
  downloadCode: string;
  ext: {
    returnExpressInfo: {
      carrier: string;
      trackingNumber: string;
    };
  };
}
/**
 * 订单中物流id
 */
export interface IShippingTran {
  carrier: string;
  trackingNumber: string;
  ext: {
    labelUrl: string;
  };
}
/**
 * 物流信息接口返回
 */
export interface ITrackingModel {
  trackingNumber: string;
  trackingHistory: ITrackHistoryItem[];
  trackingStatus: ITrackHistoryItem;
}
/**
 * 单个物流记录
 */
export interface ITrackHistoryItem {
  location: string;
  objectCreated: string;
  objectUpdated: string;
  statusDetails: string;
  statusDate: string;
}
/**
 * 订单属性
 * @property actualAmount 质检金额, 单位分
 * @property actualProductName 质检机型
 * @property actualSkuName 质检SKU
 * @property amount 用户询价金额, 单位分
 * @property<Array> inspectItems 物品实际质检属性列表
 * @property inspectedDt 质检时间
 * @property orderItemNo 物品编号
 * @property productId 用户提交机型ID
 * @property productName 用户提交机型
 * @property skuName 用户提交SKU
 * @property<Array> submitItems 用户选择的机器属性列表
 * @property carrier 运营商
 */
export interface IOrderInspected {
  actualAmountDollar: number;
  actualProductName: string;
  amountDollar: number;
  inspectItems: IInspectItems[];
  inspectedDt: string;
  orderItemNo: string;
  productId: string;
  productName: string;
  skuName: string;
  // submitItems: IInspectItems[];
  carrier: string;
  inspectResult: IInsepectResult;
  pricePropertyValues: IInquiryPropertity[];
  product: {
    id: string;
    name: string;
    isTBD: boolean;
    isIOS: boolean;
  };
  notice: string;
}
/**
 * 询价数据
 */
export interface IInquiryPropertity {
  id: string;
  value: string;
}
/**
 * 质检结果
 */
export interface IInsepectResult {
  diffs: Array<{
    actualValueName: string;
    matched: boolean;
  }>;
  result: "MATCHED" | "WRONG_PRODUCT" | "WRONG_CONDITION";
}
/**
 * 邮寄信息
 * @property addressLine 用户填写地址(必填部分)
 * @property addressLineOptional 用户填写地址(选填部分)
 * @property city 城市
 * @property country 国家
 * @property firstName 姓氏
 * @property lastName 名字
 * @property mobile 手机号
 * @property state 州
 * @property zipCode 邮编
 */
export interface IAddressInfo {
  addressLine: string;
  addressLineOptional?: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  mobile: string;
  state: string;
  zipCode: string;
}
/**
 * 机器单个属性内容
 * @protected id 属性id
 * @property isSkuProperty 是否为sku属性
 * @property name 属性名称
 */
export interface IInspectItems {
  id: number;
  isSkuProperty: boolean;
  name: string;
}
/**
 * 支票信息，只有支票付款才有
 * @property card 卡号
 */
export interface ICheckInfo {
  email: string;
}
/**
 * paypal信息，只有paypal付款才有
 * @property email paypal账号
 */
export interface IPaypalInfo {
  email: string;
}
/**
 * 订单状态枚举
 * @enum(TO_BE_SHIPPED) 等待寄出
 * @enum(TRANSACTION_SUCCEED) 交易成功
 * @enum(TRANSACTION_FAILED) 交易失败
 * @enum(TO_BE_RECEIVED) 货物已经收到
 * @enum(TO_BE_INSPECTED) 等待质检
 * @enum(DIFFERENCE_INSPECTED) 质检差异
 * @enum(TO_BE_RETURNED) 等待退货
 * @enum(LISTED_FOR_SALE) 等待拍卖
 */
export enum IProgressType {
  TO_BE_SHIPPED = "TO_BE_SHIPPED",
  TRANSACTION_SUCCEED = "TRANSACTION_SUCCEED",
  TRANSACTION_FAILED = "TRANSACTION_FAILED",
  TO_BE_RECEIVED = "TO_BE_RECEIVED",
  TO_BE_INSPECTED = "TO_BE_INSPECTED",
  TO_BE_LISTED = "TO_BE_LISTED",
  DIFFERENCE_INSPECTED = "DIFFERENCE_INSPECTED",
  TO_BE_RETURNED = "TO_BE_RETURNED",
  LISTED_FOR_SALE = "LISTED_FOR_SALE"
}

// 机器属性
export interface IMachineInfo {
  model: string;
  carrier: string;
  condition: string;
  guaranteedPrice: number | string;
}

/**
 * 用户信息
 * @property shippingAddress 物流地址信息列表
 * @property telAndEmail 电话和email的数组
 * @property paymentType 支付方式
 * @property paymentAccount 支付账号
 * @property paymentMethod Array<paymentType,paymentAccount>
 * @property orderNumber 订单编号
 * @property orderDate 订单日期
 */
export interface IUserInformation {
  shippingAddress: string[];
  telAndEmail: string[];
  paymentType?: string;
  paymentAccount?: string;
  paymentMethod: string[];
  orderNumber: string;
  orderDate: string;
}
/**
 * 单条物流信息
 * @property createdDt 物流信息更新日期
 * @property description 描述
 * @property location 物流更新地区
 */
export interface IDeliverInfoItem {
  createdDt: string;
  description: string;
  location: string;
}
// 进度条数据
export interface IProgressData {
  currentIndex: number;
  dataList: IProgressDot[];
}

// 进度条单个点属性
export interface IProgressDot {
  name: string;
  date?: string;
  img?: string | null | undefined;
}
/**
 * 物流信息
 */
export interface IDeliverData {
  shippingAddress: IShippingAddress[];
}
/**
 * 物流信息
 * @property date 物流更新日期
 * @property listData 物流更新记录
 */
export interface IShippingAddress {
  date: string;
  listData: Array<{
    time: string;
    listData: string[];
  }>;
}
export interface IDeliverSatus {
  loading: boolean;
  visible: boolean;
}
/**
 * 质检信息,
 * @property diffStatus 是否存在之间差异
 * @property differenceText 存在何种差异
 * @property amount 用户询价金额
 * @property revisedPrice 质检修订之后价格
 * @property differentCondition 质检差异结果
 * @property productName 产品名 当质检产品不一致的时候存在，否则为""
 */
export interface IInspectionData {
  diffStatus: "success" | "fail";
  productName: string;
  differenceText: string;
  amount: number;
  revisedPrice: number;
  differentCondition: string[];
}

/**
 * 支付信息
 */
interface IPaymentInfo {
  account: string;
  amountDollar?: number;
  hammerAmountDollar?: number;
  // amount: number;
  status: "PENDING" | "PAYING" | "SUCCESS" | "FAILED";
  payFor: "RESERVE_PRICE" | "HAMMER_ADDITIONAL";
}

/**
 * 支付结果
 */
interface IPayment {
  finalSalePrice: number;
  priceGuarantee: number;
  priceGuaranteeStatus: boolean; // 支付状态
  bonus: number;
  bonusStatus: boolean;
}

/**
 * 操作记录
 */
export interface IOrderRecord {
  afterStatus: IProgressType;
  beforeStatus: IProgressType;
  createdDt: string;
}
