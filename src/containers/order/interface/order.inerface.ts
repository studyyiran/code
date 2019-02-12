export interface IOrderProps {
    order: IOrderStore;
}

export interface IOrderStore {
    progressType: IProgressData; // 进度条
    machineInfo: IMachineInfo;
    userInformation: IUserInformation;
    getOrderDetail: () => void;
}
// 订单进度
export enum IProgressType {
    orderPlaced = "orderPlaced",
    packageSent = "packageSent",
    packageReceived = "packageReceived",
    inspectionCompleted = "inspectionCompleted",
    listedForSale = "listedForSale",
    orderCompleted = "orderCompleted"
}
// 机器属性
export interface IMachineInfo {
    model: any;
    carrier: any;
    condition: any;
    guaranteedPrice: any;
}
// 用户信息
export interface IUserInformation {
    shippingAddress: string[];
    telAndEmail: string[];
    paymentMethod: string[];
    orderNumber: string;
    orderDate: string;
}
// 进度条数据
export interface IProgressProps {
    data: IProgressData
}

export interface IProgressData {
    currentIndex: number;
    dataList: IProgressDot[];
}

interface IProgressDot {
    name: string;
    date?: string;
    img?: string;
}
export interface IDeliverSatus {
    loading: boolean;
    visible: boolean;
}