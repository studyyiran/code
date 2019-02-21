import { IUserStoreNew } from '@/store/interface/user.interface';
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
  user: IUserStoreNew
}