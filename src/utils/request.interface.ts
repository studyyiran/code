export interface IOpts {
  url: string,
  method?: string,
  params?: object,
  data?: object,
  headers?: object,
  timeout?: number,
  whitecode?: number[] | null,
  notBasePath?: boolean,
  loading?: boolean,
  getAll?: boolean,
  proxyName?: string,
  isMock?: boolean,
  isFullUrl?: boolean,
}

export interface IRequestRes<T> {
  code: number,
  data: T,
  resultMessage?: string,
  message?: string,
}

export interface IRequestResWithPage<T> extends IRequestRes<T> {
  totalCount: number,
  pageIndex: number,
  pageSize: number,
}
export interface IRequestResWithPageV2<T> extends IRequestRes<T> {
  pagination: {
    page: number
    size: number
    total: number
  }
}