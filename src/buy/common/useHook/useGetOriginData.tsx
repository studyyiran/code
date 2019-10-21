import { useContext, useReducer } from "react";
import {
  IOriginDataContext,
  OriginDataContext,
  originDataReducerTypes
} from "../../context/originData";
import useReducerMiddleware from "./useReducerMiddleware";

/*
client端添加方法 用于将补救数据填充到store中
 */
const mergeOriginDataReducerKey = "mergeOriginData";

function setOriginDataToStoreHoc(reducer: any) {
  const reducer2 = (state: any, action: any) => {
    if (action.type === mergeOriginDataReducerKey) {
      return { ...state, ...action.value };
    } else {
      return state;
    }
  };
  const newReducer = (state: any, action: any) => {
    const newState1 = reducer(state, action);
    const newState2 = reducer2(newState1, action);
    return newState2;
  };
  return newReducer;
}

/*
将设置后的返回.

same
设置是共通的.


server



client



 */

function isServer() {
  return typeof window === "undefined";
}

export function useGetOriginData(
  reducer: any,
  initState: any,
  currentStoreName: string
): [any, any, any] {
  const originDataContext = useContext(OriginDataContext);
  const {
    originDataContextValue,
    setNeedClientRun
  } = originDataContext as IOriginDataContext;
  const { originData } = originDataContextValue;

  let mergeInitState = { ...initState };

  const { storeName, storeData } = originData;
  // 如果当前调用者store和需要被填充的数据目标store相同.
  if (storeName === currentStoreName) {
    // 1 将originData赋值到对应的仓库
    mergeInitState = { ...mergeInitState, ...storeData };
  }

  // 用merge后的数据进行初始化store
  const [state, dispatch] = useReducer(
    useReducerMiddleware(setOriginDataToStoreHoc, reducer),
    mergeInitState
  );
  // client回补
  // 写在这里耦合太高了.而且有个隐喻,就是大家初始化的时候,都会去执行一次对应的方法.只不过被url手写过滤了.
  // 另外,这个才疏目前的是href也很想当然.
  // 不能在context阶段执行,是因为这个ssr文件是业务性的,需要在页面层次.
  // 既然文件是在页面层次.他的执行,也需要页面层次去.没办法轻易委托到context.而且也不划算.

  const useHehe = (getInitialProps: any) => {
    if (!isServer && originDataContextValue.needClientRun) {
      setNeedClientRun();
      // 调用.
      // 目前的需求都是url参数能够满足的.
      getInitialProps(window.location.href).then((res: any) => {
        // 赋值到本地store
        dispatch({
          type: mergeOriginDataReducerKey,
          value: res
        });
      });
      // dispatch
    }
  };

  // 当originData  在初始化之后  发生了变化.需要对目前的store进行强行赋值
  // useEffect(() => {
  //   dispatch({
  //     type: originDataReducerTypes.setOriginData,
  //     value: originData
  //   });
  // }, [originData]);

  return [state, dispatch, useHehe];
}
