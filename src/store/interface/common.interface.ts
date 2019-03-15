export interface ICommonStore {
  positionInfo: any;
  isMobile: boolean;
  staticOffice: IStaticOffice | null;
  initPosition: () => Promise<boolean>;
  onSubscribe: (email: string) => Promise<boolean>
  getStaticOffice: () => Promise<boolean>
}

export interface ICommonProps {
  common: ICommonStore
}

export interface IStaticOffice {
  city: string  // 城市,
  companyName: string  // 名称,
  country: string  // 国家,
  formattedAddress: string  // 格式化地址: {street}, {city} {state} {zipCode},
  phone: string  // 联系电话,
  receiver: string  // 收件人,
  state: string  // 州,
  street: string  // 详细地址,
  zipCode: string  // 邮编
}