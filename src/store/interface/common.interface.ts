export interface ICommonStore {
  positionInfo: any;
  initPosition: () => Promise<boolean>;
}

export interface ICommonProps {
  common: ICommonStore
}