import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from "mobx-react";
import Layout from './containers/layout/index';
import routes from './routers';
import store from './store';
import { isMobile } from 'utils'

if (isMobile()) {
  store['common'].isMobile = true;
  document.body.classList.add('ismobile');
  const dpr = window.devicePixelRatio || 1;
  const metaEl = document.querySelector('meta[name="viewport"]');
  if (metaEl) {
    metaEl.setAttribute('content', `width=device-width,initial-scale=${1 / dpr}, maximum-scale=${1 / dpr}, minimum-scale=${1 / dpr}, user-scalable=no`);
  }
}


export default () => {
  return (
    <Provider {...store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            {renderRoutes(routes)}
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};
