import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import "buy/common/styles/index.less";
import Routers from "./routers";

ReactDOM.hydrate(<Routers />, document.getElementById("root"));
