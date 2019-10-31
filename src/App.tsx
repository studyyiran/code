import * as React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "mobx-react";
import Layout from "./containers/layout/index";
import routes from "./routers";
import store from "./store";
import { ModelContextProvider } from "./pages/sell/selectModelProcess/context";
import { TotalOrderInfoProvider } from "./containers/order/container/context";
import { DataReportConditionContextProvider } from "./pages/sell/selectModelProcess/condition/dataReport";
const setIsMobile = (fn?: () => void) => {
  const clientWidth = document.body.clientWidth;
  const confuseWidth = 0;
  if (clientWidth <= 700 - confuseWidth) {
    // @ts-ignore
    store["common"].isMobile = true;
    document.body.classList.add("ismobile");
    (document.querySelector("body") as any).setAttribute("id", "ismobile");
  } else {
    // @ts-ignore
    store["common"].isMobile = false;
    document.body.classList.remove("ismobile");
    (document.querySelector("body") as any).setAttribute("id", "");
  }
  if (fn) {
    fn();
  }
};

window.addEventListener(
  "resize",
  () => {
    setIsMobile();
  },
  false
);
let tryCount = 10;
let intervalId = 0;
intervalId = window.setTimeout(() => {
  if (tryCount > 0) {
    setIsMobile();
    tryCount--;
  } else {
    clearInterval(intervalId);
  }
}, 200);

// @ts-ignore
store["common"].getStaticOffice();

document.body.classList.add("isrender");

export default () => {
  return (
    <Provider {...store}>
      <TotalOrderInfoProvider>
        <ModelContextProvider>
          <BrowserRouter>
            <DataReportConditionContextProvider>
              <Layout>
                <Switch>{renderRoutes(routes)}</Switch>
              </Layout>
            </DataReportConditionContextProvider>
          </BrowserRouter>
        </ModelContextProvider>
      </TotalOrderInfoProvider>
    </Provider>
  );
};
