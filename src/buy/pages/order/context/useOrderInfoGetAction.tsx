import React, { useCallback, useContext } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { orderInfoServer } from "../server";
import { safeEqual } from "buy/common/utils/util";
import { Message } from "../../../components/message";
import { dataReport } from "../../../common/dataReport";
import useGetTotalPrice from "../components/orderLayout/useHook";
import {
  IProductDetailContext,
  ProductDetailContext
} from "../../detail/context";
import { constProductType } from "../../../common/constValue";
import { soldOutTips } from "../../detail/components/soldOutTips";
import { IOrderInfoState, orderInfoReducerTypes } from "./index";

// @actions
export interface orderInfoContextActions {
  getOrderTax: (zipCode?: string) => void; // 可以从外部实时传入zipCode进行运算
  getExpress: () => void;
  startOrder: (payInfo: any) => any; // 1231 这块我还是先写成调用触发,因为用状态触发有风险
  zipCodeToAddressInfo: (zipCode: string, form: any) => any;
  checkAddress: (info: any) => any;
  orderIdToCheckOrderInfo: () => any;
  validaddress: (data: any) => any;
  orderProcessRecord: (
    payInfo?: IOrderInfoState["payInfo"],
    userInfo?: any
  ) => any;
  getInfoByOrderDetailId: () => any; // 用于在subOrder中拉取获取手机商品信息
}

// useCreateActions
export function useOrderInfoGetAction(
  state: IOrderInfoState,
  dispatch: (action: IReducerAction) => void
): orderInfoContextActions {
  const productDetailContext = useContext(ProductDetailContext);
  const {
    productDetailContextValue,
    getProductDetail
  } = productDetailContext as IProductDetailContext;
  const { productDetail, partsInfo } = productDetailContextValue;
  // 数据上报计算
  const { calcTotalPrice, getShippingPrice } = useGetTotalPrice(state);
  // subOrders -> productId -> getProductDetail -> parts
  const getInfoByOrderDetailId = useCallback(() => {
    const target = state.subOrders.find(item => {
      return item && item.productType === constProductType.PRODUCT;
    });
    if (target) {
      getProductDetail(target.productId);
    }
  }, [getProductDetail, state.subOrders]);

  const getExpress = useCallback(
    async function() {
      if (state.subOrders.length && state.userInfo && state.userInfo.zipCode) {
        const expressInfo = await orderInfoServer.getExpress({
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
  );

  const validaddress = useCallback(async function(data: any) {
    return orderInfoServer.validaddress(data);
  }, []);

  // 在最后一个页面,通过order完成渲染
  const orderIdToCheckOrderInfo = useCallback(
    async function() {
      if (state.orderInfo) {
        const checkOrderInfo: any = await orderInfoServer.orderIdToCheckOrderInfo(
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
        // 这块有个bug 是会有多余的缓存在这块出现
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
  );
  const checkAddress = useCallback(
    async function(userInfo: any) {
      if (state.subOrders.length && userInfo) {
        // 发起
        dispatch({
          type: orderInfoReducerTypes.setPendingStatus,
          value: true
        });
        // 1 发起请求
        const expressInfo = orderInfoServer.getExpress({
          addressInfo: userInfo,
          productInfos: state.subOrders
        });
        // TODO 这行有重复
        expressInfo.then((res: any) => {
          dispatch({
            type: orderInfoReducerTypes.setExpressInfo,
            value: res
          });
          // 结束
          dispatch({
            type: orderInfoReducerTypes.setPendingStatus,
            value: false
          });
        });
        // 3 处理结果
        expressInfo.catch(res => {
          if (res) {
            const { code, resultMessage } = res;
            if (String(code) === "10007") {
            }
            if (resultMessage) {
              Message.error(resultMessage);
            }
          }
          // 结束
          dispatch({
            type: orderInfoReducerTypes.setPendingStatus,
            value: false
          });
          return res;
        });
        // 2 返回结果给外面
        return expressInfo;
      } else {
        return Promise.reject("param error");
      }
    },
    [dispatch, state.subOrders]
  );

  // 发起的action
  const orderProcessRecord = useCallback(
    async (info, userInfo) => {
      orderInfoServer.orderProcessRecord(
        {
          userInfo: userInfo,
          payInfo: info ? info.payInfo : {},
          invoiceSameAddr: info ? info.invoiceSameAddr : state.invoiceSameAddr,
          invoiceInfo: info ? info.invoiceInfo : state.invoiceInfo,
          shippoRateInfo: {
            rateId: state.expressInfo.find(item => {
              return String(item.token) === state.userExpress;
            })
              ? (state.expressInfo.find(item => {
                  return String(item.token) === state.userExpress;
                }) as any).rateId
              : ""
          },
          subOrders: state.subOrders
        },
        true
      );
    },
    [
      state.expressInfo,
      state.invoiceInfo,
      state.invoiceSameAddr,
      state.subOrders,
      state.userExpress
    ]
  );
  const startOrder = useCallback(
    async function(info) {
      // 临时trigger检验变量.这块需要系统封装好.
      if (info) {
        const currentRateInfo = state.expressInfo.find(item => {
          return String(item.token) === state.userExpress;
        });
        const obj = {
          userInfo: state.userInfo,
          payInfo: info.payInfo,
          invoiceSameAddr: info.invoiceSameAddr,
          invoiceInfo: info.invoiceInfo,
          shippoRateInfo: {
            rateId: currentRateInfo ? currentRateInfo.rateId : "",
            token: currentRateInfo ? currentRateInfo.token : ""
          },
          subOrders: state.subOrders
        };
        console.log(JSON.stringify(obj));
        // 发起
        try {
          orderProcessRecord(info, state.userInfo);
        } catch (e) {
          console.error(e);
        }
        const orderResult = orderInfoServer.createOrder(obj);
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
            if (e && safeEqual(10011, e.code)) {
              // 报错弹框
              soldOutTips(productDetail);
            } else if (e) {
              Message.error(e.resultMessage);
            }
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
      orderProcessRecord,
      partsInfo,
      productDetail,
      state.expressInfo,
      state.invoiceInfo,
      state.invoiceSameAddr,
      state.subOrders,
      state.userExpress,
      state.userInfo
    ]
  );
  const zipCodeToAddressInfo = useCallback(async function(
    value: string,
    form: any
  ) {
    const { setFieldsValue, setFields } = form;
    if (!/(\d{5,5})|(0\d{4,4})/.test(value)) {
      return;
    }
    const addressInfo: any = await orderInfoServer.zipCodeToAddressInfo(value);
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
  },
  []);
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
  const getOrderTax = useCallback(
    async function(zipCode) {
      if (
        state.subOrders &&
        state.subOrders.length &&
        (zipCode || state.userInfo.zipCode)
      ) {
        const taxInfo = await orderInfoServer.getOrderTax({
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
  );

  // 变更支付状态就发起
  return {
    getOrderTax,
    getExpress,
    startOrder,
    zipCodeToAddressInfo,
    checkAddress,
    orderIdToCheckOrderInfo,
    validaddress,
    orderProcessRecord,
    getInfoByOrderDetailId
  };
}
