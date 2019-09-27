/// <reference path="../node_modules/@types/webpack-env/index.d.ts" />
declare var module: __WebpackModuleApi.Module
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
import * as Loadable from 'react-loadable';
import App from './App';
import './styles/index.less';
// import './iconfont/iconfont';
import Raven from 'raven-js';

if (process.env.REACT_APP_SERVER_ENV === 'PUB') {
  Raven.config('https://af75361018b342bba487e7a637e713cf@sentry.aijihui.net/41').install();
}
if (process.env.NODE_ENV === "development") {
  ReactDOM.render(
    <App/>,
    document.getElementById('root') as HTMLElement
  );
  if (module.hot) {
    module.hot.accept();
  }
  // ReactDOM.render(
  //   <AppContainer>
  //     <Test />
  //   </AppContainer>,
  //   document.getElementById('root') as HTMLElement
  // );
  // if (module.hot) {
  //   module.hot.accept();
  // }
}


if (process.env.NODE_ENV === "production") {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <App/>,
      document.getElementById('root') as HTMLElement
    );
  })
}

// 这里处理新老网站跳转，老的email中跳转到新的网站，如果携带token以及origin参数，说明是老的订单，需要跳转到老的地址
// todo start 这里新老网站交替完毕，老网站没有流量之后，删除这个跳转方法 
function getQueryVariable(variable: any) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return (false);
}

const origin = getQueryVariable('origin');
const token = getQueryVariable('token');
if (origin || token) {
  if (process.env.REACT_APP_SERVER_ENV === 'PUB') {
    window.location.href = `https://classic.uptradeit.com/check-order?origin=${origin}&token=${token}`
  } else if (process.env.REACT_APP_SERVER_ENV === 'UAT') {
    window.location.href = `http://uptrade-www-staging.aihuishou.com/check-order?origin=${origin}&token=${token}`
  }
}
// todo end 这里新老网站交替完毕，老网站没有流量之后，删除这个跳转方法 


