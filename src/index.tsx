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
    <App />,
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
      <App />,
      document.getElementById('root') as HTMLElement
    );
  })
}

