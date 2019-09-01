import React, { useContext, useEffect } from "react";
import Brand from "./selectModelProcess/brand";
import Model from "./selectModelProcess/model";
import Questionary from "./selectModelProcess/condition/index";
import Offer from "./selectModelProcess/offer";
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
export default function Sell(props: any) {
  const selectModelContext = useContext(SelectModelContext);
  const {
    selectModelContextValue,
    selectModelContextDispatch
  } = selectModelContext as ISelectModelContext;
  const { brand, brandList } = selectModelContextValue;
  function canGoNext(): boolean {
    return true;
  }
  function goNextPage(currentPage: any): void {
    switch (currentPage) {
      case "brand": {
        const findTarget: any = brandList.find((item: any) => {
          return item.id === brand;
        });
        if (findTarget) {
          const next = props.match.url + "/" + findTarget.name;
          // const next = props.match.url + "/condition";
          props.history.push(next);
        }
        break;
      }
      case "model": {
        const next = props.match.url + "/condition";
        props.history.push(next);
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
      {/*<Route path={props.match.url + "/"} component={Brand} />*/}
      <Route
        path={props.match.url + "/offer"}
        render={other => (
          <Layout>
            <Offer
              canGoNext={canGoNext}
              goNextPage={() => goNextPage("offer")}
              {...props}
            />
          </Layout>
        )}
      />
      <Route
        path={props.match.url + "/condition"}
        render={other => (
          <Layout>
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
          <Layout>
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
          <Layout>
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
  // return <ModelContextProvider>
  //
  // </ModelContextProvider>;
}

function Layout(props: any) {
  const { children } = props;
  return (
    <div>
      <HeaderTitle title={"Select a manufacturer"} />
      <Breadcrumb />
      <div>{children}</div>
    </div>
  );
}
