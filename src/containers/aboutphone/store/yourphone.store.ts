import { DEFAULT } from 'config';
import { IQueryParams, IInquiryDetail, IAddressInfo } from './../interface/index.interface';
import * as Api from '../api/index.api';
import { action, observable, autorun, computed } from 'mobx';
import { IYourPhoneStore, ICarrier, IBrands, IAmericaState, IProductModel, IProductPPVN } from '../interface/index.interface';
import { IPreOrder } from '@/store/interface/user.interface';
import UserStore from '@/store/user';
class YourPhone implements IYourPhoneStore {
  @observable public carriers: ICarrier[] = [];
  @observable public brands: IBrands[] = [];
  @observable public products: IProductModel[] = [];
  @observable public products4Search: IProductModel[] = [];
  @observable public productPPVNS: IProductPPVN[] = [];
  @observable public inquiryKey = '';
  @observable public inquiryDetail = null;
  @observable public orderDetail = null; // 订单详情
  @observable public addressInfo: IAddressInfo = { // 用户填写的信息
    addressLine: '',
    addressLineOptional: '',
    city: '',
    country: 'United States',
    firstName: '',
    lastName: '',
    mobile: '',
    state: '',
    zipCode: ''
  };

  // paypal和echeck的信息有可能和contact information不同
  @observable public payment: string = ''; // 选择的支付方式, 必须为PAYPAL 或 CHECK，否则无法下一步
  @observable public paypal: IYourPhoneStore['paypal'] = {
    email: ''
  }
  @observable public echeck: IYourPhoneStore['echeck'] = {
    firstName: '',
    lastName: '',
    email: ''
  }

  @observable public activeBrandsId = -1; // 选择的品牌
  @observable public activeCarrierName = 'OTHERS'; // 选择的运营商
  @observable public activeProductId = -1; // 选择的机型的id
  @observable public activeModelId = -1; // 选择的机型的内存id
  @observable public activeConditions = {}; // 选择的ppvn

  @observable public americaStates: IAmericaState;

  constructor() {
    autorun(() => {
      if (this.inquiryKey) {
        this.getInquiryDetail();
      }
    });
  }

  @computed get isAllConditionSelected() { // 是否全选了ppvn
    return JSON.stringify(this.activeConditions) !== '{}' && Object.keys(this.activeConditions).length === this.productPPVNS.length;
  }

  @computed get isTBD() {
    if (this.activeBrandsId !== DEFAULT.otherBrandsId) {
      return false;
    }

    this.activeCarrierName = ''; // TBD的情况下，运营商不选，赋默认值为'' | 'other'
    this.activeProductId = -1;
    this.activeModelId = -1;
    this.activeConditions = {};
    this.activeCarrierName = 'OTHERS'
    return true;
  }


  @action public getBrandsByCid = async () => {
    let res: IBrands[] = [];
    try {
      res = await Api.getBrandsByCid<IBrands[]>();
    } catch (error) {
      console.warn(error, 'in brand store');
      return false;
    }

    this.brands = res;
    return true;
  }

  @action public getCarrier = async () => {
    let res: ICarrier[] = [];
    try {
      res = await Api.getCarrier<ICarrier[]>();
    } catch (error) {
      console.warn(error, 'in brand store');
      return false;
    }

    this.carriers = res;
    return true;
  }

  @action public getProductsList = async (keyword: string = '') => {
    let res: IProductModel[] = [];
    try {
      res = await Api.getProductsList<IProductModel[]>(this.activeBrandsId, keyword);
    } catch (error) {
      console.warn(error, 'in brand store getProductsList');
      return false;
    }

    if (keyword) {
      this.products4Search = res;
    } else {
      this.products = res;
    }
    return true;
  }

  // 用于搜索机型时，只展示指定id的机型
  @action public getProductDetail = async (id: number) => {
    let res: IProductModel;
    try {
      res = await Api.getProductDetail<IProductModel>(id);
    } catch (error) {
      console.warn(error, 'in brand store getProductDetail');
      return false;
    }

    this.products = [res];
    return true;
  }

  @action public getProductPPVN = async () => {
    let res: IProductPPVN[] = [];
    try {
      res = await Api.getProductPPVN<IProductPPVN[]>(this.activeProductId);
    } catch (error) {
      console.warn(error, 'in yourphone store getProductPPVN');
      return false;
    }

    // 根据isSkuProperty进行筛选，只要值为false的
    this.productPPVNS = res.filter(ppvitem => !ppvitem.isSkuProperty);
    return true;
  }

  // 创建询价
  @action public createInquiry = async () => {
    const priceUnits: number[] = Object.values(this.activeConditions);
    priceUnits.push(this.activeModelId); // priceUnits包括在model选择的ppv，以及condition选的非sku属性

    const inquiry: IQueryParams = {
      agentCode: DEFAULT.agentCode,
      priceUnits: priceUnits,
      productId: this.activeProductId
    }
    // TODO: 接口问题，先写死
    // const inquiry: IQueryParams = { "agentCode": 'ahs_android', "productId": 25827, "priceUnits": [6437, 2023, 2014, 2453, 2072] }
    let res: string;
    try {
      res = await Api.createInquiry<string>(inquiry);
    } catch (error) {
      console.warn(error, 'in yourphone store createInquiry');
      return false;
    }

    this.inquiryKey = res;
    return true;
  }

  // 获取询价详情
  @action public getInquiryDetail = async () => {
    try {
      this.inquiryDetail = await Api.getInquiryDetail<IInquiryDetail & null>(this.inquiryKey);
    } catch (error) {
      console.warn(error, 'in yourphone store getInquiryDetail');
      return false;
    }
    return true;
  }

  @action public getAmericaState = async (zipCode: number) => {
    try {
      this.americaStates = await Api.getStateByCode<IAmericaState>(zipCode);
    } catch (error) {
      console.warn(error, 'in brand store');
      return false;
    }

    return true;
  }

  // 创建订单
  @action public createOrder = async () => {
    const orderParams: Pick<IPreOrder, Exclude<keyof IPreOrder, 'key' | 'productInfo'>> = {
      addressInfo: this.addressInfo,
      agentCode: DEFAULT.agentCode,
      carrier: this.activeCarrierName,
      checkInfo: this.echeck,
      inquiryKey: this.inquiryKey,
      payment: this.payment,
      paypalInfo: this.paypal,
      userEmail: UserStore.preOrder.userEmail
    }

    try {
      this.orderDetail = await Api.createOrder<any>(orderParams);
    } catch (error) {
      console.warn(error, 'in yourphone store createOrder');
      return false;
    }

    return true;
  }
}

export default new YourPhone();