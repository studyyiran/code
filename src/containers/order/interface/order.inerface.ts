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
    normal: boolean
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
 */
export interface IOrderStore {
    email: string;
    orderNo: string;
    orderDetail: IOrderDetail;
    progressType: IProgressData;
    machineInfo: IMachineInfo;
    userInformation: IUserInformation;
    deliverInfos: IShippingAddress[];
    inspectionInfo: IInspectionData;
    getOrderDetail: (email: string, orderNo: string) => Promise<IOrderDetail>;
    approveRevisedPrice: () => Promise<boolean>;
    returnProduct: () => Promise<boolean>;
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
    deliveryInfos: IDeliverInfoItem[];
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
    actualAmount: number;
    actualProductName: string;
    actualSkuName: string;
    amount: number;
    inspectItems: IInspectItems[];
    inspectedDt: string;
    orderItemNo: string;
    productId: string;
    productName: string;
    skuName: string;
    submitItems: IInspectItems[];
    carrier: string;
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
    card: string;
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
 * @enum(TRANSACTION_SUCCEED) 货物已经寄出，物流获取成功
 * @enum(TRANSACTION_FAILED) 货物已经寄出，物流获取失败
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
interface IProgressDot {
    name: string;
    date?: string;
    img?: string;
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
        listData: string[]
    }>;
}
export interface IDeliverSatus {
    loading: boolean;
    visible: boolean;
}
/**
 * 质检信息,
 * @property status 是否存在之间差异
 * @property amount 用户询价金额
 * @property revisedPrice 质检修订之后价格
 * @property differentCondition 质检差异结果
 * 
 */
export interface IInspectionData {
    status: boolean;
    amount: number;
    revisedPrice: number;
    differentCondition: string[];
}