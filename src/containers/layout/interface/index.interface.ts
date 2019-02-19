import { ICommonStore } from '@/store/interface/common.interface';
export interface IProps {
  common: ICommonStore
}

export interface IFooterState {
  links: Ilinks[][],
  email: string
}

interface Ilinks {
  text: string;
  href: string;
}