import { IUserStoreNew } from 'store/interface/user.interface';
import { IYourPhoneStore } from 'containers/aboutphone/interface/index.interface';
import { ICommonStore } from 'store/interface/common.interface';
export interface ILeftSideState {
  steps: ISteps[]
}

interface ISteps {
  main: string;
  sub: string;
}

export interface IGuaranteedPriceProps {
  price?: number | string;
  isTBD: boolean;
  user: IUserStoreNew;
  isBeforeShipping?: boolean;
}

export interface ISellLayoutProps {
  route: {
    [key: string]: any
  };
  yourphone: IYourPhoneStore;
  user: IUserStoreNew;
  common: ICommonStore
}

export interface ISellLayoutState {
  stepIndex: number;
  isSetedPreOrder: boolean;
  isBeforeShipping?: boolean;
}