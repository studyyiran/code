import { useContext, useReducer } from "react";
import {
  IOriginDataContext,
  OriginDataContext
} from "../../context/originData";
import useReducerMiddleware from "./useReducerMiddleware";
import { isServer } from "../utils/util";
import { ISsrFileStore } from "../interface/index.interface";

/*

 */
export function useGetOriginData(
  reducer: any,
  initState: any,
  currentStoreName: string
): [any, any, any] {
  // client回补
  // 写在这里耦合太高了.而且有个隐喻,就是大家初始化的时候,都会去执行一次对应的方法.只不过被url手写过滤了.
  // 另外,这个才疏目前的是href也很想当然.
  // 不能在context阶段执行,是因为这个ssr文件是业务性的,需要在页面层次.
  // 既然文件是在页面层次.他的执行,也需要页面层次去.没办法轻易委托到context.而且也不划算.

  // 这段代码,只能执行当前store,没办法修改其他的store
  const useClientRepair = (getInitialProps: any) => {
    if (!isServer() && originDataContextValue.needClientRepair) {
      // 立刻关闭
      setNeedClientRepair(false);
      // 目前的需求都是url参数能够满足的.
      getInitialProps(window.location.pathname).then((res: ISsrFileStore) => {
        const { storeList } = res;
        const storeJson = storeList.find(({ storeName }) => {
          return storeName === currentStoreName;
        });
        // 赋值到本地store
        if (storeJson) {
          dispatch({
            type: mergeOriginDataReducerKey,
            value: storeJson.storeData
          });
        }
      });
    }
  };
  const originDataContext = useContext(OriginDataContext);
  const {
    originDataContextValue,
    setNeedClientRepair
  } = originDataContext as IOriginDataContext;
  // 读取server端渲染数据(a.server运行.  b.client运行回补)
  const { originData } = originDataContextValue;
  // 最终数据
  let mergeInitState = { ...initState };

  // 遍历,找到对应的,然后修改
  const targetStore = originData.storeList.find(({ storeName }) => {
    return storeName === currentStoreName;
  });
  // 填充到对应的仓库:如果当前调用者store和需要被填充的数据目标store相同.
  if (targetStore) {
    mergeInitState = { ...mergeInitState, ...targetStore.storeData };
  }

  // 用merge后的数据进行初始化store
  const [state, dispatch] = useReducer(
    useReducerMiddleware(clientRepairMiddleware, reducer),
    mergeInitState
  );

  // 当originData  在初始化之后  发生了变化.需要对目前的store进行强行赋值
  // useEffect(() => {
  //   dispatch({
  //     type: originDataReducerTypes.setOriginData,
  //     value: originData
  //   });
  // }, [originData]);

  return [state, dispatch, useClientRepair];
}
/*
clientRepair中间件 用于将补救数据填充到store中
 */

const mergeOriginDataReducerKey = "mergeOriginData";
function clientRepairMiddleware(reducer: any) {
  const originDataToStore = (state: any, action: any) => {
    if (action.type === mergeOriginDataReducerKey) {
      return { ...state, ...action.value };
    } else {
      return state;
    }
  };
  const newReducer = (state: any, action: any) => {
    const newState1 = reducer(state, action);
    const newState2 = originDataToStore(newState1, action);
    return newState2;
  };
  return newReducer;
}
