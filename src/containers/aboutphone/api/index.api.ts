import { Request } from 'utils';
import { IOpts } from '@/utils/request.interface';
import { IQueryParams } from '../interface/index.interface';
import { ENVCONFIG } from 'config';
import { IPreOrder } from '@/store/interface/user.interface';

// 根据类目获取品牌列表
export const getBrandsByCid = <T>(categoryId = 1) => {
  const opts: IOpts = {
    url: `/brands/category/${categoryId}`,
  };

  return Request<T>(opts);
}

// 获取美国手机运营商
export const getCarrier = <T>() => {
  const opts: IOpts = {
    url: `/static/carriers`,
  };

  return Request<T>(opts)
}

// 获取机型列表, 以及根据关键字搜索机型
export const getProductsList = <T>(brand: number, keyword: string = '', categoryIds: number[] = [1]) => {
  const opts: IOpts = {
    url: '/products/search',
    method: 'post',
    params: {
      pageIndex: 0,
      pageSize: 9999,
      brand,
      categoryIds
    }
  };

  if (keyword !== '') {
    opts.params!['keyword'] = keyword;
  }

  return Request<T>(opts);
}

// 获取机型详情
export const getProductDetail = <T>(id: number) => {
  const opts: IOpts = {
    url: `/products/${id}`,
    isMock: true
  };

  return Request<T>(opts);
}

// 获取机型ppvn
export const getProductPPVN = <T>(productId: number) => {
  const opts: IOpts = {
    url: `/products/${productId}/price-properties`,
  };

  return Request<T>(opts);
}

// 创建询价，获得询价key
export const createInquiry = <T>(inquiry: IQueryParams) => {
  const opts: IOpts = {
    url: '/inquiries',
    method: 'post',
    params: inquiry
  };

  return Request<T>(opts)
}

// 获取询价详情
export const getInquiryDetail = <T>(key: string, agentCode: string = ENVCONFIG['agentCode']) => {
  const opts: IOpts = {
    url: `/inquiries/${key}`,
    params: {
      agentCode
    }
  };

  return Request<T>(opts);
}



// 根据zipCode获取美国对应的州
export const getStateByCode = <T>(zipCode: number) => {
  const opts: IOpts = {
    url: `/USPS/state/${zipCode}`,
    loading: true
  };

  return Request<T>(opts);
}

export const createOrder = <T>(orderParams: Pick<IPreOrder, Exclude<keyof IPreOrder, 'key' | 'productInfo'>>) => {
  const opts: IOpts = {
    url: `/orders`,
    method: 'post',
    params: orderParams
  };

  return Request<T>(opts);
}