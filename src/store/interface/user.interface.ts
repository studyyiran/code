export interface IUserInfo {
  identityChecked: boolean, // 是否实名
  mobile: string,
  registerDt: string, // 注册日期 ,
  userKey: string
}
export interface IUserStore {
  imageCaptcha: string,
  imageCaptchaUrl: string,
  userInfo: IUserInfo | null,
  mobile: string,
  code: string,
  isGetUserInfo: boolean,
  isAuth: boolean,
  openid: string,
  appid: string,
  flag: boolean,
  getImgCode: (reset?: string) => Promise<boolean>,
  getSmsCode: (cloudDown?: () => void) => Promise<boolean>,
  onLogin: (scene: string) => Promise<boolean>,
  getWechatInfo: () => Promise<boolean>,
  setToken: (token: string) => Promise<boolean>,
}

export interface IUserProps {
  user: IUserStore
}

export enum ELoginType {
  Login = 'Login',
  Submit = 'SubmitOrder',
  Activity = 'Activity',
  GetCoupons = 'GetCoupons'
}

export enum ECaptchaErrCode {
  Fail = 11701001, // 失败
  Max = 11701002, // 超过最大值
  Error = 11701003, // 发生错误
  ImgCodeErr = 11701006, // 图形验证码输入错误
  ShouldImage = 11701007, // 需要图形验证码
}

export interface IUserStoreNew {
  canUpdatePreOrder: boolean;
  preOrder: IPreOrder;
  getPreOrderKey: (userEmail: string) => Promise<boolean>;
  updatePreOrder: (preOrder: IPreOrder) => Promise<boolean>;
}

export interface IPreOrder {
  addressInfo?: IAddressInfo;
  checkInfo?: ICheckInfo;
  inquiryKey?: string; // 询价key
  key?: string; // 唯一key
  payment?: string;
  paypalInfo?: IPaypalInfo;
  productInfo?: Partial<IProductInfo>;
  userEmail?: string;
}

interface IAddressInfo {
  addressLine: string; // 必须地址
  addressLineOptional: string; // 可选地址
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  mobile: string;
  state: string; // 州
  zipCode: string;
}
interface ICheckInfo {
  card: string;
}
interface IPaypalInfo {
  email: string;
}
interface IProductInfo {
  brandId: number; // 品牌ID
  carrier: string; // 运营商
  priceUnit: number[];
  productId: number; // 机型ID
}
