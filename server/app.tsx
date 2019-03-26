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

import clientRouter from './router';
import store from '../src/store';
import Layout from '../src/containers/layout/index';
import CONFIG from './config';
import TITLE from '../src/config/title.config'

// 对请求过来的数据做一个转发，转发到localhost
Axios.interceptors.request.use((config) => {
  if (!config['isFullUrl']) {
    config.baseURL = 'http://localhost:' + CONFIG.port
  }
  return config;
})


const mappingTitle = (template, path, matches)=> {
  if(matches && matches[0] && matches[0].route) {
    const templateValue = matches[0].route['templateValue'];
    console.log(templateValue);
    if(templateValue) {
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
  if(currentConfig) {
    template = template.replace(/\<title\>(.*)\<\/title\>/, '<title>' + (currentConfig.title || '') + '</title>');
    template = template.replace(/\<meta name=\"keywords\" content=\"\"\>/, '<meta name="keywords" content="' + (currentConfig.keywords || '') + '">');
    template = template.replace(/\<meta name=\"description\" content=\"\"\>/, '<meta name="description" content="' + (currentConfig.description || '') + '">')
    return template;
  }
  
  return template;
}


const Router = new router();

// 转发静态资源的请求
Router.get('/static/*', async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
})
Router.get('/favicon.ico', async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
})

// 反向代理请求
Router.all('/up-api/*', koaProxy('/up-api', {
  target: CONFIG.proxyUrl,
  changeOrigin: true,
  logs: true
  rewrite: path => path.replace(/\/up-api/, ''),
}))

Router.get('*', async (ctx: any, next: any) => {
  // 模板文件
  const template = fs.readFileSync(__dirname + '/index.html', { encoding: 'utf-8' });

  //如果在排除列表中，直接返回 html
  if(CONFIG.routerIgnore.includes(ctx.path)) {
    ctx.body = template;
    next();
    return;
  }

  const matches = matchRoutes(clientRouter, ctx.path)
  console.log(matches);

  if (matches && matches[0] && matches[0].route['actions']) {
    const promises = matches[0].route['actions'].map(v => v())
    await Promise.all(promises);
  }

  template = mappingTitle(template, ctx.path, matches);

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
  let body = template.replace(/(<\/head>)/, '<script>var __SERVER_RENDER__INITIALSTATE__=' + JSON.stringify(store) + ';</script>$1');
  body = body.replace(/(<div id=\"root\">)/, '$1' + html);
  ctx.body = body;
})

export default Router;