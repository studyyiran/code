import { ICommonStore } from '@/store/interface/common.interface';
export interface IProps {
  common: ICommonStore
}

export interface IFooterState {
  links: Ilinks[][]
}

interface Ilinks  {
  text: string;
  href: string;
}