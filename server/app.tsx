import router from "koa-router";
import koaProxy from "koa-proxies";
import send from "koa-send";
import fs from "fs";
import Axios from "axios";
import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { matchRoutes, renderRoutes } from "react-router-config";
import { StaticRouter, Switch, matchPath } from "react-router-dom";
import { Provider } from "mobx-react";
import Loadable from "react-loadable";

import clientRouter from "../src/routers";
import store from "../src/store";
import Layout from "../src/containers/layout/index";
import CONFIG from "./config";
import TITLE from "../src/config/title.config";
import { getBundles } from "react-loadable/webpack";
import stats from "../build/react-loadable.json";
import SiteMap from "./lib/sitemap";
import { routerConfig } from "../src/buy/share/routerConfig";
import { RenderWithOriginData } from "../src/buy/share/renderWithOriginData";

const Router = new router();

// 对请求过来的数据做一个转发，转发到localhost
Axios.interceptors.request.use(config => {
  if (!config["isFullUrl"]) {
    config.baseURL = "http://localhost:" + CONFIG.port;
  }
  return config;
});
// Axios.interceptors.response.use((response: AxiosResponse) => {
//   console.log(response.data);
//   if (response.data.code === 110000005) {
//     console.log(1231231231313);
//     Router.redirect('/notfound', '404', 302);
//     return Promise.reject(false);
//   }
//   return response
// })

const mappingTitle = (template, path, matches) => {
  if (matches && matches[0] && matches[0].route) {
    let templateValue = matches[0].route["templateValue"];
    if (templateValue) {
      templateValue = templateValue();
      if (!templateValue) {
        return template;
      }
      template = template.replace(
        /\<title\>(.*)\<\/title\>/,
        "<title>" + (templateValue.title || "") + "</title>"
      );
      template = template.replace(
        /\<meta name=\"keywords\" content=\"\"\>/,
        '<meta name="keywords" content="' +
          (templateValue.keywords || "") +
          '">'
      );
      template = template.replace(
        /\<meta name=\"description\" content=\"\"\>/,
        '<meta name="description" content="' +
          (templateValue.description || "") +
          '">'
      );
      template = template.replace(
        /\<meta name=\"robots\" content=\"(index\,follow|noindex\,nofollow)\"\>/,
        '<meta name="robots" content="' + (templateValue.robots || "") + '">'
      );
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
    template = template.replace(
      /\<title\>(.*)\<\/title\>/,
      "<title>" + (currentConfig.title || "") + "</title>"
    );
    template = template.replace(
      /\<meta name=\"keywords\" content=\"\"\>/,
      '<meta name="keywords" content="' + (currentConfig.keywords || "") + '">'
    );
    template = template.replace(
      /\<meta name=\"description\" content=\"\"\>/,
      '<meta name="description" content="' +
        (currentConfig.description || "") +
        '">'
    );
    return template;
  }

  return template;
};

const generateBundleScripts = intries => {
  return intries
    .filter(bundle => bundle.file.endsWith(".js"))
    .map(bundle => {
      return `<script type="text/javascript" src="${bundle.publicPath}"></script>\n`;
    });
};

// Router.get('/sitemap.xml', async (ctx: any, next: any) => {
//   SiteMap((xml) => {
//     ctx.body = xml;
//     next();
//   });
// })
// 转发静态资源的请求
Router.get("/static/*", async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
});
Router.get("/email/*", async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
});
Router.get("/favicon.ico", async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
});
Router.get("/manifest.json", async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
});
Router.get("/notfound.html", async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
});

Router.get("/buy/static/*", async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
});
Router.get("/buy/iconfont.js", async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
});
Router.get("/buy/favicon.ico", async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
});
Router.get("/buy/manifest.json", async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
});
Router.get("/buy/notfound.html", async (ctx: any, next: any) => {
  await send(ctx, ctx.path, { root: `${__dirname}` });
});

// 反向代理请求
Router.all(
  "/up-api/*",
  koaProxy("/up-api", {
    target: CONFIG.proxyUrl,
    changeOrigin: true,
    logs: true,
    rewrite: path => path.replace(/\/up-api/, "")
  })
);

// 跳转值sell端
const gotoSell = async (ctx: any, next: any) => {
  if (ctx.originalUrl === "/sitemap.xml") {
    const xml = await SiteMap();
    ctx.append("Content-Type", "application/xml");
    ctx.body = xml;
    return;
  }
  // 模板文件
  let template = fs.readFileSync(__dirname + "/index.html", {
    encoding: "utf-8"
  });

  let isIgnore = false;
  // 如果在排除列表中，直接返回 html
  for (let i = 0; i < CONFIG.routerIgnore.length; i++) {
    if (ctx.path.includes(CONFIG.routerIgnore[i])) {
      isIgnore = true;
      break;
    } else {
      console.log(CONFIG.routerIgnore[i]);
    }
  }
  if (isIgnore) {
    ctx.body = template;
    next();
    return;
  }
  const matches = matchRoutes(clientRouter, ctx.path);
  if (matches && matches[0] && matches[0].route["actions"]) {
    const promises = matches[0].route["actions"].map(v => v());
    await Promise.all(promises);
  }

  if (
    matches &&
    matches[0] &&
    matches[0].match.params &&
    matches[0].route["bootstrap"]
  ) {
    await matches[0].route["bootstrap"](matches[0].match.params);
  }

  template = mappingTitle(template, ctx.path, matches);
  const modules = [];
  const html = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider {...store}>
        <StaticRouter location={ctx.path} context={{}}>
          <Layout>
            <Switch>{renderRoutes(clientRouter)}</Switch>
          </Layout>
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );
  const bundles = getBundles(stats, modules);
  const scripts = generateBundleScripts(bundles);
  if (matches && matches[0]) {
    if (matches[0].route["actions"] || matches[0].route["bootstrap"]) {
      template = template.replace(
        /(<\/head>)/,
        "<script>var __SERVER_RENDER__INITIALSTATE__=" +
          JSON.stringify(store) +
          ";</script>$1"
      );
    }
  }
  template = template.replace(/(<\/body>)/, scripts.join() + "$1");
  template = template.replace(/(<div id=\"root\">)/, "$1" + html);
  ctx.body = template;
};

// 跳转值buy端
const gotoBuy = async (ctx: any, next: any, buyCurrentRouter: any) => {
  const { title, Component, getInitialProps } = buyCurrentRouter;
  let originData: any = {};
  let template = fs.readFileSync(__dirname + "/buy/index.html", {
    encoding: "utf-8"
  });
  if (getInitialProps) {
    console.log("ajax start");
    console.log(ctx.path);
    originData = await getInitialProps(ctx.path);
    console.log(originData);
    console.log("ajax end");
    const html = ReactDOMServer.renderToString(
      <RenderWithOriginData originData={originData}>
        <main>
          <Component />
        </main>
      </RenderWithOriginData>
    );
    template = template.replace(/(<div id=\"root\">)/, "$1" + html);
  }
  template = template.replace(
    /(<div id=\"ssrtitle\">)/,
    "$1" + originData.ssrTitle ? originData.ssrTitle : title
  );
  template = template.replace(
    /(<\/head>)/,
    "<script>var SSRDATA=" + JSON.stringify(originData) + ";</script>$1"
  );
  ctx.body = template;
  next();
};

Router.get("*", async (ctx: any, next: any) => {
  console.log("=================================", ctx.path);
  if (!ctx.path) {
    return;
  }
  // 匹配buy端路由，如果匹配的上并且组件存在，直接跳转buy端，否则跳转sell端
  const current = routerConfig.find((route: any) => {
    return !!matchPath(ctx.path, route);
  });
  console.log("=========", JSON.stringify(current));
  if (current && current.Component) {
    console.log("buy page");
    return await gotoBuy(ctx, next, current);
  } else {
    console.log("sell page");
    return await gotoSell(ctx, next);
  }
});

export default Router;
