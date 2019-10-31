import React, { useContext, useEffect, useState } from "react";
import "./index.less";

import Brand from "./selectModelProcess/brand";
import Model from "./selectModelProcess/model";
import Questionary from "./selectModelProcess/condition/index";
import Offer from "./selectModelProcess/offer";
import Information from "./selectModelProcess/pages/information";
import Payment from "./selectModelProcess/pages/payment";
import Shipping from "./selectModelProcess/pages/shipping";
import Summary from "./selectModelProcess/pages/summary";
import PrepareShip from "./selectModelProcess/pages/prepareShip";

import {
  SelectModelContext,
  ISelectModelContext
} from "./selectModelProcess/context";
import { Switch, Route, Redirect } from "react-router";
import { HeaderTitle } from "components/headerTitle";
import Breadcrumb from "./selectModelProcess/components/breadcrumb/index";
import { staticRouter } from "pages/sell/selectModelProcess/config/staticRouter";
import { inject, observer } from "mobx-react";
import { removeAllSpace } from "pages/sell/util";
import getSellPath, {
  getFromSession,
  isServer,
  safeEqual,
  setSession
} from "utils/util";
import { dataReport } from "../../common/dataReport";

let haveinit = false;

// const config = [
//   {
//     url: 'sell'
//   },
//   {
//     url: ''
//   }
// ]
// interface ISell {}

export default function Sell(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextValue,
    selectModelContextDispatch,
    setSkuIdGetPhoneInfo,
    getNameInfo
  } = selectModelContext as ISelectModelContext;
  const {
    brand,
    brandList,
    modelInfo,
    skuId,
    userProductList
  } = selectModelContextValue;
  function canGoNext(): boolean {
    return true;
  }
  function getNextUrl(currentPage?: any): void {
    let documentTitle = "Sell My Phone | UpTradeit.com";
    const findDocumentTitle = staticRouter.find((item: any) => {
      return item.pageKey === currentPage;
    }) as any;
    if (findDocumentTitle) {
      documentTitle = findDocumentTitle.documentTitle;
    }
    let next = "";
    // 这块对路由状态的借用不好。现在是自己在维护
    switch (currentPage) {
      case "offer": {
        next = props.match.url + "/phone/info";
        break;
      }
      case "information": {
        next = props.match.url + "/phone/payment";
        break;
      }
      case "payment": {
        next = props.match.url + "/phone/shipping";
        break;
      }
      case "shipping": {
        next = props.match.url + "/phone/summary";
        break;
      }
      case "summary": {
        next = props.match.url + "/phone/prepare-ship";
        break;
      }
      case "prepareShip": {
        break;
      }
      case "brand": {
        next = props.match.url + "/" + brand;
        const findTarget: any = brandList.find((item: any) => {
          return item.id === brand;
        });
        if (findTarget) {
          documentTitle = `Sell My ${findTarget.displayName} | UpTradeit.com`;
        }
        break;
      }
      case "model": {
        const findTarget: any = brandList.find((item: any) => {
          return item.id === brand;
        });
        if (findTarget) {
          // 暂时不判断过多的。信任页面的判断
          if (modelInfo.modelId) {
            const nameConfig = getNameInfo({
              brandId: brand,
              modelId: modelInfo.modelId,
              othersAttr: modelInfo.othersAttr
            });
            const { modelName, othersAttrName } = nameConfig.modelInfoName;
            const displayModelName = modelName.split(" ").join("-");
            next =
              props.match.url +
              "/" +
              findTarget.displayName +
              `/${displayModelName}`;
            Object.keys(othersAttrName).forEach((key: any) => {
              next += `-${othersAttrName[key]}`;
            });
            documentTitle = `Sell ${displayModelName}-${Object.keys(
              othersAttrName
            )
              .map((key: any) => {
                return othersAttrName[key];
              })
              .join("-")} | UpTradeit.com`
              .split("-")
              .join(" ");
            if (skuId) {
              next = next + "/skuid-" + skuId;
            }
          }
        }
        break;
      }
      case "condition": {
        next = props.match.url + "/phone/offer";
        break;
      }
      default: {
        next = props.match.url;
        break;
      }
    }
    if (documentTitle) {
      document.title = documentTitle;
    }
    return next as any;
  }
  function goNextPage(currentPage?: any): void {
    const next: any = getNextUrl(currentPage);
    function getReportData(key: string) {
      if (!isServer()) {
        const result = sessionStorage.getItem(key);
        try {
          if (result) {
            return JSON.parse(result);
          }
        } catch (e) {
          console.error(e);
        }
      }
      return null;
    }
    if (next && next.indexOf("/phone/info") !== -1) {
      dataReport({ step: 8 });
    }
    if (next && next.indexOf("/phone/payment") !== -1) {
      dataReport({ step: 9 });
    }
    if (next && next.indexOf("/phone/shipping") !== -1) {
      const data = getReportData("preOrder");
      if (data && data.payment) {
        dataReport({ step: 10, paymentType: data.payment });
      }
    }
    if (next && next.indexOf("/phone/summary") !== -1) {
      const data = getReportData("preOrder");
      const data2 = getReportData("modelContext");
      if (data && data.expressCarrier && data2) {
        const { expressOption, needInsurance } = data2;
        dataReport({
          step: 11,
          packaging: safeEqual(
            3,
            expressOption ? expressOption.sendDateType : ""
          )
            ? "send me a box"
            : "",
          shippingOption: data.expressCarrier,
          shippingInsurance: needInsurance ? "yes" : "no"
        });
      }
    }
    if (next && next.indexOf("/phone/prepare-ship") !== -1) {
      dataReport({ step: 12 });
    }
    if (next) {
      props.history.push(removeAllSpace(next));
      window.scrollTo(0, 0);
    }
  }
  // function wrapper(Component: any) {
  //   return (...other: any[]) => {
  //     const NewA = React.cloneElement(Component, {
  //       canGoNext,
  //       goNextPage,
  //       ...props,
  //       ...other
  //     })
  //     // return <Component />
  //     // @ts-ignore
  //     return <NewA />;
  //   };
  // }
  function wrapperWithProps(Component: any) {
    return function(other: any[]) {
      const newProps = {
        canGoNext,
        goNextPage,
        ...props,
        ...other
      };
      return <Component {...newProps} />;
    };
  }
  const routerConfig = {
    brand: {
      path: () => props.match.url + "/",
      Component: Brand
    },
    model: {
      path: () => props.match.url + "/:brandName",
      Component: Model
    },
    condition: {
      path: () => props.match.url + "/:brandName/:modelInfo/:skuId",
      Component: Questionary
    },
    offer: {
      path: () => props.match.url + "/phone/offer",
      Component: Offer
    },
    information: {
      path: () => props.match.url + "/phone/info",
      Component: Information
    },
    payment: {
      path: () => props.match.url + "/phone/payment",
      Component: Payment
    },
    shipping: {
      path: () => props.match.url + "/phone/shipping",
      Component: Shipping
    },
    summary: {
      path: () => props.match.url + "/phone/summary",
      Component: Summary
    },
    prepareShip: {
      path: () => props.match.url + "/phone/prepare-ship",
      Component: PrepareShip
    }
  };
  const configArr = staticRouter.map(item => {
    const { pageKey } = item;
    const result = { ...item, ...routerConfig[pageKey] };
    if (pageKey === "condition") {
      const { othersAttr, modelId } = modelInfo;
      const nameConfig = getNameInfo({
        brandId: brand,
        modelId,
        othersAttr
      });
      if (nameConfig && nameConfig.modelInfoName) {
        const { modelName, othersAttrName } = nameConfig.modelInfoName;
        const next = modelName ? `Sell My ${modelName}` : "Sell My Phone";
        // Object.keys(othersAttrName).forEach((key: any) => {
        //   next += ` ${othersAttrName[key]}`;
        // });
        return {
          ...result,
          title: next
        };
      }
    }
    return { ...result };
  });
  // 解析skuId
  useEffect(() => {
    if (props.location.pathname.includes("skuid")) {
      const arr = props.location.pathname.split("skuid-");
      if (arr && arr[1]) {
        // 使用action 而非dispatch
        setSkuIdGetPhoneInfo(arr[1]);
      }
    }
  }, []);
  useEffect(() => {
    if (!isServer()) {
      try {
        const data = getFromSession("sell-title");
        if (data) {
          const { href, title } = data;
          if (href === props.location.pathname) {
            document.title = title;
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
  useEffect(() => {
    if (!isServer()) {
      const titleCache = {
        href: props.location.pathname,
        title: window.document.title
      };
      setSession("sell-title", titleCache);
    }
  }, [props.location.pathname]);

  function redirectTo() {
    // 如果当前
    if (!userProductList || !userProductList.length) {
      if (!brand) {
        if (
          props.location.pathname &&
          props.location.pathname !== getSellPath() &&
          !props.location.pathname.includes("prepare-ship") &&
          !props.location.pathname.includes("skuid")
        ) {
          // 首页
          goNextPage();
        }
      }
    }
  }
  return (
    <Switch>
      {/*<Route path="/" render={() => (*/}
      {/*  <Redirect to="/test"/>*/}
      {/*)}/>*/}
      {configArr.map(
        ({ path, title, Component, pageKey, documentTitle, dontRedirect }) => {
          return (
            <Route
              key={pageKey}
              path={path()}
              render={other => (
                <Layout
                  goNextPage={goNextPage}
                  currentPage={pageKey}
                  title={title}
                  redirectTo={!dontRedirect ? redirectTo : null}
                  {...other}
                >
                  <Component
                    canGoNext={canGoNext}
                    goNextPage={() => goNextPage(pageKey)}
                    {...props}
                    {...other}
                  />
                </Layout>
              )}
            />
          );
        }
      )}
      <Route render={() => <div>not match</div>} />
    </Switch>
  );
}

@inject("yourphone", "user", "common")
@observer
class Layout extends React.Component<any, any> {
  public componentDidMount(): void {
    if (!haveinit) {
      haveinit = true;
      const preOrder = getFromSession("preOrder");
      if (preOrder) {
        this.props.user.preOrder = preOrder;

        if (this.props.user.preOrder.addressInfo) {
          this.props.yourphone.addressInfo = this.props.user.preOrder.addressInfo;
        }

        if (this.props.user.preOrder.inquiryKey) {
          this.props.yourphone.inquiryKey = this.props.user.preOrder.inquiryKey;
        }

        if (this.props.user.preOrder.payment) {
          this.props.yourphone.payment = this.props.user.preOrder.payment;
        }
        if (this.props.user.preOrder.expressCarrier) {
          this.props.yourphone.expressCarrier = this.props.user.preOrder.expressCarrier;
        }

        if (this.props.user.preOrder.checkInfo) {
          this.props.yourphone.echeck = this.props.user.preOrder.checkInfo;
        }

        if (this.props.user.preOrder.paypalInfo) {
          this.props.yourphone.paypal = this.props.user.preOrder.paypalInfo;
        }
      }
      this.setState({ isSetedPreOrder: true });
    }
  }

  public render() {
    if (this.props.redirectTo) {
      this.props.redirectTo();
    }

    const { children, goNextPage, currentPage, title } = this.props;
    return (
      <div className="sell-layout">
        <div className="header-container">
          <Breadcrumb
            goNextPage={(...params: any[]) => {
              // 注入
              goNextPage(...params);
            }}
            currentPage={currentPage}
          />
          <HeaderTitle title={title} />
        </div>
        <div className={"content"}>{children}</div>
      </div>
    );
  }
}
