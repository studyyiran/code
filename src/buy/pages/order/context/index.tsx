import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useContext
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {
  getOrderTax,
  getExpress,
  createOrder,
  zipCodeToAddressInfo,
  orderIdToCheckOrderInfo,
  validaddress
} from "../server";
import {
  getFromCacheStore,
  promisify,
  safeEqual,
  saveToCache
} from "buy/common/utils/util";
import { Message } from "../../../components/message";
import { dataReport } from "../../../common/dataReport";
import useGetTotalPrice from "../components/orderLayout/useHook";
import { IProductDetail } from "../../detail/context/interface";
import {
  IProductDetailContext,
  ProductDetailContext
} from "../../detail/context";
import { constProductType } from "../../../common/constValue";

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
}

// @provider
export function OrderInfoContextProvider(props: any) {
  const initState: IOrderInfoState = {
    subOrders: [],
    pendingStatus: false,
    taxInfo: {},
    userExpress: "",
    expressInfo: [],
    userInfo: {} as any,
    invoiceInfo: {} as any,
    invoiceSameAddr: false,
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
  const action: IContextActions = useGetAction(state, dispatch);
  const {
    orderIdToCheckOrderInfo,
    getOrderTax,
    getExpress,
    getInfoByOrderDetailId
  } = action;
  // 获取
  useEffect(() => {
    orderIdToCheckOrderInfo();
  }, [orderIdToCheckOrderInfo]);

  useEffect(() => {
    getOrderTax();
  }, [getOrderTax]);

  useEffect(() => {
    getExpress();
  }, [getExpress]);

  // 当有值的时候 去拉取值
  useEffect(() => {
    getInfoByOrderDetailId();
  }, [getInfoByOrderDetailId]);

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
  getOrderTax: (zipCode?: string) => void; // 可以从外部实时传入zipCode进行运算
  getExpress: () => void;
  startOrder: (payInfo: IOrderInfoState["payInfo"]) => any; // 1231 这块我还是先写成调用触发,因为用状态触发有风险
  zipCodeToAddressInfo: (zipCode: string, form: any) => any;
  checkAddress: (info: any) => any;
  orderIdToCheckOrderInfo: () => any;
  validaddress: (data: any) => any;
  getInfoByOrderDetailId: () => any; // 用于在subOrder中拉取获取手机商品信息
}

// useCreateActions
function useGetAction(
  state: IOrderInfoState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const productDetailContext = useContext(ProductDetailContext);
  const {
    productDetailContextValue,
    getProductDetail
  } = productDetailContext as IProductDetailContext;
  const { productDetail, partsInfo } = productDetailContextValue;
  // 数据上报计算
  const { calcTotalPrice, getShippingPrice } = useGetTotalPrice(state);
  const actions: IContextActions = {
    getInfoByOrderDetailId: useCallback(() => {
      const target = state.subOrders.find(item => {
        return item && item.productType === constProductType.PRODUCT;
      });
      if (target) {
        getProductDetail(target.productId);
      }
    }, [getProductDetail, state.subOrders]),
    validaddress: promisify(async function(data: any) {
      return validaddress(data);
    }),
    orderIdToCheckOrderInfo: useCallback(
      async function() {
        if (state.orderInfo) {
          const checkOrderInfo: any = await orderIdToCheckOrderInfo(
            state.orderInfo
          );
          const { shippoToken, payment, paymentAccount } = checkOrderInfo;
          try {
            checkOrderInfo.orderList.forEach((item1: any) => {
              item1.productInfo.buyProductBQV = JSON.stringify(
                item1.productInfo.productPns.map((item: any) => {
                  return {
                    bpSort: item.sort,
                    bpvName: item.name,
                    tag: item.tag
                  };
                })
              );
            });
          } catch (e) {
            console.error(e);
          }
          // checkOrderInfo.orderList.productInfo.buyProductBQV = ;
          // 这些回补是临时修复 为了在最后的页面渲染一些关键信息.
          dispatch({
            type: orderInfoReducerTypes.setPayInfo,
            value: {
              creditCardInfo: {} as any,
              paymentType: payment,
              lastNumber: paymentAccount
            }
          });
          // 设置物流信息
          dispatch({
            type: orderInfoReducerTypes.setUserExpress,
            value: shippoToken
          });
          // 设置
          dispatch({
            type: orderInfoReducerTypes.setCheckOrderInfo,
            value: checkOrderInfo
          });
        }
      },
      [dispatch, state.orderInfo]
    ),
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
          productInfos: state.subOrders
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
    startOrder: useCallback(
      async function(payInfo) {
        // 临时trigger检验变量.这块需要系统封装好.
        if (payInfo) {
          const orderResult = createOrder({
            userInfo: state.userInfo,
            payInfo: payInfo,
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
              try {
                dataReport({
                  event: "buyerTransaction",
                  ecommerce: {
                    purchase: {
                      actionField: {
                        id: res,
                        affiliation: "Up Trade",
                        revenue: calcTotalPrice()
                      },
                      products: state.subOrders.map(item => {
                        const { productId, needProtection, productType } = item;
                        let subOrderInfo;
                        if (productType === constProductType.PRODUCT) {
                          subOrderInfo = productDetail;
                        } else if (productType) {
                          subOrderInfo = partsInfo.find(item =>
                            safeEqual(item.buyProductId, productId)
                          );
                        }
                        return {
                          sku: String(productId),
                          name: subOrderInfo
                            ? subOrderInfo.productDisplayName
                            : "",
                          price: subOrderInfo
                            ? Number(Number(subOrderInfo.buyPrice).toFixed(2))
                            : -1,
                          brand: subOrderInfo
                            ? subOrderInfo.brandDisplayName
                            : "",
                          quantity: 1,
                          dimension1: true, //buyer
                          dimension2: false, //seller
                          dimension3: state.userExpress, //update this USPS Parcel Select or USPS Priority
                          dimension4: needProtection ? "yes" : "no" // if they select UpTrade Protect which is our $5/month insurance plan
                        };
                      })
                    }
                  }
                });
              } catch (e) {
                console.error(e);
              }
              // 保存order参数
              dispatch({
                type: orderInfoReducerTypes.setOrderInfo,
                value: res
              });
              // 清空信用卡信息
              dispatch({
                type: orderInfoReducerTypes.resetPayInfo,
                value: null
              });
            })
            .catch(e => {
              if (e && e.resultMessage) {
                Message.error(e.resultMessage);
              }
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
      },
      [
        calcTotalPrice,
        dispatch,
        partsInfo,
        productDetail,
        state.expressInfo,
        state.invoiceInfo,
        state.invoiceSameAddr,
        state.subOrders,
        state.userExpress,
        state.userInfo
      ]
    ),
    zipCodeToAddressInfo: useCallback(async function(value: string, form: any) {
      const { setFieldsValue, setFields } = form;
      if (!/(\d{5,5})|(0\d{4,4})/.test(value)) {
        return;
      }
      const addressInfo: any = await zipCodeToAddressInfo(value);
      if (addressInfo.state && addressInfo.city) {
        setFieldsValue({ state: addressInfo.state });
        setFieldsValue({ city: addressInfo.city });
        return null;
      } else {
        setFieldsValue({ state: "" });
        setFieldsValue({ city: "" });
        // setFields({
        //   zipCode: {
        //     value: value,
        //     errors: [new Error("Please enter a valid zipCode")]
        //   }
        // });
        return "Please enter a valid zipCode";
      }
    }, []),
    // getDetailByProductList: promisify(async function() {
    //   // 这行是什么意思? 为什么这边是这样拉的? 订单结束后是否会有影响?
    //   const detailArr = await Promise.all(
    //     state.subOrders.map(({ productId }) => {
    //       return getProductDetail(productId);
    //     })
    //   );
    //   dispatch({
    //     type: orderInfoReducerTypes.setPhoneDetailList,
    //     value: detailArr
    //   });
    // }),
    getOrderTax: useCallback(
      async function(zipCode) {
        if (
          state.subOrders &&
          state.subOrders.length &&
          (zipCode || state.userInfo.zipCode)
        ) {
          const taxInfo = await getOrderTax({
            zipCode: zipCode || state.userInfo.zipCode,
            productInfos: state.subOrders
          });
          dispatch({
            type: orderInfoReducerTypes.setOrderTaxInfo,
            value: taxInfo
          });
        }
      },
      [dispatch, state.subOrders, state.userInfo.zipCode]
    ),
    getExpress: useCallback(
      async function() {
        if (state.subOrders.length && state.userInfo) {
          const expressInfo = await getExpress({
            addressInfo: state.userInfo,
            productInfos: state.subOrders
          });
          // TODO express need check
          dispatch({
            type: orderInfoReducerTypes.setExpressInfo,
            value: expressInfo
          });
        }
      },
      [dispatch, state.subOrders, state.userInfo]
    )
  };
  // 变更支付状态就发起
  return actions;
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
  setOrderInfo: "setOrderInfo"
};

// reducer
function reducer(state: IOrderInfoState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  // 现在直接替换掉
  switch (type) {
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
    "payInfo"
    // "invoiceSameAddr",
    // "invoiceInfo"
  ]);
  return newState;
}
