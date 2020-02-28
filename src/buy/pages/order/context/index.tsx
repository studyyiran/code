import React, { createContext, useReducer } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { getFromCacheStore, saveToCache } from "buy/common/utils/util";
import { IProductDetail } from "../../detail/context/interface";
import {
  orderInfoContextActions,
  useOrderInfoGetAction
} from "./useOrderInfoGetAction";

export const OrderInfoContext = createContext({});
const storeName = "OrderInfo";
export interface userPhoneOrder {
  productId: string;
  needProtection: boolean;
  productType: string;
}

export interface IUserInfo {
  userEmail: string;
  firstName: string;
  lastName: string;
  street: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  userPhone: string;
}

// state
export interface IOrderInfoState {
  subOrders: userPhoneOrder[];
  pendingStatus: any; // 页面支付状态
  // 这个应该是返回值的信息
  checkOrderInfo: {
    orderList: {
      productInfo: IProductDetail;
    }[];
    subTotal: string;
    protection: string;
    expressFee: string;
    tax: string;
    total: string;
  };
  taxInfo: any;
  expressInfo: {
    rateId: string;
    totalFee: number;
    name: string;
    token: string;
  }[];
  userExpress: string;
  userInfo: IUserInfo;
  invoiceInfo: IUserInfo;
  payInfo: {
    paymentType: string;
    paypalOrderId?: string;
    creditCardInfo?: {
      cardNo: string;
      invalidDate: string;
      userName: string;
      pinCode: string;
    };
    lastNumber?: string;
  };
  invoiceSameAddr: boolean;
  orderInfo: any;
  orderSource: string;
}

// @provider
export function OrderInfoContextProvider(props: any) {
  const initState: IOrderInfoState = {
    subOrders: [],
    orderSource: "",
    pendingStatus: false,
    taxInfo: {},
    userExpress: "",
    expressInfo: [],
    userInfo: {} as any,
    invoiceInfo: {} as any,
    invoiceSameAddr: true,
    orderInfo: "",
    checkOrderInfo: {} as any,
    payInfo: {
      paypalOrderId: "",
      paymentType: "",
      creditCardInfo: {} as any,
      lastNumber: ""
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    ...initState,
    ...getFromCacheStore(storeName)
  });
  const action: orderInfoContextActions = useOrderInfoGetAction(
    state,
    dispatch
  );

  const propsValue: IOrderInfoContext = {
    ...action,
    orderInfoContextValue: state,
    orderInfoContextDispatch: dispatch
  };
  return <OrderInfoContext.Provider value={propsValue} {...props} />;
}

// interface
export interface IOrderInfoContext extends orderInfoContextActions {
  orderInfoContextValue: IOrderInfoState;
  orderInfoContextDispatch: (action: IReducerAction) => void;
}

// action types
export const orderInfoReducerTypes = {
  addSubOrder: "addSubOrder",
  setOrderTaxInfo: "setOrderTaxInfo",
  setExpressInfo: "setExpressInfo",
  setUserExpress: "setUserExpress",
  setUserInfo: "setUserInfo",
  setInvoiceInfo: "setInvoiceInfo",
  setInvoiceSameAddr: "setInvoiceSameAddr",
  setPayInfo: "setPayInfo",
  resetPayInfo: "resetPayInfo",
  setPendingStatus: "setPendingStatus",
  setCheckOrderInfo: "setCheckOrderInfo",
  setOrderSource: "setOrderSource",
  setOrderInfo: "setOrderInfo"
};

// reducer
function reducer(state: IOrderInfoState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  // 现在直接替换掉
  switch (type) {
    case orderInfoReducerTypes.setOrderSource: {
      newState = {
        ...newState,
        orderSource: value
      };
      break;
    }
    case orderInfoReducerTypes.setCheckOrderInfo: {
      newState = {
        ...newState,
        checkOrderInfo: value
      };
      break;
    }
    // resetPayInfo
    case orderInfoReducerTypes.resetPayInfo: {
      let lastNumber = "";
      // 设置信用卡lastNumber
      if (
        newState.payInfo &&
        newState.payInfo.creditCardInfo &&
        newState.payInfo.creditCardInfo.cardNo
      ) {
        lastNumber = newState.payInfo.creditCardInfo.cardNo.slice(
          newState.payInfo.creditCardInfo.cardNo.length - 4
        );
      }
      // 清空paypal信息 信用卡信息
      newState = {
        ...newState,
        invoiceSameAddr: true,
        userExpress: "",
        // orderInfo: [], // 不能清空
        // userInfo: {} as any, // 不能清空 因为后续渲染还需要这个
        subOrders: [], // 制空
        payInfo: {
          paymentType: "",
          paypalOrderId: "",
          creditCardInfo: {} as any,
          lastNumber: lastNumber
        }
      };
      break;
    }
    // 设置用户的购物订单信息
    case orderInfoReducerTypes.setOrderInfo: {
      newState = {
        ...newState,
        orderInfo: value
      };
      break;
    }
    // 设置setInvoiceSameAddr
    case orderInfoReducerTypes.setPendingStatus: {
      newState = {
        ...newState,
        pendingStatus: value
      };
      break;
    }
    // 设置setInvoiceSameAddr
    case orderInfoReducerTypes.setInvoiceSameAddr: {
      newState = {
        ...newState,
        invoiceSameAddr: value
      };
      break;
    }
    // 设置payment addr
    case orderInfoReducerTypes.setPayInfo: {
      newState = {
        ...newState,
        payInfo: value
      };
      break;
    }
    // 设置payment addr
    case orderInfoReducerTypes.setInvoiceInfo: {
      newState = {
        ...newState,
        invoiceInfo: value
      };
      break;
    }
    case orderInfoReducerTypes.setUserExpress: {
      newState = {
        ...newState,
        userExpress: value
      };
      break;
    }
    case orderInfoReducerTypes.setExpressInfo: {
      newState = {
        ...newState,
        expressInfo: value
      };
      break;
    }
    case orderInfoReducerTypes.setUserInfo: {
      newState = {
        ...newState,
        userInfo: value
      };
      break;
    }
    case orderInfoReducerTypes.setOrderTaxInfo: {
      newState = {
        ...newState,
        taxInfo: value
      };
      break;
    }
    case orderInfoReducerTypes.addSubOrder: {
      newState = {
        ...newState,
        subOrders: value
      };
      break;
    }
    // case orderInfoReducerTypes.setPhoneDetailList: {
    //   newState = {
    //     ...newState,
    //     phoneDetailList: value
    //   };
    //   break;
    // }
    default:
      newState = { ...newState };
  }
  saveToCache(storeName, newState, [
    "subOrders",
    "userInfo",
    "userExpress",
    "orderInfo",
    "orderSource",
    "payInfo"
    // "invoiceSameAddr",
    // "invoiceInfo"
  ]);
  return newState;
}
