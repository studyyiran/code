import React from "react";
import Brand from "./selectModelProcess/brand";
import { ModelContextProvider } from "./selectModelProcess/context";

// interface ISell {}
export default function Sell(props: any) {
  console.log(props);
  function canGoNext(): boolean {
    return true;
  }
  function goNextPage(): void {
    console.log("goNextPage");
  }

  function wrapper(children: any) {
    return (...other: any[]) => {
      return React.cloneElement(children, {
        canGoNext,
        goNextPage,
        ...props,
        ...other
      });
    };
  }
  return <ModelContextProvider>
    <Brand />
  </ModelContextProvider>;
}
