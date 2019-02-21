import * as Api from './api/user.api';
import { IUserStoreNew, IPreOrder } from './interface/user.interface';
import { action, observable, autorun } from 'mobx';

class User implements IUserStoreNew {
  @observable public canUpdatePreOrder = false;
  // @observable public preOrder: Partial<IPreOrder> = {
  //   addressInfo: {
  //     addressLine: '',
  //     addressLineOptional: '',
  //     city: '',
  //     country: 'United States',
  //     firstName: '',
  //     lastName: '',
  //     mobile: '',
  //     state: '',
  //     zipCode: ''
  //   },
  //   checkInfo: {
  //     firstName: '',
  //     lastName: '',
  //     email: ''
  //   },
  //   inquiryKey: '',
  //   key: '',
  //   payment: '',
  //   paypalInfo: {
  //     email: ''
  //   },
  //   productInfo: {
  //     brandId: -1,
  //     carrier: '',
  //     priceUnits: [],
  //     productId: -1,
  //     modelId: -1
  //   },
  //   userEmail: ''
  // };


  @observable public preOrder: Partial<IPreOrder> = {
    userEmail: '',
  };

  constructor() {
    autorun(() => {
      if (this.preOrder.userEmail && this.preOrder.key) {
        this.updatePreOrder(this.preOrder);
      }
    });
  }

  @action public async getPreOrderKey(userEmail: string) {
    this.preOrder = { // 存在这代码的原因是避免切到brand页面时，接口还在请求，导致userEmail没能赋值给preOrder,brand 页面拿不到userEmail，会重新定向到/sell/accout 页面
      userEmail
    };

    const params = {
      userEmail
    }
    try {
      this.preOrder = await Api.getPreOrderKey<IPreOrder>(params);
    } catch (error) {
      console.warn(error, 'in user store getPreOrderKey');
      return false;
    }

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