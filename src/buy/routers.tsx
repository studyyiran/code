import React, { useEffect } from "react";
import { Switch, Route, Router } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import hocDocumentTitle from "./components/documentTitle";
import { routerHistory } from "./common/utils/routerHistory";
import { scrollTop } from "./common/utils/util";
import { routerConfig } from "./share/routerConfig";
import { RenderWithOriginData } from "./share/renderWithOriginData";
import { IOriginData } from "./context/originData";

export default function ContextProviderWrapper() {
  // 这段脚本只在浏览器运行 从window中获取.进行脱水
  let originData: IOriginData[] = (window as any).SSRDATA
    ? (window as any).SSRDATA
    : undefined;
  // router是最外层
  // 然后是provider层,这样store可以使用router的信息
  // 然后是组件渲染层.
  // 这个层次结构应该和server端是一致的,因为需求是类似的.
  return (
    <Router history={routerHistory}>
      <RenderWithOriginData originData={originData}>
        <Switch>
          {routerConfig.map(
            (
              { path, Component, exact, ...otherConfig }: any,
              index: number
            ) => (
              <Route
                exact={exact}
                key={path}
                path={path}
                component={hocWithLayout(Component, otherConfig)}
              />
            )
          )}
        </Switch>
      </RenderWithOriginData>
    </Router>
  );
}

function hocWithLayout(Component: any, otherConfig: any) {
  const { title, header, footer } = otherConfig;
  const NewComponent = (routerProps: any) => {
    useEffect(() => {
      // 路由跳转钩子
      scrollTop();
    }, [routerProps.match.url]);
    return (
      <div className="layout">
        {header === "hide" ? null : <Header {...routerProps} />}
        <main>
          <Component {...routerProps} />
        </main>
        <Footer {...routerProps} />
      </div>
    );
  };
  return hocDocumentTitle(NewComponent)(title);
}
