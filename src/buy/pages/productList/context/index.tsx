import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback
} from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {
  getModelList,
  getProductList,
  getBaseAttr,
  getManufactureList,
  getDropDownInfo
} from "../server";
import { promisify } from "buy/common/utils/util";
import { IStaticFilterItem, filterListConfig } from "./staticData";
import { useGetOriginData } from "../../../common/useHook/useGetOriginData";

export const ProductListContext = createContext({});
export const StoreProductList = "StoreProductList";
// state
interface IContextState {
  productList: any[];
  pendingStatus: any;
  pageNumber: any;
  haveMore: boolean;
  modelList: any[];
  manufactureList: any[];
  currentFilterSelect: any[];
  staticFilterList: any[];
  searchInfo: {
    productId: "";
    productKey: [];
  };
}

// @provider
export function ProductListContextProvider(props: any) {
  const initState: IContextState = {
    productList: [],
    modelList: [],
    pageNumber: { pn: 1 },
    haveMore: false,
    pendingStatus: false,
    manufactureList: [],
    currentFilterSelect: [],
    staticFilterList: [],
    searchInfo: {} as any
  };
  const [state, dispatch, useHehe] = useGetOriginData(
    reducer,
    initState,
    StoreProductList
  );
  const action: IContextActions = useGetAction(state, dispatch);
  // 监听变化

  useEffect(() => {
    // TODO
    action.getProductList();
  }, [action.getProductList]);
  useEffect(() => {
    action.getManufactureList(1);
  }, [action.getManufactureList]);
  useEffect(() => {
    dispatch({
      type: productListReducerActionTypes.setPageNumber,
      value: "init"
    });
  }, [state.currentFilterSelect, state.searchInfo]);

  const propsValue: IProductListContext = {
    useHehe,
    ...action,
    productListContextValue: state,
    productListContextDispatch: dispatch
  };
  return <ProductListContext.Provider value={propsValue} {...props} />;
}

// interface
export interface IProductListContext extends IContextActions {
  useHehe: any;
  productListContextValue: IContextState;
  productListContextDispatch: (action: IReducerAction) => void;
}

// @actions
interface IContextActions {
  getStaticFilterList: () => void;
  getProductList: () => void;
  getModelList: (pn: any) => void;
  getManufactureList: (pn: any) => any;
  getFilterList: () => IStaticFilterItem[];
  setUserSelectFilter: (info: { type: string; id: string }) => void;
  setSearchInfo: (info: any) => any;
  getDropDownInfo: (string: string) => any;
  findInfoById: (
    id: string
  ) => [IStaticFilterItem | undefined, any | undefined];
}

// useCreateActions
function useGetAction(
  state: IContextState,
  dispatch: (action: IReducerAction) => void
): IContextActions {
  const actions: IContextActions = {
    findInfoById: typeAndId => {
      const [type, id] = typeAndId.split("-");
      let typeInfo;
      let itemInfo;
      const list = actions.getFilterList();
      if (list && list.length) {
        typeInfo = list.find(({ type: filterType, optionArr }) => {
          if (String(type) === String(filterType)) {
            return optionArr.find(target => {
              const { id: filterOptionId } = target;
              if (String(filterOptionId) === String(id)) {
                itemInfo = target;
                return true;
              } else {
                return false;
              }
            });
          } else {
            return false;
          }
        });
      }
      return [typeInfo, itemInfo];
    },
    setUserSelectFilter: ({ id, type }) => {
      if (id === "all") {
        dispatch({
          type: productListReducerActionTypes.setAllFilter,
          value: type
        });
      } else {
        dispatch({
          type: productListReducerActionTypes.setFilter,
          value: `${type}-${id}`
        });
      }
    },
    // 获取排序的列表(整个静态数据,baseAttr,model)
    getFilterList: () => {
      // 2)静态接口已经拉取
      function getHahaList() {
        if (state.staticFilterList && state.staticFilterList.length) {
          // 进行pre-render赋值
          const preRender = (title: string, callback: any) => {
            const afterRes: IStaticFilterItem = {} as any;
            if (state.staticFilterList && state.staticFilterList.length) {
              const findAttr = state.staticFilterList.find(
                ({ bpDisplayName }: any) => {
                  return String(bpDisplayName).indexOf(title) !== -1;
                }
              );

              if (findAttr) {
                afterRes.type = `attrOf${findAttr.bpId}`;
                afterRes.tag = findAttr.tag;
                afterRes.title = findAttr.bpDisplayName;
                afterRes.bpId = findAttr.bpId;
                afterRes.allTitle = `All ${findAttr.bpDisplayName}s`;
                // 先用来判定,再用来赋值.
                afterRes.optionArr = findAttr.bqvList
                  .filter((e: any) => e)
                  .map(callback);
              }
            }
            return afterRes;
          };
          const preRenderList = state.staticFilterList.map(
            ({ tag, bpDisplayName }) => {
              if (tag.indexOf("ISCOLOR") !== -1) {
                return preRender(
                  bpDisplayName,
                  ({ bpvId, bpvDisplayName, colorDisplayName }: any) => ({
                    id: bpvDisplayName,
                    displayName: colorDisplayName
                  })
                );
              } else {
                return preRender(
                  bpDisplayName,
                  ({ bpvId, bpvDisplayName }: any) => ({
                    id: bpvId,
                    displayName: bpvDisplayName
                  })
                );
              }
            }
          );
          // 1 找出quick
          const quickFilterItemIndex = preRenderList.findIndex(item => {
            if (item && item.tag) {
              return item.tag.indexOf("QUICKFILTERBUY") !== -1;
            } else {
              return false
            }
          });
          let otherItem = preRenderList;
          let quickItem;
          if (quickFilterItemIndex !== -1) {
            otherItem = [
              ...preRenderList.slice(0, quickFilterItemIndex),
              ...preRenderList.slice(quickFilterItemIndex + 1)
            ];
            quickItem = [preRenderList[quickFilterItemIndex]];
          }
          return [otherItem, quickItem];
        } else {
          return [] as any;
        }
      }

      let list = [] as any[];

      // 动态拉取数据的
      let getMoreList: IStaticFilterItem[] = filterListConfig.map(item => {
        const { type } = item;
        let afterRes: IStaticFilterItem = { ...item };
        switch (type) {
          case "Model":
            afterRes = {
              ...item,
              optionArr: state.modelList,
              clickMoreHandler: actions.getModelList
            };
            break;
          case "Manufacture":
            afterRes = {
              ...item,
              optionArr: state.manufactureList
              // clickMoreHandler: actions.getManufactureList
            };
            break;
          default:
            afterRes = item;
        }
        return afterRes;
      });
      list = list.concat(getMoreList);

      // 动态拉取静态数据的
      const [otherItem, quickItem] = getHahaList();
      if (quickItem) {
        list = [...quickItem, ...list];
      }
      if (otherItem) {
        // 从倒数第二个插入
        const sliceLength = list.length - 2;
        const headerPart = list.slice(0, sliceLength);
        const tailPart = list.slice(sliceLength);
        list = [...headerPart, ...otherItem, ...tailPart];
      }
      // staticFilterList = staticFilterList.concat(state.staticFilterList);
      // 3）其他动态接口
      return list;
    },
    getDropDownInfo: promisify(async function(searchString: string) {
      // 1 拉去一组接口。拉去基本属性
      const dropDownInfo: any = await getDropDownInfo(searchString.split(" "));
      return dropDownInfo;
    }),
    setSearchInfo: function(info) {
      dispatch({
        type: productListReducerActionTypes.setSearchInfo,
        value: info
      });
    },
    getStaticFilterList: promisify(async function(a: any, b: any) {
      // 1 拉去一组接口。拉去基本属性
      const baseAttrRes: any = await getBaseAttr();
      // 2 格式化
      // let staticFilterList: IStaticFilterItem[] = Object.keys(baseAttrRes).map(
      //   (key: string) => baseAttrRes[key]
      // );
      dispatch({
        type: productListReducerActionTypes.setStaticFilterList,
        value: baseAttrRes
      });
    }),
    getProductList: promisify(async function() {
      interface IAnswer {
        productId?: string;
        productKey?: string[];
        buyLevel: string[];
        filterBQVS: {
          bpId: string;
          bpName: string;
          list: { bpvId: string; bpvName: string }[];
        }[];
        filterProductId: string[];
        brandId: string[];
        price: { lowPrice: string; highPrice: string }[];
        pageNum: number;
        pageSize: number;
      }
      const answer: IAnswer = {
        productId: state.searchInfo.productId,
        productKey: state.searchInfo.productKey,
        buyLevel: [], //
        filterBQVS: [], //
        filterProductId: [], //
        brandId: [], //
        price: [], //
        pageNum: state.pageNumber.pn, //?
        pageSize: 20
      };
      (state.currentFilterSelect || []).map(({ id: typeAddId }) => {
        const [type, id] = typeAddId.split("-");
        const [typeItem, infoItem]: [any, any] = actions.findInfoById(
          typeAddId
        );
        switch (type) {
          case "Manufacture":
            answer.brandId.push(id);
            break;
          case "attrOf3":
            // TODO hardcode
            answer.filterBQVS.push({
              bpId: typeItem.bpId,
              bpName: typeItem.title,
              list: [{ bpvId: "", bpvName: infoItem.id }]
            });
            break;
          case "Model": {
            answer.filterProductId.push(id);
            break;
          }
          case "Condition": {
            answer.buyLevel.push(infoItem.value);
            break;
          }
          case "Price": {
            answer.price.push({
              lowPrice: infoItem.value[0],
              highPrice: infoItem.value[1]
            });
            break;
          }
          default:
            // 无法识别
            answer.filterBQVS.push({
              bpId: typeItem.bpId,
              bpName: typeItem.title,
              list: [{ bpvId: infoItem.id, bpvName: infoItem.displayName }]
            });
        }
      });
      const linshi: any = {};
      answer.filterBQVS.forEach((item: any) => {
        const { bpId } = item;
        if (!linshi[bpId]) {
          linshi[bpId] = item;
        } else {
          linshi[bpId].list = linshi[bpId].list.concat(item.list);
        }
      });
      (answer as any).filterBQVS = Object.keys(linshi).map(key => {
        return linshi[key];
      });
      // 发起
      dispatch({
        type: productListReducerActionTypes.setPendingStatus,
        value: true
      });
      const resList = await getProductList(answer);
      // 发起
      dispatch({
        type: productListReducerActionTypes.setPendingStatus,
        value: false
      });
      let resCount = resList.length > 19;
      dispatch({
        type: productListReducerActionTypes.setHaveMore,
        value: resCount
      });
      if (state.pageNumber.pn !== 1) {
        dispatch({
          type: productListReducerActionTypes.setProductList,
          value: [...state.productList, ...resList]
        });
      } else {
        dispatch({
          type: productListReducerActionTypes.setProductList,
          value: resList
        });
      }
    }),
    // 获取机型列表
    getModelList: promisify(async function(pn: any) {
      // const res = await getOrderDetail(a, b);
      const res: any = await getModelList(pn);
      dispatch({
        type: productListReducerActionTypes.setModelList,
        value: (res || []).map(({ productDisplayName, productId }: any) => {
          return {
            id: productId,
            displayName: productDisplayName
          };
        })
      });
    }),
    // 获取brand列表
    getManufactureList: promisify(async function(pn: any) {
      const res: any = await getManufactureList(pn);
      if (res && res.length) {
        dispatch({
          type: productListReducerActionTypes.setManufactureList,
          value: (res || []).map(({ brandId, brandDisplayName }: any) => {
            return {
              id: brandId,
              displayName: brandDisplayName
            };
          })
        });
      }
    })
  };
  actions.getProductList = useCallback(actions.getProductList, [
    state.pageNumber
  ]);
  actions.getModelList = useCallback(actions.getModelList, []);
  actions.getManufactureList = useCallback(actions.getManufactureList, []);
  return actions;
}

// action types
export const productListReducerActionTypes = {
  setStaticFilterList: "setStaticFilterList",
  setProductList: "setProductList",
  setModelList: "setModelList",
  setManufactureList: "setManufactureList",
  setCurrentFilterSelect: "setCurrentFilterSelect",
  setFilter: "setFilter",
  setSearchInfo: "setSearchInfo",
  setPageNumber: "setPageNumber",
  setHaveMore: "setHaveMore",
  setPendingStatus: "setPendingStatus",
  setAllFilter: "setAllFilter"
};

// reducer
function reducer(state: IContextState, action: IReducerAction) {
  const { type, value } = action;
  let newState = { ...state };
  switch (type) {
    case productListReducerActionTypes.setPendingStatus: {
      newState = {
        ...newState,
        pendingStatus: value
      };
      break;
    }
    case productListReducerActionTypes.setHaveMore: {
      newState = {
        ...newState,
        haveMore: value
      };
      break;
    }
    case productListReducerActionTypes.setPageNumber: {
      if (value === "init") {
        newState = {
          ...newState,
          pageNumber: { pn: 1 }
        };
      } else {
        newState = {
          ...newState,
          pageNumber: { pn: newState.pageNumber.pn + 1 }
        };
      }

      break;
    }
    case productListReducerActionTypes.setSearchInfo: {
      newState = {
        ...newState,
        searchInfo: {
          ...newState.searchInfo,
          productId: value.productId,
          productKey: value.productKey ? value.productKey.split(" ") : []
        }
      };
      break;
    }
    case productListReducerActionTypes.setStaticFilterList: {
      newState = {
        ...newState,
        staticFilterList: value
      };
      break;
    }
    case productListReducerActionTypes.setProductList: {
      newState = {
        ...newState,
        productList: value
      };
      break;
    }
    case productListReducerActionTypes.setModelList: {
      newState = {
        ...newState,
        modelList: newState.modelList.concat(value)
      };
      break;
    }
    case productListReducerActionTypes.setManufactureList: {
      newState = {
        ...newState,
        manufactureList: newState.manufactureList.concat(value)
      };
      break;
    }
    case productListReducerActionTypes.setCurrentFilterSelect: {
      newState = {
        ...newState,
        currentFilterSelect: value
      };
      break;
    }
    case productListReducerActionTypes.setAllFilter: {
      newState = {
        ...newState,
        currentFilterSelect: newState.currentFilterSelect.filter(({ id }) => {
          if (id.indexOf(value) !== -1) {
            // 现有输入中有这个类别，就筛掉
            return false;
          } else {
            return true;
          }
        })
      };
      break;
    }
    case productListReducerActionTypes.setFilter: {
      let arr = newState.currentFilterSelect;
      const targetIndex = arr.findIndex(({ id }: any) => {
        return id === value;
      });
      if (targetIndex !== -1) {
        arr = [...arr.slice(0, targetIndex), ...arr.slice(targetIndex + 1)];
      } else {
        arr = arr.concat([{ id: value }]);
      }
      newState = {
        ...newState,
        currentFilterSelect: arr
      };
      break;
    }
    default:
      newState = { ...newState };
  }
  return newState;
}
