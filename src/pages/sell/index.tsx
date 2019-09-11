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
import { HeaderTitle } from "@/components/headerTitle";
import Breadcrumb from "./selectModelProcess/components/breadcrumb/index";
import { staticRouter } from "@/pages/sell/selectModelProcess/config/staticRouter";
import { inject, observer } from "mobx-react";
import { removeAllSpace } from "@/pages/sell/util";
import { getFromSession } from "@/utils/util";

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
  function goNextPage(currentPage?: any): void {
    let documentTitle = "Sell My Phone | UpTradeit.com";
    const findDocumentTitle = staticRouter.find((item: any) => {
      return item.pageKey === currentPage;
    }) as any;
    if (findDocumentTitle) {
      documentTitle = findDocumentTitle.documentTitle;
    }

    // document.title = String(Date.now());
    // 这块对路由状态的借用不好。现在是自己在维护
    switch (currentPage) {
      case "offer": {
        const next = props.match.url + "/phone/information";
        props.history.push(removeAllSpace(next));
        break;
      }
      case "information": {
        const next = props.match.url + "/phone/payment";
        props.history.push(removeAllSpace(next));
        break;
      }
      case "payment": {
        const next = props.match.url + "/phone/shipping";
        props.history.push(removeAllSpace(next));
        break;
      }
      case "shipping": {
        const next = props.match.url + "/phone/summary";
        props.history.push(removeAllSpace(next));
        break;
      }
      case "summary": {
        const next = props.match.url + "/phone/prepare-ship";
        props.history.push(removeAllSpace(next));
        break;
      }
      case "prepareShip": {
        break;
      }
      case "brand": {
        const next = props.match.url + "/" + brand;
        props.history.push(removeAllSpace(next));
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
            let next =
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
              .join("-")} | UpTradeit.com`;
            if (skuId) {
              next = next + "/skuid-" + skuId;
            }

            props.history.push(removeAllSpace(next));
          }
        }
        break;
      }
      case "condition": {
        const next = props.match.url + "/phone/offer";
        props.history.push(removeAllSpace(next));
        break;
      }
      default: {
        const next = props.match.url;
        props.history.push(removeAllSpace(next));
        break;
      }
    }
    if (documentTitle) {
      document.title = documentTitle;
    }
    window.scrollTo(0, 0);
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
      path: () => props.match.url + "/phone/information",
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
  // 如果当前
  if (!userProductList || !userProductList.length) {
    if (!brand) {
      if (
        props.location.pathname &&
        props.location.pathname !== "/sell" &&
        !props.location.pathname.includes("prepare-ship") &&
        !props.location.pathname.includes("skuid")
      ) {
        // 首页
        goNextPage();
      }
    }
  }
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
  return (
    <Switch>
      {/*<Route path="/" render={() => (*/}
      {/*  <Redirect to="/test"/>*/}
      {/*)}/>*/}
      {configArr.map(({ path, title, Component, pageKey, documentTitle }) => {
        return (
          <Route
            key={pageKey}
            path={path()}
            render={other => (
              <Layout
                goNextPage={goNextPage}
                currentPage={pageKey}
                title={title}
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
      })}
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
