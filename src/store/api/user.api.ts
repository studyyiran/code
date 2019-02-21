import { IPreOrder } from './../interface/user.interface';
import { IOpts } from "@/utils/request.interface";
import { Request } from 'utils';

// 第一次生成PreOrder
export const getPreOrderKey = <T>(preOrder: IPreOrder) => {
  const preOrderCopy = { ...preOrder };
  Object.keys(preOrderCopy).map((key) => {

    if (Object.prototype.toString.call(preOrderCopy[key]) === '[object Object]') {
      const childObj = preOrderCopy[key];
      Object.keys(childObj).map((key2) => {
        if (childObj[key2] === '') {
          delete childObj[key2];
        }

        if (childObj[key2] === -1) {
          delete childObj[key2];
        }
      });
    }

    if (preOrderCopy[key] === '') {
      delete preOrderCopy[key];
    }

    if (preOrderCopy[key] === -1) {
      delete preOrderCopy[key];
    }
  })

  const opts: IOpts = {
    url: '/pre_orders/generate',
    method: 'post',
    params: preOrderCopy,
    loading: true
  };

  return Request<T>(opts);
}

// 根据第一次生成的PreOrder得到的key来更新PreOrder
export const updatePreOrder = (preOrder: Partial<IPreOrder>) => {
  const preOrderCopy = { ...preOrder };
  Object.keys(preOrderCopy).map((key) => {

    if (Object.prototype.toString.call(preOrderCopy[key]) === '[object Object]') {
      const childObj = preOrderCopy[key];
      Object.keys(childObj).map((key2) => {
        if (childObj[key2] === '') {
          delete childObj[key2];
        }

        if (childObj[key2] === -1) {
          delete childObj[key2];
        }
      });
    }

    if (preOrderCopy[key] === '') {
      delete preOrderCopy[key];
    }

    if (preOrderCopy[key] === -1) {
      delete preOrderCopy[key];
    }
  })


  const opts: IOpts = {
    url: `/pre_orders/${preOrder.key}`,
    method: 'post',
    params: preOrderCopy
  };

  return Request(opts);
}