import * as React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "mobx-react";
import Layout from "./containers/layout/index";
import routes from "./routers";
import store from "./store";
import { ModelContextProvider } from "./pages/sell/selectModelProcess/context";
import { TotalOrderInfoProvider } from "./containers/order/container/context";
const setIsMobile = (fn?: () => void) => {
  const clientWidth = document.body.clientWidth;
  const confuseWidth = 0;
  if (clientWidth <= 700 - confuseWidth) {
    store["common"].isMobile = true;
    document.body.classList.add("ismobile");
    (document.querySelector("body") as any).setAttribute("id", "ismobile");
  } else {
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

setIsMobile();
store["common"].getStaticOffice();

document.body.classList.add("isrender");

export default () => {
  return (
    <Provider {...store}>
      <TotalOrderInfoProvider>
        <ModelContextProvider>
          <BrowserRouter>
            <Layout>
              <Switch>{renderRoutes(routes)}</Switch>
            </Layout>
          </BrowserRouter>
        </ModelContextProvider>
      </TotalOrderInfoProvider>
    </Provider>
  );
};
