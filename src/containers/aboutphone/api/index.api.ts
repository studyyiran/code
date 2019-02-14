import { Request } from 'utils';
import { IOpts } from '@/utils/request.interface';

// 根据类目获取品牌列表
export const getBrandsByCid = <T>(categoryId = 1) => {
  const opts: IOpts = {
    url: `/brands/category/${categoryId}`,
    loading: true,
    isMock: true
  };

  return Request<T>(opts);
}

// 获取美国手机运营商
export const getCarrier = <T>() => {
  const opts: IOpts = {
    url: `/static/carriers`,
    loading: true,
    isMock: true
  };

  return Request<T>(opts)
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
    method: 'post',
    isMock: true
  };

  return Request<T>(opts);
}


// 获取美国所有的州
export const getAmericaState = <T>() => {
  const opts: IOpts = {
    url: '/static/states',
    isMock: true
  };
  
  return Request<T>(opts);
}