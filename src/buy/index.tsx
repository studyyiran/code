import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import "buy/common/styles/index.less";
import Routers from "./routers";
import {isServer} from "./common/utils/util";

if (!isServer()) {
  (window as any).LOCATIONENV = 'buy';
}

// client入口 client only.
ReactDOM.hydrate(<Routers />, document.getElementById("root"));
