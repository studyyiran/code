import React, { useContext } from "react";
import "./index.less";
import { SelectModelContext, ISelectModelContext } from "../../context";
import { inject, observer } from "mobx-react";
import { staticRouter } from "../../config/staticRouter";
import Svg from "@/components/svg";

@inject("yourphone", "user", "common")
@observer
export default class BreadcrumbContainer extends React.Component<any, any> {
  public render() {
    const { isMobile } = this.props.common;
    return <Breadcrumb {...this.props} isMobile={isMobile} />;
  }
}
function Breadcrumb(props: any) {
  const { currentPage, isMobile } = props;
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextValue,
    getNameInfo
  } = selectModelContext as ISelectModelContext;
  const { brand, modelInfo, userProductList } = selectModelContextValue;
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

    const { othersAttrName } = nameObj.modelInfoName;
    Object.keys(othersAttrName).forEach((key: any) => {
      name = append(`${name} `, othersAttrName[key]);
    });
    return name;
  }
  function clickHandler(e: any) {
    const selectTag = e.target.getAttribute("data-step");
    // 如果当前处于选中状态
    if (selectTag && selectTag !== "false") {
      props.goNextPage(selectTag);
    }
  }
  // 配置路由参数
  const routerConfig = {
    brand: {
      viewContent: () => {
        if (currentPage === "brand") {
          return "Manufacture";
        } else {
          return nameObj.brandName || "Manufacture";
        }
      },
      order: 0
    },
    model: {
      viewContent: () => {
        return nameObj.modelInfoName.modelName ? renderName() : "Model";
      },
      order: 1
    },
    condition: {
      viewContent: () => {
        return "Phone Conditions";
      },
      order: 2
    },
    offer: {
      viewContent: () => {
        return nameObj.modelInfoName.modelName ? renderName() : "Offer Details";
      },
      order: 3
    },
    information: {
      viewContent: () => {
        return "Information";
      },
      order: 4
    },
    payment: {
      viewContent: () => {
        return "Payment";
      },
      order: 5
    },
    shipping: {
      viewContent: () => {
        return "Shipping";
      },
      order: 6
    },
    summary: {
      viewContent: () => {
        return "Order summary";
      },
      order: 7
    },
    prepareShip: {
      viewContent: () => {
        return "Order complete";
      },
      order: 8
    }
  };
  const configArr = staticRouter
    .map(item => {
      const { pageKey } = item;
      return { ...item, ...routerConfig[pageKey] };
    })
    .sort((a, b) => {
      return a.order - b.order;
    });

  function getCurrentPageOrder(calcKey?: string) {
    const findCurrentPage = configArr.find(
      routeConfig => routeConfig.pageKey === (calcKey || currentPage)
    );
    if (findCurrentPage) {
      return findCurrentPage.order;
    } else {
      console.error("not found");
      return findCurrentPage.order;
    }
  }
  function getIndexByOrder(order: number) {
    return configArr.findIndex(routeConfig => routeConfig.order === order);
  }
  const currentPageOrder = getCurrentPageOrder();

  function renderByType() {
    const stageOrder = getCurrentPageOrder("offer");
    const beginOrder = currentPageOrder > stageOrder ? stageOrder : 0;
    let configCache = [...configArr];
    if (isMobile) {
      if (currentPageOrder === 0) {
        configCache = [configCache[getIndexByOrder(currentPageOrder)]];
      } else if (currentPageOrder > 0) {
        configCache = [
          configCache[getIndexByOrder(currentPageOrder - 1)],
          configCache[getIndexByOrder(currentPageOrder)]
        ];
      }
    } else {
      configCache = configArr.slice(
        getIndexByOrder(beginOrder),
        getIndexByOrder(currentPageOrder) + 1
      );
    }
    return (
      <ul className="breadcrumb-list" onClick={clickHandler}>
        {configCache.map((routeConfig, index) => {
          const { pageKey, viewContent } = routeConfig;
          const renderPageOrder = getCurrentPageOrder(pageKey);
          let nextPageKey = "false";
          if (
            renderPageOrder >= stageOrder &&
            userProductList &&
            userProductList.length
          ) {
            nextPageKey =
              configArr[getIndexByOrder(renderPageOrder - 1)].pageKey;
          } else if (nameObj.brandName) {
            // 如果可以选中跳转
            if (renderPageOrder > 0) {
              nextPageKey =
                configArr[getIndexByOrder(renderPageOrder - 1)].pageKey;
            } else if (renderPageOrder === 0) {
              nextPageKey = "firstStep";
            }
          }
          return (
            <li data-step={nextPageKey} key={pageKey}>
              <span data-step={nextPageKey}>{` ${viewContent()}`}</span>
              {"prepareShip" !== pageKey ? <Svg icon="arrow-right" /> : null}
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <div className="flex-grid">
      <div className="breadcrumb">{renderByType()}</div>
      <div />
    </div>
  );
}
