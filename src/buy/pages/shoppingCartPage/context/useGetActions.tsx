import React, { useCallback, useContext, useRef } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { storeShoppingCartServer } from "../server";
import {
  IStoreShoppingCartState,
  storeShoppingCartReducerTypes
} from "./index";
import { Message } from "../../../components/message";
import { GlobalSettingContext, IGlobalSettingContext } from "../../../context";
import { actionsWithCatchAndLoading } from "../../../common/utils/util";
import { ProductDetailContext } from "../../detail/context";

// @actions
export interface IStoreShoppingCartActions {
  getShoppingCart: () => any;
  getCompareInfoList: () => any;
  addCompareList: (value: string) => any;
  addShoppingCart: (code: string) => any;
  addIntoCartList: (id: string) => any;
  deleteShoppingCart: (code: string) => any;
  deleteSoldShoppingCart: () => any;
  mergeShoppingCart: () => any;
  setShowCartModal: (bool: boolean) => any;
  orderCompareGet: () => any;
  orderCompareAdd: (code: string) => any;
  orderCompareDelete: (code: string) => any;
}

// useCreateActions
export function useStoreShoppingCartGetActions(
  state: IStoreShoppingCartState,
  dispatch: (action: IReducerAction) => void
): IStoreShoppingCartActions {
  const promiseStop = useRef({
    getShoppingCart: null as any
  });
  const globalSettingContext = useContext(GlobalSettingContext);
  const productDetailContext = useContext(ProductDetailContext);

  const { getProductDetailByCode } = productDetailContext;
  const {
    globalSettingContextValue
  } = globalSettingContext as IGlobalSettingContext;
  const { isMobile } = globalSettingContextValue;
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const getShoppingCart = useCallback(
    async function() {
      // 解决了多个ajax的race问题。只遵循最后一个发起的ajax
      const cache = storeShoppingCartServer.getShoppingCart();
      promiseStop.current.getShoppingCart = cache;
      let res;
      let myError;
      try {
        res = await promiseStop.current.getShoppingCart;
      } catch (e) {
        myError = e;
      }
      if (promiseStop.current.getShoppingCart === cache) {
        if (myError && myError.code === 10071) {
          Message.warn(
            "Please set up the browser to allow sites to save and read cookie data to enable shopping cart."
          );
        }
        dispatch({
          type: storeShoppingCartReducerTypes.setShoppingCartList,
          value: res
        });
      }
    },
    [dispatch]
  );
  const getCompareInfoList = useCallback(async function() {
    // const res = await storeShoppingCartServer.getShoppingCart();
    // const res = [1,2,3,4]
    // dispatch({
    //   type: storeShoppingCartReducerTypes.setCompareInfoList,
    //   value: res
    // });
  }, []);
  const addCompareList = useCallback(async function(value) {
    // let max = isMobile ? 2 : 4;
    // 根据环境判断长度
    // if (state.compareList.length < max) {
    //   dispatch({
    //     type: storeShoppingCartReducerTypes.addCompareList,
    //     value: value
    //   });
    // } else {
    //   Message.error(`You can only compare up to ${max} phones`);
    // }
  }, []);

  const addShoppingCart = useCallback(
    async id => {
      return actionsWithCatchAndLoading({
        needError: false,
        dispatch,
        loadingDispatchName:
          storeShoppingCartReducerTypes.setLoadingObjectStatus,
        loadingObjectKey: "addShoppingCart",
        promiseFunc: async () => {
          try {
            const res = await storeShoppingCartServer.addShoppingCart(id);
          } catch (e) {
            switch (e.code) {
              case 10065:
                // 正在交易中
                // 刷新页面
                Message.error(
                  "Cart limit reached. Please clear your cart."
                );
                break;
              case 10066:
                // 正在交易中
                // 刷新页面
                getProductDetailByCode();
                Message.error(
                  "The product is sold out, failed to add to cart."
                );
                break;
              case 10067:
                // 已经出售
                // 重定向。
                getProductDetailByCode();
                Message.error("Product not found.");
                window.location.href = "/buy-phone";
                break;
            }
            console.error(e);
          }
          const res2 = await getShoppingCart();
          // return Promise.all([res, res2]);
        }
      });

      // dispatch({
      //   type: storeShoppingCartReducerTypes.setShoppingCartList,
      //   value: res
      // });
    },
    [dispatch, getProductDetailByCode, getShoppingCart]
  );

  const deleteShoppingCart = useCallback(
    async id => {
      const res = await storeShoppingCartServer.deleteShoppingCart(id);
      const res2 = getShoppingCart();
    },
    [getShoppingCart]
  );

  const deleteSoldShoppingCart = useCallback(async () => {
    const res = await storeShoppingCartServer.deleteSoldShoppingCart();
    const res2 = getShoppingCart();
  }, [getShoppingCart]);

  const mergeShoppingCart = useCallback(async () => {
    const res = await storeShoppingCartServer.mergeShoppingCart();
    const res2 = getShoppingCart();
  }, [getShoppingCart]);

  const orderCompareGet = useCallback(async () => {
    const res = await storeShoppingCartServer.orderCompareGet();
    dispatch({
      type: storeShoppingCartReducerTypes.setCompareInfoList,
      value: res
    });
  }, [dispatch]);

  const orderCompareAdd = useCallback(
    async code => {
      const max = 4;
      if (state.compareInfoList.length < max) {
        // 先触发立刻更新
        let hehe = state.shoppingCartList;
        try {
          hehe.list = hehe.list.map(item => {
            const { product } = item;
            if (product.buyProductCode === code) {
              item.isCompare = true;
            }
            return item;
          });
        } catch (e) {
          console.error(e);
        }
        dispatch({
          type: storeShoppingCartReducerTypes.setShoppingCartList,
          value: hehe
        });
        try {
          const res = await storeShoppingCartServer.orderCompareAdd(code);
        } catch (e) {
          switch (e.code) {
            case 10070:
              Message.error("Failed to add to compare.");
              break;
          }
        }
        const res2 = getShoppingCart();
        actionsWithCatchAndLoading({
          needError: false,
          dispatch,
          loadingDispatchName:
            storeShoppingCartReducerTypes.setLoadingObjectStatus,
          loadingObjectKey: "orderCompareGet",
          promiseFunc: async () => {
            const res = await orderCompareGet();
          }
        });
      } else {
        Message.error(`You can only compare up to ${max} phones`);
      }
    },
    [
      dispatch,
      getShoppingCart,
      orderCompareGet,
      state.compareInfoList.length,
      state.shoppingCartList
    ]
  );

  const orderCompareDelete = useCallback(
    async code => {
      const res = await storeShoppingCartServer.orderCompareDelete(code);
      const res2 = getShoppingCart();
      const res3 = orderCompareGet();
    },
    [getShoppingCart, orderCompareGet]
  );

  const setShowCartModal = useCallback(
    async bool => {
      dispatch({
        type: "setShowCartModal",
        value: bool
      });
    },
    [dispatch]
  );

  const addIntoCartList = useCallback(
    async value => {
      if (isMobile) {
        await addShoppingCart(value);
        setShowCartModal(true);
      } else {
        setShowCartModal(true);
        await addShoppingCart(value);
      }
      // if (value && state.cartList.length < 10) {
      //   dispatch({
      //     type: storeDetailActionTypes.addCartList,
      //     value: [value]
      //   });
      // }
    },
    [addShoppingCart, isMobile, setShowCartModal]
  );
  return {
    getShoppingCart,
    addCompareList,
    getCompareInfoList,
    deleteShoppingCart,
    deleteSoldShoppingCart,
    mergeShoppingCart,
    setShowCartModal,
    addShoppingCart,
    orderCompareGet,
    orderCompareAdd,
    orderCompareDelete,
    addIntoCartList
  };
}
