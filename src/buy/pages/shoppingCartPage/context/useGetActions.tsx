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

// @actions
export interface IStoreShoppingCartActions {
  getShoppingCart: () => any;
  getCompareInfoList: () => any;
  addCompareList: (value: string) => any;
  addShoppingCart: (code: string) => any;
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
  const globalSettingContext = useContext(GlobalSettingContext);
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
      const res = await storeShoppingCartServer.getShoppingCart();
      dispatch({
        type: storeShoppingCartReducerTypes.setShoppingCartList,
        value: res
      });
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
        dispatch,
        loadingDispatchName:
          storeShoppingCartReducerTypes.setLoadingObjectStatus,
        loadingObjectKey: "addShoppingCart",
        promiseFunc: async () => {
          const res = await storeShoppingCartServer.addShoppingCart(id);
          const res2 = await getShoppingCart();
          return Promise.all([res, res2]);
        }
      });

      // dispatch({
      //   type: storeShoppingCartReducerTypes.setShoppingCartList,
      //   value: res
      // });
    },
    [dispatch, getShoppingCart]
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
        let hehe = state.shoppingCartList
        try {
          hehe.list = hehe.list.map((item) => {
            const {product} = item
            if (product.buyProductCode === code) {
              item.isCompare = true
            }
            return item
          })
        } catch(e) {
          console.error(e)
        }
        dispatch({
          type: storeShoppingCartReducerTypes.setShoppingCartList,
          value: hehe,
        })
        const res = await storeShoppingCartServer.orderCompareAdd(code);
        const res2 = getShoppingCart();
        const res3 = orderCompareGet();
      } else {
        Message.error(`You can only compare up to ${max} phones`);
      }
    },
    [getShoppingCart, orderCompareGet, state.compareInfoList]
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
    orderCompareDelete
  };
}
