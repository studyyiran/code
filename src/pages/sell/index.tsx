import React, { useContext, useEffect } from "react";
import Brand from "./selectModelProcess/brand";
import Model from "./selectModelProcess/model";
import Questionary from "./selectModelProcess/condition";
import {
  SelectModelContext,
  ISelectModelContext
} from "./selectModelProcess/context";
import { Switch, Route } from "react-router";
import {HeaderTitle} from "@/components/headerTitle";

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
    dispatch
  } = selectModelContext as ISelectModelContext;
  const { brand, brandList } = selectModelContextValue;
  function canGoNext(): boolean {
    return true;
  }
  function goNextPage(): void {
    console.log("goNextPage");
    console.log(brand);
    const findTarget: any = brandList.find((item: any) => {
      return item.id === brand;
    });
    if (findTarget) {
      const next = props.match.url + "/" + findTarget.name;
      props.history.push(next);
    }
  }
  useEffect(() => {
    const CategoryId = "1";
    dispatch({ type: "setCategoryId", value: CategoryId });
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
        path={props.match.url + "/test"}
        render={(...other) => (
          <Layout>
            <Questionary canGoNext={canGoNext} goNextPage={goNextPage} {...props} />
          </Layout>
        )}
      />
      <Route
        path={props.match.url + "/:brandName/:model"}
        render={(...other) => (
          <Layout>
            <Brand canGoNext={canGoNext} goNextPage={goNextPage} {...props} />
          </Layout>
        )}
      />
      <Route
        path={props.match.url + "/:brandName"}
        render={(...other) => (
          <Layout>
            <Model canGoNext={canGoNext} goNextPage={goNextPage} {...props} />
          </Layout>
        )}
      />
      <Route
        path={props.match.url + "/"}
        render={(...other) => (
          <Layout>
            <Brand canGoNext={canGoNext} goNextPage={goNextPage} {...props} />
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
  return <div>
    <HeaderTitle title={"Select a manufacturer"} />
    <div>{children}</div>
  </div>;
}
