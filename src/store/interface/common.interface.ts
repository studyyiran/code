export interface ICommonStore {
  positionInfo: any;
  initPosition: () => Promise<boolean>;
  onSubscribe: (email: string) => Promise<boolean>
}

export interface ICommonProps {
  common: ICommonStore
}