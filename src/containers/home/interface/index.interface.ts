import { IYourPhoneStore } from '@/containers/aboutphone/interface/index.interface';
import { ICommonStore} from '@/store/interface/common.interface';

export interface IHomeState {
  howitworksGroup: IStepItem[][]
  times: string[]
}

export interface IHomeProps {
  common: ICommonStore;
  yourphone: IYourPhoneStore;
}

interface IStepItem {
  index: number;
  img: string;
  title: string;
  content: string;
}