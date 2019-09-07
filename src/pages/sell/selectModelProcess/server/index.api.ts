import { Request } from "utils";
import { IOpts } from "@/utils/request.interface";
import { IQueryParams, IAppendOrderParams } from "../index.interface";
import config from "@/config/index";
import { IPreOrder } from "@/store/interface/user.interface";
import { mockgetexpressfee } from "../../mock";
function wrapper(obj: any) {
  return {
    ...obj,
    url: "/api" + obj.url,
    isFullUrl: true
  };
}

function getResponse(promise: any) {
  return new Promise((resolve, reject) => {
    promise.then((res: any) => {
      if (res && res.data) {
        resolve(res.data);
      }
    });
  });
}
// 获取机型列表, 以及根据关键字搜索机型
export const getProducts = <T>(brandId: string, categoryId: string) => {
  const opts: IOpts = {
    url: "/product/getProducts",
    params: {
      categoryId,
      brandId
    }
  };

  return getResponse(Request<T>(wrapper(opts)));
};
export const getinquirybyids = <T>(inquiryInfo: any) => {
  const opts: IOpts = {
    url: "/product/getinquirybyids",
    method: "post",
    params: inquiryInfo
  };

  return getResponse(Request<T>(wrapper(opts), []));
};

export const getinquirybykeys = <T>(inquiryInfo: any) => {
  const opts: IOpts = {
    url: "/product/getinquirybykeys",
    method: "post",
    params: inquiryInfo
  };

  return getResponse(Request<T>(wrapper(opts), []));
};
// 创建订单接口， 只要发生错误，都提示用户可以写邮件寻求帮助
export const createOrderStart = <T>(
  orderParams: Pick<IPreOrder, Exclude<keyof IPreOrder, "key" | "productInfo">>
) => {
  const opts: IOpts = {
    url: `/orders`,
    method: "post",
    params: orderParams
  };
  return getResponse(Request<T>(wrapper(opts), []));
};

// 根据类目获取品牌列表
export const getExpressFee = <T>(inquiryKeys: any[]) => {
  const opts: IOpts = {
    url: "/group_order/getexpressfee",
    method: "post",
    params: inquiryKeys
  };
  return Promise.resolve(mockgetexpressfee);
  return getResponse(Request<T>(wrapper(opts), []));
};

// 根据类目获取品牌列表
export const getBrands = <T>(categoryId: string) => {
  const opts: IOpts = {
    url: `/product/getBrands?id=${categoryId}`,
    isFullUrl: true
  };

  return getResponse(Request<T>(wrapper(opts)));
};

// 根据类目获取品牌列表
export const getBrandsByCid = <T>(categoryId = 1) => {
  const opts: IOpts = {
    url: `/brands/category/${categoryId}`
  };

  return Request<T>(opts);
};

// 获取美国手机运营商
export const getCarrier = <T>() => {
  const opts: IOpts = {
    url: `/static/carriers`
  };

  return Request<T>(opts);
};

// 获取机型列表, 以及根据关键字搜索机型
export const getProductsList = <T>(brandId: number, categoryId: number = 1) => {
  const opts: IOpts = {
    url: "/products/category-and-brand",
    params: {
      brandId,
      categoryId
    }
  };

  return Request<T>(opts);
};

// 获取机型详情
export const getProductDetail = <T>(id: number) => {
  const opts: IOpts = {
    url: `/products/${id}`
  };

  return Request<T>(opts);
};

// 获取机型ppvn
export const getProductPPVN = <T>(productId: number) => {
  const opts: IOpts = {
    url: `/products/${productId}/price-properties`
  };

  return Request<T>(opts);
};

// 创建询价，获得询价key
// 创建询价接口， 只要发生错误，都提示用户可以写邮件寻求帮助
export const createInquiry = <T>(inquiry: IQueryParams) => {
  const opts: IOpts = {
    url: "/inquiries",
    method: "post",
    params: inquiry
  };

  return Request<T>(opts, [])
}

// 获取询价详情
export const getInquiryDetail = <T>(
  key: string,
  agentCode: string = config.ENVCONFIG["agentCode"]
) => {
  const opts: IOpts = {
    url: `/inquiries/${key}`,
    params: {
      agentCode
    }
  };

  return Request<T>(opts);
};

// 根据zipCode获取美国对应的州
export const getStateByCode = <T>(zipCode: string) => {
  const opts: IOpts = {
    url: `/USPS/state/${zipCode}`,
    loading: false
  };

  return Request<T>(opts);
};

// 创建订单接口， 只要发生错误，都提示用户可以写邮件寻求帮助
export const createOrder = <T>(orderParams: Pick<IPreOrder, Exclude<keyof IPreOrder, 'key' | 'productInfo'>>) => {
  const opts: IOpts = {
    url: `/orders`,
    method: 'post',
    params: orderParams,
  };
  return Request<T>(opts, []);
}

// 追加订单
export const appendOrder = <T>(orderParams: IAppendOrderParams, orderNo: string) => {
  const opts: IOpts = {
    url: `/orders/${orderNo}/append`,
    method: 'post',
    params: orderParams,
  };
  return Request<T>(opts, []);
}

// 查询多个追加订单
export const getAllOrders = <T>(orderNo: string, userEmail: string) => {
  const opts: IOpts = {
    url: `/orders/${orderNo}/siblings`,
    method: 'post',
    params: {
      orderNo,
      userEmail
    }
  };
  return Request<T>(opts, []);
}

export const getOrderDetail = <T>(orderNo: string, userEmail: string): Promise<T> => {
  const opts: IOpts = {
    method: "POST",
    url: `/orders/check`,
    params: {
      userEmail,
      orderNo
    },
    loading: false
  };
  return Request<T>(opts, []);
}

export const sendBox = <T>(orderNo: string, userEmail: string) => {
  const opts: IOpts = {
    url: `/orders/${orderNo}/send-me-a-box`,
    method: 'POST',
    params: {
      orderNo,
      userEmail
    }
  };
  return Request<T>(opts, []);
}

export const getNearExpressStores = <T>(address: string, carrier: string, mock: boolean) => {
  const opts: IOpts = {
    url: `/google-maps/nearby-express-stores`,
    params: {
      address,
      carrier,
      mock
    }
  };
  return Request<T>(opts, []);
}
