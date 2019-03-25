/// <reference path="../node_modules/@types/webpack-env/index.d.ts" />
declare var module: __WebpackModuleApi.Module
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './styles/index.less';
// import './iconfont/iconfont';

if (process.env.NODE_ENV === "development") {
  ReactDOM.hydrate(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root') as HTMLElement
  );
  if (module.hot) {
    module.hot.accept();
  }
}


if (process.env.NODE_ENV === "production") {
  ReactDOM.hydrate(
    <App />,
    document.getElementById('root') as HTMLElement
  );
}

