import { IPreOrder } from './../interface/user.interface';
import { IOpts } from "@/utils/request.interface";
import { Request } from 'utils';

// 第一次生成PreOrder
export const getPreOrderKey = <T>(preOrder: IPreOrder) => {
  const opts: IOpts = {
    url: '/pre_orders/generate',
    method: 'post',
    params: preOrder,
    loading: true
  };

  return Request<T>(opts);
}

// 根据第一次生成的PreOrder得到的key来更新PreOrder
export const updatePreOrder = (preOrder: Partial<IPreOrder>) => {
  const opts: IOpts = {
    url: `/pre_orders/${preOrder.key}`,
    method: 'post',
    params: preOrder
  };

  return Request(opts);
}