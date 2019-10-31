import React from "react";
import CheckOrderEntry from "./pages/entry";
import { routerConfig } from "./routerConfig";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function BuyCheckOrder(props: any) {
  const { path } = props.match;
  return (
    <Switch>
      {routerConfig.map((routerConfig: any) => {
        const { Component, path: relativePath, ...otherConfig } = routerConfig;
        return (
          <Route
            key={path + relativePath}
            path={path + relativePath}
            component={Component}
            {...otherConfig}
          />
        );
      })}
    </Switch>
  );
}
