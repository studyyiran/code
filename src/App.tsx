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
