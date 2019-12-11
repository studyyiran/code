export interface IPostData {
  groupOrderNo?: string,
  userEmail?: string,
  token: string,
}

export interface IProtectionOrder {
  paypalOrderId: string,
  token: string,
}