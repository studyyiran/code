import React, { useContext, useEffect, useState } from "react";
import Brand from "./selectModelProcess/brand";
import Model from "./selectModelProcess/model";
import Questionary from "./selectModelProcess/condition/index";
import Offer from "./selectModelProcess/offer";
import Information from "./selectModelProcess/pages/information";
import Payment from "./selectModelProcess/pages/payment";
import Shipping from "./selectModelProcess/pages/shipping";
import Summary from "./selectModelProcess/pages/summary";

import {
  SelectModelContext,
  ISelectModelContext
} from "./selectModelProcess/context";
import { Switch, Route } from "react-router";
import { HeaderTitle } from "@/components/headerTitle";
import Breadcrumb from "./selectModelProcess/components/breadcrumb/index";
import { staticRouter } from "@/pages/sell/selectModelProcess/config/staticRouter";
import { inject, observer } from "mobx-react";

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
function removeAllSpace(str: string) {
  return str.replace(/\s+/g, "");
}

export default function Sell(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextValue,
    selectModelContextDispatch,
    getNameInfo
  } = selectModelContext as ISelectModelContext;
  const { brand, brandList, modelInfo } = selectModelContextValue;
  function canGoNext(): boolean {
    return true;
  }
  function goNextPage(currentPage: any): void {
    // 这块对路由状态的借用不好。现在是自己在维护
    switch (currentPage) {
      case "offer": {
        const next = props.match.url + "/information";
        props.history.push(removeAllSpace(next));
        break;
      }
      case "information": {
        const next = props.match.url + "/payment";
        props.history.push(removeAllSpace(next));
        break;
      }
      case "payment": {
        const next = props.match.url + "/shipping";
        props.history.push(removeAllSpace(next));
        break;
      }
      case "shipping": {
        const next = props.match.url + "/summary";
        props.history.push(removeAllSpace(next));
        break;
      }
      case "summary": {
        const next = props.match.url + "/prepare-ship";
        props.history.push(removeAllSpace(next));
        break;
      }
      case "prepareShip": {
        break;
      }
      case "firstStep": {
        const next = props.match.url;
        props.history.push(removeAllSpace(next));
        break;
      }
      case "brand": {
        const findTarget: any = brandList.find((item: any) => {
          return item.id === brand;
        });
        if (findTarget) {
          const next = props.match.url + "/" + findTarget.name;
          // const next = props.match.url + "/condition";
          props.history.push(removeAllSpace(next));
        }
        break;
      }
      case "model": {
        const findTarget: any = brandList.find((item: any) => {
          return item.id === brand;
        });
        if (findTarget) {
          if (modelInfo.modelId && modelInfo.carrierId && modelInfo.storageId) {
            const nameConfig = getNameInfo({
              brandId: brand,
              modelId: modelInfo.modelId,
              storageId: modelInfo.storageId,
              carrierId: modelInfo.carrierId
            });
            const {
              modelName,
              storageName,
              carrierName
            } = nameConfig.modelInfoName;
            const next =
              props.match.url +
              "/" +
              findTarget.name +
              `/${modelName}-${storageName}-${carrierName}`;

            props.history.push(removeAllSpace(next));
          }
        }
        break;
      }
      case "condition": {
        const next = props.match.url + "/offer";
        props.history.push(removeAllSpace(next));
        break;
      }
      default:
    }
  }
  useEffect(() => {
    const CategoryId = "1";
    selectModelContextDispatch({ type: "setCategoryId", value: CategoryId });
  }, []);

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
  //     console.log(<NewA />)
  //     console.log(Component)
  //     console.log('end')
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
      path: () => props.match.url + "/:brandName/:modelInfo",
      Component: Questionary
    },
    offer: {
      path: () => props.match.url + "/offer",
      Component: Offer
    },
    information: {
      path: () => props.match.url + "/information",
      Component: Information
    },
    payment: {
      path: () => props.match.url + "/payment",
      Component: Payment
    },
    shipping: {
      path: () => props.match.url + "/shipping",
      Component: Shipping
    },
    summary: {
      path: () => props.match.url + "/summary",
      Component: Summary
    },
    prepareShip: {
      path: () => props.match.url + "/prepare-ship",
      Component: Summary
    }
  };
  const configArr = staticRouter.map(item => {
    const { pageKey } = item;
    return { ...item, ...routerConfig[pageKey] };
  });

  return (
    <Switch>
      {configArr.map(({ path, title, Component, pageKey }) => {
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
      const preOrder = sessionStorage.getItem("preOrder");
      if (preOrder) {
        this.props.user.preOrder = JSON.parse(preOrder);

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
      <div className="layout">
        <HeaderTitle title={title} />
        <header>
          <Breadcrumb
            goNextPage={(...params: any[]) => {
              // 注入
              goNextPage(...params);
            }}
            currentPage={currentPage}
          />
        </header>
        <div className={"content"}>{children}</div>
      </div>
    );
  }
}
