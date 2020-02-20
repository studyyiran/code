import React, {
  useCallback,
  useRef,
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {storeTestNameServer} from "../server";
import {IStoreTestNameState, storeTestNameReducerTypes} from "./index";

// @actions
export interface IStoreTestNameActions {
  getTestAjaxValue: () => any;
}

// useCreateActions
export function useStoreTestNameGetActions (
  state: IStoreTestNameState,
  dispatch: (action: IReducerAction) => void
): IStoreTestNameActions {
  // 新增promise ref
  const promiseStatus: any = useRef();
  if (!promiseStatus.current) {
    promiseStatus.current = {};
  }
  const getTestAjaxValue = useCallback(async function() {
    const res = await storeTestNameServer.getTestAjaxResult();
    dispatch({
      type: storeTestNameReducerTypes.setTestValue,
      value: res
    });
  }, [dispatch])
  return {
    getTestAjaxValue
  };
}