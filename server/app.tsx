import router from 'koa-router';
import koaProxy from 'koa-proxies'
import send from 'koa-send';
import fs from 'fs';
import Axios from 'axios';
import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { StaticRouter, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react';
import Loadable from 'react-loadable';

import clientRouter from '../src/routers';
import store from '../src/store';
import Layout from '../src/containers/layout/index';
import CONFIG from './config';
import TITLE from '../src/config/title.config'
import { getBundles } from 'react-loadable/webpack';
import stats from '../build/react-loadable.json';

// 对请求过来的数据做一个转发，转发到localhost
Axios.interceptors.request.use((config) => {
  if (!config['isFullUrl']) {
    config.baseURL = 'http://localhost:' + CONFIG.port
  }
  return config;
})


const mappingTitle = (template, path, matches) => {
  if (matches && matches[0] && matches[0].route) {
    const templateValue = matches[0].route['templateValue'];
    console.log(templateValue);
    if (templateValue) {
      template = template.replace(/\<title\>(.*)\<\/title\>/, '<title>' + (templateValue.title || '') + '</title>');
      template = template.replace(/\<meta name=\"keywords\" content=\"\"\>/, '<meta name="keywords" content="' + (templateValue.keywords || '') + '">');
      template = template.replace(/\<meta name=\"description\" content=\"\"\>/, '<meta name="description" content="' + (templateValue.description || '') + '">')
      return template;
    }
  }

  const titlesKey = Object.keys(TITLE);
  // 得到所有和当前路由匹配的数组
  const arr = titlesKey.filter(v => new RegExp(v).test(path));
  // 设置title
  const currentConfig = TITLE[arr[arr.length - 1]];
  console.log(currentConfig);
  if (currentConfig) {
    template = template.replace(/\<title\>(.*)\<\/title\>/, '<title>' + (currentConfig.title || '') + '</title>');
    template = template.replace(/\<meta name=\"keywords\" content=\"\"\>/, '<meta name="keywords" content="' + (currentConfig.keywords || '') + '">');
    template = template.replace(/\<meta name=\"description\" content=\"\"\>/, '<meta name="description" content="' + (currentConfig.description || '') + '">')
    return template;
  }

  return template;
}

const generateBundleScripts = (intries) => {
  return intries.filter(bundle => bundle.file.endsWith('.js')).map(bundle => {
    return `<script type="text/javascript" src="${bundle.publicPath}"></script>\n`;
  });
}



const Router = new router();

// 转发静态资源的请求
Router.get('/static/*', async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
})
Router.get('/email/*', async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
})
Router.get('/favicon.ico', async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
})

Router.get('/manifest.json', async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
})
Router.get('/notfound.html', async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
})

// 反向代理请求
Router.all('/up-api/*', koaProxy('/up-api', {
  target: CONFIG.proxyUrl,
  changeOrigin: true,
  logs: true,
  rewrite: path => path.replace(/\/up-api/, ''),
}))

Router.get('*', async (ctx: any, next: any) => {
  // 模板文件
  let template = fs.readFileSync(__dirname + '/index.html', { encoding: 'utf-8' });

  // 如果在排除列表中，直接返回 html
  if (CONFIG.routerIgnore.includes(ctx.path)) {
    ctx.body = template;
    next();
    return;
  }

  const matches = matchRoutes(clientRouter, ctx.path)

  if (matches && matches[0] && matches[0].route['actions']) {
    const promises = matches[0].route['actions'].map(v => v())
    await Promise.all(promises);
  }

  if (matches && matches[0] && matches[0].match.params && matches[0].route['bootstrap']) {
    await matches[0].route['bootstrap'](matches[0].match.params);
  }

  template = mappingTitle(template, ctx.path, matches);
  const modules = [];
  const html = ReactDOMServer.renderToString(
    <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
      <Provider {...store}>
        <StaticRouter location={ctx.path} context={{}}>
          <Layout>
            <Switch>
              {renderRoutes(clientRouter)}
            </Switch>
          </Layout>
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );
  const bundles = getBundles(stats, modules);
  const scripts = generateBundleScripts(bundles);
  if (matches && matches[0] && matches[0].route['actions']) {
    template = template.replace(/(<\/head>)/, '<script>var __SERVER_RENDER__INITIALSTATE__=' + JSON.stringify(store) + ';</script>$1');
  }
  template = template.replace(/(<\/body>)/, scripts.join() + '$1');
  template = template.replace(/(<div id=\"root\">)/, '$1' + html);
  ctx.body = template;
})

export default Router;