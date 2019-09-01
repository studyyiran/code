import React, { useContext, useEffect } from "react";
import Brand from "./selectModelProcess/brand";
import Model from "./selectModelProcess/model";
import Questionary from "./selectModelProcess/condition/index";
import Offer from "./selectModelProcess/offer";
import Information from './selectModelProcess/pages/information'
import Payment from "./selectModelProcess/pages/payment";
import Shipping from './selectModelProcess/pages/shipping'

import {
  SelectModelContext,
  ISelectModelContext
} from "./selectModelProcess/context";
import { Switch, Route } from "react-router";
import { HeaderTitle } from "@/components/headerTitle";
import Breadcrumb from "./selectModelProcess/components/breadcrumb/index";

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
    switch (currentPage) {
      case "shipping": {
        const next = props.match.url + '/payment';
        props.history.push(removeAllSpace(next));
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
  return (
    <Switch>
      <Route
        path={props.match.url + "/shipping"}
        render={other => (
          <Layout goNextPage={goNextPage}>
            <Shipping
              canGoNext={canGoNext}
              goNextPage={() => goNextPage("shipping")}
              {...props}
            />
          </Layout>
        )}
      />
      <Route
        path={props.match.url + "/payment"}
        render={other => (
          <Layout goNextPage={goNextPage}>
            <Payment
              canGoNext={canGoNext}
              goNextPage={() => goNextPage("payment")}
              {...props}
            />
          </Layout>
        )}
      />
      <Route
        path={props.match.url + "/information"}
        render={other => (
          <Layout goNextPage={goNextPage}>
            <Information
              canGoNext={canGoNext}
              goNextPage={() => goNextPage("information")}
              {...props}
            />
          </Layout>
        )}
      />
      <Route
        path={props.match.url + "/offer"}
        render={other => (
          <Layout goNextPage={goNextPage}>
            <Offer
              canGoNext={canGoNext}
              goNextPage={() => goNextPage("offer")}
              {...props}
            />
          </Layout>
        )}
      />
      <Route
        path={props.match.url + "/:brandName/:modelInfo"}
        render={other => (
          <Layout goNextPage={goNextPage}>
            <Questionary
              canGoNext={canGoNext}
              goNextPage={() => goNextPage("condition")}
              {...props}
            />
          </Layout>
        )}
      />
      <Route
        path={props.match.url + "/:brandName"}
        render={other => (
          <Layout goNextPage={goNextPage}>
            <Model
              canGoNext={canGoNext}
              goNextPage={() => goNextPage("model")}
              {...props}
            />
          </Layout>
        )}
      />
      <Route
        path={props.match.url + "/"}
        render={other => (
          <Layout goNextPage={goNextPage}>
            <Brand
              canGoNext={canGoNext}
              goNextPage={() => goNextPage("brand")}
              {...props}
            />
          </Layout>
        )}
      />
      <Route render={() => <div>123</div>} />
    </Switch>
  );
}
function Layout(layoutProps: any) {
  const { children, goNextPage } = layoutProps;
  return (
    <div>
      <HeaderTitle title={"Select a manufacturer"} />
      <Breadcrumb goNextPage={goNextPage} />
      <div>{children}</div>
    </div>
  );
}
// return <ModelContextProvider>
//
// </ModelContextProvider>;
