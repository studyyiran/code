
import config from '../../../config/index';
import { IQueryParams, IInquiryDetail, IAddressInfo } from './../interface/index.interface';
import * as Api from '../api/index.api';
import { action, observable, autorun, computed } from 'mobx';
import { IYourPhoneStore, ICarrier, IBrands, IAmericaState, IProductModel, IProductPPVN, ITbdInfo, ISubSkuPricePropertyValues } from '../interface/index.interface';
import { IPreOrder } from '@/store/interface/user.interface';
import UserStore from '@/store/user';
import { noteUserModal } from '@/containers/aboutphone/pageValidate';
import { IOrderDetail } from '@/containers/order/interface/order.inerface'
class YourPhone implements IYourPhoneStore {
  @observable public carriers: ICarrier[] = [];
  @observable public brands: IBrands[] = [];
  @observable public products: IProductModel[] = [];
  @observable public products4Search: IProductModel[] = [];
  @observable public productPPVNS: IProductPPVN[] = [];
  @observable public inquiryKey = '';
  @observable public inquiryDetail = null;
  @observable public orderDetail: IOrderDetail | null = null; // 订单详情
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
  @observable public isLeftOnEdit: boolean = false;
  @observable public isRightOnEdit: boolean = false;

  @observable public activeBrandsId = -1; // 选择的品牌Id
  @observable public oldActiveBrandsId = 0; // 上一个选择的品牌id
  @observable public activeBrandsName = ''; // 选择的品牌的名称
  @observable public activeCarrierName = ''; // 选择的运营商
  @observable public activeCarrierDescription = ''; // 运营商的description
  @observable public activeProductId = -1; // 选择的机型的id
  @observable public activeProductName = '' // 选择的机型的名称
  @observable public activeModelId = -1; // 选择的机型的内存id
  @observable public activeModelName = ''; // 选择的内存名称
  @observable public activeConditions = {}; // 选择的ppvn
  @observable public isAddressValuesAndDisabled: boolean = true;
  @observable public isPaymentFormFilled: boolean = false;
  @observable public americaStates: IAmericaState | null;
  @observable public tbdInfo: ITbdInfo = {
    storage: '',
    properties: [],
    modelName: '',
    donate: false
  }

  constructor() {
    autorun(() => {
      if (this.inquiryKey) {
        this.getInquiryDetail();
      }
    });
  }

  @computed get isAllConditionSelected() { // 是否全选了ppvn
    let result = true;
    // 似乎没什么用
    if (JSON.stringify(this.activeConditions) === '{}') {
      return false;
    }

    for (const item of this.productPPVNS) {
      const value = this.activeConditions[item.id];
      const active = item.pricePropertyValues.find((v: ISubSkuPricePropertyValues) => v.id === value);
      if (!active) {
        result = false;
        break;
      }
    }
    return result;
  }

  @computed get isTBD() {
    if (this.activeBrandsId !== config.DEFAULT.otherBrandsId) {
      return false;
    }

    // this.activeCarrierName = ''; // TBD的情况下，运营商不选，赋默认值为'' | 'other'
    // this.activeProductId = -1;
    // this.activeModelId = -1;
    // this.activeConditions = {};
    // this.activeCarrierName = 'OTHERS'
    return true;
  }

  @computed get isDonePayment() {
    if (!this.payment) {
      return false;
    }
    if (this.payment === 'PAYPAL' && !this.isLeftOnEdit) {
      return true;
    }

    if (this.payment === 'CHECK' && !this.isRightOnEdit) {
      return true;
    }

    if (this.isPaymentFormFilled) {
      return true;
    }
    return false;
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
    // 直接return
    if (this.activeBrandsId <= 0) {
      return true;
    }
    let res: IProductModel[] = [];
    try {
      res = await Api.getProductsList<IProductModel[]>(this.activeBrandsId);
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
    const activePpnIdStrings = Object.keys(this.activeConditions);
    const activePpnIdNumbers = activePpnIdStrings.map((v: string) => Number(v));
    const ppnIds = this.productPPVNS.map((v: IProductPPVN) => v.id);
    if (new Set([...activePpnIdNumbers, ...ppnIds]).size !== ppnIds.length) {
      this.activeConditions = {};
    }
    return true;
  }

  // 创建询价
  @action public createInquiry = async () => {
    const priceUnits: number[] = Object.values(this.activeConditions);
    if (this.activeModelId && this.activeModelId > 0) {
      priceUnits.push(this.activeModelId); // priceUnits包括在model选择的ppv，以及condition选的非sku属性
    }

    const inquiry: IQueryParams = {
      agentCode: config.ENVCONFIG.agentCode,
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
      // 前端拦截所有报错并提示用户去写邮件寻求帮助
      noteUserModal({
        content: 'Please contact support@uptradeit.com for help.',
        type: 'error',
        okText: 'OK',
        title: 'Oops... something goes wrong!',
        maskClosable: true,
        hasCountDown: false,
        onOk: () => {
          const aDOM = document.createElement('a');
          aDOM.style.display = 'none';
          aDOM.id = 'AFOREMAIL';
          aDOM.setAttribute('href', `mailto:${config.DEFAULT.supportEmail}`);
          document.body.appendChild(aDOM);

          const adom = document.getElementById('AFOREMAIL');
          if (adom) {
            adom.click();
            document.body.removeChild(adom);
          }
        }
      });
      return false;
    }

    this.inquiryKey = res;
    await this.getInquiryDetail();
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
    this.americaStates = null;
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
    const orderParams: Pick<IPreOrder, Exclude<keyof IPreOrder, 'key' | 'productInfo'>> & { brandId?: number } = {
      addressInfo: this.addressInfo,
      agentCode: config.ENVCONFIG.agentCode,
      carrier: this.activeCarrierName,
      checkInfo: this.echeck,
      inquiryKey: this.inquiryKey,
      payment: this.payment,
      paypalInfo: this.paypal,
      userEmail: UserStore.preOrder.userEmail!,
      brandId: UserStore.preOrder.productInfo ? UserStore.preOrder.productInfo.brandId : undefined
    }

    if (this.isTBD) {
      orderParams.tbdInfo = this.tbdInfo;
    }

    try {
      this.orderDetail = await Api.createOrder<any>(orderParams);
    } catch (error) {
      console.warn(error, 'in yourphone store createOrder');
      noteUserModal({
        content: 'Please contact support@uptradeit.com for help.',
        type: 'error',
        okText: 'OK',
        title: 'Oops... something goes wrong!',
        hasCountDown: false,
        maskClosable: true,
        onOk: () => {
          const aDOM = document.createElement('a');
          aDOM.style.display = 'none';
          aDOM.id = 'AFOREMAIL';
          aDOM.setAttribute('href', `mailto:${config.DEFAULT.supportEmail}`);
          document.body.appendChild(aDOM);

          const adom = document.getElementById('AFOREMAIL');
          if (adom) {
            adom.click();
            document.body.removeChild(adom);
          }
        }
      });
      return false;
    }

    return true;
  }
  @action public desoryUnmount = () => {
    this.payment = '';
    this.activeBrandsId = -1;
  }
  @action public destory = () => {
    this.addressInfo = {
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
    this.paypal = {
      email: ''
    };
    this.echeck = {
      firstName: '',
      lastName: '',
      email: ''
    }
    this.tbdInfo = {
      storage: '',
      properties: [],
      modelName: '',
      donate: false
    }
    this.isLeftOnEdit = false;
    this.isRightOnEdit = false;
    this.oldActiveBrandsId = 0;
    this.activeBrandsName = '';
    this.activeCarrierName = '';
    this.activeCarrierDescription = '';
    this.activeProductId = -1;
    this.activeProductName = '';
    this.activeModelId = -1;
    this.activeModelName = '';
    this.activeConditions = {};
    this.isAddressValuesAndDisabled = false;
    this.isPaymentFormFilled = false;
    this.americaStates = null;
  }
}

export default new YourPhone();