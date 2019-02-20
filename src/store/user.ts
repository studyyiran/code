import * as Api from './api/user.api';
import { IUserStoreNew, IPreOrder } from './interface/user.interface';
import { action, observable, autorun } from 'mobx';

class User implements IUserStoreNew {
  @observable public canUpdatePreOrder = false;
  @observable public preOrder: IPreOrder = {
    addressInfo: {
      addressLine: '',
      addressLineOptional: '',
      city: '',
      country: 'United States',
      firstName: '',
      lastName: '',
      mobile: '',
      state: '',
      zipCode: ''
    },
    checkInfo: {
      firstName: '',
      lastName: '',
      email: ''
    },
    inquiryKey: '',
    key: '',
    payment: '',
    paypalInfo: {
      email: ''
    },
    productInfo: {
      brandId: -1,
      carrier: '',
      priceUnits: [],
      productId: -1,
      modelId: -1
    }
  };

  constructor() {
    autorun(() => {
      if (this.canUpdatePreOrder) { // 第一次获取key，不需要更新
        this.updatePreOrder(this.preOrder);
      }
    });
  }

  @action public async getPreOrderKey(userEmail: string) {
    let res: Partial<IPreOrder> = {};
    try {
      res = await Api.getPreOrderKey({ userEmail });
    } catch (error) {
      console.warn(error, 'in user store');
      return false;
    }

    this.preOrder = res;
    this.canUpdatePreOrder = true;
    return true;
  }

  @action public async updatePreOrder(preOrder: Partial<IPreOrder>) {
    try {
      await Api.updatePreOrder(preOrder);
    } catch (error) {
      console.warn(error, 'in user store');
      return false;
    }

    this.updateSession();
    return true;
  }

  @action private updateSession = () => {
    if (this.preOrder && Object.keys(this.preOrder).length !== 0) {
      sessionStorage.setItem('preOrder', JSON.stringify(this.preOrder));
    }
  }
}

export default new User(); 