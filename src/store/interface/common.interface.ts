export interface ICommonStore {
  positionInfo: any;
  isMobile: boolean;
  initPosition: () => Promise<boolean>;
  onSubscribe: (email: string) => Promise<boolean>
}

export interface ICommonProps {
  common: ICommonStore
}