import React, { useCallback, useContext, useRef } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import { storeShoppingCartServer } from "../server";
import {
  IStoreShoppingCartState,
  storeShoppingCartReducerTypes
} from "./index";
import { Message } from "../../../components/message";
import { GlobalSettingContext, IGlobalSettingContext } from "../../../context";

// @actions
export interface IStoreShoppingCartActions {
  getShoppingCart: () => any;
  addCompareList: (value: string) => any;
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
  const addCompareList = useCallback(
    async function(value) {
      let max = isMobile ? 2 : 4;
      // 根据环境判断长度
      if (state.compareList.length < max) {
        dispatch({
          type: storeShoppingCartReducerTypes.addCompareList,
          value: value
        });
      } else {
        Message.error(`You can only compare up to ${max} phones`);
      }
    },
    [dispatch, isMobile, state.compareList.length]
  );
  return {
    getShoppingCart,
    addCompareList
  };
}
