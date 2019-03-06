import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from "mobx-react";
import Layout from './containers/layout/index';
import routes from './routers';
import store from './store';

export default class App extends React.Component {
  public state = {
    store: store
  }

  public componentDidMount() {
    this.setIsMobile();
    window.addEventListener('resize', this.setIsMobile, false);
  }

  public setIsMobile = () => {
    const clientWidth = document.documentElement.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    if ((clientWidth / dpr) <= 500) {
      store['common'].isMobile = true;
      document.body.classList.add('ismobile');
    } else {
      store['common'].isMobile = false;
      document.body.classList.remove('ismobile');
    }

    this.setState({
      store: { ...store }
    })
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.setIsMobile);
  }

  public render() {
    return (
      <Provider {...this.state.store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              {renderRoutes(routes)}
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}
