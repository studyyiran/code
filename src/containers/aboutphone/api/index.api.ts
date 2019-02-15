import { Request } from 'utils';
import { IOpts } from '@/utils/request.interface';
import { IQueryParams } from '../interface/index.interface';

// 根据类目获取品牌列表
export const getBrandsByCid = <T>(categoryId = 1) => {
  const opts: IOpts = {
    url: `/brands/category/${categoryId}`,
    isMock: true
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

// 获取机型列表
export const getProductsList = <T>(brand: number, categoryIds: number[] = [1]) => {
  const opts: IOpts = {
    url: '/products/search',
    method: 'post',
    params: {
      brand,
      categoryIds
    },
    isMock: true
  };

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
    url: `/products/${productId}/price_properties`,
    isMock: true
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
export const getInquiryDetail = <T>(key: string) => {
  const opts: IOpts = {
    url: `/inquiries/${key}`,
  };

  return Request<T>(opts);
}



// 根据zipCode获取美国对应的州
export const getStateByCode = <T>(zipCode: number) => {
  const opts: IOpts = {
    url: `/USPS/state/${zipCode}`,
  };

  return Request<T>(opts);
}