import React, {
  useCallback,
  useRef,
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {storeShoppingCartServer} from "../server";
import {IStoreShoppingCartState, storeShoppingCartReducerTypes} from "./index";
import {Message} from "../../../components/message";

// @actions
export interface IStoreShoppingCartActions {
  getShoppingCart: () => any;
  addCompareList: (value: string) => any;
}

// useCreateActions
export function useStoreShoppingCartGetActions (
  state: IStoreShoppingCartState,
  dispatch: (action: IReducerAction) => void
): IStoreShoppingCartActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const getShoppingCart = useCallback(async function() {
    const res = await storeShoppingCartServer.getShoppingCart();
    dispatch({
      type: storeShoppingCartReducerTypes.setShoppingCartList,
      value: res
    });
  }, [dispatch])
  const addCompareList = useCallback(async function(value) {
    // 根据环境判断长度
    if (true) {
      dispatch({
        type: storeShoppingCartReducerTypes.addCompareList,
        value: value
      });
    } else {
      Message.error('You can only compare up to 4 phones');
    }
  }, [dispatch])
  return {
    getShoppingCart,
    addCompareList
  };
}