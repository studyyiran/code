import React, { useContext } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../../context";
import { inject, observer } from "mobx-react";

@inject("yourphone", "user", "common")
@observer
export default class BreadcrumbContainer extends React.Component<any, any> {
  public render() {
    return <Breadcrumb {...this.props} />;
  }
}
function Breadcrumb(props: any) {
  const { currentPage, common } = props;
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextValue,
    getNameInfo
  } = selectModelContext as ISelectModelContext;
  const { brand, userProductList, modelInfo } = selectModelContextValue;
  const nameObj = getNameInfo({
    brandId: brand,
    ...modelInfo
  });
  function renderName() {
    let name = "";
    function append(origin: string, value: string) {
      if (value) {
        return origin + value;
      } else {
        return origin;
      }
    }
    name = append(name, nameObj.modelInfoName.modelName);
    name = append(name, nameObj.modelInfoName.storageName);
    name = append(name, nameObj.modelInfoName.carrierName);
    return name;
  }
  function clickHandler(e: any) {
    const selectTag = e.target.getAttribute("data-step");
    // 如果当前处于选中状态
    if (selectTag) {
      props.goNextPage(selectTag);
    }
  }
  const configArr = [
    {
      pageKey: "brand",
      viewContent: () => {
        return nameObj.brandName || "Manufacture";
      }
    },
    {
      pageKey: "model",
      viewContent: () => {
        return nameObj.modelInfoName.modelName ? renderName() : "Model";
      }
    },
    {
      pageKey: "condition",
      viewContent: () => {
        return "Phone Conditions";
      }
    },
    {
      pageKey: "offer",
      viewContent: () => {
        return "Offer Details";
      }
    }
  ];
  function getCurrentPageKey(calcKey?: string) {
    const findCurrentPageIndex = configArr.findIndex(
      routeConfig => routeConfig.pageKey === (calcKey || currentPage)
    );
    if (findCurrentPageIndex !== -1) {
      return findCurrentPageIndex;
    } else {
      console.error("not found");
      return findCurrentPageIndex;
    }
  }
  const currentPageKey = getCurrentPageKey();

  function renderByType() {
    const isMobile = common.isMobile;
    const stageKey = getCurrentPageKey("offer");
    const beginPos = currentPageKey > stageKey ? stageKey : 0;
    let configCache = [...configArr];
    if (isMobile) {
      if (currentPageKey === 0) {
        configCache = [configCache[0]];
      } else if (currentPageKey > 0) {
        configCache = [
          configCache[currentPageKey - 1],
          configCache[currentPageKey]
        ];
      }
    } else {
      configCache = configCache.slice(beginPos, currentPageKey + 1);
    }

    return (
      <ul className="breadcrumb-list" onClick={clickHandler}>
        {configCache.map(routeConfig => {
          const { pageKey, viewContent } = routeConfig;
          const renderPageKey = getCurrentPageKey(pageKey);
          let nextPageKey = "";
          if (renderPageKey > stageKey) {
            nextPageKey = configArr[renderPageKey - 1].pageKey;
          } else if (nameObj.brandName) {
            // 如果可以选中跳转
            if (renderPageKey > 0) {
              nextPageKey = configArr[renderPageKey - 1].pageKey;
            } else if (renderPageKey === 0) {
              nextPageKey = "firstStep";
            }
          }
          return (
            <li data-step={nextPageKey} key={pageKey}>
              {` ${viewContent()} > `}
            </li>
          );
        })}
      </ul>
    );
  }

  return <div className="breadcrumb">{renderByType()}</div>;
}
