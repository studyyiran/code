export interface IPostData {
  groupOrderNo?: string;
  userEmail?: string;
  token: string;
}

export interface IProtectionOrder {
  paypalOrderId: string;
  token: string;
}

export interface IProtectionSubscribe extends IProtectionOrder {
  planId: string;
  subscribeId: string;
}
