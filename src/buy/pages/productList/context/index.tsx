import React, { createContext, useEffect, useCallback, useRef } from "react";
import { IReducerAction } from "buy/common/interface/index.interface";
import {
  getModelList,
  getProductList,
  getBaseAttr,
  getManufactureList,
  getDropDownInfo,
  productIdToBrandId
} from "../server";
import {
  getProductListPath,
  promisify,
  safeEqual
} from "buy/common/utils/util";
import { IStaticFilterItem, filterListConfig } from "./staticData";
import { useGetOriginData } from "../../../common/useHook/useGetOriginData";
import useReducerMiddleware from "../../../common/useHook/useReducerMiddleware";
import { locationHref } from "../../../common/utils/routerHistory";
import {
  callBackWhenPassAllFunc,
  useIsCurrentPage
} from "../../detail/context/test";

export const ATTROF = "attrOf";
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
    useReducerMiddleware(reducer),
    initState,
    StoreProductList
  );
  const action: IContextActions = useGetAction(state, dispatch);
  const isCurrentPage = useIsCurrentPage(getProductListPath());

  const { getProductList, replaceSEOUrl } = action;
  
  // 当属性变化的时候,进行调用
  useEffect(() => {
    callBackWhenPassAllFunc([() => isCurrentPage], getProductList);
  }, [isCurrentPage, getProductList]);

  // 当属性变化的时候,进行调用
  useEffect(() => {
    callBackWhenPassAllFunc([() => isCurrentPage], replaceSEOUrl);
  }, [isCurrentPage, replaceSEOUrl]);

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
  resetPageNumber: () => any;
  replaceSEOUrl: () => void;
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
  const lastType = useRef();
  if (!lastType.current) {
    lastType.current = {} as any;
  }
  function getAnswers() {
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
      const [type] = typeAddId.split("-");
      const [typeItem, infoItem]: [any, any] = actions.findInfoById(typeAddId);
      switch (type) {
        case "Manufacture":
          answer.brandId.push(infoItem.id);
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
          answer.filterProductId.push(infoItem.id);
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
    return answer;
  }
  const actions: IContextActions = {
    replaceSEOUrl: promisify(async function() {
      const answer = getAnswers();
      // 需要查找的内容
      const { filterBQVS, filterProductId, brandId } = answer;
      // 这块将brandId进行一下再处理 查找额外
      if (
        lastType &&
        lastType.current &&
        ((lastType.current as any) === "Model" ||
          (lastType.current as any) === "Manufacture")
      ) {
      }
      // 这块性能会有问题
      const brandInfo: any = await productIdToBrandId(filterProductId);
      if (brandInfo) {
        brandInfo.forEach((newBrand: any) => {
          if (
            !brandId.find(currentBrandId =>
              safeEqual(currentBrandId, newBrand.brandId)
            )
          ) {
            brandId.push(newBrand.brandId);
          }
        });
      }

      // 先找出最大的index
      let maxIndex = "";
      // brand,model,storage,carrier,color
      const maxSeoUrlLength = 2;
      const splitOne = "%splitOne%";
      const splitTwo = "%splitTwo%";
      // 需要借助属性列表的帮助
      // @ts-ignore
      state.staticFilterList.find((item: any, index) => {
        const { bpId } = item;
        if (
          // 先从属性开始查找
          filterBQVS.find((userSelect: any) => {
            return String(userSelect.bpId) === String(bpId);
          })
        ) {
          maxIndex = String(index);
        }
      });
      if (maxIndex) {
        maxIndex = String(maxSeoUrlLength + Number(maxIndex) + 1);
      } else {
        if (brandId && brandId.length) {
          maxIndex = "1";
        }
        // 查找filterProductId
        if (filterProductId && filterProductId.length) {
          maxIndex = "2";
        }
      }
      // 获取maxIndex后,根据这个值进行缺省赋值

      // for

      // brand
      function arrToString(arr: any[], empty: string) {
        if (arr && arr.length) {
          return arr.join(",");
        } else {
          return empty;
        }
      }
      function addHehe() {
        let current = 0;
        let urlString = "";
        return (link: string, func: any) => {
          if (current < Number(maxIndex)) {
            current++;
            urlString += link + func();
          }
          return urlString;
        };
      }

      const add = addHehe();
      // brand
      add(splitOne, () => {
        return arrToString(
          brandId.map((id: any) => {
            const [typeItem, infoItem]: [any, any] = actions.findInfoById(
              `Manufacture-${id}`
            );
            return infoItem ? infoItem.displayName : "";
          }),
          "allManufacturer"
        );
      });
      // model
      add(splitOne, () => {
        return arrToString(
          filterProductId.map((id: any) => {
            const [typeItem, infoItem]: [any, any] = actions.findInfoById(
              `Model-${id}`
            );
            return infoItem ? infoItem.displayName : "";
          }),
          "allModel"
        );
      });
      // storage
      let result = "";
      state.staticFilterList.forEach((staticFilter: any, index: number) => {
        const findTarget: any = filterBQVS.find((userSelect: any) => {
          return userSelect.bpId === staticFilter.bpId;
        });
        // attr

        result = add(splitTwo, () => {
          arrToString([], "");
          return arrToString(
            (() => {
              if (findTarget) {
                const { bpName, list } = findTarget;
                return list.map(({ bpvName, bpvId }: any) => {
                  const getName: any = actions.findInfoById(
                    `${ATTROF}${findTarget.bpId}-${
                      staticFilter.tag === "ISCOLOR" ? bpvName : bpvId
                    }`
                  );
                  return getName[1] ? getName[1].displayName : "";
                });
              } else {
                return [];
              }
            })(),
            `all${staticFilter.bpDisplayName}`
          );
        });
      });
      result = result.split(/-|&|\s*/).join("");

      result =
        getProductListPath() +
        result
          .split(splitOne)
          .join("/")
          .split(splitTwo)
          .join("-")
          .toLowerCase();
      if (window.location.href.indexOf(getProductListPath()) !== -1) {
        locationHref(result, "replace");
      }
      return result;
    }),
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
    resetPageNumber: () => {
      dispatch({ type: productListReducerActionTypes.setPageNumber, value: 1 });
    },
    setUserSelectFilter: promisify(async function({ id, type }: any) {
      let setValue;
      (lastType.current as any) = type;
      if (id === "all") {
        setValue = state.currentFilterSelect.filter(({ id }) => {
          if (id.indexOf(type) !== -1) {
            // 现有输入中有这个类别，就筛掉
            return false;
          } else {
            return true;
          }
        });
      } else {
        const value = `${type}-${id}`;
        let arr = state.currentFilterSelect;
        const targetIndex = arr.findIndex(({ id }: any) => {
          return id === value;
        });
        if (targetIndex !== -1) {
          arr = [...arr.slice(0, targetIndex), ...arr.slice(targetIndex + 1)];
        } else {
          arr = arr.concat([{ id: value }]);
        }
        setValue = arr;
      }
      actions.resetPageNumber();
      dispatch({
        type: productListReducerActionTypes.setCurrentFilterSelect,
        value: setValue
      });
    }),

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
                afterRes.type = `${ATTROF}${findAttr.bpId}`;
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
              return false;
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
      actions.resetPageNumber();
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
      const answer = getAnswers();
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
          value: (res || []).map(
            ({ brandId, brandDisplayName, seqNo }: any) => {
              return {
                seqNo,
                id: brandId,
                displayName: brandDisplayName
              };
            }
          )
        });
      }
    })
  };
  // 至少有这些
  actions.getProductList = useCallback(actions.getProductList, [
    state.pageNumber,
    state.searchInfo,
    state.currentFilterSelect
  ]);
  // 机型,属性值,等.
  actions.replaceSEOUrl = useCallback(actions.replaceSEOUrl, [
    state.currentFilterSelect
  ]);
  actions.getModelList = useCallback(actions.getModelList, []);
  actions.getManufactureList = useCallback(actions.getManufactureList, []);
  actions.resetPageNumber = useCallback(actions.resetPageNumber, []);
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
      newState = {
        ...newState,
        pageNumber: { pn: value || newState.pageNumber.pn + 1 }
      };
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
      // 没有的数据才补充进来
      const nextValue = value.filter((itemNew: any) => {
        return !newState.modelList.find((itemOld: any) => {
          return safeEqual(itemNew.id, itemOld.id);
        });
      });
      newState = {
        ...newState,
        modelList: newState.modelList.concat(nextValue)
      };
      break;
    }
    case productListReducerActionTypes.setManufactureList: {
      newState = {
        ...newState,
        manufactureList: value
        // manufactureList: newState.manufactureList.concat(value) 因为没有pn直接替代掉
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
    default:
      newState = { ...newState };
  }
  return newState;
}
