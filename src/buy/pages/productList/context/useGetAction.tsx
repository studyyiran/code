import { IReducerAction } from "../../../common/interface/index.interface";
import { useCallback } from "react";
import { serverProductList } from "../server";
import { filterListConfig, IStaticFilterItem } from "./staticData";
import { IAnswer } from "./interface";
import { getProductListPath, safeEqual } from "../../../common/utils/util";
import { dataReport } from "../../../common/dataReport";
import {
  ATTROF,
  IStoreProductListActions,
  IStoreProductListState,
  productListReducerActionTypes
} from "./index";
import {modelFilterAttr} from "../util";

interface ISomeDataList {
  manufactureList: any[];
  modelList: any[];
  staticFilterList: any[];
}

export function getAnswers(
  info: ISomeDataList,
  filterSelect: any,
  extraInfo = {}
) {
  // 这块是初始化过程
  const answer: IAnswer = {
    buyLevel: [], //
    filterBQVS: [], //
    filterProductId: [], //
    brandId: [], //
    price: [], //
    pageSize: 20,
    pageNum: 1,
    ...extraInfo
  };
  filterSelect.map(({ id: typeAddId }: any) => {
    const [type] = typeAddId.split("-");
    const [typeItem, infoItem] = findInfoById(typeAddId, info);
    if (infoItem) {
      switch (type) {
        case "Manufacture":
          if (infoItem && infoItem.id) {
            answer.brandId.push(infoItem.id);
          }

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

// 根据id 获取描述信息
export function findInfoById(typeAndId: string, data: ISomeDataList) {
  const [type, id] = typeAndId.split("-");
  let typeInfo;
  let itemInfo;
  const list = getFilterList(data);
  if (list && list.length) {
    typeInfo = list.find(({ type: filterType, optionArr }) => {
      if (String(type) === String(filterType)) {
        return optionArr.find((target: any) => {
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
  return [typeInfo as any, itemInfo as any];
}

// 获取排序的列表(整个静态数据,baseAttr,model)
export function getFilterList({
  manufactureList,
  modelList,
  staticFilterList
}: ISomeDataList): IStaticFilterItem[] {
  // 2)静态接口已经拉取
  function getHahaList() {
    if (staticFilterList && staticFilterList.length) {
      // 进行pre-render赋值
      const preRender = (title: string, callback: any) => {
        const afterRes: IStaticFilterItem = {} as any;
        if (staticFilterList && staticFilterList.length) {
          const findAttr = staticFilterList.find(({ bpDisplayName }: any) => {
            return String(bpDisplayName).indexOf(title) !== -1;
          });

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
      const preRenderList = staticFilterList.map(
        ({ tag, bpDisplayName }: any) => {
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
          optionArr: modelList
        };
        break;
      case "Manufacture":
        afterRes = {
          ...item,
          optionArr: manufactureList
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
  // staticFilterList = staticFilterList.concat(staticFilterList);
  // 3）其他动态接口
  return list;
}

// 纯函数.获取nextFilter预测值
export function willGetUserSelectFilter(
  { id, type }: any,
  currentFilterSelect: any
) {
  let setValue;
  if (id === "all") {
    setValue = currentFilterSelect.filter(({ id }: any) => {
      if (id.indexOf(type) !== -1) {
        // 现有输入中有这个类别，就筛掉
        return false;
      } else {
        return true;
      }
    });
  } else {
    const value = `${type}-${id}`;
    let arr = currentFilterSelect;
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
  return setValue;
}

/*
__________________________________
 */

export function useStoreProductListAction(
  state: IStoreProductListState,
  dispatch: (action: IReducerAction) => void
): IStoreProductListActions {
  // 获取机型列表
  const getModelList = useCallback(
    async function(pn: any) {
      // 封装请求
      const res: any = await serverProductList.getModelList(pn);
      // 封装赋值
      // 其实在未来,数据filter也应该剥离出来.提高复用.
      dispatch({
        type: productListReducerActionTypes.setModelList,
        value: (res || []).map(modelFilterAttr)
      });
    },
    [dispatch]
  );

  // 重置
  const resetPageNumber = useCallback(() => {
    dispatch({
      type: productListReducerActionTypes.setPageNumber,
      value: 1
    });
  }, [dispatch]);

  // a标签获取下一次的点击链接render结果
  const willReplaceSEOUrl = useCallback(
    function(info) {
      const dataOfStatic = {
        modelList: state.modelList,
        manufactureList: state.manufactureList,
        staticFilterList: state.staticFilterList
      };
      const answer = getAnswers(
        dataOfStatic,
        willGetUserSelectFilter(info, state.currentFilterSelect)
      );
      // 需要查找的内容
      const { filterBQVS, filterProductId, brandId } = answer;
      // console.log(filterProductId)
      state.modelList.forEach(item => {
        filterProductId.forEach(productId => {
          if (
            item &&
            item.brandId &&
            item.id &&
            safeEqual(item.id, productId)
          ) {
            if (
              !brandId.find(currentBrandId =>
                safeEqual(currentBrandId, productId)
              )
            ) {
              brandId.push(item.brandId);
            }
          }
        });
      });

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
          return arr.sort().join(",");
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
            const [typeItem, infoItem] = findInfoById(
              `Manufacture-${id}`,
              dataOfStatic
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
            const [typeItem, infoItem] = findInfoById(
              `Model-${id}`,
              dataOfStatic
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
                  const getName: any = findInfoById(
                    `${ATTROF}${findTarget.bpId}-${
                      staticFilter.tag === "ISCOLOR" ? bpvName : bpvId
                    }`,
                    dataOfStatic
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
      // if (window.location.href.indexOf(getProductListPath()) !== -1) {
      //   locationHref(result, "replace");
      // }
      return result;
    },
    [
      state.currentFilterSelect,
      state.manufactureList,
      state.modelList,
      state.staticFilterList
    ]
  );

  //
  const setUserSelectFilter = useCallback(
    async function({ id, type }: any) {
      let setValue;
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
      resetPageNumber();
      dispatch({
        type: productListReducerActionTypes.setCurrentFilterSelect,
        value: setValue
      });
    },
    [dispatch, resetPageNumber, state.currentFilterSelect]
  );

  const setSearchInfo = useCallback(
    function(info) {
      resetPageNumber();
      dispatch({
        type: productListReducerActionTypes.setSearchInfo,
        value: info
      });
    },
    [dispatch, resetPageNumber]
  );
  const getDropDownInfo = useCallback(async function(searchString: string) {
    // 1 拉去一组接口。拉去基本属性
    const dropDownInfo: any = await serverProductList.getDropDownInfo(
      searchString.split(" ")
    );
    return dropDownInfo;
  }, []);
  const getStaticFilterList = useCallback(
    async function() {
      // 1 拉去一组接口。拉去基本属性
      const baseAttrRes: any = await serverProductList.getBaseAttr();
      // 2 格式化
      // let staticFilterList: IStaticFilterItem[] = Object.keys(baseAttrRes).map(
      //   (key: string) => baseAttrRes[key]
      // );
      dispatch({
        type: productListReducerActionTypes.setStaticFilterList,
        value: baseAttrRes
      });
    },
    [dispatch]
  );

  const getProductList = useCallback(
    async function() {
      const answer = getAnswers(
        {
          modelList: state.modelList,
          manufactureList: state.manufactureList,
          staticFilterList: state.staticFilterList
        },
        state.currentFilterSelect
      );
      // 发起
      dispatch({
        type: productListReducerActionTypes.setPendingStatus,
        value: true
      });
      const resList = await serverProductList.getProductList({
        ...answer,
        productId: state.searchInfo.productId,
        productKey: state.searchInfo.productKey,
        pageNum: state.pageNumber.pn
      });
      const { productKey, filterBQVS }: any = answer;
      const result = filterBQVS
        .map(({ bpName }: any) => {
          return bpName;
        })
        .join(", ");
      try {
        dataReport({
          event: "buyerSearch",
          searchterm: productKey ? productKey.join(", ") : "",
          network: result
        });
      } catch (e) {
        console.error(e);
      }
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
          value: (preProductList: any[]) => [...preProductList, ...resList]
        });
      } else {
        dispatch({
          type: productListReducerActionTypes.setProductList,
          value: () => resList
        });
      }
    },
    [
      dispatch,
      state.currentFilterSelect,
      state.manufactureList,
      state.modelList,
      state.pageNumber.pn,
      state.searchInfo.productId,
      state.searchInfo.productKey,
      state.staticFilterList
    ]
  );

  // 获取brand列表
  const getManufactureList = useCallback(
    async function(pn: any) {
      const res: any = await serverProductList.getManufactureList(pn);
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
    },
    [dispatch]
  );
  return {
    getStaticFilterList,
    resetPageNumber,
    willReplaceSEOUrl,
    getProductList,
    getModelList,
    getManufactureList,
    setUserSelectFilter,
    setSearchInfo,
    getDropDownInfo
  };
}
