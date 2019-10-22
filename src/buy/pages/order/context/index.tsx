import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useRef
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {
  getOrderTax,
  getExpress,
  createOrder,
  zipCodeToAddressInfo
} from "../server";
import { getFromCacheStore, promisify, saveToCache } from "buy/common/utils/util";
import { getProductDetail } from "../../detail/server";
import { IProductDetail } from "../../detail/context";
import { Message } from "../../../components/message";

export const OrderInfoContext = createContext({});
const storeName = "OrderInfo";
export interface userPhoneOrder {
  productId: string;
  needProtection: boolean;
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
  phoneDetailList: IProductDetail[];
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
    creditCardInfo: {
      cardNo: string;
      invalidDate: string;
      userName: string;
      pinCode: string;
    };
  };
  invoiceSameAddr: boolean;
  orderInfo: any;
}

// @provider
export function OrderInfoContextProvider(props: any) {
  const initState: IOrderInfoState = {
    subOrders: [],
    pendingStatus: false,
    phoneDetailList: [],
    taxInfo: {},
    userExpress: "",
    expressInfo: [],
    userInfo: {} as any,
    invoiceInfo: {} as any,
    invoiceSameAddr: true,
    orderInfo: {},
    payInfo: {
      paymentType: "",
      creditCardInfo: {} as any
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    ...initState,
    ...getFromCacheStore(storeName)
  });
  const action: IContextActions = useGetAction(state, dispatch);

  // 监听变化
  useEffect(() => {
    action.getDetailByProductList();
  }, [action.getDetailByProductList]);

  useEffect(() => {
    action.getOrderTax();
  }, [action.getOrderTax]);

  //
  useEffect(() => {
    action.getExpress();
  }, [action.getExpress]);

  //
  useEffect(() => {
    action.startOrder();
  }, [action.startOrder]);

  const propsValue: IOrderInfoContext = {
    ...action,
    orderInfoContextValue: state,
    orderInfoContextDispatch: dispatch
  };
  return <OrderInfoContext.Provider value={propsValue} {...props} />;
}

// interface
export interface IOrderInfoContext extends IContextActions {
  orderInfoContextValue: IOrderInfoState;
  orderInfoContextDispatch: (action: IReducerAction) => void;
}

// @actions
interface IContextActions {
  getDetailByProductList: () => void;
  getOrderTax: () => void;
  getExpress: () => void;
  createOrder: (info: any) => any;
  startOrder: () => any;
  zipCodeToAddressInfo: (zipCode: string) => any;
  checkAddress: (info: any) => any;
}

// useCreateActions
function useGetAction(
  state: IOrderInfoState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const actions: IContextActions = {
    checkAddress: promisify(async function(userInfo: any) {
      if (state.subOrders.length && userInfo) {
        // 发起
        dispatch({
          type: orderInfoReducerTypes.setPendingStatus,
          value: true
        });
        // 1 发起请求
        const expressInfo = getExpress({
          addressInfo: userInfo,
          productIds: state.subOrders.map(item => item.productId)
        });
        // TODO 这行有重复
        expressInfo.then((res: any) => {
          dispatch({
            type: orderInfoReducerTypes.setExpressInfo,
            value: res
          });
        });
        // 3 处理结果
        expressInfo
          .catch(res => {
            console.log(res);
            if (res) {
              const { code, resultMessage } = res;
              if (String(code) === "10007") {
              }
              if (resultMessage) {
                Message.error(resultMessage);
              }
            }
            return res;
          })
          .then(res => {
            // 结束
            dispatch({
              type: orderInfoReducerTypes.setPendingStatus,
              value: false
            });
            return Promise.reject(res);
          });
        // 2 返回结果给外面
        return expressInfo;
      } else {
        return Promise.reject("param error");
      }
    }),
    startOrder: promisify(async function() {
      // 临时trigger检验变量.这块需要系统封装好.
      if (state.payInfo && state.payInfo.paymentType) {
        const orderResult = createOrder({
          userInfo: state.userInfo,
          payInfo: state.payInfo,
          invoiceSameAddr: state.invoiceSameAddr,
          shippoRateInfo: {
            rateId: state.expressInfo.find(item => {
              return String(item.token) === state.userExpress;
            })
              ? (state.expressInfo.find(item => {
                  return String(item.token) === state.userExpress;
                }) as any).rateId
              : ""
          },
          invoiceInfo: state.invoiceInfo,
          subOrders: state.subOrders
        });
        orderResult
          .then(res => {
            // 保存order参数
            dispatch({
              type: orderInfoReducerTypes.setOrderInfo,
              value: res
            });
            promiseStatus.current.resolve(res);
          })
          .catch(e => {
            if (e && e.resultMessage) {
              Message.error(e.resultMessage);
            }
            promiseStatus.current.reject(e);
            // 报错弹框
          })
          .then(() => {
            dispatch({
              type: orderInfoReducerTypes.setPendingStatus,
              value: false
            });
          });
        return orderResult;
      }
    }),
    createOrder: promisify(async function(info: any) {
      dispatch({
        type: orderInfoReducerTypes.setPayInfo,
        value: info.payInfo
      });
      dispatch({
        type: orderInfoReducerTypes.setInvoiceSameAddr,
        value: info.invoiceSameAddr
      });
      dispatch({
        type: orderInfoReducerTypes.setPendingStatus,
        value: true
      });
      return new Promise((resolve, reject) => {
        promiseStatus.current.resolve = resolve;
        promiseStatus.current.reject = reject;
      });
    }),
    zipCodeToAddressInfo: promisify(async function(zipCode: string) {
      return await zipCodeToAddressInfo(zipCode);
    }),
    getDetailByProductList: promisify(async function() {
      const detailArr = await Promise.all(
        state.subOrders.map(({ productId }) => {
          return getProductDetail(productId);
        })
      );
      dispatch({
        type: orderInfoReducerTypes.setPhoneDetailList,
        value: detailArr
      });
    }),
    getOrderTax: promisify(async function() {
      if (state.userInfo.state && state.subOrders && state.subOrders.length) {
        const taxInfo = await getOrderTax({
          state: state.userInfo.state,
          productIds: state.subOrders.map(item => item.productId)
        });
        dispatch({
          type: orderInfoReducerTypes.setOrderTaxInfo,
          value: taxInfo
        });
      }
    }),
    getExpress: promisify(async function() {
      if (state.subOrders.length && state.userInfo) {
        const expressInfo = await getExpress({
          addressInfo: state.userInfo,
          productIds: state.subOrders.map(item => item.productId)
        });
        // TODO express need check
        dispatch({
          type: orderInfoReducerTypes.setExpressInfo,
          value: expressInfo
        });
      }
    })
  };
  actions.getExpress = useCallback(actions.getExpress, [
    state.userInfo,
    state.subOrders
  ]);
  actions.getDetailByProductList = useCallback(actions.getDetailByProductList, [
    state.subOrders
  ]);
  actions.getOrderTax = useCallback(actions.getOrderTax, [
    state.subOrders,
    state.userInfo
  ]);
  actions.createOrder = useCallback(actions.createOrder, []);
  // 变更支付状态就发起
  actions.startOrder = useCallback(actions.startOrder, [state.payInfo]);
  return actions;
}

// action types
export const orderInfoReducerTypes = {
  setPhoneDetailList: "setPhoneDetailList",
  addSubOrder: "addSubOrder",
  setOrderTaxInfo: "setOrderTaxInfo",
  setExpressInfo: "setExpressInfo",
  setUserExpress: "setUserExpress",
  setUserInfo: "setUserInfo",
  setInvoiceInfo: "setInvoiceInfo",
  setInvoiceSameAddr: "setInvoiceSameAddr",
  setPayInfo: "setPayInfo",
  setPendingStatus: "setPendingStatus",
  setSubOrders: "setSubOrders",
  setOrderInfo: "setOrderInfo"
};

// reducer
function reducer(state: IOrderInfoState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  // 现在直接替换掉
  switch (type) {
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
        subOrders: [value]
      };
      break;
    }
    case orderInfoReducerTypes.setSubOrders: {
      newState = {
        ...newState,
        subOrders: newState.subOrders.map(value)
      };
      break;
    }
    case orderInfoReducerTypes.setPhoneDetailList: {
      newState = {
        ...newState,
        phoneDetailList: value
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  saveToCache(storeName, newState, [
    "subOrders",
    "userInfo",
    "userExpress",
    "orderInfo",
    "payInfo"
    // "invoiceSameAddr",
    // "invoiceInfo"
  ]);
  return newState;
}