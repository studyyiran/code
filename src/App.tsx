import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from "mobx-react";
import Layout from './containers/layout/index';
import routes from './routers';
import store from './store';

const setIsMobile = (fn?: () => void) => {
  const clientWidth = document.documentElement.clientWidth;
  // const dpr = window.devicePixelRatio || 1;
  if (clientWidth <= 700) {
    store['common'].isMobile = true;
    document.body.classList.add('ismobile');
  } else {
    store['common'].isMobile = false;
    document.body.classList.remove('ismobile');
  }
  if (fn) {
    fn();
  }
}

setIsMobile();
export default class App extends React.Component {
  public state = {
    store: store
  }

  public componentDidMount() {
    window.addEventListener('resize', () => {
      setIsMobile(() => {
        this.setState({
          store: { ...store }
        })
      })
    }, false);
    store['common'].getStaticOffice();
    this.setState({
      store: { ...store }
    })
  }


  public componentWillUnmount() {
    window.removeEventListener('resize', () => {
      setIsMobile(() => {
        this.setState({
          store: { ...store }
        })
      })
    });
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
