export interface IOpts {
  url: string,
  method?: string,
  params?: object,
  data?: object,
  headers?: object,
  timeout?: number,
  whitecode?: number[] | null,
  loading?: boolean,
  getAll?: boolean,
  isMock?: boolean,
  noBase?: boolean,
}

export interface IRequestRes<T> {
  code: number,
  data: T,
  resultMessage?: string,
  message?: string,
}

export interface IRequestResWithPage<T> extends IRequestRes<T> {
  totalCount: number,
  page: number,
  pageSize: number,
}

export enum ERequestCode {
  Success = 200,
  Unauthorized = 401,
  Forbidden = 403,
  Notfound = 404
}