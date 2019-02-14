import * as Api from '../api/index.api';
import { action, observable } from 'mobx';
import { IYourPhoneStore, ICarrier, IBrands, IAmericaState } from '../interface/index.interface';

class YourPhone implements IYourPhoneStore {
  @observable public carriers: ICarrier[] = [];
  @observable public brands: IBrands[] = [];
  @observable public activeBrandsId = -1;
  @observable public activeCarrierName = '';
  @observable public americaStates: IAmericaState[] = [];

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

  @action public getAmericaState = async () => {
    let res: IAmericaState[] = [];
    try {
      res = await Api.getAmericaState<IAmericaState[]>();
    } catch (error) {
      console.warn(error, 'in brand store');
      return false;
    }

    this.americaStates = res;
    return true;
  }
}

export default new YourPhone();