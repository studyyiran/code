import router from 'koa-router';
// import path from 'path';
// import fs from 'fs';
import * as React from 'react'
import send from 'koa-send';

import ReactDOMServer from 'react-dom/server'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { StaticRouter, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react';

const modules: any = {};
import clientRouter from './router';
import store from './store';
import Layout from '../src/containers/layout/index';
import fs from 'fs';

// modules.module1_routeArray = routeArray;
// import configureStore from '../../src/module1/store/store';
// modules.module1_store = configureStore;
// modules.serverPre = [{"filename": "server", "path": "../../src/module1" }];

// modules.serverPre.map((server) => {
//   inject(server.filename, server.path);
// })

const Router = new router();
const template = fs.readFileSync(__dirname + '/../build/index.html', { encoding: 'utf-8' });

Router.get('/static/*', async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}/../build` });
})

Router.get('*', async (ctx: any, next: any) => {
  const matches = matchRoutes(clientRouter, ctx.path)


  const html = ReactDOMServer.renderToString(
    <Provider {...store}>
      <StaticRouter location={ctx.path} context={{}}>
        <Layout>
          <Switch>
            {renderRoutes(clientRouter)}
          </Switch>
        </Layout>
      </StaticRouter>
    </Provider>
  );
  const body = template.replace(/(<div id=\"root\">)/, '$1' + html);
  ctx.body = body;

  // matchRoutes({routes, location: req.url }, (error, redirectLocation, renderProps) => {
  //   if (error) {
  //     res.send(500, error.message)
  //   } else if (redirectLocation) {
  //     res.redirect(302, redirectLocation.pathname + redirectLocation.search)
  //   } else if (renderProps) {
  //     res.send(200, renderToString(<RoutingContext { ...renderProps } />))
  //   } else {
  //     res.send(404, 'Not found')
  //   }
  // })

})

// function inject(file, p) {
//   let dir = path.basename(p);
//   console.log(('dir----' + dir));  //module1或者module2
//   router.get('/' + dir, async (ctx, next) => {
//     let moduleName = path.basename(ctx.req.url);
//     let router = modules[moduleName + '_routeArray'];
//     let store = (modules[moduleName + '_store'])();
//     let htmlSource = fs.readFileSync('./build/' + moduleName + '.html', { encoding: 'utf-8' });
//     console.log(moduleName);
//     console.log(htmlSource);
//     const branch = matchRoutes(router, '/');
//     const promises = branch.map(({ route }) => {
//       const fetch = route.component.fetch;
//       return fetch instanceof Function ? fetch(store) : Promise.resolve(null)
//     });
//     await Promise.all(promises).catch((err) => {
//       console.log(err);
//     });

//     const html = ReactDOMServer.renderToString(
//       <Provider store={ store } >
//       <StaticRouter location={ ctx.url } context = {{}}>
//       <div>
//       { renderRoutes(router) }
//       < /div>
//       < /StaticRouter>
//     < /Provider>
//   );

//   console.log(html)
//   let initState = JSON.stringify(store.getState());
//   console.log(initState);
//   let output = htmlSource.replace(/(<\/head>)/, '<script>var __INITIALSTATE__=' + initState + ';</script>$1');

//   const body = output.replace(/(<div id=\"root\">)/, '$1' + html);
//   ctx.body = body;
// });
// }

export default Router;