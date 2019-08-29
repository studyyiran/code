import React from "react";
import Brand from "./selectModelProcess/brand";
import {Switch, Route} from 'react-router'

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
  console.log(props);
  function canGoNext(): boolean {
    return true;
  }
  function goNextPage(): void {
    console.log("goNextPage");
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
  //     console.log(<NewA />)
  //     console.log(Component)
  //     console.log('end')
  //     // @ts-ignore
  //     return <NewA />;
  //   };
  // }
  function wrapperWithProps(Component: any) {
    return (other: any[]) => {
      const newProps = {
        canGoNext,
        goNextPage,
        ...props,
        ...other
      }
      return <Component {...newProps} />
    }
  }
  
  const Model = () => {
    return <div>123</div>
  }
  return <Switch>
    <Route path={props.match.url + "/"} component={wrapperWithProps(Brand)} />
    <Route path={props.match.url + "/:brandName"} component={wrapperWithProps(Model)} />
    <Route path={props.match.url + "/:brandName/:model"} component={wrapperWithProps(Model)} />
    <Route render={() => <div>123</div>} />
  </Switch>
  // return <ModelContextProvider>
  //  
  // </ModelContextProvider>;
}